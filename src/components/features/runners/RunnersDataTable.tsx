import { useInfiniteQuery } from "@tanstack/react-query";
import RunnersTable from "@/components/features/runners/RunnersTable";
import { useState } from "react";
import SearchBar from "@/components/ui/table/SearchBar";
import {
  CircleIcon,
  HammerIcon,
  ServerIcon,
  TestTubeDiagonalIcon,
} from "lucide-react";
import { IRunner } from "../../../lib/types/IRunner";
import { Button } from "@/components/ui/Button";
import SelectInput, { ISelectItem } from "@/components/SelectInput";
import { RunnerModel } from "@/lib/models/RunnerModel";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Throbber from "@/components/ui/Throbber";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ButtonSort } from "@/components/ButtonSort";
import TableFilterNav from "@/components/ui/table/table_filter_nav";

export default function RunnersPage({
  limit2 = 25,
  isNav = true,
}: {
  limit2: number | undefined;
  isNav: boolean;
}) {
  const [searchText, setSearchText] = useState("");
  const [searchAction, setSearchAction] = useState(" ");
  const [searchState, setSearchState] = useState(" ");
  const [limit, _] = useState(limit2);
  const [sort, setSort] = useState({ column: "", direction: "asc"})

  const dataQuery = useInfiniteQuery({
    queryKey: [
      "runners",
      {
        search: searchText,
        limit: limit,
        searchAction: searchAction,
        searchState: searchState,
        sort: sort
      },
    ],
    queryFn: ({ pageParam = 1 }) => {
      const idRegex = "[a-zA-Z0-9]{5}";
      const filters = {
        ...(searchAction &&
          searchAction.trim() !== "" && {
            id_like: `${searchAction}-${idRegex}`,
          }),
        ...(searchState &&
          searchState.trim() !== "" && { state_eq: searchState }),
      };

      return RunnerModel.getRunners(
        searchText,
        limit,
        pageParam,
        sort.column,
        sort.direction,
        filters
      );
    },
    initialPageParam: 1,
    getNextPageParam: (_, __, lastPageParam) => {
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });

  if (dataQuery.data && "error" in dataQuery.data)
    return (
      <ErrorMessage errorMessage={dataQuery.data.error as IErrorMessage} />
    );

  if (dataQuery.error) {
    const error: IErrorMessage = {
      code: "500",
      error: "Internal server error",
      message: "Server responded with undefined",
    };
    return <ErrorMessage errorMessage={error}></ErrorMessage>;
  }

  let allData: IRunner[] = [];
  dataQuery.data?.pages.forEach((page) => {
    if (Array.isArray(page)) {
      allData = allData.concat(page);
    } else {
      console.error("Unexpected response format:", page);
    }
  });

  const cols: ISelectItem[] = [
    { value: 'id', content: 'Název'},
  ];

  const actionsVals: ISelectItem[] = [
    {
      value: "csas-dev-csas-linux",
      content: (
        <IconItem
          title="Build"
          icon={<HammerIcon size={15} />}
          text="Build runners"
        />
      ),
    },
    {
      value: "csas-dev-csas-linux-test",
      content: (
        <IconItem
          title="Test"
          icon={<TestTubeDiagonalIcon size={15} />}
          text="Test runners"
        />
      ),
    },
    {
      value: "csas-ops-csas-linux",
      content: (
        <IconItem
          title="DEV"
          icon={<ServerIcon size={15} />}
          text="DEV deployers"
        />
      ),
    },
    {
      value: "csas-ops-csas-linux-prod",
      content: (
        <IconItem
          title="PROD"
          icon={<ServerIcon size={15} className="stroke-log_red" />}
          text="PROD deployers"
        />
      ),
    },
  ];
  const statesVals: ISelectItem[] = [
    { value: "active", content: <StateItem title="Active" color="green" /> },
    { value: "offline", content: <StateItem title="Offline" color="gray" /> }, // prettier-ignore
    { value: "idle", content: <StateItem title="Idle" color="yellow" />  }, // prettier-ignore
    { value: "failed", content: <StateItem title="Failed" color="red" /> },
  ];

  return (
    <>
      {isNav && (
        <TableFilterNav
          left={
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
          }
          right={
            <>
              <SelectInput
                defaultValue={searchAction}
                placeholder="All actions"
                items={actionsVals}
                onValueChange={(e) => setSearchAction(e)}
              />
              <SelectInput
                defaultValue={searchState}
                placeholder="All States"
                items={statesVals}
                onValueChange={(e) => setSearchState(e)}
              />
              <ButtonSort sort={sort} setSort={setSort} items={cols}/>
            </>
          }
        />
      )}
      {dataQuery.isLoading ? (
        <Throbber />
      ) : (
        <div>
          <RunnersTable
            runners={dataQuery.data?.pages}
            searchText={searchText}
          />
          {/* TODO: use global component */}
          {isNav &&
            dataQuery.data &&
            (
              dataQuery.data?.pages[
                dataQuery.data.pageParams.length - 1
              ] as IRunner[]
            ).length >= limit2 && (
              <div className="w-full mt-4">
                <Button
                  variant="outline"
                  onClick={() => dataQuery.fetchNextPage()}
                  className={`w-full`}
                  disabled={
                    !dataQuery.hasNextPage || dataQuery.isFetchingNextPage
                  }
                >
                  {dataQuery.isFetchingNextPage
                    ? "Loading more..."
                    : dataQuery.hasNextPage
                    ? "Load More"
                    : "Nothing more to load"}
                </Button>
              </div>
            )}
        </div>
      )}
    </>
  );
}

function StateItem({ title, color }: { title: string; color: string }) {
  return (
    <div className="flex flex-row items-center">
      <CircleIcon size={8} className={`mr-2 fill-state_${color} stroke-none`} />
      <span>{title}</span>
    </div>
  );
}

function IconItem({
  title,
  icon,
  text,
}: {
  title?: string;
  icon?: React.ReactNode;
  text?: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex flex-row items-center gap-2">
            {icon}
            <span>{title}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

import { useInfiniteQuery } from "@tanstack/react-query";
import RunnersTable from "@/components/features/runners/RunnersTable";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SearchBar from "@/components/ui/table/SearchBar";
import { CircleIcon } from "lucide-react";
import { IRunner } from "../../../lib/types/IRunner";
import { Button } from "@/components/ui/Button";
import SelectInput, { ISelectItem } from "@/components/SelectInput";
import { RunnerModel } from "@/lib/models/RunnerModel";

export default function RunnersPage({
  limit2 = 25,
  isNav = true,
}: {
  limit2: number | undefined;
  isNav: boolean;
}) {
  const [searchText, setSearchText] = useState("");
  const [searchGroup, setSearchGroup] = useState(" ");
  const [searchOrganization, setSearchOrganization] = useState(" ");
  const [searchState, setSearchState] = useState(" ");
  const [limit, _] = useState(limit2);

  const dataQuery = useInfiniteQuery({
    queryKey: [
      "runners",
      {
        search: searchText,
        limit: limit,
        searchGroup: searchGroup,
        searchOrganization: searchOrganization,
        searchState: searchState,
      },
    ],
    queryFn: ({ pageParam = 1 }) => {
      const idRegex = "[a-zA-Z0-9]{5}";
      const filters = {
        ...(searchGroup &&
          searchGroup.trim() !== "" && {
            id_like: `${searchGroup}-${idRegex}`,
          }),
        ...(searchOrganization &&
          searchOrganization.trim() !== "" && {
            organization_eq: searchOrganization,
          }),
        ...(searchState &&
          searchState.trim() !== "" && { state_eq: searchState }),
      };

      return RunnerModel.getRunners(
        searchText,
        limit,
        pageParam,
        "group",
        "asc",
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

  if (dataQuery.isError) return <p>Error: {dataQuery.error?.message}</p>;

  let allData: IRunner[] = [];
  dataQuery.data?.pages.forEach((page) => {
    if (Array.isArray(page)) {
      allData = allData.concat(page);
    } else {
      console.error("Unexpected response format:", page);
    }
  });

  // const actionsVals: ISelectItem[] = [
  //   { value: "csas-dev-csas-linux", content: "Building" },
  //   { value: "csas-dev-csas-linux-test", content: "Testing" },
  //   { value: "csas-ops-csas-linux", content: "Deploying to dev" },
  //   { value: "csas-ops-csas-linux-test", content: "Deploying to prod" },
  // ];

  const statesVals: ISelectItem[] = [
    { value: "active", content: <StateItem title="Active" color="green" /> },
    { value: "offline", content: <StateItem title="Offline" color="gray" /> }, // prettier-ignore
    { value: "idle", content: <StateItem title="Idle" color="yellow" />  }, // prettier-ignore
    { value: "failed", content: <StateItem title="Failed" color="red" /> },
  ];

  return (
    <>
      {isNav && (
        <div className="flex justify-between gap-4 mb-4">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
          <Select
            onValueChange={(e) => {
              setSearchGroup(e);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Groups" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" ">All Groups</SelectItem>
              <SelectItem value="csas-linux">csas-linux</SelectItem>
              <SelectItem value="csas-linux-test">csas-linux-test</SelectItem>
              <SelectItem value="csas-linux-prod">csas-linux-prod</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(e) => {
              setSearchOrganization(e);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Organizations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" ">All Organizations</SelectItem>
              <SelectItem value="csas-dev">csas-dev</SelectItem>
              <SelectItem value="csas-ops">csas-ops</SelectItem>
            </SelectContent>
          </Select>
          <SelectInput
            placeholder="All States"
            items={statesVals}
            onValueChange={(e) => setSearchState(e)}
          />
        </div>
      )}
      {dataQuery.isLoading ? (
        <div className="loader-wrap">
          <div className="loading-spinner"></div>
        </div>
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

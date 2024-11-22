import { useInfiniteQuery } from "@tanstack/react-query";
import JobsTable from "./JobsTable";
import { Button } from "@/components/ui/Button";
import { IJobs } from "@/lib/types/IJobs";
import { CircleIcon } from "lucide-react";
import { useState } from "react";
import SearchBar from "@/components/ui/table/SearchBar";
import { format, subDays, subHours, subMinutes, subMonths } from "date-fns";
import SelectInput, { ISelectItem } from "@/components/SelectInput";
import { RunnerModel } from "@/lib/models/RunnerModel";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import Throbber from "@/components/ui/Throbber";
import { DateRange } from "react-day-picker";
import DateRangePicker from "@/components/ui/table/DateRangePicker";

export default function JobsDataTable({
  limit = 25,
  isNav = true,
  id,
  runnerId,
}: {
  limit: number | undefined;
  isNav: boolean;
  id?: string;
  runnerId?: string;
}) {
  const [searchText, setSearchText] = useState("");
  const [searchAction, setSearchAction] = useState("");
  const [searchState, setSearchState] = useState("");
  const [searchDate, setSearchDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const dataQuery = useInfiniteQuery({
    queryKey: [
      "runners",
      {
        search: searchText,
        limit: limit,
        searchAction: searchAction,
        searchDate: searchDate,
        searchState: searchState,
      },
    ],
    queryFn: ({ pageParam = 1 }) => {
      const idRegex = "[a-zA-Z0-9]{5}";

      const filters = {
        ...(searchState &&
          searchState.trim() !== "" && { state_eq: searchState }),
        ...(searchAction &&
          searchAction.trim() !== "" && {
            runner_like: `${searchAction}-${idRegex}`,
          }),

        ...(searchDate &&
          searchDate.from &&
          searchDate.to == undefined && {
            timestamp_start: format(searchDate.from, "yyyy-MM-dd").toString(),
          }),
        ...(searchDate &&
          searchDate.from &&
          searchDate.to && {
            timestamp_gte: format(
              searchDate.from,
              "yyyy-MM-dd'T'HH:mm:ss"
            ).toString(),
          }),
        ...(searchDate &&
          searchDate.from &&
          searchDate.to && {
            timestamp_lte: format(
              searchDate.to,
              "yyyy-MM-dd'T'23:59:59"
            ).toString(),
          }),
        ...(id && id.trim() != "" && { SAS_eq: id }),
        ...(runnerId && runnerId.trim() != "" && { runner_eq: runnerId }),
      };

      return RunnerModel.getJobs(
        searchText,
        limit,
        pageParam,
        "timestamp",
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

  let allData: IJobs[] = [];
  dataQuery.data?.pages.forEach((page) => {
    if (Array.isArray(page)) {
      allData = allData.concat(page);
    } else {
      console.error("Unexpected response format:", page);
    }
  });

  const actionsVals: ISelectItem[] = [
    { value: "csas-dev-csas-linux", content: "Building" },
    { value: "csas-dev-csas-linux-test", content: "Testing" },
    { value: "csas-ops-csas-linux", content: "Deploying to dev" },
    { value: "csas-ops-csas-linux-prod", content: "Deploying to prod" },
  ];

  const statesVals: ISelectItem[] = [
    { value: "success", content: <StateItem title="Success" color="green" /> },
    { value: "queued", content: <StateItem title="Queued" color="gray" /> }, // prettier-ignore
    { value: "in_progress", content: <StateItem title="In Progress" color="yellow" /> }, // prettier-ignore
    { value: "failed", content: <StateItem title="Failed" color="red" /> },
  ];

  return (
    <>
      {isNav && (
        <div className="flex justify-between gap-4 mb-4">
          <SearchBar
            searchText={searchText ?? ""}
            setSearchText={setSearchText}
          />

          <div className="flex flex-1 gap-2">
            <DateRangePicker
              dateRange={searchDate}
              setSearchDate={setSearchDate}
            />

            <SelectInput
              placeholder="All actions"
              items={actionsVals}
              onValueChange={(e) => setSearchAction(e)}
            />
            <SelectInput
              placeholder="All States"
              items={statesVals}
              onValueChange={(e) => setSearchState(e)}
            />
          </div>
        </div>
      )}

      {dataQuery.isLoading && <Throbber />}

      {!dataQuery.isLoading && (
        <JobsTable jobs={allData} searchText={searchText} />
      )}

      {isNav &&
        dataQuery.data &&
        (dataQuery.data?.pages[dataQuery.data.pageParams.length - 1] as IJobs[])
          .length >= limit && (
          <div className="w-full mt-4">
            <Button
              variant="outline"
              onClick={() => dataQuery.fetchNextPage()}
              className="w-full"
              disabled={!dataQuery.hasNextPage || dataQuery.isFetchingNextPage}
            >
              {dataQuery.isFetchingNextPage
                ? "Loading more..."
                : dataQuery.hasNextPage
                ? "Load More"
                : "Nothing more to load"}
            </Button>
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

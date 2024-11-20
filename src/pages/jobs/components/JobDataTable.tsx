import { useInfiniteQuery } from "@tanstack/react-query";
import JobsTable from "./JobsTable";
import { Button } from "@/components/ui/Button";
import { RunnerModel } from "@/pages/runners/api/RunnerModel";
import { IJobs } from "@/pages/jobs/types/IJobs";
import { CircleIcon } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchBar from "@/components/ui/table/SearchBar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api_auth, api_url } from "@/lib/utils/env_vars";
import SelectInput, { ISelectItem } from "@/components/SelectInput";

export default function JobsDataTable({
  limit = -1,
  isNav = true,
}: {
  limit: number | undefined;
  isNav: boolean;
}) {
  limit = 5; //TODO: change limit

  // const fetchJobs = async (
  //   page?: number,
  //   search?: string,
  //   limit?: number,
  //   sort?: string,
  //   order?: "asc" | "desc",
  //   filters?: Record<string, string>
  // ): Promise<IJobs[] | IErrorMessage> => {
  //   const params = new URLSearchParams({
  //     search: search ?? "",
  //     limit: limit?.toString() ? limit!.toString() : "-1",
  //     page: page?.toString() ?? "1",
  //     sort: sort ?? "",
  //     order: order ?? "asc",
  //   });
  //   console.log("par", page);

  //   // if (filters) {
  //   //   Object.entries(filters).forEach(([key, value]) => {
  //   //     params.append(key, value);
  //   //   });
  //   // }

  //   console.log(`${api_url}/jobs?${params}`);
  //   //https://hackaton-api.fly.dev/api/v1/jobs?search=&limit=5&page=2&sort=&order=asc

  //   const response = await fetch(`${api_url}/jobs?${params}`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Basic ${api_auth}`,
  //     },
  //   });

  //   return response.json();
  // };

  const [searchText, setSearchText] = useState("");
  const [searchAction, setSearchAction] = useState("");
  const [searchState, setSearchState] = useState("");
  const [searchDate, setSearchDate] = useState<Date>();

  // const {
  //   data,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   status,
  // } = useInfiniteQuery({
  //   queryKey: [
  //     "runners",
  //     {
  //       search: searchText,
  //       limit: limit,
  //       searchAction: searchAction,
  //       searchDate: searchDate,
  //       searchState: searchState,
  //     },
  //   ],
  //   //queryFn: ({ pageParam }) => fetchJobs({ pageParam, limit }),
  //   queryFn: ({ pageParam }) =>
  //     fetchJobs(pageParam, searchText, limit, searchAction),
  //   initialPageParam: 1,
  //   getNextPageParam: (lastPage, allPages, lastPageParam) => {
  //     if (lastPage.length === 0) {
  //       //it stops so idk
  //       return undefined;
  //     }
  //     return lastPageParam + 1;
  //   },
  //   getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
  //     if (firstPageParam <= 1) {
  //       return undefined;
  //     }
  //     return firstPageParam - 1;
  //   },
  // });
  // if (status === "pending") return <p>Loading...</p>;
  // if (status === "error") return <p>Error: {error.message}</p>;
  // let allData: IJobs[] = [];
  // data?.pages.forEach((page) => {
  //   allData = allData.concat(page);
  // });

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
      const filters = {
        ...(searchState &&
          searchState.trim() !== "" && { state_eq: searchState }),
        ...(searchDate && {
          timestamp_start: format(searchDate, "yyyy-MM-dd").toString(),
        }),
        ...(searchAction &&
          searchAction.trim() !== "" && { runner_start: searchAction }),
        ...(searchText && searchText.trim() !== "" && { id_start: searchText }),
      };

      return RunnerModel.getJobs(
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

  let allData: IJobs[] = [];
  dataQuery.data?.pages.forEach((page) => {
    if (Array.isArray(page)) {
      allData = allData.concat(page);
    } else {
      console.error("Unexpected response format:", page);
    }
  });

  const actionsVals: ISelectItem[] = [
    { value: "none", content: "Waiting for runner" },
    { value: "csas-dev-csas-linux", content: "Building" },
    { value: "csas-dev-csas-linux-test", content: "Testing" },
    { value: "csas-ops-csas-linux", content: "Deploying to dev" },
    { value: "csas-ops-csas-linux-test", content: "Deploying to prod" },
  ];
  const statesVals: ISelectItem[] = [
    { value: "success", content: <StateItem title="Success" color="green" /> },
    { value: "queued", content: <StateItem title="Queued" color="gray" /> }, // prettier-ignore
    { value: "in_progress", content: <StateItem title="In Progress" color="yellow" /> }, // prettier-ignore
    { value: "failed", content: <StateItem title="Failed" color="red" /> },
  ];

  return (
    <>
      <div className="flex justify-between gap-4 mb-4">
        <SearchBar
          searchText={searchText ?? ""}
          setSearchText={setSearchText}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !searchDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {searchDate ? (
                format(searchDate, "yyyy-MM-dd")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={searchDate}
              onSelect={setSearchDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
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
      <JobsTable jobs={allData} />
      {isNav && (
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

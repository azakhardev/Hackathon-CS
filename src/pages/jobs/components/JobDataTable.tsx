import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import JobsTable from "./JobsTable";
import { Button } from "@/components/ui/Button";
import { RunnerModel } from "@/pages/runners/api/RunnerModel";
import { IJobs } from "@/pages/jobs/types/IJobs";
import { useSearchParams } from "react-router-dom";
import { CircleIcon } from "lucide-react";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import ErrorMessage from "@/components/ui/ErrorMessage";
import H1 from "@/components/ui/typography/H1";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchBar from "@/components/ui/table/SearchBar";
import ButtonLoadMore from "@/components/ui/table/Button_LoadMore";
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

export default function JobsDataTable({
  limit = -1,
  isNav = true,
}: {
  limit: number | undefined;
  isNav: boolean;
}) {
  const fetchJobs = async ({ pageParam }: { pageParam: number }) => {
    const limit = 5;
    const res = await fetch(
      `${api_url}/jobs?limit=${limit}&page=${pageParam}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${api_auth}`,
        },
      }
    );
    return res.json();
  };

  const [searchText, setSearchText] = useState("");
  const [searchAction, setSearchAction] = useState("");
  const [searchState, setSearchState] = useState("");
  const [searchDate, setSearchDate] = useState<Date>();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
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
    queryFn: fetchJobs,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      console.log("lastPage", lastPage.length);
      return lastPageParam + 1;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error: {error.message}</p>;
  let allData: IJobs[] = [];
  data?.pages.forEach((page) => {
    allData = allData.concat(page);
  });

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

        <Select onValueChange={(e) => setSearchAction(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Actions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All Actions</SelectItem>
            <SelectItem value="none">Waiting for runner</SelectItem>
            <SelectItem value="runner-csas-dev-csas-linux">Building</SelectItem>
            <SelectItem value="runner-csas-dev-csas-linux-test">
              Testing
            </SelectItem>
            <SelectItem value="runner-csas-ops-csas-linux">
              Deploying to dev
            </SelectItem>
            <SelectItem value="runner-csas-ops-csas-linux-test">
              Deploying to prod
            </SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(e) => setSearchState(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All States" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All States</SelectItem>
            <SelectItem value="success">
              <StateItem title="Success" color="green" />
            </SelectItem>
            <SelectItem value="queued">
              <StateItem title="Queued" color="gray" />
            </SelectItem>
            <SelectItem value="in_progress">
              <StateItem title="In Progress" color="yellow" />
            </SelectItem>
            <SelectItem value="failed">
              <StateItem title="Failed" color="red" />
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <JobsTable jobs={allData} />
      {isNav && (
        <div className="w-full mt-4">
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            className="w-full"
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
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

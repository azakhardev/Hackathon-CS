import { useQuery } from "@tanstack/react-query";
import JobsTable from "./components/JobsTable";
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

export default function JobsPage() {
  //const [searchParams] = useSearchParams();
  //const sas = searchParams.get("sas") ?? "";

  const [searchText, setSearchText] = useState("");
  const [searchAction, setSearchAction] = useState("");
  const [searchState, setSearchState] = useState("");
  const [searchDate, setSearchDate] = useState<Date>();
  const [limit, setLimit] = useState(25);

  console.log(searchText);

  const jobsQuery = useQuery({
    queryKey: [
      "jobs",
      searchText,
      limit,
      searchState,
      searchAction,
      searchDate,
    ],
    queryFn: async () => {
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

      return await RunnerModel.getJobs(
        undefined,
        undefined,
        undefined,
        undefined,
        "asc",
        filters
      );
    },
  });

  if (jobsQuery.data && "error" in jobsQuery.data) {
    return <ErrorMessage errorMessage={jobsQuery.data as IErrorMessage} />;
  }

  if (!jobsQuery.data && !jobsQuery.isLoading) {
    const error: IErrorMessage = {
      code: "500",
      error: "Internal server error",
      message: "Server responded with undefined",
    };
    return <ErrorMessage errorMessage={error}></ErrorMessage>;
  }
  let jobs: IJobs[] = [];

  if (!jobsQuery.isLoading) {
    if (jobsQuery.data) {
      jobs = jobsQuery.data;
    }
  }

  return (
    <>
      <H1>Jobs</H1>
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
      {jobsQuery.isLoading && (
        <div className="loader-wrap">
          <div className="loading-spinner"></div>
        </div>
      )}
      {!jobsQuery.isLoading && <JobsTable jobs={jobsQuery.data as IJobs[]} />}
      {/*<div className="mt-4">
        <ButtonLoadMore
          show={jobs.length >= limit}
          onClick={() => setLimit(limit + 25)}
        />
      </div>*/}
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

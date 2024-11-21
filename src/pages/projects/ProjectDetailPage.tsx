import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import JobsTable from "../../components/features/jobs/JobsTable";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/Button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import format from "date-fns/format";
import SearchBar from "@/components/ui/table/SearchBar";
import { Calendar } from "@/components/ui/calendar";
import { CircleIcon } from "lucide-react";
import { RunnerModel } from "@/lib/models/RunnerModel";
import Throbber from "@/components/ui/Throbber";

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id;

  const [searchText, setSearchText] = useState("");
  const [searchDate, setSearchDate] = useState<Date>();
  const [searchState, setSearchState] = useState("");
  const [searchAction, setSearchAction] = useState("");

  console.log(searchState);

  const jobsQuery = useQuery({
    queryKey: [
      "jobsSAS",
      id,
      searchText,
      searchDate,
      searchState,
      searchAction,
    ],
    queryFn: async () => {
      const idRegex = "[a-zA-Z0-9]{5}";

      const filters = {
        ...(id && { SAS_eq: id }),
        ...(searchDate && {
          timestamp_start: format(searchDate, "yyyy-MM-dd").toString(),
        }),
        ...(searchState &&
          searchState.trim() != "" && { state_eq: searchState }),
        ...(searchAction &&
          searchAction.trim() != "" && {
            runner_like:
              searchAction != "none"
                ? `${searchAction}-${idRegex}`
                : searchAction,
          }),
      };

      return RunnerModel.getJobs(
        searchText,
        undefined,
        undefined,
        undefined,
        undefined,
        filters
      );
    },
  });

  if (jobsQuery.data && "error" in jobsQuery.data)
    return <ErrorMessage errorMessage={jobsQuery.data as IErrorMessage} />;

  return (
    <main>
      <div>
        <div className="h-[10dvh] border-b-2 flex items-center mb-4">
          <h2 className="text-[24px] ml-10 font-bold">{`Project > ${
            id?.split("_")[1]
          }
          `}</h2>
        </div>
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
              <SelectItem value="runner-csas-dev-csas-linux">
                Building
              </SelectItem>
              <SelectItem value="runner-csas-dev-csas-linux-test">
                Testing
              </SelectItem>
              <SelectItem value="runner-csas-ops-csas-linux">
                Deploying to dev
              </SelectItem>
              <SelectItem value="runner-csas-ops-csas-linux-prod">
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
        {jobsQuery.isLoading ? (
          <Throbber />
        ) : (
          <JobsTable
            jobs={jobsQuery.data}
            searchText={searchText.trim() != "" ? searchText : undefined}
          />
        )}
      </div>
    </main>
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

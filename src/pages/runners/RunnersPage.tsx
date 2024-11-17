import { useQuery } from "@tanstack/react-query";
import { RunnerModel } from "@/lib/Models/RunnerModel";
import RunnersTable from "@/pages/runners/components/RunnersTable";
import { IRunner } from "@/lib/types/IRunner";
import { useSearchParams } from "react-router-dom";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/Button";

import H1 from "@/components/H1";
export default function RunnersPage() {
  const [searchText, setSearchText] = useState("");
  const [searchGroup, setSearchGroup] = useState(" ");
  const [searchOrganization, setSearchOrganization] = useState(" ");
  const [searchState, setSearchState] = useState(" ");
  const [limit, setLimit] = useState(5);

  const runnersQuery = useQuery({
    queryKey: ["runners", searchText],
    queryFn: async () => await RunnerModel.getRunners(searchText),
  });

  if (runnersQuery.data && "error" in runnersQuery.data) {
    const errorData = runnersQuery.data as IErrorMessage;
    return <ErrorMessage errorMessage={errorData} />;
  }

  let filteredRunners: IRunner[] = [];
  if (!runnersQuery.isLoading) {
    filteredRunners = (runnersQuery.data as IRunner[]).filter(
      (runner: IRunner) => {
        let matchesState = true;
        let matchesGroup = true;
        let matchesOrganization = true;

        if (searchGroup != " ") {
          matchesGroup = runner.runner_group === searchGroup;
        }

        if (searchOrganization != " ") {
          matchesOrganization = runner.organization === searchOrganization;
        }

        if (searchState != " ") {
          matchesOrganization = runner.state === searchState;
        }

        return matchesGroup && matchesOrganization && matchesState;
      }
    );
  }

  let showRunners = filteredRunners.slice(0, limit);

  console.log(searchGroup);

  return (
    <>
      <H1>Runners</H1>
      <div className="flex gap-4 m-4 justify-between">
        <div className="relative w-1/2">
          <Input
            className="pl-9"
            onChange={(e) => setSearchText(e.target.value)}
          ></Input>
          <div className="absolute top-[9.5px] left-2 flex">
            <Search size={20}></Search>
            <p className={searchText == "" ? "text-sm ml-2" : "hidden"}>Find</p>
          </div>
        </div>
        <Select onValueChange={(e) => setSearchGroup(e)}>
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
        <Select onValueChange={(e) => setSearchOrganization(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Organizations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All Organizations</SelectItem>
            <SelectItem value="csas-dev">csas-dev</SelectItem>
            <SelectItem value="csas-ops">csas-ops</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(e) => setSearchState(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All States" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All States</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
            <SelectItem value="idle">Idle</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {runnersQuery.isLoading && (
        <div className="loader-wrap">
          <div className="loading-spinner"></div>
        </div>
      )}
      {!runnersQuery.isLoading && <RunnersTable runners={showRunners} />}
      <div className="m-4">
        <Button
          className={filteredRunners.length >= limit ? "w-full" : "hidden"}
          variant="outline"
          onClick={() => setLimit(limit + 25)}
        >
          Load more
        </Button>
      </div>
    </>
  );
}

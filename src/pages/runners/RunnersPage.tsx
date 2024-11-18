import { useQuery } from "@tanstack/react-query";
import { RunnerModel } from "@/pages/runners/api/RunnerModel";
import RunnersTable from "@/pages/runners/components/RunnersTable";
import { IRunner } from "@/pages/runners/types/IRunner";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import H1 from "@/components/ui/typography/H1";
import SearchBar from "@/components/ui/table/SearchBar";
import ButtonLoadMore from "@/components/ui/table/Button_LoadMore";
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
      <div className="flex justify-between gap-4 mb-4">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
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
      <div className="mt-4">
        <ButtonLoadMore
          show={filteredRunners.length >= limit}
          onClick={() => setLimit(limit + 25)}
        />
      </div>
    </>
  );
}

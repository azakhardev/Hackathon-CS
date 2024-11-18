import { useQuery } from "@tanstack/react-query";
import { RunnerModel } from "@/pages/runners/api/RunnerModel";
import RunnersTable from "@/pages/runners/components/RunnersTable";
import { IRunner } from "@/pages/runners/types/IRunner";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useEffect, useState } from "react";
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
import { CircleIcon } from "lucide-react";
export default function RunnersPage() {
  const [searchText, setSearchText] = useState("");
  const [searchGroup, setSearchGroup] = useState(" ");
  const [searchOrganization, setSearchOrganization] = useState(" ");
  const [searchState, setSearchState] = useState(" ");
  const [limit, setLimit] = useState(25);
  const [isFiltered, setIsFiltered] = useState(false);

  function activeFilter() {
    console.log("text:", searchText.trim() !== "");
    console.log("grp:", searchGroup.trim() !== "");
    console.log("org:", searchOrganization.trim() !== "");
    console.log("state:", searchState.trim() !== "");
    if (
      searchText.trim() !== "" ||
      searchGroup.trim() !== "" ||
      searchOrganization.trim() !== "" ||
      searchState.trim() !== ""
    ) {
      if (isFiltered == false) setIsFiltered(true);
      return;
    }
    if (isFiltered === true) {
      setIsFiltered(false);
    }
  }

  activeFilter();
  console.log(isFiltered);

  const runnersQuery = useQuery({
    queryKey: ["runners", searchText, limit, isFiltered],
    queryFn: async () =>
      await RunnerModel.getRunners(searchText, isFiltered ? -1 : limit),
  });

  if (runnersQuery.data && "error" in runnersQuery.data) {
    const errorData = runnersQuery.data as IErrorMessage;
    return <ErrorMessage errorMessage={errorData} />;
  }

  if (!runnersQuery.data && !runnersQuery.isLoading) {
    const error: IErrorMessage = {
      code: "500",
      error: "Internal server error",
      message: "Server responded with undefined",
    };
    return <ErrorMessage errorMessage={error}></ErrorMessage>;
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

  console.log(filteredRunners.length);

  return (
    <>
      <H1>Runners</H1>
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
            activeFilter();
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
        <Select
          onValueChange={(e) => {
            setSearchState(e);
            activeFilter();
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All States" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All States</SelectItem>
            <SelectItem value="active">
              <StateItem title="Active" color="green" />
            </SelectItem>
            <SelectItem value="offline">
              <StateItem title="Offline" color="gray" />
            </SelectItem>
            <SelectItem value="idle">
              <StateItem title="Idle" color="yellow" />
            </SelectItem>
            <SelectItem value="failed">
              <StateItem title="Failed" color="red" />
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {runnersQuery.isLoading && (
        <div className="loader-wrap">
          <div className="loading-spinner"></div>
        </div>
      )}
      {!runnersQuery.isLoading && <RunnersTable runners={filteredRunners} />}
      <div className="mt-4">
        <ButtonLoadMore show={true} onClick={() => setLimit(limit + 25)} />
      </div>
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

// const tailwindFillClassMap = {
//   [StateType.Gray]: "fill-state_gray",
//   [StateType.Orange]: "fill-state_yellow",
//   [StateType.Green]: "fill-state_green",
//   [StateType.Red]: "fill-state_red",
// };

import { useInfiniteQuery } from "@tanstack/react-query";
import RunnersTable from "@/pages/runners/components/RunnersTable";
// import { IRunner } from "@/pages/runners/types/IRunner";
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
import { api_auth, api_url } from "@/lib/utils/env_vars";
import { IRunner } from "../types/IRunner";
import { Button } from "@/components/ui/Button";

export default function RunnersPage({
  limit2 = -1,
  isNav = true,
}: {
  limit2: number | undefined;
  isNav: boolean;
}) {
  const fetchRunners = async ({ pageParam }: { pageParam: number }) => {
    const limit = 5;
    const res = await fetch(
      `${api_url}/runners?limit=${limit}&page=${pageParam}`,
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
  const [searchGroup, setSearchGroup] = useState(" ");
  const [searchOrganization, setSearchOrganization] = useState(" ");
  const [searchState, setSearchState] = useState(" ");
  const [limit, setLimit] = useState(limit2);

  // async () => {
  //   const filters = {
  //     ...(searchGroup &&
  //       searchGroup.trim() !== "" && { id_like: searchGroup }),
  //     ...(searchOrganization &&
  //       searchOrganization.trim() !== "" && {
  //         organization_eq: searchOrganization,
  //       }),
  //     ...(searchState &&
  //       searchState.trim() !== "" && { state_eq: searchState }),
  //   };

  //   return await RunnerModel.getRunners(
  //     searchText,
  //     limit,
  //     undefined,
  //     "group",
  //     "asc",
  //     filters
  //   );
  // },

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
        searchGroup: searchGroup,
        searchOrganization: searchOrganization,
        searchState: searchState,
      },
    ],
    queryFn: fetchRunners,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      // if (lastPage.length === 0) {
      //   return undefined;
      // }
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
  let allData: IRunner[] = [];
  data?.pages.forEach((page) => {
    allData = allData.concat(page);
  });

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
          <Select
            onValueChange={(e) => {
              setSearchState(e);
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
      )}
      <RunnersTable runners={allData} />
      {/* TODO: use global component */}
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

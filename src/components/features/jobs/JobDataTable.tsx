import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import JobsTable from "./JobsTable";
import { Button } from "@/components/ui/Button";
import { IJobs } from "@/lib/types/IJobs";
import { useState } from "react";
import SearchBar from "@/components/ui/table/SearchBar";
import { format } from "date-fns";
import SelectInput, { ISelectItem } from "@/components/SelectInput";
import { RunnerModel } from "@/lib/models/RunnerModel";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { DateRange } from "react-day-picker";
import DateRangePicker from "@/components/ui/table/DateRangePicker";
import { ButtonSort } from "@/components/ButtonSort";
import TableFilterNav from "@/components/ui/table/table_filter_nav";
import {
  actionsVals,
  states2Vals,
} from "@/components/ui/table/Select_items_list";

import { useSearchParams } from "react-router-dom";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { useTranslation } from "react-i18next";
import CustomPieChart from "../charts/CustomPieChart";
import { PieStats } from "@/pages/metrics/components/MetricsShared";
import {
  Chart_Gray,
  Chart_Green,
  Chart_Orange,
  Chart_Red,
} from "@/pages/metrics/components/ChartColors";
import LoadingSkeletonMetrics from "@/components/ui/LoadingSkeletonMetrics";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table/table";
import { PieChartIcon } from "lucide-react";

export default function JobsDataTable({
  limit = 25,
  isNav = true,
  id,
  runnerId,
  graph = false,
}: {
  limit: number | undefined;
  isNav: boolean;
  id?: string;
  runnerId?: string;
  graph?: boolean;
}) {
  const [searchParams] = useSearchParams();

  const [searchText, setSearchText] = useState(searchParams.get("text") || "");
  const [searchAction, setSearchAction] = useState(
    searchParams.get("action") || ""
  );
  const [searchState, setSearchState] = useState(
    searchParams.get("state") || ""
  );
  const [sort, setSort] = useState({
    column: searchParams.get("sort") || "",
    direction: searchParams.get("order") || "asc",
  });
  const [searchDate, setSearchDate] = useState<DateRange | undefined>({
    from: searchParams.get("from")
      ? new Date(searchParams.get("from"))
      : undefined,
    to: searchParams.get("to") ? new Date(searchParams.get("to")) : undefined,
  });

  const jobsQuery = useQuery({
    queryKey: [
      "jobs",
      {
        searchAction: searchAction,
        searchDate: searchDate,
      },
    ],
    queryFn: async () => {
      const idRegex = "[a-zA-Z0-9]{5}";

      const filters = {
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
        undefined,
        9999999,
        undefined,
        undefined,
        undefined,
        filters
      );
    },
  });

  const dataQuery = useInfiniteQuery({
    queryKey: [
      "infinityJobs",
      {
        search: searchText,
        limit: limit,
        searchAction: searchAction,
        searchDate: searchDate,
        searchState: searchState,
        sort: sort,
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
        sort.column,
        sort.direction,
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

  const { t } = useTranslation();

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

  const cols: ISelectItem[] = [
    { value: "id", content: "Id" },
    { value: "timestamp", content: t("translation:filters:date_sort") },
  ];

  const JOBS_CHART_CONFIG = {
    count: { label: "Count" },
    success: { label: "Successful" },
    in_progress: { label: "In Progress" },
    failed: { label: "Failed" },
    queued: { label: "Queued" },
  };

  if (jobsQuery.data && "error" in jobsQuery.data)
    return <ErrorMessage errorMessage={jobsQuery.data as IErrorMessage} />;

  if (jobsQuery.error) {
    const error: IErrorMessage = {
      code: "500",
      error: "Internal server error",
      message: "Server responded with undefined",
    };
    return <ErrorMessage errorMessage={error}></ErrorMessage>;
  }

  let jStateData = createJobsData([]);
  if (!jobsQuery.isLoading) {
    jStateData = createJobsData(jobsQuery.data as IJobs[]);
  }

  return (
    <>
      {isNav && (
        <div>
          <TableFilterNav
            left={
              <SearchBar
                searchText={searchText ?? ""}
                setSearchText={setSearchText}
              />
            }
            right={
              <>
                <DateRangePicker
                  dateRange={searchDate}
                  setSearchDate={setSearchDate}
                />
                <SelectInput
                  placeholder={t("translation:filters:action_placeholder")}
                  defaultValue={searchAction}
                  items={actionsVals(t)}
                  onValueChange={(e) => setSearchAction(e)}
                  param="action"
                />
                <SelectInput
                  placeholder={t("translation:filters:state_placeholder")}
                  defaultValue={searchState}
                  items={states2Vals(t)}
                  onValueChange={(e) => setSearchState(e)}
                  param="state"
                />
                <ButtonSort sort={sort} setSort={setSort} items={cols} />{" "}
              </>
            }
          />
        </div>
      )}
      {jobsQuery.isLoading ? (
        <LoadingSkeletonMetrics />
      ) : graph ? (
        <div className="mb-5">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Accordion type="single" collapsible>
                    <AccordionItem
                      key="xxx"
                      value="xxx"
                      className="border-none"
                    >
                      <AccordionTrigger>
                        <div
                          className={`flex gap-1 items-center justify-start`}
                        >
                          <PieChartIcon size={24} />
                          <div>{/* <H2></H2> */}</div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-[20px] pb-[40px] text-[20px] xl:px-[200px]">
                          <CustomPieChart
                            chartConfig={JOBS_CHART_CONFIG}
                            chartData={jStateData}
                            innerRadius={0}
                            label={true}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ) : (
        <></>
      )}

      {dataQuery.isLoading && <LoadingSkeleton />}

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
                ? t("translation:common:more_btn_loading")
                : dataQuery.hasNextPage
                ? t("translation:common:more_btn_text")
                : t("translation:common:more_btn_error")}
            </Button>
          </div>
        )}
    </>
  );
}

function createJobsData(data: IJobs[]) {
  const newData: object[] = [];
  const successJ = new PieStats("success", Chart_Green);
  const progressionJ = new PieStats("in_progress", Chart_Orange);
  const failedJ = new PieStats("failed", Chart_Red);
  const queuedJ = new PieStats("queued", Chart_Gray);

  data.forEach((j) => {
    if (j.state.toLowerCase() === "success") {
      successJ.count++;
    } else if (j.state.toLowerCase() === "failed") {
      failedJ.count++;
    } else if (j.state.toLowerCase() === "in_progress") {
      progressionJ.count++;
    } else {
      queuedJ.count++;
    }
  });

  newData.push(successJ, progressionJ, failedJ, queuedJ);
  return newData;
}

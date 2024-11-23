import H1 from "@/components/ui/typography/H1";
import { useQuery } from "@tanstack/react-query";
import { AutomationModel } from "../../lib/models/AutomationModel";
import { useState } from "react";
import { format } from "date-fns";
import MetricsPageCharts from "../../components/features/metrics/MetricsPageCharts";
import { IJobs } from "../../lib/types/IJobs";
import { IRunner } from "../../lib/types/IRunner";
import { RunnerModel } from "@/lib/models/RunnerModel";
import { IAutomation } from "@/lib/types/IAutomation";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Throbber from "@/components/ui/Throbber";
import H2 from "@/components/ui/typography/H2";
import RunnersDataTable from "@/components/features/runners/RunnersDataTable";
import { MoreBtn } from "../home/HomePage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRange } from "react-day-picker";
import DateRangePicker from "@/components/ui/table/DateRangePicker";
import SelectInput, { ISelectItem } from "@/components/SelectInput";
import JobsChart from "./components/JobsChart";
import RunnersCharts from "./components/RunnersCharts";
import AutomationsChart from "./components/AutomationCharts";
import ProjectsCharts from "./components/ProjectsCharts";

export default function MetricsPage() {
  // const [searchDate, setSearchDate] = useState<DateRange | undefined>({
  //   from: undefined,
  //   to: undefined,
  // });
  // const [searchOrg, setSearchOrg] = useState(" ");

  // const automationsQuery = useQuery({
  //   queryKey: ["automations", searchDate],
  //   queryFn: async () => {
  //     const automationFilters = {
  //       ...(searchDate &&
  //         searchDate.from &&
  //         searchDate.to == undefined && {
  //           last_activity_start: format(
  //             searchDate.from,
  //             "yyyy-MM-dd"
  //           ).toString(),
  //         }),
  //       ...(searchDate &&
  //         searchDate.from &&
  //         searchDate.to && {
  //           last_activity_gte: format(
  //             searchDate.from,
  //             "yyyy-MM-dd'T'HH:mm:ss"
  //           ).toString(),
  //         }),
  //       ...(searchDate &&
  //         searchDate.from &&
  //         searchDate.to && {
  //           last_activity_lte: format(
  //             searchDate.to,
  //             "yyyy-MM-dd'T'23:59:59"
  //           ).toString(),
  //         }),
  //     };

  //     return await AutomationModel.getAutomations(
  //       undefined,
  //       undefined,
  //       undefined,
  //       undefined,
  //       "asc",
  //       automationFilters
  //     );
  //   },
  // });

  // const jobsQuery = useQuery({
  //   queryKey: ["jobs", searchDate, searchOrg],
  //   queryFn: async () => {
  //     const filters = {
  //       ...(searchDate &&
  //         searchDate.from &&
  //         searchDate.to == undefined && {
  //           timestamp_start: format(searchDate.from, "yyyy-MM-dd").toString(),
  //         }),
  //       ...(searchDate &&
  //         searchDate.from &&
  //         searchDate.to && {
  //           timestamp_gte: format(
  //             searchDate.from,
  //             "yyyy-MM-dd'T'HH:mm:ss"
  //           ).toString(),
  //         }),
  //       ...(searchDate &&
  //         searchDate.from &&
  //         searchDate.to && {
  //           timestamp_lte: format(
  //             searchDate.to,
  //             "yyyy-MM-dd'T'23:59:59"
  //           ).toString(),
  //         }),
  //       ...(searchOrg !== " " && { organization_eq: searchOrg }),
  //     };
  //     return await RunnerModel.getJobs(
  //       undefined,
  //       undefined,
  //       undefined,
  //       undefined,
  //       "asc",
  //       filters
  //     );
  //   },
  // });

  // const runnersQuery = useQuery({
  //   queryKey: ["runners", searchDate, searchOrg],
  //   queryFn: async () => {
  //     return await RunnerModel.getRunners(
  //       undefined,
  //       undefined,
  //       undefined,
  //       undefined,
  //       "asc",
  //       { ...(searchOrg !== " " && { organization_eq: searchOrg }) }
  //     );
  //   },
  // });

  // if (automationsQuery.data && "error" in automationsQuery.data)
  //   return (
  //     <ErrorMessage errorMessage={automationsQuery.data as IErrorMessage} />
  //   );

  // if (jobsQuery.data && "error" in jobsQuery.data)
  //   return <ErrorMessage errorMessage={jobsQuery.data as IErrorMessage} />;

  // if (runnersQuery.data && "error" in runnersQuery.data)
  //   return <ErrorMessage errorMessage={runnersQuery.data as IErrorMessage} />;

  // if (automationsQuery.error || jobsQuery.error || runnersQuery.error) {
  //   const error: IErrorMessage = {
  //     code: "500",
  //     error: "Internal server error",
  //     message: "Server responded with undefined",
  //   };
  //   return <ErrorMessage errorMessage={error}></ErrorMessage>;
  // }

  let items: ISelectItem[] = [
    { value: " ", content: "All" },
    { value: "csas-dev", content: "Dev" },
    { value: "csas-ops", content: "Ops" },
  ];

  return (
    <>
      <H1>Metrics</H1>
      <div className="flex flex-col gap-8">
        <H2>Total</H2>
        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row gap-2 justify-between">
              <ProjectsCharts />
              <AutomationsChart />
            </div>
            <div className="flex flex-col md:flex-row gap-2 justify-between ">
              <JobsChart />
              <RunnersCharts />
            </div>
          </div>
        </div>
        <div>
          <H2>Runners</H2>
          <RunnersDataTable limit2={3} isNav={false} />
          <MoreBtn to="/runners" />
        </div>
      </div>
    </>
  );
}

/* <DateRangePicker
                dateRange={searchDate}
                setSearchDate={setSearchDate}
              />
              <SelectInput
                defaultValue="All"
                items={items}
                onValueChange={(e) => setSearchOrg(e)}
              />
            </div>
            {(jobsQuery.isLoading ||
              automationsQuery.isLoading ||
              runnersQuery.isLoading) && <Throbber />}
            {!jobsQuery.isLoading &&
              !automationsQuery.isLoading &&
              !runnersQuery.isLoading && ( */

/* <MetricsPageCharts
                    automationsData={automationsQuery.data as IAutomation[]}
                    runnersData={runnersQuery.data as IRunner[]}
                    jobsData={jobsQuery.data as IJobs[]}
                  />
               )} */

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { RunnerModel } from "@/lib/models/RunnerModel";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { ChartCard2 } from "@/components/features/charts/ChartCard";
import { CheckIcon } from "lucide-react";
import { IJobs } from "@/lib/types/IJobs";
import DateRangePicker from "@/components/ui/table/DateRangePicker";
import CustomPieChart from "@/components/features/charts/CustomPieChart";
import { MetricItems, PieStats } from "./MetricsShared";
import Throbber from "@/components/ui/Throbber";
import SelectInput from "@/components/SelectInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ChartSelectInput from "@/components/ChartSelectInput";
import LoadingSkeletonTypes from "@/components/ui/LoadingSkeletonTypes";
import LoadingSkeletonMetrics from "@/components/ui/LoadingSkeletonMetrics";
import {
  Chart_Gray,
  Chart_Green,
  Chart_Orange,
  Chart_Red,
} from "./ChartColors";

const JOBS_CHART_CONFIG = {
  count: { label: "Count" },
  success: { label: "Successful" },
  in_progress: { label: "In Progress" },
  failed: { label: "Failed" },
  queued: { label: "Queued" },
};

export default function JobsChart() {
  const [searchDate, setSearchDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [searchOrg, setSearchOrg] = useState(" ");

  const jobsQuery = useQuery({
    queryKey: ["jobs", searchDate, searchOrg],
    queryFn: async () => {
      const filters = {
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
        ...(searchOrg !== " " && { organization_eq: searchOrg }),
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

  if (jobsQuery.isLoading) return <LoadingSkeletonMetrics />;

  const jobsData = jobsQuery.data as IJobs[];
  const jStateData = createJobsData(jobsData);
  return (
    <>
      {jobsQuery.isLoading && <LoadingSkeletonMetrics />}
      {!jobsQuery.isLoading && (
        <ChartCard2
          header="Jobs"
          description="Current state of jobs"
          icon={<CheckIcon />}
          content={
            <div>
              <div className="flex gap-4 max-w-fit">
                <div className="w-20">
                  <ChartSelectInput
                    onValueChange={(e) => setSearchOrg(e)}
                    defaultValue={searchOrg}
                  />
                </div>
                <DateRangePicker
                  dateRange={searchDate}
                  setSearchDate={setSearchDate}
                />
              </div>
              {jobsData.length > 0 ? (
                <CustomPieChart
                  chartConfig={JOBS_CHART_CONFIG}
                  chartData={jStateData}
                  innerRadius={0}
                  label={true}
                />
              ) : (
                <p>No data for selected options</p>
              )}
            </div>
          }
        />
      )}
    </>
  );
}

function createJobsData(data: IJobs[]) {
  let newData: object[] = [];
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

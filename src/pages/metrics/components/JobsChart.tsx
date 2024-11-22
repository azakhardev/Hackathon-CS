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
import SelectInput from "@/components/SelectInput";
import DateRangePicker from "@/components/ui/table/DateRangePicker";
import CustomPieChart from "@/components/features/charts/CustomPieChart";
import { MetricItems, PieStats } from "./MetricsShared";
import Throbber from "@/components/ui/Throbber";

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
  const jobsData = jobsQuery.data as IJobs[];
  const jStateData = createJobsData(jobsData);
  return (
    <>
      {jobsQuery.isLoading && <Throbber />}
      {!jobsQuery.isLoading && (
        <ChartCard2
          header="Jobs"
          description="Current state of jobs"
          icon={<CheckIcon />}
          content={
            jobsData.length > 0 ? (
              <div>
                <div className="flex gap-4 max-w-fit">
                  <div className="w-20">
                    <SelectInput
                      defaultValue=" "
                      items={MetricItems}
                      onValueChange={(e) => console.log(e)}
                    />
                  </div>
                  <DateRangePicker
                    dateRange={searchDate}
                    setSearchDate={setSearchDate}
                  />
                </div>
                <CustomPieChart
                  chartConfig={JOBS_CHART_CONFIG}
                  chartData={jStateData}
                  innerRadius={0}
                  label={true}
                />
              </div>
            ) : (
              <p>No data for this date range</p>
            )
          }
        />
      )}
    </>
  );
}

function createJobsData(data: IJobs[]) {
  let newData: object[] = [];
  const successJ = new PieStats("success", "hsl(131, 41%, 46%)");
  const progressionJ = new PieStats("in_progress", "hsl(28, 97%, 52%)");
  const failedJ = new PieStats("failed", "hsl(0, 91%, 49%)");
  const queuedJ = new PieStats("queued", "hsl(208, 0%, 34%)");

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

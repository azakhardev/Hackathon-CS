import ErrorMessage from "@/components/ui/ErrorMessage";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { MetricItems, PieStats } from "./MetricsShared";
import { AutomationModel } from "@/lib/models/AutomationModel";
import { IAutomation } from "@/lib/types/IAutomation";
import { format } from "date-fns";
import { ChartCard2 } from "@/components/features/charts/ChartCard";
import { Workflow } from "lucide-react";
import CustomPieChart from "@/components/features/charts/CustomPieChart";
import Throbber from "@/components/ui/Throbber";
import SelectInput from "@/components/SelectInput";
import DateRangePicker from "@/components/ui/table/DateRangePicker";
import LoadingSkeletonMetrics from "@/components/ui/LoadingSkeletonMetrics";
import { Chart_Green, Chart_Orange, Chart_OrangeOpacity } from "./ChartColors";

const AUTOMATIONS_STATE_CHART_CONFIG = {
  count: {
    label: "Count",
  },
  initial: {
    label: "Initial",
  },
  in_progress: {
    label: "In Progress",
  },
  finished: {
    label: "Finished",
  },
};

export default function AutomationsChart() {
  const [searchDate, setSearchDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [searchOrg, setSearchOrg] = useState(" ");

  const automationsQuery = useQuery({
    queryKey: ["automations", searchDate, searchOrg],
    queryFn: async () => {
      const automationFilters = {
        ...(searchDate &&
          searchDate.from &&
          searchDate.to == undefined && {
            last_activity_start: format(
              searchDate.from,
              "yyyy-MM-dd"
            ).toString(),
          }),
        ...(searchDate &&
          searchDate.from &&
          searchDate.to && {
            last_activity_gte: format(
              searchDate.from,
              "yyyy-MM-dd'T'HH:mm:ss"
            ).toString(),
          }),
        ...(searchDate &&
          searchDate.from &&
          searchDate.to && {
            last_activity_lte: format(
              searchDate.to,
              "yyyy-MM-dd'T'23:59:59"
            ).toString(),
          }),
        ...(searchOrg !== " " && { organization_eq: searchOrg }),
      };

      return await AutomationModel.getAutomations(
        undefined,
        undefined,
        undefined,
        undefined,
        "asc",
        automationFilters
      );
    },
  });

  if (automationsQuery.data && "error" in automationsQuery.data)
    return (
      <ErrorMessage errorMessage={automationsQuery.data as IErrorMessage} />
    );

  if (automationsQuery.error) {
    const error: IErrorMessage = {
      code: "500",
      error: "Internal server error",
      message: "Server responded with undefined",
    };
    return <ErrorMessage errorMessage={error}></ErrorMessage>;
  }

  if (automationsQuery.isLoading) return <LoadingSkeletonMetrics />;

  const automationsData = automationsQuery.data as IAutomation[];
  const aStateData = createAutomationsStateData(automationsData) as IAutomation[]; // prettier-ignore

  return (
    <>
      {!automationsQuery.isLoading && (
        <ChartCard2
          header="Automations"
          description="Current state of automations"
          icon={<Workflow />}
          content={
            <div>
              <div className="flex gap-4 max-w-fit">
                <DateRangePicker
                  dateRange={searchDate}
                  setSearchDate={setSearchDate}
                />
              </div>
              {automationsData.length > 0 ? (
                <CustomPieChart
                  chartConfig={AUTOMATIONS_STATE_CHART_CONFIG}
                  chartData={aStateData}
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

function createAutomationsStateData(data: IAutomation[]) {
  let newData: object[] = [];
  const initialA = new PieStats("initial", Chart_OrangeOpacity);
  const progressA = new PieStats("in_progress", Chart_Orange);
  const finishedA = new PieStats("finished", Chart_Green);

  data.forEach((a) => {
    if (a.state.toLowerCase() === "initial") {
      initialA.count++;
    } else if (a.state.toLowerCase() === "finished") {
      finishedA.count++;
    } else {
      progressA.count++;
    }
  });

  newData.push(initialA, progressA, finishedA);
  return newData;
}

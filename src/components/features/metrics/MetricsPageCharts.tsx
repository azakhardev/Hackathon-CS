import CustomBarChart from "@/components/features/charts/CustomBarChart";
import CustomPieChart from "@/components/features/charts/CustomPieChart";
import H2 from "@/components/ui/typography/H2";
import { IAutomation } from "@/lib/types/IAutomation";
import { IJobs } from "@/lib/types/IJobs";
import { IRunner } from "@/lib/types/IRunner";
import ChartCard, { ChartCard2 } from "../charts/ChartCard";
import { CheckIcon, Workflow } from "lucide-react";

class JobState {
  organization: string;
  success: number = 0;
  failed: number = 0;
  queued: number = 0;
  in_progress: number = 0;

  constructor(org: string) {
    this.organization = org;
  }
}

const AUTOMATIONS_STATE_CHART_CONFIG = {
  count: {
    label: "Count",
  },
  initial: {
    label: "Initial",
    color: "hsl(var(--state_gray))",
  },
  in_progress: {
    label: "In Progress",
    color: "hsl(var(--state_yellow)",
  },
  finished: {
    label: "Finished",
    color: "hsl(var(--state_green))",
  },
};

const AUTOMATIONS_TYPES_CHART_CONFIG = {};

const JOBS_CHART_CONFIG = {
  success: {
    label: "Succeed Jobs",
    color: "hsl(var(--state_green))",
  },
  in_progress: {
    label: "Jobs in Progression",
    color: "hsl(var(--state_yellow))",
  },

  failed: {
    label: "Failed Jobs",
    color: "hsl(var(--state_red))",
  },
  queued: {
    label: "Queued Jobs",
    color: "hsl(var(--state_gray))",
  },
};

const RUNNERS_CHART_CONFIG = {};

interface IProps {
  automationsData: IAutomation[];
  runnersData: IRunner[];
  jobsData: IJobs[];
}

export default function MetricsPageCharts(props: IProps) {
  const aStateData = createAutomationsStateData(props.automationsData);
  const jStateData = createJobsData(props.jobsData);
  return (
    <>
      <div className="flex flex-row gap-4">
        {props.automationsData.length > 0 ? (
          <ChartCard2
            header="Automations"
            description="Current state of automations"
            icon={<Workflow />}
            content={
              <CustomPieChart
                chartConfig={AUTOMATIONS_STATE_CHART_CONFIG}
                chartData={aStateData}
                innerRadius={0}
              />
            }
          />
        ) : (
          <p>No data for this date range</p>
        )}
        {props.jobsData.length > 0 ? (
          <ChartCard2
            header="Jobs"
            description="Current state of automations"
            icon={<CheckIcon />}
            content={
              <CustomBarChart
                chartConfig={JOBS_CHART_CONFIG}
                chartData={jStateData}
                showCursor={false}
                dataKey="organization"
              />
            }
          />
        ) : (
          <p>No data for this date range</p>
        )}
      </div>
    </>
  );
}

function createAutomationsStateData(data: IAutomation[]) {
  let newData: object[] = [];
  const initialA = {
    state: "initial",
    count: 0,
    fill: "hsl(var(--chart-1))",
  };
  const progressA = {
    state: "in_progress",
    count: 0,
    fill: "hsl(var(--chart-3))",
  };
  const finishedA = {
    state: "finished",
    count: 0,
    fill: "hsl(var(--chart-2))",
  };

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

function createJobsData(data: IJobs[]) {
  let newData: object[] = [];
  const dev = new JobState("Dev");
  const ops = new JobState("Ops");

  data.forEach((j) => {
    if (j.organization.includes("csas-dev")) countJobStats(dev, j.state);
    else countJobStats(ops, j.state);
  });

  newData.push(dev, ops);

  return newData;
}

function countJobStats(job: JobState, state: string) {
  if (state === "success") job.success++;
  else if (state === "failed") job.failed++;
  else if (state === "queued") job.queued++;
  else {
    job.in_progress++;
  }
}

function createRunnersData() {}

import CustomBarChart from "@/components/features/charts/CustomBarChart";
import CustomPieChart from "@/components/features/charts/CustomPieChart";
import H2 from "@/components/ui/typography/H2";
import { IAutomation } from "@/lib/types/IAutomation";
import { IJobs } from "@/lib/types/IJobs";
import { IRunner } from "@/lib/types/IRunner";
import ChartCard, { ChartCard2 } from "../charts/ChartCard";
import { CheckIcon, Workflow } from "lucide-react";

class MetricsStats {
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
    // color: "hsl(var(--state_gray))",
  },
  in_progress: {
    label: "In Progress",
    // color: "hsl(var(--state_yellow)",
  },
  finished: {
    label: "Finished",
    // color: "hsl(var(--state_green))",
  },
};

const AUTOMATIONS_TYPES_CHART_CONFIG = {};

const JOBS_CHART_CONFIG = {
  success: {
    label: "Succeed Jobs",
    color: "hsl(131, 41%, 46%)",
  },
  in_progress: {
    label: "Jobs in Progression",
    color: "hsl(35, 100%, 52%)",
  },

  failed: {
    label: "Failed Jobs",
    color: "hsl(358, 75%, 59%)",
  },
  queued: {
    label: "Queued Jobs",
    color: "hsl(var(--state_gray))",
  },
};

const RUNNERS_CHART_CONFIG = {
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

interface IProps {
  automationsData: IAutomation[];
  runnersData: IRunner[];
  jobsData: IJobs[];
}

export default function MetricsPageCharts(props: IProps) {
  const aStateData = createAutomationsStateData(props.automationsData);
  const jStateData = createJobsData(props.jobsData);
  const rStateData = createRunnersData(props.runnersData);
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
                stacked={true}
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
    fill: "hsl(35, 91%, 22%)",
  };
  const progressA = {
    state: "in_progress",
    count: 0,
    fill: "hsl(35, 100%, 52%)",
  };
  const finishedA = {
    state: "finished",
    count: 0,
    fill: "hsl(131, 41%, 46%)",
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
  const dev = new MetricsStats("Dev");
  const ops = new MetricsStats("Ops");

  data.forEach((j) => {
    if (j.organization.includes("csas-dev")) countJobsStats(dev, j.state);
    else countJobsStats(ops, j.state);
  });

  newData.push(dev, ops);

  return newData;
}

function countJobsStats(job: MetricsStats, state: string) {
  if (state === "success") job.success++;
  else if (state === "failed") job.failed++;
  else if (state === "queued") job.queued++;
  else {
    job.in_progress++;
  }
}

function createRunnersData(data: IRunner[]) {
  let newData: object[] = [];
  const dev = new MetricsStats("Dev");
  const ops = new MetricsStats("Ops");

  data.forEach((r) => {
    if (r.organization.includes("csas-dev")) countJobsStats(dev, r.state);
    else countJobsStats(ops, r.state);
  });

  newData.push(dev, ops);

  return newData;
}

import CustomBarChart from "@/components/features/charts/CustomBarChart";
import CustomPieChart from "@/components/features/charts/CustomPieChart";
import { IAutomation } from "@/lib/types/IAutomation";
import { IJobs } from "@/lib/types/IJobs";
import { IRunner } from "@/lib/types/IRunner";

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
    color: "hsl(var(--chart-1))",
  },
  in_progress: {
    label: "In Progress",
    color: "hsl(var(--chart-3))",
  },
  finished: {
    label: "Finished",
    color: "hsl(var(--chart-2))",
  },
};

const AUTOMATIONS_TYPES_CHART_CONFIG = {};

const JOBS_CHART_CONFIG = {
  success: {
    label: "Successed Jobs",
    color: "hsl(var(--chart-2))",
  },
  in_progress: {
    label: "Jobs in Progression",
    color: "hsl(var(--chart-3))",
  },
  queued: {
    label: "Queued Jobs",
    color: "gray",
  },
  failed: {
    label: "Failed Jobs",
    color: "hsl(var(--chart-5))",
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
      <div>
        <h1>Automations States</h1>
        <CustomPieChart
          chartConfig={AUTOMATIONS_STATE_CHART_CONFIG}
          chartData={aStateData}
          innerRadius={0}
        />
      </div>
      <div>
        <h1>Jobs Stats</h1>
        <CustomBarChart
          chartConfig={JOBS_CHART_CONFIG}
          chartData={jStateData}
          showCursor={false}
          dataKey="organization"
        />
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

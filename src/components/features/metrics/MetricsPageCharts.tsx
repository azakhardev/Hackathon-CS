import CustomPieChart from "@/components/features/charts/CustomPieChart";
import { IAutomation } from "@/lib/types/IAutomation";
import { IJobs } from "@/lib/types/IJobs";
import { IRunner } from "@/lib/types/IRunner";
import ChartCard, { ChartCard2 } from "../charts/ChartCard";
import { CheckIcon, ContainerIcon, Workflow } from "lucide-react";

// class MetricsStats {
//   organization: string;
//   success: number = 0;
//   failed: number = 0;
//   queued: number = 0;
//   in_progress: number = 0;

//   constructor(org: string) {
//     this.organization = org;
//   }
// }

class PieStats {
  state: string;
  count: number = 0;
  fill: string;

  constructor(state: string, fill: string) {
    this.state = state;
    this.fill = fill;
  }
}

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

const JOBS_CHART_CONFIG = {
  count: {
    label: "Count",
  },
  success: {
    label: "Successful",
  },
  in_progress: {
    label: "In Progress",
  },
  failed: {
    label: "Failed",
  },
  queued: {
    label: "Queued",
  },
};

const RUNNERS_CHART_CONFIG = {
  count: {
    label: "Count",
  },
  idle: {
    label: "Idle",
  },
  active: {
    label: "Active",
  },
  failed: {
    label: "Failed",
  },
  offline: {
    label: "Offline",
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
  console.log(rStateData);
  return (
    <>
      <div className="flex flex-row gap-4">
        <ChartCard2
          header="Jobs"
          description="Current state of jobs"
          icon={<CheckIcon />}
          content={
            props.jobsData.length > 0 ? (
              <CustomPieChart
                chartConfig={JOBS_CHART_CONFIG}
                chartData={jStateData}
                innerRadius={0}
                label={true}
              />
            ) : (
              <p>No data for this date range</p>
            )
          }
        />
        <ChartCard2
          header="Runners"
          description="Current state of runners"
          icon={<ContainerIcon />}
          content={
            props.jobsData.length > 0 ? (
              <CustomPieChart
                chartConfig={RUNNERS_CHART_CONFIG}
                chartData={rStateData}
                innerRadius={0}
                label={true}
              />
            ) : (
              <p>No data for this date range</p>
            )
          }
        />
      </div>
      <div>
        <ChartCard2
          header="Automations"
          description="Current state of automations"
          icon={<Workflow />}
          content={
            props.runnersData.length > 0 ? (
              <CustomPieChart
                chartConfig={AUTOMATIONS_STATE_CHART_CONFIG}
                chartData={aStateData}
                innerRadius={0}
                label={false}
              />
            ) : (
              <p>No data for this date range</p>
            )
          }
        />
      </div>
    </>
  );
}

function createAutomationsStateData(data: IAutomation[]) {
  let newData: object[] = [];
  const initialA = new PieStats("initial", "hsl(234, 97%, 52%)");
  const progressA = new PieStats("in_progress", "hsl(28, 97%, 52%)");
  const finishedA = new PieStats("finished", "hsl(131, 41%, 46%)");

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

  // let newData: object[] = [];

  // const dev = new MetricsStats("Dev");
  // const ops = new MetricsStats("Ops");

  // data.forEach((j) => {
  //   if (j.organization.includes("csas-dev")) countJobsStats(dev, j.state);
  //   else countJobsStats(ops, j.state);
  // });

  // newData.push(dev, ops);

  // return newData;
}

// function countJobsStats(job: MetricsStats, state: string) {
//   if (state === "success") job.success++;
//   else if (state === "failed") job.failed++;
//   else if (state === "queued") job.queued++;
//   else {
//     job.in_progress++;
//   }
// }

function createRunnersData(data: IRunner[]) {
  let newData: object[] = [];
  const idleR = new PieStats("idle", "hsl(234, 97%, 52%)");
  const activeR = new PieStats("active", "hsl(131, 41%, 46%)");
  const failedR = new PieStats("failed", "hsl(0, 91%, 49%)");
  const offlineR = new PieStats("offline", "hsl(208, 0%, 34%)");

  data.forEach((r) => {
    if (r.state.toLowerCase() === "idle") {
      idleR.count++;
    } else if (r.state.toLowerCase() === "failed") {
      failedR.count++;
    } else if (r.state.toLowerCase() === "active") {
      activeR.count++;
    } else {
      offlineR.count++;
    }
  });

  newData.push(idleR, activeR, failedR, offlineR);
  return newData;
  // let newData: object[] = [];
  // const dev = new MetricsStats("Dev");
  // const ops = new MetricsStats("Ops");

  // data.forEach((r) => {
  //   if (r.organization.includes("csas-dev")) countJobsStats(dev, r.state);
  //   else countJobsStats(ops, r.state);
  // });

  // newData.push(dev, ops);

  // return newData;
}

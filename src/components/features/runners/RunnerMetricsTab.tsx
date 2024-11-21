import CustomLineChart from "@/components/features/charts/CustomLineChart";
import { IMetrics } from "../../../lib/types/IMetrics";
import CustomAreaChart from "@/components/features/charts/CustomAreaChart";
import {
  CpuIcon,
  Download,
  EthernetPort,
  EthernetPortIcon,
  HardDriveIcon,
  MemoryStick,
  UploadIcon,
  WifiIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ChartCard from "@/components/features/charts/ChartCard";
import H2 from "@/components/ui/typography/H2";

interface ICPUMetrics {
  point: string;
  percents: number;
}

interface IRAMMetrics {
  point: string;
  memory: number;
}

interface IIncomingMetrics {
  point: string;
  receive: number;
  write: number;
}

interface IOutgoingMetrics {
  point: string;
  read: number;
  transmit: number;
}

interface IProps {
  runnerMetrics: IMetrics;
}

const CPU_CHART_CONFIG = {
  percents: {
    label: "% ",
    color: "hsl(var(--chart-4))",
  },
};

const RAM_CHART_CONFIG = {
  memory: {
    label: "GB ",
    color: "hsl(var(--chart-5))",
  },
};

const NETWORK_IN_CONFIG = {
  receive: {
    label: "Receive MB/s ",
    color: "hsl(var(--chart-1))",
  },
};

const NETWORK_OUT_CONFIG = {
  transmit: {
    label: "Transmit MB/s ",
    color: "hsl(var(--chart-1))",
  },
};

const DISK_WRITE_CONFIG = {
  write: {
    label: "Writes MB/s ",
    color: "hsl(var(--chart-2))",
  },
};

const DISK_READ_CONFIG = {
  read: {
    label: "Receive MB/s ",
    color: "hsl(var(--chart-2))",
  },
};

const INCOMING_CHART_CONFIG = {
  receive: {
    label: "Receive MB/s ",
    color: "hsl(var(--chart-1))",
  },
  write: {
    label: "Writes MB/s",
    color: "hsl(var(--chart-2))",
  },
};

const OUTGOING_CHART_CONFIG = {
  read: {
    label: "Reads MB/s ",
    color: "hsl(var(--chart-2))",
  },
  transmit: {
    label: "Transmits MB/s ",
    color: "hsl(var(--chart-1))",
  },
};

export default function RunnerMetricsTab(props: IProps) {
  if (props.runnerMetrics === null) return <div>Missing data</div>;

  const cpuMetrics = createCpuData(props.runnerMetrics);
  const ramData = createRamData(props.runnerMetrics);
  const incomingData = createNetworkData(props.runnerMetrics);
  const outgoingData = createFsData(props.runnerMetrics);

  if (
    cpuMetrics.length == 0 &&
    incomingData.length == 0 &&
    outgoingData.length == 0
  ) {
    return (
      <div className="font-bold text-[30px] mt-5">
        Metriky nejsou k dispozici
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-8">
      <H2>Components</H2>
      <div className="flex flex-col gap-2 md:flex-row">
        <ChartCard
          header={
            <div className="flex items-center gap-2">
              <CpuIcon size={40} className="-mb-1" />
              <span className="text-5xl font-bold">CPU</span>
            </div>
          }
          content={
            <CustomLineChart
              chartConfig={CPU_CHART_CONFIG}
              chartData={cpuMetrics}
              dataKey="point"
              lineType="step"
              showCursor={true}
            />
          }
        />
        <ChartCard
          header={
            <div className="flex items-center gap-2">
              <MemoryStick size={40} className="-mb-1" />
              <span className="text-5xl font-bold">RAM</span>
            </div>
          }
          content={
            <CustomLineChart
              chartConfig={RAM_CHART_CONFIG}
              dataKey="point"
              lineType="step"
              showCursor={true}
              chartData={ramData}
            />
          }
        />
      </div>

      <H2>Network</H2>
      <div className="flex flex-col gap-2 md:flex-row">
        <ChartCard
          header={
            <div className="flex items-center gap-2">
              <WifiIcon size={40} className="-mb-1" />
              <span className="text-5xl font-bold">Receive</span>
            </div>
          }
          content={
            <CustomLineChart
              chartConfig={NETWORK_IN_CONFIG}
              chartData={incomingData}
              dataKey="point"
              lineType="linear"
              showCursor={true}
            />
          }
        />
        <ChartCard
          header={
            <div className="flex items-center gap-2">
              <WifiIcon size={40} className="-mb-1" />
              <span className="text-5xl font-bold">Transmit</span>
            </div>
          }
          content={
            <CustomLineChart
              chartConfig={NETWORK_OUT_CONFIG}
              chartData={outgoingData}
              dataKey="point"
              lineType="linear"
              showCursor={true}
            />
          }
        />
      </div>

      <H2>Disk</H2>
      <div className="flex flex-col gap-2 md:flex-row">
        <ChartCard
          header={
            <div className="flex items-center gap-2">
              <HardDriveIcon size={40} className="-mb-1" />
              <span className="text-5xl font-bold">Write</span>
            </div>
          }
          content={
            <CustomLineChart
              chartConfig={DISK_WRITE_CONFIG}
              chartData={incomingData}
              dataKey="point"
              lineType="linear"
              showCursor={true}
            />
          }
        />
        <ChartCard
          header={
            <div className="flex items-center gap-2">
              <HardDriveIcon size={40} className="-mb-1" />
              <span className="text-5xl font-bold">Read</span>
            </div>
          }
          content={
            <CustomLineChart
              chartConfig={DISK_READ_CONFIG}
              chartData={outgoingData}
              dataKey="point"
              lineType="linear"
              showCursor={true}
            />
          }
        />
      </div>
      <Separator />
      <H2>Combined</H2>
      <div className="flex flex-col gap-2 md:flex-row">
        <ChartCard
          header={
            <div className="flex items-center gap-2">
              <Download size={40} className="-mb-1" />
              <span className="text-5xl font-bold">Incoming Data</span>
            </div>
          }
          content={
            <CustomAreaChart
              chartConfig={INCOMING_CHART_CONFIG}
              chartData={incomingData}
              dataKey="point"
              lineType="natural"
              showCursor={true}
            />
          }
        />
        <ChartCard
          header={
            <div className="flex items-center gap-2">
              <UploadIcon size={40} className="-mb-1" />
              <span className="text-5xl font-bold">Outgoing Data</span>
            </div>
          }
          content={
            <CustomAreaChart
              chartConfig={OUTGOING_CHART_CONFIG}
              dataKey="point"
              lineType="natural"
              showCursor={true}
              chartData={outgoingData}
            />
          }
        />
      </div>
    </div>
  );
}

function createCpuData(runnerMetrics: IMetrics) {
  let cpuMetrics: ICPUMetrics[] = [];

  if (runnerMetrics?.metrics) {
    runnerMetrics.metrics.forEach((m, i) => {
      cpuMetrics.push({
        point: (runnerMetrics.metrics.length - i).toString(),
        percents: Math.round(m.cpu * 10000) / 100,
      });
    });
  }

  return cpuMetrics;
}

function createRamData(runnerMetrics: IMetrics) {
  let ramMetrics: IRAMMetrics[] = [];

  if (runnerMetrics?.metrics) {
    runnerMetrics.metrics.forEach((m, i) => {
      ramMetrics.push({
        point: (runnerMetrics.metrics.length - i).toString(),
        memory: m.memory / 1073741824,
      });
    });
  }

  return ramMetrics;
}

function createNetworkData(runnerMetrics: IMetrics) {
  let incomingMetrics: IIncomingMetrics[] = [];

  if (runnerMetrics?.metrics) {
    runnerMetrics.metrics.forEach((m, i) => {
      incomingMetrics.push({
        point: (runnerMetrics.metrics.length - i).toString(),
        receive: Math.round(m.network_receive / 64),
        write: Math.round(m.fs_writes / 64),
      });
    });
  }

  return incomingMetrics;
}

function createFsData(runnerMetrics: IMetrics) {
  let outgoingMetrics: IOutgoingMetrics[] = [];

  if (runnerMetrics?.metrics) {
    runnerMetrics.metrics.forEach((m, i) => {
      outgoingMetrics.push({
        point: (runnerMetrics.metrics.length - i).toString(),
        read: Math.round(m.fs_reads / 64),
        transmit: Math.round(m.network_transmit / 64),
      });
    });
  }

  return outgoingMetrics;
}

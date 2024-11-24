import CustomLineChart from "@/components/features/charts/CustomLineChart";
import { IMetrics } from "../../../lib/types/IMetrics";
import CustomAreaChart from "@/components/features/charts/CustomAreaChart";
import {
  CloudDownload,
  CloudUpload,
  CpuIcon,
  Download,
  HardDriveDownloadIcon,
  HardDriveUploadIcon,
  MemoryStick,
  UploadIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ChartCard, { ChartCard2 } from "@/components/features/charts/ChartCard";
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
    label: "CPU",
    color: "hsl(var(--chart-4))",
  },
};

const RAM_CHART_CONFIG = {
  memory: {
    label: "RAM",
    color: "hsl(var(--chart-5))",
  },
};

const NETWORK_IN_CONFIG = {
  receive: {
    label: "Receives",
    color: "hsl(var(--chart-1))",
  },
};

const NETWORK_OUT_CONFIG = {
  transmit: {
    label: "Transmits",
    color: "hsl(var(--chart-1))",
  },
};

const DISK_WRITE_CONFIG = {
  write: {
    label: "Writes",
    color: "hsl(var(--chart-2))",
  },
};

const DISK_READ_CONFIG = {
  read: {
    label: "Receives",
    color: "hsl(var(--chart-2))",
  },
};

const INCOMING_CHART_CONFIG = {
  receive: {
    label: "Receives",
    color: "hsl(var(--chart-1))",
  },
  write: {
    label: "Writes",
    color: "hsl(var(--chart-2))",
  },
};

const OUTGOING_CHART_CONFIG = {
  read: {
    label: "Reads",
    color: "hsl(var(--chart-2))",
  },
  transmit: {
    label: "Transmits",
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
    <div className="flex flex-col w-full gap-10">
      <div>
        <H3>Components</H3>
        <div className="flex flex-col gap-2 md:flex-row">
          <ChartCard2
            header="CPU"
            description="Procesor usage in percents"
            icon={<CpuIcon />}
            content={
              <CustomLineChart
                chartConfig={CPU_CHART_CONFIG}
                chartData={cpuMetrics}
                dataKey="point"
                lineType="step"
                showCursor={true}
                tooltipText=" %"
              />
            }
          />
          <ChartCard2
            header="RAM"
            description="Memory usage in GB/s"
            icon={<MemoryStick />}
            content={
              <CustomLineChart
                chartConfig={RAM_CHART_CONFIG}
                dataKey="point"
                lineType="step"
                showCursor={true}
                chartData={ramData}
                tooltipText="GB"
              />
            }
          />
        </div>
      </div>

      <div>
        <H3>Network</H3>
        <div className="flex flex-col gap-2 md:flex-row">
          <ChartCard2
            header="Upload"
            description="Upload speed in MB/s"
            icon={<CloudUpload />}
            content={
              <CustomLineChart
                chartConfig={NETWORK_OUT_CONFIG}
                chartData={outgoingData}
                dataKey="point"
                lineType="linear"
                showCursor={true}
                tooltipText="MB/s"
              />
            }
          />
          <ChartCard2
            header="Download"
            description="Download speed in MB/s"
            icon={<CloudDownload />}
            content={
              <CustomLineChart
                chartConfig={NETWORK_IN_CONFIG}
                chartData={incomingData}
                dataKey="point"
                lineType="linear"
                showCursor={true}
                tooltipText="MB/s"
              />
            }
          />
        </div>
      </div>

      <div>
        <H3>Disk</H3>
        <div className="flex flex-col gap-2 md:flex-row">
          <ChartCard2
            header="Write"
            description="Write speed in MB/s"
            icon={<HardDriveDownloadIcon />}
            content={
              <CustomLineChart
                chartConfig={DISK_WRITE_CONFIG}
                chartData={incomingData}
                dataKey="point"
                lineType="linear"
                showCursor={true}
                tooltipText="MB/s"
              />
            }
          />
          <ChartCard2
            header="Read"
            description="Read speed in MB/s"
            icon={<HardDriveUploadIcon />}
            content={
              <CustomLineChart
                chartConfig={DISK_READ_CONFIG}
                chartData={outgoingData}
                dataKey="point"
                lineType="linear"
                showCursor={true}
                tooltipText="MB/s"
              />
            }
          />
        </div>
      </div>
      <Separator />
      <div>
        <H3>Combined</H3>
        <div className="flex flex-col gap-2 md:flex-row">
          <ChartCard2
            header="Outgoing"
            description="Speed of outgoing data in MB/s"
            icon={<UploadIcon />}
            content={
              <CustomAreaChart
                chartConfig={OUTGOING_CHART_CONFIG}
                dataKey="point"
                lineType="natural"
                showCursor={true}
                chartData={outgoingData}
                tooltipText="MB/s"
              />
            }
          />
          <ChartCard2
            header="Incoming"
            description="Speed of outgoing data in MB/s"
            icon={<Download />}
            content={
              <CustomAreaChart
                chartConfig={INCOMING_CHART_CONFIG}
                chartData={incomingData}
                dataKey="point"
                lineType="natural"
                showCursor={true}
                tooltipText="MB/s"
              />
            }
          />
        </div>
      </div>
    </div>
  );
}

function createCpuData(runnerMetrics: IMetrics) {
  const cpuMetrics: ICPUMetrics[] = [];

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
  const ramMetrics: IRAMMetrics[] = [];

  if (runnerMetrics?.metrics) {
    runnerMetrics.metrics.forEach((m, i) => {
      ramMetrics.push({
        point: (runnerMetrics.metrics.length - i).toString(),
        memory: Math.round((m.memory / 1073741824) * 100) / 100,
      });
    });
  }

  return ramMetrics;
}

function createNetworkData(runnerMetrics: IMetrics) {
  const incomingMetrics: IIncomingMetrics[] = [];

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
  const outgoingMetrics: IOutgoingMetrics[] = [];

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

export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-4 text-4xl font-bold text-center">{children}</h3>;
}

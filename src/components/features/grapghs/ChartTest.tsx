import { ChartConfig } from "@/components/ui/chart";
import CustomBarChart from "./CustomBarChart";
import CustomPieChart from "./CustomPieChart";
import CustomLineChart from "./CustomLineChart";
import CustomRadialChart from "./CustomRadialChart";
import CustomAreaChart from "./CustomAreaChart";

const barChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const barChartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Laptop",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const pieChartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];
const pieChartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const lineChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const lineChartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const radialChartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];
const radialChartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function ChartTest() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 max-w-[75vw]">
      <div>
        <CustomBarChart
          chartConfig={barChartConfig}
          chartData={barChartData}
          dataKey="month"
          showCursor={true}
        />
      </div>
      <div>
        <CustomPieChart
          innerRadius={40}
          chartConfig={pieChartConfig}
          chartData={pieChartData}
        />
      </div>
      <div>
        <CustomLineChart
          chartConfig={lineChartConfig}
          chartData={lineChartData}
          dataKey="month"
          lineType="bump"
          showCursor={true}
        />
      </div>
      <div>
        <CustomRadialChart
          chartConfig={radialChartConfig}
          chartData={radialChartData}
          dataKey="visitors"
          showCursor={false}
          innerRadius={30}
          outerRadius={120}
          single={true}
        />
        {/* <CustomAreaChart
          chartConfig={lineChartConfig}
          chartData={lineChartData}
          dataKey="month"
          lineType="bump"
          showCursor={true}
        /> */}
      </div>
    </div>
  );
}

import { IChartConfig } from "@/lib/types/IChartConfig";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CurveType } from "recharts/types/shape/Curve";

interface IProps {
  chartConfig: IChartConfig;
  chartData: any[];
  dataKey: string;
  lineType: CurveType;
  showCursor: boolean;
}
export default function CustomLineChart(props: IProps) {
  return (
    <ChartContainer config={props.chartConfig}>
      <LineChart
        accessibilityLayer
        data={props.chartData}
        margin={{
          left: 10,
          right: 10,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={props.dataKey}
          tickLine={true}
          axisLine={true}
          tickMargin={10}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={props.showCursor}
          content={<ChartTooltipContent hideLabel />}
        />

        {Object.keys(props.chartConfig).map((p, i) => (
          <Line
            key={i}
            dataKey={p}
            type={props.lineType}
            dot={props.lineType === "linear"}
            stroke={props.chartConfig[p].color}
            strokeWidth={2}
            radius={8}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}

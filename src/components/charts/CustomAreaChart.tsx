import { IChartConfig } from "@/lib/types/IChartConfig";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
export default function CustomAreaChart(props: IProps) {
  return (
    <ChartContainer config={props.chartConfig}>
      <AreaChart
        accessibilityLayer
        data={props.chartData}
        margin={{
          left: 10,
          right: 10,
        }}
      >
        <CartesianGrid vertical={false} />
        <YAxis />
        <XAxis
          dataKey={props.dataKey}
          tickLine={true}
          axisLine={true}
          tickMargin={10}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={props.showCursor}
          content={<ChartTooltipContent hideLabel indicator="dot" />}
        />

        {Object.keys(props.chartConfig).map((p, i) => (
          <Area
            key={i}
            dataKey={p}
            type={props.lineType}
            fill={props.chartConfig[p].color}
            fillOpacity={0.4}
            stroke={props.chartConfig[p].color}
            stackId="a"
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}

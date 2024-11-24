import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IChartConfig } from "@/lib/types/IChartConfig";

interface IProps {
  chartConfig: IChartConfig;
  chartData: any[];
  dataKey: string;
  showCursor: boolean;
  stacked?: boolean;
}

export default function CustomBarChart(props: IProps) {
  return (
    <ChartContainer config={props.chartConfig}>
      <BarChart accessibilityLayer data={props.chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={props.dataKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={props.showCursor}
          content={<ChartTooltipContent hideLabel />}
        />

        {Object.keys(props.chartConfig).map((p, i) => (
          <Bar
            key={i}
            dataKey={p}
            stackId={props.stacked ? "a" : i}
            fill={props.chartConfig[p].color}
            radius={props.stacked ? 0 : [4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}

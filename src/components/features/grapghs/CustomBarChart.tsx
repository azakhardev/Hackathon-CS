import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IChartConfig } from "@/lib/types/IChartConfig";

interface IProps {
  chartConfig: IChartConfig;
  chartData: any;
  dataKey: string;
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
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        {Object.keys(props.chartConfig).map((p) => (
          <Bar dataKey={p} fill={props.chartConfig[p].color} radius={8} />
        ))}
      </BarChart>
    </ChartContainer>
  );
}

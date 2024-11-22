import { Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { IChartConfig } from "@/lib/types/IChartConfig";

interface IProps {
  chartConfig: IChartConfig;
  chartData: any[];
  innerRadius: number;
  label?: boolean;
}

export default function CustomPieChart(props: IProps) {
  const nKey = Object.keys(props.chartData[0]).at(0);

  return (
    <ChartContainer config={props.chartConfig}>
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={props.chartData}
          dataKey={Object.keys(props.chartConfig).at(0) as string}
          nameKey={nKey}
          label={props.label}
          innerRadius={props.innerRadius}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend
          content={<ChartLegendContent nameKey={nKey} />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}

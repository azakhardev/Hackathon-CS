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
  chartData: object[];
  innerRadius: number;
  label?: boolean;
}

export default function CustomPieChart(props: IProps) {
  const nKey = Object.keys(props.chartData[0]).at(0);
  //@ts-ignore
  const filteredChartData = props.chartData.filter((data) => data.count > 0);
  return (
    <ChartContainer config={props.chartConfig}>
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie
          className="text-[15px]"
          data={filteredChartData}
          dataKey={Object.keys(props.chartConfig).at(0) as string}
          nameKey={nKey}
          label={props.label}
          innerRadius={props.innerRadius}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend
          content={<ChartLegendContent nameKey={nKey} />}
          className="-translate-y-2 flex-wrap gap-x-2 gap-y-4 pt-8 xl:[&>*]:basis-1/5 [&>*]:basis-1/3 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}

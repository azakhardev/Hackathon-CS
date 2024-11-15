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
  chartData: any;
}

export default function CustomPieChart(props: IProps) {
  const nKey = Object.keys(props.chartData[0]).at(0);
  console.log(nKey);

  return (
    <ChartContainer
      config={props.chartConfig}
      className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={props.chartData}
          dataKey={Object.keys(props.chartConfig).at(0) as string}
          label
          nameKey={nKey}
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

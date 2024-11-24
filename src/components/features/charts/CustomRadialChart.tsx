import {
  Label,
  LabelList,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { IChartConfig } from "@/lib/types/IChartConfig";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface IProps {
  chartConfig: IChartConfig;
  chartData: any[];
  dataKey: string;
  showCursor: boolean;
  single: boolean;
  innerRadius: number;
  outerRadius: number;
}

export default function CustomRadialChart(props: IProps) {
  const nKey = Object.keys(props.chartData[0]).at(0);
  return (
    <ChartContainer config={props.chartConfig}>
      <RadialBarChart
        data={props.chartData}
        startAngle={-90}
        endAngle={props.single ? 180 : undefined}
        {...props}
      >
        <ChartTooltip
          cursor={props.showCursor}
          content={<ChartTooltipContent hideLabel nameKey={nKey} />}
        />

        {props.single && (
          <>
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label content={<span>Text</span>} />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="Chrome"
              fill="hsl(var(--chart-1))"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="Safari"
              stackId="a"
              cornerRadius={5}
              fill="hsl(var(--chart-2))"
              className="stroke-transparent stroke-2"
            />
          </>
        )}

        {!props.single && (
          <RadialBar dataKey={props.dataKey} background>
            <LabelList
              position="insideStart"
              dataKey={nKey}
              className="fill-white capitalize mix-blend-luminosity"
              fontSize={
                (props.outerRadius - props.innerRadius) /
                  props.chartData.length -
                4
              }
            />
          </RadialBar>
        )}
      </RadialBarChart>
    </ChartContainer>
  );
}

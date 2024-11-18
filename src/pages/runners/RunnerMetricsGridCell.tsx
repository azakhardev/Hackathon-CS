import { ReactNode } from "react";
import CustomLineChart from "@/components/charts/CustomLineChart";

interface IProps {
  children: ReactNode;
  heading: string;
}

export default function RunnerMetricsGridCell({ children, heading }: IProps) {
  return (
    <div className="flex flex-col justify-center items-center h-[100%]">
      <h1 className="font-medium text-lg mb-2">{heading}</h1>
      {children}
    </div>
  );
}

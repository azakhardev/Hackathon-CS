import { ISelectItem } from "@/components/SelectInput";

export class PieStats {
  state: string;
  count: number = 0;
  fill: string;

  constructor(state: string, fill: string) {
    this.state = state;
    this.fill = fill;
  }
}

export const MetricItems: ISelectItem[] = [
  { value: " ", content: "All" },
  { value: "csas-dev", content: "Dev" },
  { value: "csas-ops", content: "Ops" },
];

interface IPropObject {
  label: string;
  color?: string;
}

export interface IChartConfig {
  [key: string]: IPropObject;
};

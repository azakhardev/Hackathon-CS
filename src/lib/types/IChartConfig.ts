interface IPropObject {
  label: string;
  color?: string;
  lineType?: string;  
}

export interface IChartConfig {
  [key: string]: IPropObject;
};

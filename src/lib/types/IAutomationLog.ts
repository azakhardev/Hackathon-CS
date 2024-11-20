import { IAutomationType } from "./IAutomationType";

export interface IAutomationLog {
  automation_id: string;
  timestamp: string;
  level: string;
  type: string;
  from_state: string;
  to_state: string;
  description: string;
  type_object?: IAutomationType;
}

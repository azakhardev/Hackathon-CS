import { IAutomationType } from "../automationTypes/IAutomationType";

export interface IAutomation {
  id: string;
  last_activity: string;
  state: string;
  type: string;
  type_object?: IAutomationType;
}

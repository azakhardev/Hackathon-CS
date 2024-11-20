export interface ITransition {
  from_state: string;
  to_state: string;
  event: string;
  action: string;
}

export interface IAutomationType {
  type: string;
  states: string[];
  initial_state: string;
  end_state: string;
  transitions: ITransition[];
}

import { CircleIcon } from "lucide-react";

export enum StateType {
  Gray = "state_gray",
  Green = "state_green",
  Red = "state_red",
  Orange = "state_yellow",
}
const stateColorMap: { [key: string]: StateType } = {
  queued: StateType.Gray,
  in_progress: StateType.Orange,
  success: StateType.Green,
  failed: StateType.Red,
  offline: StateType.Gray,
  idle: StateType.Orange,
  active: StateType.Green,
};
function getColorForState(state: string): StateType {
  return stateColorMap[state] || StateType.Gray;
}
function formatState(state: string) {
  return state.charAt(0).toUpperCase() + state.slice(1).replace("_", " ");
}

export function Table_cel_state({
  title,
  text,
  type,
}: {
  title: string;
  text: string;
  type: string;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        <CircleIcon
          size={12}
          className={`fill-${getColorForState(type)}`}
          stroke="none"
        />
        <div className="text-base font-semibold text-primary">
          {formatState(title)}
        </div>
      </div>
      <div className="text-sm font-light text-muted-foreground">{text}</div>
    </div>
  );
}

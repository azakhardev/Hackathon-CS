import { CircleIcon } from "lucide-react";

export enum StateType {
  Gray = "gray",
  Green = "green",
  Red = "red",
  Orange = "orange",
}

function StateFormat(state: string) {
  return state.charAt(0).toUpperCase() + state.slice(1).replace("_", " ");
}

export function Table_cel_state({
  title,
  text,
  type,
}: {
  title: string;
  text: string;
  type: StateType;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        <CircleIcon
          size={12}
          className={`${
            type === StateType.Green
              ? "fill-state_green"
              : type === StateType.Red
              ? "fill-state_red"
              : type === StateType.Orange
              ? "fill-state_yellow"
              : "fill-state_gray"
          }`}
          stroke="none"
        />
        <div className="text-base font-semibold text-primary">
          {StateFormat(title)}
        </div>
      </div>
      <div className="text-sm font-light text-muted-foreground">{text}</div>
    </div>
  );
}

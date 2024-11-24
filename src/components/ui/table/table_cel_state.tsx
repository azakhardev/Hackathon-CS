import { CircleIcon } from "lucide-react";
import { Description_timeAgo } from "./badge_timeAgo";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

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

function formatState(state: string, t: TFunction) {
  switch (state) {
    case 'in_progress':
      return t('translation:jobs:state_inProgress')
    case 'queued':
      return t('translation:jobs:state_queued')
    case "success":
      return t('translation:jobs:state_success')
    case "failed":
      return t('translation:jobs:state_failed')
    case "active": 
      return t('translation:runners:state_active')
    case "offline":
      return t('translation:runners:state_offline')
    case "idle":
      return t('translation:runners:state_idle')
    default:
      return t('translation:jobs:state_default')
  }
}

const tailwindFillClassMap = {
  [StateType.Gray]: "fill-state_gray",
  [StateType.Orange]: "fill-state_yellow",
  [StateType.Green]: "fill-state_green",
  [StateType.Red]: "fill-state_red",
};

export function Table_cel_state({
  title,
  text,
  type,
}: {
  title: string;
  text: string;
  type: string;
}) {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        <CircleIcon
          size={12}
          stroke="none"
          className={tailwindFillClassMap[getColorForState(type)]}
        />
        <div className="text-base font-semibold text-primary">
          {formatState(title, t)}
        </div>
      </div>
      <div className="text-sm font-light text-muted-foreground">
        {isNaN(Date.parse(text))
          ? text
          : Description_timeAgo({ date: new Date(text) })}
      </div>
    </div>
  );
}

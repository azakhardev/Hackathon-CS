import { ISelectItem } from "@/components/SelectInput";
import { HammerIcon, ServerIcon, TestTubeDiagonalIcon } from "lucide-react";

import { IconItem } from "./IconItem";
import { StateItem } from "./StateItem";
import { TFunction } from "i18next";

export const actionsVals = (t: TFunction): ISelectItem[] => [
  {
    value: " ",
    content: (
      <IconItem
        title={t("translation:filters:action_placeholder")}
        text="All"
      />
    ),
  },
  {
    value: "csas-dev-csas-linux",
    content: (
      <IconItem
        title={t("translation:filters:action_build")}
        icon={<HammerIcon size={15} />}
        text="Build runners"
      />
    ),
  },
  {
    value: "csas-dev-csas-linux-test",
    content: (
      <IconItem
        title={t("translation:filters:action_test")}
        icon={<TestTubeDiagonalIcon size={15} />}
        text="Test runners"
      />
    ),
  },
  {
    value: "csas-ops-csas-linux",
    content: (
      <IconItem
        title={t("translation:filters:action_dev")}
        icon={<ServerIcon size={15} />}
        text="DEV deployers"
      />
    ),
  },
  {
    value: "csas-ops-csas-linux-prod",
    content: (
      <IconItem
        title={t("translation:filters:action_ops")}
        icon={<ServerIcon size={15} className="stroke-log_red" />}
        text="PROD deployers"
      />
    ),
  },
];

export const statesVals = (t: TFunction): ISelectItem[] => [
  {
    value: " ",
    content: (
      <IconItem
        title={t("translation:filters:state_placeholder")}
        text={t("translation:filters:state_placeholder")}
      />
    ),
  },
  {
    value: "active",
    content: (
      <StateItem title={t("translation:filters:state_active")} color="green" />
    ),
  },
  {
    value: "offline",
    content: (
      <StateItem title={t("translation:filters:state_offline")} color="gray" />
    ),
  },
  {
    value: "idle",
    content: (
      <StateItem title={t("translation:filters:state_idle")} color="yellow" />
    ),
  },
  {
    value: "failed",
    content: (
      <StateItem title={t("translation:filters:state_failed")} color="red" />
    ),
  },
];
export const states2Vals = (t: TFunction): ISelectItem[] => [
  {
    value: " ",
    content: (
      <IconItem
        title={t("translation:filters:state_placeholder")}
        text={t("translation:filters:state_placeholder")}
      />
    ),
  },
  {
    value: "success",
    content: (
      <StateItem title={t("translation:filters:state_success")} color="green" />
    ),
  },
  {
    value: "queued",
    content: (
      <StateItem title={t("translation:filters:state_queued")} color="gray" />
    ),
  },
  {
    value: "in_progress",
    content: (
      <StateItem
        title={t("translation:filters:state_inProgress")}
        color="yellow"
      />
    ),
  },
  {
    value: "failed",
    content: (
      <StateItem title={t("translation:filters:state_failed")} color="red" />
    ),
  },
];

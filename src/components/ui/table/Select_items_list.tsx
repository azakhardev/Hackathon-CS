import { ISelectItem } from "@/components/SelectInput";
import { HammerIcon, ServerIcon, TestTubeDiagonalIcon } from "lucide-react";

import { IconItem } from "./IconItem";
import { StateItem } from "./StateItem";

export const actionsVals = (t: any): ISelectItem[] => [
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

export const statesVals = (t: any): ISelectItem[] => [
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
  { value: "offline", content: <StateItem title={t('translation:filters:state_offline')} color="gray" /> }, // prettier-ignore
  { value: "idle", content: <StateItem title={t('translation:filters:state_idle')} color="yellow" />  }, // prettier-ignore
  {
    value: "failed",
    content: (
      <StateItem title={t("translation:filters:state_failed")} color="red" />
    ),
  },
];
export const states2Vals = (t: any): ISelectItem[] => [
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
  { value: "queued", content: <StateItem title={t('translation:filters:state_queued')}  color="gray" /> }, // prettier-ignore
  { value: "in_progress", content: <StateItem title={t('translation:filters:state_inProgress')}  color="yellow" /> }, // prettier-ignore
  {
    value: "failed",
    content: (
      <StateItem title={t("translation:filters:state_failed")} color="red" />
    ),
  },
];

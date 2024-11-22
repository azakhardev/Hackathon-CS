import { ISelectItem } from "@/components/SelectInput";
import {
  CircleIcon,
  HammerIcon,
  ServerIcon,
  TestTubeDiagonalIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

export const actionsVals: ISelectItem[] = [
  {
    value: "csas-dev-csas-linux",
    content: (
      <IconItem
        title="Build"
        icon={<HammerIcon size={15} />}
        text="Build runners"
      />
    ),
  },
  {
    value: "csas-dev-csas-linux-test",
    content: (
      <IconItem
        title="Test"
        icon={<TestTubeDiagonalIcon size={15} />}
        text="Test runners"
      />
    ),
  },
  {
    value: "csas-ops-csas-linux",
    content: (
      <IconItem
        title="DEV"
        icon={<ServerIcon size={15} />}
        text="DEV deployers"
      />
    ),
  },
  {
    value: "csas-ops-csas-linux-prod",
    content: (
      <IconItem
        title="PROD"
        icon={<ServerIcon size={15} className="stroke-log_red" />}
        text="PROD deployers"
      />
    ),
  },
];

export const statesVals: ISelectItem[] = [
  { value: "active", content: <StateItem title="Active" color="green" /> },
  { value: "offline", content: <StateItem title="Offline" color="gray" /> }, // prettier-ignore
  { value: "idle", content: <StateItem title="Idle" color="yellow" />  }, // prettier-ignore
  { value: "failed", content: <StateItem title="Failed" color="red" /> },
];
export const states2Vals: ISelectItem[] = [
  { value: "success", content: <StateItem title="Success" color="green" /> },
  { value: "queued", content: <StateItem title="Queued" color="gray" /> }, // prettier-ignore
  { value: "in_progress", content: <StateItem title="In Progress" color="yellow" /> }, // prettier-ignore
  { value: "failed", content: <StateItem title="Failed" color="red" /> },
];
export function IconItem({
  title,
  icon,
  text,
}: {
  title?: string;
  icon?: React.ReactNode;
  text?: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex flex-row items-center gap-2">
            {icon}
            <span>{title}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function StateItem({ title, color }: { title: string; color: string }) {
  return (
    <div className="flex flex-row items-center">
      <CircleIcon size={8} className={`mr-2 fill-state_${color} stroke-none`} />
      <span>{title}</span>
    </div>
  );
}

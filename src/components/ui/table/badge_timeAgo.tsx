import { format } from "date-fns";
import { badgeVariants } from "../badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

export function Badge_timeAgo({ date }: { date: Date }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className={badgeVariants({ variant: "outline" })}>
            {timeAgo(date)}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{format(date, "dd. MM. yyyy HH:mm:ss")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function timeAgo(ts: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - ts.getTime()) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (weeks < 4) {
    return `${weeks} weeks ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
}

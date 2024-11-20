import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Link } from "react-router-dom";
import { WorkflowIcon } from "lucide-react";
import { buttonVariants } from "./ui/Button";

interface IconButtonProps {
  url: string;
  icon: React.ReactNode;
  text: string;
}

export default function IconButton({ url, icon, text }: IconButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link className={buttonVariants({ variant: "outline" })} to={url}>
            {icon}
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

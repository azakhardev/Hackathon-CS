import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/Button";

interface IconButtonProps {
  url: string;
  icon: React.ReactNode;
  text: string;
  tab?: string;
}

export default function IconButton({
  url,
  icon,
  text,
  tab = "",
}: IconButtonProps) {
  const fullUrl = `${url}?tabs=${tab}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            className={buttonVariants({ variant: "outline" })}
            to={url !== "" ? fullUrl : "#"}
          >
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

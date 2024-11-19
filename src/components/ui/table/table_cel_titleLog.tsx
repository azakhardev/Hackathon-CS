import { NodeColor } from "@/components/Node";
import React from "react";

const textClasses: Record<NodeColor, string> = {
  gray: "text-state_gray",
  green: "text-state_green",
  yellow: "text-state_yellow",
  red: "text-state_red",
  log_yellow: "text-log_yellow",
  log_blue: "text-log_blue",
  log_red: "text-log_red",
};

interface TableCelTitleProps {
  title: string;
  text: string;
  icon: JSX.Element;
  color: NodeColor;
}
const TableCelTitleLog: React.FC<TableCelTitleProps> = ({
  title,
  text,
  icon,
  color,
}) => {
  return (
    <div className="flex items-center justify-center gap-3">
      {icon}
      <div className="flex flex-col">
        <div className={`text-base font-semibold ${textClasses[color]}`}>
          {title}
        </div>
        <div className="text-sm font-light text-muted-foreground">{text}</div>
      </div>
    </div>
  );
};

export default TableCelTitleLog;

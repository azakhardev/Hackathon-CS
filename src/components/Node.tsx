export type NodeColor =
  | "gray"
  | "green"
  | "yellow"
  | "red"
  | "log_yellow"
  | "log_blue"
  | "log_red";
export type NodeDirection = "up" | "down" | "left" | "right" | "none" | "<-";

export interface NodeProps {
  isBorder?: boolean;
  isActive?: boolean;
  color?: NodeColor;
  direction?: NodeDirection;
  size?: number;
  lineLength?: number;
}

export default function StateNode({
  isBorder = false,
  isActive = false,
  color = "gray",
  direction = "left",
  size = 12,
  lineLength = 10,
}: NodeProps) {
  const isBefore = direction === "<-" || direction === "up";
  const isCol = direction === "up" || direction === "down";
  const isLine = direction === "none";

  // Simplified color mapping
  const colorClasses: Record<NodeColor, string> = {
    gray: "bg-state_gray",
    green: "bg-state_green",
    yellow: "bg-state_yellow",
    red: "bg-state_red",
    log_yellow: "bg-log_yellow",
    log_blue: "bg-log_blue",
    log_red: "bg-log_red",
  };

  const borderClasses: Record<NodeColor, string> = {
    gray: "border-state_gray",
    green: "border-state_green",
    yellow: "border-state_yellow",
    red: "border-state_red",
    log_yellow: "border-log_yellow",
    log_blue: "border-log_blue",
    log_red: "border-log_red",
  };

  const nodeClass = isBorder
    ? `border border-1 ${borderClasses[color]}`
    : colorClasses[color];

  const circleStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: "100%",
    display: "inline-block",
  };

  const lineStyle: React.CSSProperties = {
    width: isCol ? 1.28 : lineLength, // Thickness of the line if vertical; otherwise, length of the line
    height: isCol ? lineLength : 1.28, // Length of the line if vertical; otherwise, thickness of the line
  };

  return (
    <div className={`flex items-center ${isCol ? "flex-col" : "flex-row"}`}>
      {isBefore && !isLine && (
        <div
          style={lineStyle}
          className={isActive ? colorClasses["gray"] : colorClasses[color]}
        ></div>
      )}
      <div
        style={circleStyle}
        className={`${nodeClass} transition-transform hover:scale-150`}
      ></div>
      {!isBefore && !isLine && (
        <div
          style={lineStyle}
          className={isActive ? colorClasses["gray"] : colorClasses[color]}
        ></div>
      )}
    </div>
  );
}

// Tailwind
// wierd cashing, it needs to find load the variables then is ok but on rebuild is not visible

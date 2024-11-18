export default function StateNode({
  isBorder = false,
  isActive = false,
  color = "state_gray",
  direction = "left", //up, down, left, right or none
  size = 12,
  lineLength = 10,
}) {
  const isBefore = direction === "<-" || direction === "up";
  const isCol = direction === "up" || direction === "down";
  const isLine = direction === "none";
  const lineColor = "bg-" + (isActive ? "state_gray" : color);
  color = isActive ? "state_yellow" : color;
  color = isBorder ? `border border-1 border-${color}` : `bg-${color}`;

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
        <div style={lineStyle} className={`${lineColor}`}></div>
      )}
      <div style={circleStyle} className={`${color}`}></div>
      {!isBefore && !isLine && (
        <div style={lineStyle} className={`${lineColor}`}></div>
      )}
    </div>
  );
}

// Tailwind
// wierd cashing, it needs to find load the variables then is ok but on rebuild is not visible

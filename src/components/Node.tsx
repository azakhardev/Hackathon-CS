export default function StateNode({
  isBorder = false,
  isActive = false,
  color = "state_gray",
  direction = "left",
  size = 12,
  lineLength = 10,
}) {
  const isBefore = direction === "<-" || direction === "up";
  const isCol = direction === "up" || direction === "down";
  const isLine = direction === "none";

  // Use complete class names instead of dynamic construction
  const getNodeClass = () => {
    if (isActive) {
      return isBorder
        ? "border border-1 border-state_yellow"
        : "bg-state_yellow";
    }
    return isBorder ? `border border-1 border-${color}` : `bg-${color}`;
  };

  const getLineClass = () => {
    return isActive ? "bg-state_gray" : `bg-${color}`;
  };

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
        <div style={lineStyle} className={getLineClass()}></div>
      )}
      <div style={circleStyle} className={getNodeClass()}></div>
      {!isBefore && !isLine && (
        <div style={lineStyle} className={getLineClass()}></div>
      )}
    </div>
  );
}

// Tailwind
// wierd cashing, it needs to find load the variables then is ok but on rebuild is not visible

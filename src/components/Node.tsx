export default function StateNode({
  color = "red",
  direction = "left", //up, down, left, right or none
  size = 12,
  lineLength = 10,
}) {
  const isBefore = direction === "<-" || direction === "up";
  const isCol = direction === "up" || direction === "down";
  const isLine = direction === "none";

  const circleStyle: React.CSSProperties = {
    width: size,
    height: size,
    backgroundColor: color,
    borderRadius: "100%",
    display: "inline-block",
  };

  const lineStyle: React.CSSProperties = {
    width: isCol ? 1.28 : lineLength, // Thickness of the line if vertical; otherwise, length of the line
    height: isCol ? lineLength : 1.28, // Length of the line if vertical; otherwise, thickness of the line
    backgroundColor: color,
  };

  return (
    <div className={`flex items-center ${isCol ? "flex-col" : ""}`}>
      {isBefore && !isLine && <div style={lineStyle}></div>}
      <div style={circleStyle}></div>
      {!isBefore && !isLine && <div style={lineStyle}></div>}
    </div>
  );
}

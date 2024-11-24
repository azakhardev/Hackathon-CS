import H1 from "./ui/typography/H1";
import H2 from "./ui/typography/H2";

export default function DetailHeader({
  title = "More",
}: {
  section: string;
  title: string;
}) {
  return (
    <div>
      {/* <H2>{section}</H2> */}
      <H1>{title}</H1>
    </div>
  );
}

export function DetailRunnerHeader({
  section = "",
  title = "More",
  state = "",
}: {
  section: string;
  title: string;
  state?: string;
}) {
  const color = findColor(state);
  return (
    <div>
      <div className="flex items-center gap-3">
        <H2>{section}</H2>
        <div className="flex items-center justify-center h-full">
          <div
            style={{ "--circle-color": color } as React.CSSProperties}
            className="circle-static"
          ></div>
          <div
            style={{ "--circle-color": color } as React.CSSProperties}
            className="circle-pulse"
          ></div>
        </div>
      </div>
      <H1>{title}</H1>
    </div>
  );
}

function findColor(state: string) {
  //TODO: add tooltip => Runner is active
  switch (state) {
    case "idle":
      return "hsl(35, 100%, 52%)";
    case "active":
      return "hsl(163, 72%, 41%)";
    case "failed":
      return "hsl(0, 100%, 63%)";
    default:
      return "hsl(0, 0%, 20%)";
  }
}

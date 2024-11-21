import H1 from "./ui/typography/H1";
import H2 from "./ui/typography/H2";

export default function DetailHeader({
  section = "",
  title = "More",
}: {
  section: string;
  title: string;
}) {
  return (
    <div>
      <H2>{section}</H2>
      <H1>{title}</H1>
    </div>
  );
}

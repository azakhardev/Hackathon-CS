import H1 from "@/components/ui/typography/H1";
import RunnersDataTable from "../../components/features/runners/RunnersDataTable";

export default function RunnersPage() {
  return (
    <div>
      <H1>Runners</H1>
      <RunnersDataTable isNav={true} limit2={25} />
    </div>
  );
}

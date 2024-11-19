import H1 from "@/components/ui/typography/H1";
import AutomationsDataTable from "./AutomationsDataTable";

export default function AutomationsPage() {
  return (
    <>
      <H1>Automations</H1>
      <AutomationsDataTable isNav={true} limit={-1} />
    </>
  );
}

import H1 from "@/components/ui/typography/H1";
import { useParams } from "react-router-dom";
import H2 from "@/components/ui/typography/H2";
import LogsDataTable from "@/components/features/automations/detail/LogsDataTable";

export default function AutomationDetailPage() {
  const params = useParams();
  const automationId = params.id;
  if (!automationId) throw new Error("Automation ID is missing");

  return (
    <>
      <H1>Automations → {automationId.slice(-5)}</H1>

      <H2>Logs</H2>
      <LogsDataTable automationId={automationId} />
    </>
  );
}

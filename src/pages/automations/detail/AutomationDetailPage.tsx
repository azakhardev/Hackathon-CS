import { useParams } from "react-router-dom";
import H2 from "@/components/ui/typography/H2";
import LogsDataTable from "@/components/features/automations/detail/LogsDataTable";
import DetailHeader from "@/components/DetailHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { userValidate } from "@/lib/utils/validateUser";

export default function AutomationDetailPage() {
  userValidate();
  const params = useParams();
  const automationId = params.id;
  if (!automationId) throw new Error("Automation ID is missing");

  return (
    <>
      <DetailHeader section="Automation" title={automationId.slice(-5)} />
      <Breadcrumbs type="automationLogs" />
      <H2>Logs</H2>
      <LogsDataTable automationId={automationId} />
    </>
  );
}

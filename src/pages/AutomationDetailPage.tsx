import H1 from "@/components/features/H1";
import LogsTable from "@/components/features/tables/LogsTable";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { AutomationModel } from "@/lib/Models/AutomationModel";
import { IAutomationLog } from "@/lib/types/IAutomationLog";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function AutomationDetailPage() {
  const params = useParams();
  const automationId = params.id;

  const automationQuery = useQuery({
    queryKey: ["automation", automationId],
    queryFn: async () => await AutomationModel.getAutomationById(automationId!),
  });

  const logsQuery = useQuery({
    queryKey: ["automationLogs", automationId],
    queryFn: async () => await AutomationModel.getAutomationLogs(automationId!),
  });

  if (automationQuery.data && "error" in automationQuery.data) {
    return (
      <ErrorMessage errorMessage={automationQuery.data as IErrorMessage} />
    );
  }

  if (logsQuery.data && "error" in logsQuery.data) {
    return <ErrorMessage errorMessage={logsQuery.data as IErrorMessage} />;
  }

  return (
    <>
      <H1>Automations Detail</H1>
      {!automationQuery.isLoading && <div>Tady budou nějaké grafy</div>}
      {(automationQuery.isLoading || logsQuery.isLoading) && (
        <div className="loader-wrap">
          <div className="loading-spinner"></div>
        </div>
      )}
      {!automationQuery.isLoading && !logsQuery.isLoading && (
        <LogsTable logs={logsQuery.data as IAutomationLog[]} />
      )}
    </>
  );
}

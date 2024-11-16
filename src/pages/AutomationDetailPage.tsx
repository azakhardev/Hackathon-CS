import LogsTable from "@/components/features/tables/LogsTable";
import { AutomationModel } from "@/lib/Models/AutomationModel";
import { IAutomationLog } from "@/lib/types/IAutomationLog";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function AutomationDetailPage() {
  const params = useParams();
  const automationId = params.id;

  const automation = useQuery({
    queryKey: ["automation", automationId],
    queryFn: async () => await AutomationModel.getAutomationById(automationId!),
  });

  const logs = useQuery({
    queryKey: ["automationLogs", automationId],
    queryFn: async () => await AutomationModel.getAutomationLogs(automationId!),
  });

  console.log(automation);
  console.log(logs);

  return (
    <main>
      <h1>Automations Detail</h1>
      {!automation.isLoading && <div>Tady budou nějaké grafy</div>}
      {(automation.isLoading || logs.isLoading) && (
        <div className="loader-wrap">
          <div className="loading-spinner"></div>
        </div>
      )}
      {!automation.isLoading && !logs.isLoading && (
        <LogsTable logs={logs.data as IAutomationLog[]} />
      )}
    </main>
  );
}

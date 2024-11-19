import LogsTable from "@/pages/automations/detail/LogsTable";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { AutomationModel } from "@/pages/automations/_shared/AutomationModel";
import { IAutomationLog } from "@/pages/automations/detail/IAutomationLog";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { useQuery } from "@tanstack/react-query";

export default function LogsDataTable({
  automationId,
}: {
  automationId: string;
}) {
  const automationQuery = useQuery({
    queryKey: ["automation", automationId],
    queryFn: async () => await AutomationModel.getAutomationById(automationId!),
  });

  const logsQuery = useQuery({
    queryKey: ["automationLogs", automationId],
    queryFn: async () => await AutomationModel.getAutomationLogs(automationId!),
  });

  if (automationQuery.data && "error" in automationQuery.data)
    return (
      <ErrorMessage errorMessage={automationQuery.data as IErrorMessage} />
    );
  if (logsQuery.data && "error" in logsQuery.data)
    return <ErrorMessage errorMessage={logsQuery.data as IErrorMessage} />;

  console.log(logsQuery.data);
  return (
    <>
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

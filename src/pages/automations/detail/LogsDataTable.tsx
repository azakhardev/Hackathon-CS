import LogsTable from "@/pages/automations/detail/LogsTable";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { AutomationModel } from "@/pages/automations/_shared/AutomationModel";
import { IAutomationLog } from "@/pages/automations/detail/IAutomationLog";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { IAutomationType } from "../automationTypes/IAutomationType";

export default function LogsDataTable({
  automationId,
}: {
  automationId: string;
}) {
  const logsQuery = useQuery({
    queryKey: ["automationLogs", automationId],
    queryFn: async () => await AutomationModel.getAutomationLogs(automationId!),
  });

  const automationsTypesQuery = useQuery({
    queryKey: ["automationTypes"],
    queryFn: async () => await AutomationModel.getAutomationTypes("", 9999),
  });
  const automationQuery = useQuery({
    queryKey: ["automation", automationId],
    queryFn: async () => await AutomationModel.getAutomationById(automationId!),
  });

  if (automationQuery.data && "error" in automationQuery.data)
    <ErrorMessage errorMessage={automationQuery.data as IErrorMessage} />;
  if (logsQuery.data && "error" in logsQuery.data)
    return <ErrorMessage errorMessage={logsQuery.data as IErrorMessage} />;

  // Data joining logic
  if (!logsQuery.data || !automationsTypesQuery.data)
    return <h1>Error at data joining</h1>;
  const logsWithTypes = (logsQuery.data as IAutomationLog[]).map(
    (log: IAutomationLog) => {
      const matchedType = Array.isArray(automationsTypesQuery.data)
        ? automationsTypesQuery.data.find((type: IAutomationType) => type.type === log.type) : null; //prettier-ignore
      return { ...log, type_object: matchedType || null };
    }
  );
  if (logsWithTypes === undefined || automationsTypesQuery === null)
    return <h1>Error at data joining</h1>;

  return (
    <>
      {(automationQuery.isLoading || logsQuery.isLoading) && (
        <div className="loader-wrap">
          <div className="loading-spinner"></div>
        </div>
      )}
      {!automationQuery.isLoading && !logsQuery.isLoading && (
        <LogsTable logs={logsWithTypes as IAutomationLog[]} />
      )}
    </>
  );
}

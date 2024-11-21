import ErrorMessage from "@/components/ui/ErrorMessage";
import { AutomationModel } from "@/lib/models/AutomationModel";
import { IAutomationLog } from "@/lib/types/IAutomationLog";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { useQuery } from "@tanstack/react-query";
import LogsTable from "./LogsTable";
import { IAutomationType } from "@/lib/types/IAutomationType";
import Throbber from "@/components/ui/Throbber";

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
    return (
      <ErrorMessage errorMessage={automationQuery.data as IErrorMessage} />
    );
  if (logsQuery.data && "error" in logsQuery.data)
    return <ErrorMessage errorMessage={logsQuery.data as IErrorMessage} />;
  if (automationsTypesQuery.data && "error" in automationsTypesQuery.data)
    return (
      <ErrorMessage
        errorMessage={automationsTypesQuery.data as IErrorMessage}
      />
    );

  if (automationQuery.error || automationsTypesQuery.error || logsQuery.error) {
    const error: IErrorMessage = {
      code: "500",
      error: "Internal server error",
      message: "Server responded with undefined",
    };
    return <ErrorMessage errorMessage={error}></ErrorMessage>;
  }

  if (
    automationQuery.isLoading ||
    logsQuery.isLoading ||
    automationsTypesQuery.isLoading
  ) {
    return <Throbber />;
  }

  // Data joining logic
  // if (!logsQuery.data || !automationsTypesQuery.data)
  //   return <h1>Error at data joining</h1>;
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
      {!automationQuery.isLoading && !logsQuery.isLoading && (
        <LogsTable logs={logsWithTypes as IAutomationLog[]} />
      )}
    </>
  );
}

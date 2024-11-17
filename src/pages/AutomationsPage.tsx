import { AutomationModel } from "@/lib/Models/AutomationModel";
import { useQuery } from "@tanstack/react-query";
import AutomationsTable from "@/components/features/tables/AutomationsTable";
import { IAutomation } from "@/lib/types/IAutomation";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function AutomationsPage() {
  const automationsQuery = useQuery({
    queryKey: ["automation"],
    queryFn: async () => await AutomationModel.getAutomations(),
  });

  if (automationsQuery.data && "error" in automationsQuery.data) {
    return (
      <ErrorMessage errorMessage={automationsQuery.data as IErrorMessage} />
    );
  }

  return (
    <>
      <h1>Automatizace</h1>
      {automationsQuery.isLoading && (
        <div className="loader-wrap">
          <div className="loading-spinner"></div>
        </div>
      )}
      {!automationsQuery.isLoading && (
        <AutomationsTable
          automations={automationsQuery.data as IAutomation[]}
        />
      )}
    </>
  );
}

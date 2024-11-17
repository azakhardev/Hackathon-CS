import { AutomationModel } from "@/lib/Models/AutomationModel";
import { useQuery } from "@tanstack/react-query";
import AutomationsTable from "@/pages/automations/components/AutomationsTable";
import { IAutomation } from "@/lib/types/IAutomation";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import ErrorMessage from "@/components/ui/ErrorMessage";
import H1 from "@/components/H1";

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
      <H1>Automatizace</H1>
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

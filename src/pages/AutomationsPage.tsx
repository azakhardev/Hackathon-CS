import { AutomationModel } from "@/lib/Models/AutomationModel";
import { useQuery } from "@tanstack/react-query";
import AutomationsTable from "@/components/features/tables/AutomationsTable";
import { IAutomation } from "@/lib/types/IAutomation";

export default function AutomationsPage() {
  const automations = useQuery({
    queryKey: ["automation"],
    queryFn: async () => await AutomationModel.getAutomations(),
  });

  return (
    <main>
      <h1>Automatizace</h1>
      {automations.isLoading && (
        <div className="loader-wrap">
          <div className="loading-spinner"></div>
        </div>
      )}
      {!automations.isLoading && (
        <AutomationsTable automations={automations.data as IAutomation[]} />
      )}
    </main>
  );
}

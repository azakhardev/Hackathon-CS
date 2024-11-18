import { AutomationModel } from "@/pages/automations/api/AutomationModel";
import { useQuery } from "@tanstack/react-query";
import AutomationsTable from "@/pages/automations/components/AutomationsTable";
import { IAutomation } from "@/pages/automations/types/IAutomation";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import ErrorMessage from "@/components/ui/ErrorMessage";
import H1 from "@/components/ui/typography/H1";
import { IAutomationType } from "./types/IAutomationType";

export default function AutomationsPage() {
  const automationsQuery = useQuery({
    queryKey: ["automation"],
    queryFn: async () => await AutomationModel.getAutomations(),
  });
  const automationsTypesQuery = useQuery({
    queryKey: ["automationTypes"],
    queryFn: async () => await AutomationModel.getAutomationTypes(),
  });

  if (automationsQuery.data && "error" in automationsQuery.data) {
    return (
      <ErrorMessage errorMessage={automationsQuery.data as IErrorMessage} />
    );
  }

  if (!automationsQuery.data && !!automationsQuery.isLoading) {
    const error: IErrorMessage = {
      code: "500",
      error: "Internal server error",
      message: "Server responded with undefined",
    };
    return <ErrorMessage errorMessage={error}></ErrorMessage>;
  }

  // Data joining logic
  const automationsWithTypes = automationsQuery.data?.map(
    (automation: IAutomation) => {
      const matchedType = Array.isArray(automationsTypesQuery.data)
        ? automationsTypesQuery.data.find(
            (type: IAutomationType) => type.type === automation.type
          )
        : null;

      // Return enriched object with type_object property
      return {
        ...automation,
        type_object: matchedType || null, // Attach the matched type or null if not found
      };
    }
  );
  if (automationsWithTypes === undefined || automationsTypesQuery === null) {
    return <H1>automationsWithTypes</H1>;
  }

  return (
    <>
      <H1>Automations</H1>
      {automationsQuery.isLoading && (
        <div className="loader-wrap">
          <div className="loading-spinner"></div>
        </div>
      )}
      {!automationsQuery.isLoading && (
        <AutomationsTable automations={automationsWithTypes as IAutomation[]} />
      )}
    </>
  );
}

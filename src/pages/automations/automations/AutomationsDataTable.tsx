import { AutomationModel } from "@/lib/models/AutomationModel";
import { useQuery } from "@tanstack/react-query";
import AutomationsTable from "@/pages/automations/automations/AutomationsTable";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import ErrorMessage from "@/components/ui/ErrorMessage";
import H1 from "@/components/ui/typography/H1";
import { IAutomationType } from "../../../lib/types/IAutomationType";
import { IAutomation } from "@/lib/types/IAutomation";

export default function AutomationsDataTable({
  limit = 9999,
  isNav = false,
}: {
  limit: number | undefined;
  isNav: boolean | undefined;
}) {
  const automationsQuery = useQuery({
    queryKey: ["automation"],
    queryFn: async () =>
      await AutomationModel.getAutomations(
        "",
        limit,
        undefined,
        "last_activity",
        "desc"
      ),
  });
  const automationsTypesQuery = useQuery({
    queryKey: ["automationTypes"],
    queryFn: async () => await AutomationModel.getAutomationTypes("", 9999),
  });

  if (automationsQuery.data && "error" in automationsQuery.data)
    <ErrorMessage errorMessage={automationsQuery.data as IErrorMessage} />;

  if (automationsQuery.error || automationsTypesQuery.error) {
    const error: IErrorMessage = {
      code: "500",
      error: "Internal server error",
      message: "Server responded with undefined",
    };
    return <ErrorMessage errorMessage={error}></ErrorMessage>;
  }

  if (automationsQuery.isLoading || automationsTypesQuery.isLoading) {
    return (
      <div className="loader-wrap">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Data joining logic
  const automationsWithTypes = (automationsQuery.data as IAutomation[]).map(
    (automation: IAutomation) => {
      const matchedType = Array.isArray(automationsTypesQuery.data)
        ? automationsTypesQuery.data.find(
            (type: IAutomationType) => type.type === automation.type
          )
        : null;
      return { ...automation, type_object: matchedType || null };
    }
  );

  return (
    <>
      <AutomationsTable automations={automationsWithTypes as IAutomation[]} />
    </>
  );
}

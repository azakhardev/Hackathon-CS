import { AutomationModel } from "@/pages/automations/_shared/AutomationModel";
import { useQuery } from "@tanstack/react-query";
import AutomationsTable from "@/pages/automations/automations/AutomationsTable";
import { IAutomation } from "@/pages/automations/_shared/IAutomation";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import ErrorMessage from "@/components/ui/ErrorMessage";
import H1 from "@/components/ui/typography/H1";
import { IAutomationType } from "../automationTypes/IAutomationType";

export default function AutomationsDataTable({
  limit = -1,
  isNav = true,
}: {
  limit: number | undefined;
  isNav: boolean;
}) {
  const automationsQuery = useQuery({
    queryKey: ["automation"],
    queryFn: async () =>
      await AutomationModel.getAutomations(
        "",
        undefined,
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
  if (!automationsQuery.data && !automationsQuery.isLoading) {
    const error: IErrorMessage = {
      code: "500",
      error: "Internal server error",
      message: "Server responded with undefined",
    };
    return <ErrorMessage errorMessage={error}></ErrorMessage>;
  }

  // Data joining logic
  if (!automationsQuery.data || !automationsTypesQuery.data)
    return <H1>Error at data joining</H1>;

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

  console.log(limit, isNav);
  return (
    <>
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

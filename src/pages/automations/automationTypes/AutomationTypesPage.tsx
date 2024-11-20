import AutomationTypesDataTable from "@/components/features/automations/automationTypes/AutomationsTypeDataTable";
import H1 from "@/components/ui/typography/H1";

export default function AutomationTypesPage() {
  return (
    <>
      <H1>Automation Types</H1>
      <AutomationTypesDataTable isNav={true} limit={-1} />
    </>
  );
}

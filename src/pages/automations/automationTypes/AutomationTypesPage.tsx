import AutomationTypesDataTable from "@/components/features/automations/automationTypes/AutomationsTypeDataTable";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import H1 from "@/components/ui/typography/H1";
import { userValidate } from "@/lib/utils/validateUser";

export default function AutomationTypesPage() {
  userValidate();
  return (
    <>
      <H1>Automation Types</H1>
      <AutomationTypesDataTable isNav={true} limit={9999} />
    </>
  );
}

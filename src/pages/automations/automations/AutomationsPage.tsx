import H1 from "@/components/ui/typography/H1";
import AutomationsDataTable from "./AutomationsDataTable";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { userValidate } from "@/lib/utils/validateUser";

export default function AutomationsPage() {
  userValidate();
  return (
    <>
      <H1>Automations</H1>
      <Breadcrumbs />
      <AutomationsDataTable limit={undefined} isNav={true} />
    </>
  );
}

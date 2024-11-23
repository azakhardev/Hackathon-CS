import H1 from "@/components/ui/typography/H1";
import RunnersDataTable from "../../components/features/runners/RunnersDataTable";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { userValidate } from "@/lib/utils/validateUser";

export default function RunnersPage() {
  userValidate();
  return (
    <div>
      <H1>Runners</H1>
      <Breadcrumbs />
      <RunnersDataTable isNav={true} limit2={25} />
    </div>
  );
}

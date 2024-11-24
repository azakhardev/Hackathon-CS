import H1 from "@/components/ui/typography/H1";
import JobsDataTable from "../../components/features/jobs/JobDataTable";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { userValidate } from "@/lib/utils/validateUser";

export default function JobsPage() {
  userValidate();

  return (
    <>
      <H1>Jobs</H1>
      <JobsDataTable limit={25} isNav={true} />
    </>
  );
}

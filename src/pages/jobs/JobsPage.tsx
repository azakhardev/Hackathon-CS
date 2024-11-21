import H1 from "@/components/ui/typography/H1";
import JobsDataTable from "../../components/features/jobs/JobDataTable";

export default function JobsPage() {
  return (
    <>
      <H1>Jobs</H1>
      <JobsDataTable limit={25} isNav={true} />
    </>
  );
}

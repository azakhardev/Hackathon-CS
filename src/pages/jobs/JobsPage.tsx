import H1 from "@/components/ui/typography/H1";
import JobsDataTable from "./components/JobDataTable";

export default function JobsPage() {
  return (
    <>
      <H1>Jobs</H1>
      <JobsDataTable limit={-1} isNav={true} />
    </>
  );
}

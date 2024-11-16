import { useQuery } from "@tanstack/react-query";
import { RunnerModel } from "@/lib/Models/RunnerModel";
import RunnersTable from "@/components/features/tables/RunnersTable";
import { IRunner } from "@/lib/types/IRunner";
import { useSearchParams } from "react-router-dom";
import { group } from "console";

export default function RunnersPage() {
  const [searchParams] = useSearchParams();

  const grp = searchParams.get("grp") ?? "";
  const org = searchParams.get("org") ?? "";

  const runnersQuery = useQuery({
    queryKey: ["runners"],
    queryFn: async () => await RunnerModel.getRunners(),
  });

  let filteredRunners: IRunner[] = [];
  if (!runnersQuery.isLoading) {
    filteredRunners = (runnersQuery.data as IRunner[]).filter(
      (runner: IRunner) => {
        let matchesGroup = true;
        let matchesOrganization = true;

        if (grp) {
          matchesGroup = runner.runner_group === grp;
        }

        if (org) {
          matchesOrganization = runner.organization === org;
        }

        return matchesGroup && matchesOrganization;
      }
    );
  }

  return (
    <main>
      <h1>Runners</h1>
      {runnersQuery.isLoading && (
        <div className="loader-wrap">
          <div className="loading-spinner"></div>
        </div>
      )}
      {!runnersQuery.isLoading && <RunnersTable runners={filteredRunners} />}
    </main>
  );
}

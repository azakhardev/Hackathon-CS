import { useParams } from "react-router-dom";
import { CircleIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DetailHeader from "@/components/DetailHeader";
import JobsDataTable from "@/components/features/jobs/JobDataTable";
import AutomationsDataTable from "../automations/automations/AutomationsDataTable";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { userValidate } from "@/lib/utils/validateUser";

export default function ProjectDetailPage() {
  userValidate();
  const params = useParams();
  const id = params.id;

  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tabs");
  const defaultTab = tabParam || "jobs";

  const title = id?.split("_")[1] ?? "";
  return (
    <main>
      <div>
        <DetailHeader section="Project" title={title} />
        <Breadcrumbs type="project" />
        <div>
          <Tabs defaultValue={defaultTab}>
            <TabsList className="bg-[#27272A] text-gray-500 w-[200px]">
              <TabsTrigger className="w-[100px]" value="jobs">
                Jobs
              </TabsTrigger>
              <TabsTrigger className="w-[100px]" value="automations">
                Automations
              </TabsTrigger>
            </TabsList>
            <TabsContent value="jobs">
              <JobsDataTable limit={25} isNav={true} id={id} />
            </TabsContent>
            <TabsContent value="automations">
              <AutomationsDataTable limit={25} isNav={true} id={id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}

function StateItem({ title, color }: { title: string; color: string }) {
  return (
    <div className="flex flex-row items-center">
      <CircleIcon size={8} className={`mr-2 fill-state_${color} stroke-none`} />
      <span>{title}</span>
    </div>
  );
}

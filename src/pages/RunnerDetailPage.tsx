import H1 from "@/components/features/H1";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { RunnerModel } from "@/lib/Models/RunnerModel";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/ui/DatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RunnerDetailPage() {
  const params = useParams();
  const runnerId = params.id;

  const runnerQuery = useQuery({
    queryKey: ["runner", runnerId],
    queryFn: async () => await RunnerModel.getRunnerById(runnerId!),
  });

  const metricsQuery = useQuery({
    queryKey: ["runnerMetrics", runnerId],
    queryFn: async () => await RunnerModel.getMetricsByRunner(runnerId!),
  });

  const jobsQuery = useQuery({
    queryKey: ["runnerJobs", runnerId],
    queryFn: async () => await RunnerModel.getJobs(),
  });

  if (runnerQuery.data && "error" in runnerQuery.data) {
    return <ErrorMessage errorMessage={runnerQuery.data as IErrorMessage} />;
  }

  if (metricsQuery.data && "error" in metricsQuery.data) {
    return <ErrorMessage errorMessage={metricsQuery.data as IErrorMessage} />;
  }

  if (jobsQuery.data && "error" in jobsQuery.data) {
    return <ErrorMessage errorMessage={jobsQuery.data as IErrorMessage} />;
  }

  return (
    <main>
      {runnerQuery.isLoading &&
      metricsQuery.isLoading &&
      jobsQuery.isLoading ? (
        <div className="loader-wrap">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        runnerQuery.data && (
          <div>
            <div className="h-[10dvh] border-b-2 flex items-center">
              <h2 className="text-[24px] ml-10 font-bold">{`Runner > ${
                runnerQuery.data.id?.split("-")[5] ?? ""
              }`}</h2>
            </div>
            <div className="p-10 w-full h-[80dvh]">
              <Tabs defaultValue="jobs">
                <TabsList className="bg-[#27272A] text-gray-500 w-[200px]">
                  <TabsTrigger className="w-[100px]" value="jobs">
                    Jobs
                  </TabsTrigger>
                  <TabsTrigger className="w-[100px]" value="Metrics">
                    Metrics
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="jobs">
                  <div className="grid grid-cols-5 gap-10 mt-5">
                    <Input className="text-white border-grey-100" placeholder="find.." />
                    <DatePickerWithRange className="pl-[300px]" />
                    <Select>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="All runners"></SelectValue>
                      </SelectTrigger>
                      <SelectContent className="w-[50px]">
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="All runners"></SelectValue>
                      </SelectTrigger>
                      <SelectContent className="w-[50px]">
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="All runners"></SelectValue>
                      </SelectTrigger>
                      <SelectContent className="w-[50px]">
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )
      )}
    </>
  );
}

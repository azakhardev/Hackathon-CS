import { useQuery } from "@tanstack/react-query";
import { RunnerModel } from "../../lib/Models/RunnerModel";
import { useState } from "react";
import { IErrorMessage } from "../../lib/types/IErrorMessage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ErrorMessage from "../ui/ErrorMessage";
import { IJobs } from "../../lib/types/IJobs";
import { format } from "date-fns";

export default function Runners() {
  const [selectedSAS, setSelectedSAS] = useState<string>("");
  const [selectedJobRunner, setSelectedJobRunner] = useState<string>("");

  const sasQuery = useQuery({
    queryKey: ["sas"],
    queryFn: async () => await RunnerModel.getSAS(),
  });

  const runnersQuery = useQuery({
    queryKey: ["runners", selectedJobRunner],
    queryFn: async () => await RunnerModel.getRunnerById(selectedJobRunner),
    enabled: !!selectedJobRunner,
  });
  const metricsQuery = useQuery({
    queryKey: ["metrics", selectedJobRunner],
    queryFn: async () => await RunnerModel.getMetricsByRunner(selectedJobRunner),
    enabled: !!selectedJobRunner,
    gcTime: 0,
  })

  const jobsQuery = useQuery({
    queryKey: ["jobs", selectedSAS],
    queryFn: async () => await RunnerModel.getJobs(selectedSAS),
    gcTime: 0,
  });

  const handleClickRow = (sas: string) => {
    setSelectedSAS(sas);
  };

  if (sasQuery.error) return <div>Error: {sasQuery.error.message}</div>;
  if (runnersQuery.error) return <div>Error: {runnersQuery.error.message}</div>;

  if (jobsQuery.data && "error" in jobsQuery.data) {
    const errorData = jobsQuery.data as IErrorMessage;
    return <div>Error: {errorData.message}</div>;
  }

  if (sasQuery.data && "error" in sasQuery.data) {
    const errorData = sasQuery.data as IErrorMessage;
    return <ErrorMessage errorMessage={errorData} />;
  }

  if (runnersQuery.data && "error" in runnersQuery.data) {
    const errorData = runnersQuery.data as IErrorMessage;
    return <ErrorMessage errorMessage={errorData} />;
  }

  if (metricsQuery.data && "error" in metricsQuery.data) {
    const errorData = metricsQuery.data as IErrorMessage;
    return <ErrorMessage errorMessage={errorData} />;
  }

  if (runnersQuery.isLoading) { return (<div>Loading...</div>)}
  if (metricsQuery.isLoading) { return (<div>Loading...</div>)}
  
  console.log(metricsQuery.data)

  return (
    <div>
      <div className="flex flex-row">
        <div className="w-50 border-r-2 h-[50dvh] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SAS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-y-auto h-[90vh]">
              {sasQuery.data?.map((s: string, index: number) => (
                <TableRow
                  className="cursor-pointer"
                  key={index}
                  onClick={() => handleClickRow(s)}
                >
                  <TableCell>{s}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex-1 h-[50dvh] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SAS</TableHead>
                <TableHead>Id</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Runner</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>State</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-y-auto h-[90vh]">
              {jobsQuery.data?.map((job: IJobs, index: number) => (
                <TableRow onClick={() => {
                  setSelectedJobRunner(job.runner);
                }} key={index}>
                  <TableCell>{job.SAS}</TableCell>
                  <TableCell>{job.id}</TableCell>
                  <TableCell>{job.organization}</TableCell>
                  <TableCell>{job.runner}</TableCell>
                  <TableCell>{format(new Date(job.timestamp), 'dd. MM. yyyy HH:mm:ss')}</TableCell>
                  <TableCell>{job.state}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-50 border-r-2 h-[50dvh] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>id</TableHead>
                <TableHead>organizace</TableHead>
                <TableHead>skupina</TableHead>
                <TableHead>state</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-y-auto h-[90vh]">
              {runnersQuery.data && (
                <TableRow className="cursor-pointer">
                  <TableCell>{runnersQuery.data.id}</TableCell>
                  <TableCell>{runnersQuery.data.organization}</TableCell>
                  <TableCell>{runnersQuery.data.runner_group}</TableCell>
                  <TableCell>{runnersQuery.data.state}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex-1 h-[50dvh] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CPU</TableHead>
                <TableHead>fs_reads</TableHead>
                <TableHead>fs_writes</TableHead>
                <TableHead>memory</TableHead>
                <TableHead>network_receive</TableHead>
                <TableHead>network_transmit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="overflow-y-auto h-[90vh]">
              {metricsQuery.data && metricsQuery.data.metrics &&(
                metricsQuery.data?.metrics.map((metric, index) => (
                  <TableRow key={index}>
                  <TableCell>{metric.cpu}</TableCell>
                  <TableCell>{metric.fs_reads}</TableCell>
                  <TableCell>{metric.fs_writes}</TableCell>
                  <TableCell>{metric.memory}</TableCell>
                  <TableCell>{metric.network_receive}</TableCell>
                  <TableCell>{metric.network_transmit}</TableCell>
                </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
    
  );
}



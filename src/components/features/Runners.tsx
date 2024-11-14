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
import { IJobs } from "../../lib/types/IJobs";

export default function Runners() {

  const [jobsData, setJobsData] = useState<IJobs[] | IErrorMessage>([]);

  const sas = useQuery({
    queryKey: ["data"],
    queryFn: async () => await getSAS()
  });

  const getJobs = useMutation({
    mutationKey: ['jobs'],
    mutationFn: async (sas: string) => await RunnerModel.getJobs(sas),
    onSuccess: (data) => {
      setJobsData(data)
    }
  })

  const handleClickRow = (sas: string) => {
    getJobs.mutate(sas)
  }

  const runners = useQuery({
    queryKey: ["runners"],
    queryFn: async () => await RunnerModel.getRunners(),
  });

  const jobsQuery = useQuery({
    queryKey: ["jobs", selectedSAS],
    queryFn: async () => await RunnerModel.getJobs(selectedSAS),
  });

  const handleClickRow = (sas: string) => {
    setSelectedSAS(sas);
  };

  if (sas.error) return <div>Error: {sas.error?.message}</div>;
  if (runners.error) return <div>Error: {runners.error?.message}</div>;


  if (jobsQuery.data && "error" in jobsQuery.data) {
    const errorData = jobsQuery.data as IErrorMessage;
    return <div>Error: {errorData.message}</div>;
  }

  return (
    <div className="flex flex-row">
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead>SAS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sas.data?.map((s, index) => (
          <TableRow className="cursor-pointer" key={index} onClick={() => handleClickRow(s)}>
            <TableCell>{s}</TableCell>
          </TableRow>
          ))}
      </TableBody>
    </Table>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>SAS</TableHead>
          <TableHead>id</TableHead>
          <TableHead>organizace</TableHead>
          <TableHead>runner</TableHead>
          <TableHead>timestamp</TableHead>
          <TableHead>state</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobsData.map((data, index) => (
          <TableRow key={index}>
            <TableCell>{data.SAS}</TableCell>
            <TableCell>{data.id}</TableCell>
            <TableCell>{data.organization}</TableCell>
            <TableCell>{data.runner}</TableCell>
            <TableCell>{data.timestamp}</TableCell>
            <TableCell>{data.state}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
    // <div className="App">
    //   <div className="p-20 flex flex-col gap-5">
          
    //     <div className="p-20 flex flex-col">
    //       {jobs.data?.map((job, index) => (
    //         job.SAS === jobSas && (
    //           <button onClick={() => handleClickJobs(job.runner)} key={index}>
    //             {job.id} - SAS: {job.SAS} {job.runner}
    //           </button>
    //         )
    //       ))}
    //     </div>


    //      <div className="p-20">
    //       <h2>Runners Data:</h2>
    //       {runners.data?.map((runner, index) => (
    //         runner.id === runnerId && (
    //           <div key={index}>
    //             {runner.id} {runner.runner_group} {runner.organization} {runner.state}
    //           </div>
    //         )
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
}

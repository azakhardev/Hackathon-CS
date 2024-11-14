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

  const sasQuery = useQuery({
    queryKey: ["sas"],
    queryFn: async () => await RunnerModel.getSAS(),
  });

  const runnersQuery = useQuery({
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

  return (
    <div className="flex flex-row">
      <div className="w-50 border-r-2">
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
      <div className="flex-1">
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
              <TableRow key={index}>
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
  );
}



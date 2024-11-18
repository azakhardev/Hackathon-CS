import { IJobs } from "@/pages/jobs/types/IJobs";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  // TableCaption,
  // TableHead,
  // TableHeader,
} from "@/components/ui/table/table";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { Link } from "react-router-dom";
import { badgeVariants } from "@/components/ui/badge";
import { Table_cel_state } from "@/components/ui/table/table_cel_state";

interface IProps {
  jobs: IJobs[] | IErrorMessage;
}

export default function JobsTable(props: IProps) {
  return (
    <Table>
      {/* <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] text-white">Id</TableHead>
          <TableHead className="text-white">Status</TableHead>
          <TableHead className="text-white">Info</TableHead>
        </TableRow>
      </TableHeader> */}
      <TableBody>
        {(props.jobs as IJobs[]).map((j) => (
          <TableRow key={j.id}>
            <TableCell className="font-medium">{j.id}</TableCell>
            <JobCells {...j} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function JobCells(job: IJobs) {
  return (
    <>
      <TableCell>
        <Table_cel_state title={job.state} text="Date" type={job.state} />
      </TableCell>
      <TableCell>
        <Link
          to={"#" /*`/jobs/${job.runner}`*/}
          className={badgeVariants({ variant: "outline" })}
        >
          {job.SAS.toUpperCase().slice(4)}
        </Link>
        <span>was build by</span>
        <Link
          to={`/runners?grp=${job.organization}`}
          className={badgeVariants({ variant: "outline" })}
        >
          {job.runner.slice(job.runner.length - 5).toUpperCase()}
        </Link>
      </TableCell>
    </>
  );
}

import { IErrorMessage } from "@/lib/types/IErrorMessage";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  // TableCaption,
  // TableHead,
  // TableHeader,
} from "@/components/ui/table/table";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/Button";
import { IProject } from "@/lib/types/IProject";
import Table_cel_title from "@/components/ui/table/table_cel_title";
import { JobCells } from "@/pages/jobs/components/JobsTable";

interface IProps {
  projects: IProject[] | IErrorMessage;
}

export default function ProjectsTable(props: IProps) {
  return (
    <Table>
      <TableBody>
        {(props.projects as IProject[]).map((p) => (
          <TableRow key={p.name}>
            <TableCell className="font-medium">
              <Table_cel_title title={p.name.toUpperCase().slice(4)} text="" />
            </TableCell>
            <JobCells {...p.job} />
            <TableCell className="text-end">
              <Link
                className={buttonVariants({ variant: "outline" })}
                to={`/jobs?sas=${p.job.SAS}`}
              >
                Jobs
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

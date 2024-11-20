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
import { IProject } from "@/pages/projects/types/IProject";
import Table_cel_title from "@/components/ui/table/table_cel_title";
import { JobCells } from "@/pages/jobs/components/JobsTable";
import { CheckIcon, WorkflowIcon } from "lucide-react";
import IconButton from "@/components/IconButton";

interface IProps {
  projects: IProject[] | IErrorMessage;
}

export default function ProjectsTable(props: IProps) {
  return (
    <Table>
      <TableBody>
        {(props.projects as IProject[]).map((p) => {
          const name = p.name.toUpperCase().slice(4);
          return (
            <TableRow key={p.name}>
              <TableCell className="font-medium">
                <Table_cel_title title={name} text="" />
              </TableCell>
              <JobCells {...p.job} />
              <TableCell className="flex flex-row justify-end gap-2">
                <IconButton
                  url={`/projects/${p.job.SAS}`}
                  icon={<CheckIcon size={16} />}
                  text={`${name.toLowerCase()}'s JOBS`}
                />
                <IconButton
                  url={`/jobs?sas=${p.job.SAS}`}
                  icon={<WorkflowIcon size={16} />}
                  text={`${name.toLowerCase()}'s AUTOMATIONS`}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

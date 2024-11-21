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
import { IProject } from "@/lib/types/IProject";
import Table_cel_title from "@/components/ui/table/table_cel_title";
import { JobCells } from "@/components/features/jobs/JobsTable";
import { CheckIcon, WorkflowIcon } from "lucide-react";
import IconButton from "@/components/IconButton";

interface IProps {
  projects: IProject[] | IErrorMessage;
  searchText?: string;
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
                <Table_cel_title
                  title={name}
                  text=""
                  searchText={props.searchText}
                />
              </TableCell>
              <JobCells {...p.job} />
              <TableCell className="flex flex-row justify-end gap-2">
                <IconButton
                  url={`/projects/${p.job.SAS}`}
                  icon={<CheckIcon size={16} />}
                  text={`${name.toLowerCase()}'s JOBS`}
                  tab="jobs"
                />
                <IconButton
                  url={`/projects/${p.job.SAS}`}
                  icon={<WorkflowIcon size={16} />}
                  text={`${name.toLowerCase()}'s AUTOMATIONS`}
                  tab="automations"
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

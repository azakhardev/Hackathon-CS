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
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/Button";
import { IProject } from "@/lib/types/IProject";
import { Badge } from "@/components/ui/badge";
import Table_cel_title from "@/components/ui/table/table_cel_title";
import {
  Table_cel_state,
  StateType,
} from "@/components/ui/table/table_cel_state";

interface IProps {
  projects: IProject[] | IErrorMessage;
}

enum Status {
  Queued = "queued", //gray
  InProgress = "in_progress", //orange
  Success = "success", //green
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
            <TableCell>
              <Table_cel_state
                title={p.status}
                text="Status"
                type={
                  p.status === Status.Queued
                    ? StateType.Gray
                    : p.status === Status.InProgress
                    ? StateType.Orange
                    : p.status === Status.Success
                    ? StateType.Green
                    : StateType.Gray
                }
              />
            </TableCell>
            <TableCell>
              {p.runnerId !== "none" ? (
                <Link
                  to={`/runners/${p.runnerId}`}
                  className={badgeVariants({ variant: "outline" })}
                >
                  {p.runnerId.slice(p.runnerId.length - 5).toUpperCase()}
                </Link>
              ) : (
                <Badge variant="outline">none</Badge>
              )}
              Mage vzorecek
              <Link
                to={`/runners?grp=${p.group}`}
                className={badgeVariants({ variant: "outline" })}
              >
                Link na groupu
              </Link>
            </TableCell>
            <TableCell>
              <Link
                className={buttonVariants({ variant: "outline" })}
                to={`/jobs?sas=${p.name}`}
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

import { IErrorMessage } from "@/lib/types/IErrorMessage";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { IProject } from "@/lib/types/IProject";

interface IProps {
  projects: IProject[] | IErrorMessage;
}

export default function ProjectsTable(props: IProps) {
  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Project Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Info</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(props.projects as IProject[]).map((p) => (
          <TableRow key={p.name}>
            <TableCell className="font-medium">
              {p.name.toUpperCase().slice(4)}
            </TableCell>
            <TableCell>{p.status}</TableCell>
            <TableCell>
              <Link
                to={`/runners/${p.runnerId}`}
                className={badgeVariants({ variant: "outline" })}
              >
                {p.runnerId.slice(p.runnerId.length - 5).toUpperCase()}
              </Link>
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

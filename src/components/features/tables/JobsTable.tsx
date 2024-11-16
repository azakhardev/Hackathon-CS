import { IJobs } from "@/lib/types/IJobs";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Badge, badgeVariants } from "@/components/ui/badge";

interface IProps {
  jobs: IJobs[] | IErrorMessage;
}

export default function JobsTable(props: IProps) {
  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Info</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(props.jobs as IJobs[]).map((j) => (
          <TableRow key={j.id}>
            <TableCell className="font-medium">{j.id}</TableCell>
            <TableCell>{j.state}</TableCell>
            {j.runner !== "none" && (
              <TableCell className="flex flex-row">
                <Link
                  to={`/jobs?sas=${j.SAS}`}
                  className={badgeVariants({ variant: "outline" })}
                >
                  {j.SAS.slice(4)}
                </Link>
                <p> runner: </p>
                <Link
                  to={`/runners/${j.runner}`}
                  className={badgeVariants({ variant: "outline" })}
                >
                  {j.runner.slice(j.runner.length - 5).toUpperCase()}
                </Link>
              </TableCell>
            )}
            {j.runner === "none" && (
              <TableCell className="flex flex-row">
                <Link
                  to={`/jobs?sas=${j.SAS}`}
                  className={badgeVariants({ variant: "outline" })}
                >
                  {j.SAS.slice(4)}
                </Link>
                <p> runner: </p>
                <Badge variant="outline">{j.runner.toUpperCase()}</Badge>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

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
import { Badge, badgeVariants } from "@/components/ui/badge";

interface IProps {
  jobs: IJobs[] | IErrorMessage;
}

export default function JobsTable(props: IProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] text-white">Id</TableHead>
          <TableHead className="text-white">Status</TableHead>
          <TableHead className="text-white">Info</TableHead>
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

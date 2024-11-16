import { Badge, badgeVariants } from "@/components/ui/badge";
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
import { IRunner } from "@/lib/types/IRunner";
import { Link } from "react-router-dom";

interface IProps {
  runners: IRunner[] | IErrorMessage;
}

export default function RunnersTable(props: IProps) {
  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Info</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(props.runners as IRunner[]).map((r) => (
          <TableRow key={r.id}>
            <TableCell className="font-medium">{r.id}</TableCell>
            <TableCell>{r.state}</TableCell>
            <TableCell>
              <Link
                to={`/runners?grp=${r.runner_group}`}
                className={badgeVariants({ variant: "outline" })}
              >
                {r.runner_group}
              </Link>
              <Link
                to={`/runners?org=${r.organization}`}
                className={badgeVariants({ variant: "outline" })}
              >
                {r.organization}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

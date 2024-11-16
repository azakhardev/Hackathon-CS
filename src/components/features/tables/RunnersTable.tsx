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
import { useNavigate } from "react-router-dom";
interface IProps {
  runners: IRunner[] | IErrorMessage;
}

export default function RunnersTable(props: IProps) {
  const navigate = useNavigate();
  function handleRowClick(id: string) {
    navigate(`/runners/${id}`);
  }
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
          <TableRow onClick={() => handleRowClick(r.id)} key={r.id}>
            <TableCell className="font-medium">
              {r.id.slice(r.id.length - 5).toUpperCase()}
            </TableCell>
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

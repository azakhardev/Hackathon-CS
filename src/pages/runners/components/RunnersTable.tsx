import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  // TableCaption,
  // TableHead,
  // TableHeader,
} from "@/components/ui/table/table";
import { Table_cel_state } from "@/components/ui/table/table_cel_state";
import Table_cel_title from "@/components/ui/table/table_cel_title";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { IRunner } from "@/lib/types/IRunner";
import { Link } from "react-router-dom";
interface IProps {
  runners: IRunner[] | IErrorMessage;
}

export default function RunnersTable(props: IProps) {
  // onClick={() => handleRowClick(r.id)}
  // const navigate = useNavigate();

  // function handleRowClick(id: string) {
  //   navigate(`/runners/${id}`);
  // }

  return (
    <Table>
      {/* <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] text-white">Id</TableHead>
          <TableHead className="text-white">State</TableHead>
          <TableHead className="text-white">Info</TableHead>
          <TableHead className="text-white">Action</TableHead>
        </TableRow>
      </TableHeader> */}
      <TableBody>
        {(props.runners as IRunner[]).map((r) => (
          <TableRow key={r.id}>
            <TableCell className="font-medium">
              <Table_cel_title
                title={r.id.slice(r.id.length - 5).toUpperCase()}
                text=""
              />
            </TableCell>

            <TableCell>
              <Table_cel_state title={r.state} text="Date" type={r.state} />
            </TableCell>

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

            <TableCell className="text-end">
              <Link
                className={buttonVariants({ variant: "outline" })}
                to={`/runners/${r.id}`}
              >
                Detail
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

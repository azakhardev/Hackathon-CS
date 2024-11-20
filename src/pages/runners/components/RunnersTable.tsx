import React from "react";
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table/table";
import { Table_cel_state } from "@/components/ui/table/table_cel_state";
import Table_cel_title from "@/components/ui/table/table_cel_title";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import {
  buildRunnerDescription,
  buildRunnerText,
} from "@/pages/jobs/components/JobsTable";
import { IRunner } from "@/pages/runners/types/IRunner";
import { Link } from "react-router-dom";

interface IProps {
  runners: (IRunner[] | IErrorMessage)[] | undefined;
}

export default function RunnersTable(props: IProps) {

  // onClick={() => handleRowClick(r.id)}
  // const navigate = useNavigate();

  // function handleRowClick(id: string) {
  //   navigate(`/runners/${id}`);
  // }
  const runnerData = props.runners
    ?.filter((item): item is IRunner[] => Array.isArray(item))
    .flat() || [];

  if (!runnerData.length) {
    return <p>No runners available or an error occurred.</p>;
  }

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
        {runnerData.map((r, index) => {
          const title = r.id.slice(r.id.length - 5).toUpperCase();
          return (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <Table_cel_title
                  title={title}
                  text={buildRunnerDescription(r.id)}
                />
              </TableCell>
              <TableCell>
                <Table_cel_state title={r.state} text="" type={r.state} />
              </TableCell>
              <TableCell>
                <Link
                  to={`/runners?grp=${r.runner_group}`}
                  className={badgeVariants({ variant: "outline" })}
                >
                  {title}
                </Link>
                {buildRunnerText(r.id)}
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
          );
        })}
      </TableBody>
    </Table>
  );
}
{
  /* <TableCell>
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
</TableCell> */
}


import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  // TableCaption,
  // TableHead,
  // TableHeader,
} from "@/components/ui/table/table";
import { IAutomation } from "@/pages/automations/types/IAutomation";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import Table_cel_title from "@/components/ui/table/table_cel_title";
import { timeAgo } from "@/lib/utils/ago_convert";
import { Badge_timeAgo } from "@/components/ui/table/badge_timeAgo";

interface IProps {
  automations: IAutomation[] | IErrorMessage;
}

export default function AutomationsTable(props: IProps) {
  // const navigate = useNavigate();
  // onClick={() => handleRowClick(a.id)}
  // function handleRowClick(id: string) {
  //   navigate(`/automations/${id}`);
  // }

  return (
    <Table className="overflow-x-auto">
      {/* <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] text-white">Id</TableHead>
          <TableHead className="text-white">State</TableHead>
          <TableHead className="text-white">Last Activity</TableHead>
          <TableHead className="text-white">Type</TableHead>
          <TableHead className="text-white">Action</TableHead>
        </TableRow>
      </TableHeader> */}
      <TableBody>
        {(props.automations as IAutomation[]).map((a) => (
          <TableRow key={a.id}>
            <TableCell>
              <Table_cel_title
                title={a.id.slice(-5)}
                text={a.id.slice(0, -6).toLowerCase() /*.replace(/_/g, " ")*/}
              />
            </TableCell>
            <TableCell>{a.state}</TableCell>
            <TableCell>
              <Badge_timeAgo date={new Date(a.last_activity)} />
            </TableCell>
            {/* <TableCell className="text-end">
              <Link
                className={buttonVariants({ variant: "outline" })}
                to={`/automations/${a.id}`}
              >
                Metrics
              </Link>
            </TableCell> */}
            <TableCell className="text-end">
              <Link className={buttonVariants({ variant: "outline" })} to={`#`}>
                Logs
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function abbreviateId(id: string) {
  const names: string[] = id.split("_");
  let finalName: string = "";

  names.forEach((n, i) => {
    if (i !== names.length - 1) {
      finalName += n[0];
    } else {
      const id: string[] = n.split("-");
      finalName += `${id[0][0]}-`;
      finalName += `${id[1]}`;
    }
  });
  return finalName;
}

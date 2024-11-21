import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/table";
import { IAutomation } from "@/lib/types/IAutomation";
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

interface IProps {
  automations: IAutomation[] | IErrorMessage;
}

export default function AutomationsTable(props: IProps) {
  return (
    <Table className="overflow-x-auto">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] text-white">Id</TableHead>
          <TableHead className="text-white">State</TableHead>
          <TableHead className="text-white">Last Activity</TableHead>
          <TableHead className="text-white">Type</TableHead>
          <TableHead className="text-white">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(props.automations as IAutomation[]).map((a) => (
          <TableRow key={a.id}>
            <TableCell className="font-medium">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>{abbreviateId(a.id)}</TooltipTrigger>
                  <TooltipContent
                    side="right"
                    align="center"
                    className="p-2 m-1 text-white bg-gray-800 rounded shadow-lg"
                  >
                    <p>{a.id}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell>{a.state}</TableCell>
            <TableCell>
              {format(new Date(a.last_activity), "dd. MM. yyyy HH:mm:ss")}
            </TableCell>
            <TableCell>{a.type}</TableCell>
            <TableCell>
              <Link
                className={buttonVariants({ variant: "outline" })}
                to={`/automations/${a.id}`}
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

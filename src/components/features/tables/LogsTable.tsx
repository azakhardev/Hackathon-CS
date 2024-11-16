import { IAutomationLog } from "@/lib/types/IAutomationLog";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface IProps {
  logs: IAutomationLog[] | IErrorMessage;
}

export default function LogsTable(props: IProps) {
  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[400px]">Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(props.logs as IAutomationLog[]).map((l) => (
          <TableRow key={l.timestamp}>
            <TableCell>
              <h3>{l.type}</h3>
              <p>{l.description}</p>
            </TableCell>
            <TableCell>Status si tady namaluj</TableCell>
            <TableCell className="font-medium">
              {format(new Date(l.timestamp), "dd. MM. yyyy HH:mm:ss")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

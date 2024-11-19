import { IAutomationLog } from "@/pages/automations/detail/IAutomationLog";
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
} from "@/components/ui/table/table";

interface IProps {
  logs: IAutomationLog[] | IErrorMessage;
}

export default function LogsTable(props: IProps) {
  if (!Array.isArray(props.logs) || props.logs.length === 0) {
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-center">No data available</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
  return (
    <Table>
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

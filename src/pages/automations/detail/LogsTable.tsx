import { IAutomationLog } from "@/pages/automations/detail/IAutomationLog";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table/table";
import { Badge_timeAgo } from "@/components/ui/table/badge_timeAgo";
import Badge_Link from "@/components/ui/table/Badge_Link";

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
              <Badge_timeAgo date={new Date(l.timestamp)} />
              <span>new log was created on</span>
              <Badge_Link title={l.automation_id.slice(-5)} route="#" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

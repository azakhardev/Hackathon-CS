import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IAutomation } from "@/lib/types/IAutomation";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { Link } from "react-router-dom";

interface IProps {
  automations: IAutomation[] | IErrorMessage;
}

export default function AutomationsTable(props: IProps) {
  return (
    <Table className="overflow-x-auto max-h-[400px]">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Last Activity</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(props.automations as IAutomation[]).map((a) => (
          <Link to={`/automations/${a.id}`}>
            <TableRow key={a.id}>
              <TableCell className="font-medium">{a.id}</TableCell>
              <TableCell>{a.state}</TableCell>
              <TableCell>{a.last_activity}</TableCell>
              <TableCell>{a.type}</TableCell>
            </TableRow>
          </Link>
        ))}
      </TableBody>
    </Table>
  );
}

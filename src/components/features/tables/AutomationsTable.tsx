import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IAutomation } from "@/lib/types/IAutomation";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface IProps {
  automations: IAutomation[] | IErrorMessage;
}

// enum Progression {
//   Queued = 25,
//   In_Progress = 50,
//   Failed = 75,
//   Success = 100,
// }
// const status = "In_Progress";

//   console.log(Progression[status as keyof typeof Progression]);
// <Progress
//               value={Progression[status as keyof typeof Progression]}
//               max={100}
//             />

export default function AutomationsTable(props: IProps) {
  const navigate = useNavigate();
  function handleRowClick(id: string) {
    navigate(`/automations/${id}`);
  }

  return (
    <Table className="overflow-x-auto">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[200px]">Id</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Last Activity</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(props.automations as IAutomation[]).map((a) => (
          <TableRow
            onClick={() => handleRowClick(a.id)}
            key={a.id}
            className="w-[]"
          >
            <TableCell className="font-medium">{a.id}</TableCell>
            <TableCell>{a.state}</TableCell>
            <TableCell>
              {format(new Date(a.last_activity), "dd. MM. yyyy HH:mm:ss")}
            </TableCell>
            <TableCell>{a.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

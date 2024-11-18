import { useMutation, useQuery } from "@tanstack/react-query";
import { AutomationModel } from "../api/AutomationModel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table/table";
import { format } from "date-fns";
import { IErrorMessage } from "../../../lib/types/IErrorMessage";
import { IAutomation } from "../types/IAutomation";

export default function Automation() {
  const automations = useQuery({
    queryKey: ["automation"],
    queryFn: async () => await AutomationModel.getAutomations(),
  });

  const getLogsMutation = useMutation({
    mutationKey: ["Logs"],
    mutationFn: async (id: string) =>
      await AutomationModel.getAutomationLogs(id),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  if (automations.isError) return <div>Error: {automations.error.message}</div>;

  if (automations.data && "error" in automations.data) {
    const errorData = automations.data as IErrorMessage;
    return <div>Error: {errorData.message}</div>;
  }

  const handleRowClick = (id: string) => {
    getLogsMutation.mutate(id);
  };

  return (
    <div className="flex flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Posledni aktivita</TableHead>
            <TableHead>Stav</TableHead>
            <TableHead>Typ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(automations.data as IAutomation[])?.map((automation, index) => (
            <TableRow
              className="cursor-pointer"
              key={index}
              onClick={() => handleRowClick(automation.id)}
            >
              <TableCell>{automation.id}</TableCell>
              <TableCell>
                {format(
                  new Date(automation.last_activity),
                  "dd. MM. yyyy HH:mm:ss"
                )}
              </TableCell>
              <TableCell>{automation.state}</TableCell>
              <TableCell>{automation.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

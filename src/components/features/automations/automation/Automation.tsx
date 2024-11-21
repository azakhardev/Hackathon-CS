import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table/table";
import { format } from "date-fns";
import { IErrorMessage } from "../../../../lib/types/IErrorMessage";
import { IAutomation } from "../../../../lib/types/IAutomation";
import { AutomationModel } from "@/lib/models/AutomationModel";
import ErrorMessage from "@/components/ui/ErrorMessage";

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

  if (automations.data && "error" in automations.data)
    return <ErrorMessage errorMessage={automations.data as IErrorMessage} />;

  if (getLogsMutation.data && "error" in getLogsMutation.data)
    return (
      <ErrorMessage errorMessage={getLogsMutation.data as IErrorMessage} />
    );

  if (automations.error || getLogsMutation.error) {
    const error: IErrorMessage = {
      code: "500",
      error: "Internal server error",
      message: "Server responded with undefined",
    };
    return <ErrorMessage errorMessage={error}></ErrorMessage>;
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

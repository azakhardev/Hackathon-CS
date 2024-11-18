import H1 from "@/components/ui/typography/H1";
import { AutomationModel } from "./api/AutomationModel";
import { useQuery } from "@tanstack/react-query";
import { IAutomationType } from "./types/IAutomationType";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table/table";
import { badgeVariants } from "@/components/ui/badge";
import StateNode from "@/components/Node";

export default function AutomationTypesPage() {
  const { data } = useQuery({
    queryKey: ["automationTypes"],
    queryFn: async () => await AutomationModel.getAutomationTypes(),
    gcTime: 0,
  });
  const types = data as IAutomationType[];
  console.log(types);
  if (types === undefined) {
    return <H1>error</H1>;
  }
  if (data && "error" in data) {
    return <ErrorMessage errorMessage={data as IErrorMessage} />;
  }
  return (
    <>
      <H1>Automation Types</H1>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Accordion type="single" collapsible>
                {(data as IAutomationType[]).map((x, i) => (
                  <AccordionItem
                    key={x.type}
                    value={x.type}
                    className="border-none"
                  >
                    <AccordionTrigger>
                      <div className="flex">
                        <span className="min-w-96 text-start">{x.type}</span>
                        <div
                          className={badgeVariants({
                            variant: "outline",
                            className: "border-dashed",
                          })}
                        >
                          {x.states.length}x states
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {(x.states as string[]).map((xx, ii) => {
                        let direction = "down";
                        if (ii == x.states.length - 1) direction = "none";
                        return (
                          <div
                            key={ii}
                            className="flex items-start gap-2 ml-[25rem]"
                          >
                            <StateNode
                              color="state_green"
                              direction={direction}
                            />
                            <div className="mt-[-5px]">
                              {xx.charAt(0).toUpperCase() +
                                xx.slice(1).toLowerCase()}
                            </div>
                          </div>
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

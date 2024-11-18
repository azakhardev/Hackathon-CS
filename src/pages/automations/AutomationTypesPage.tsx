import H1 from "@/components/ui/typography/H1";
import { AutomationModel } from "./api/AutomationModel";
import { useQuery } from "@tanstack/react-query";
import { IAutomationType, ITransition } from "./types/IAutomationType";
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
import StateNode, { NodeDirection } from "@/components/Node";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AutomationTypesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["automationTypes"],
    queryFn: async () => await AutomationModel.getAutomationTypes(),
    gcTime: 0,
  });
  const types = data as IAutomationType[];
  console.log(types);

  if (!types && !isLoading) {
    const error: IErrorMessage = {
      code: "500",
      error: "Internal server error",
      message: "Server responded with undefined",
    };
    return <ErrorMessage errorMessage={error}></ErrorMessage>;
  }

  if ((data && "error" in data) || !data) {
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
                      {(x.transitions as ITransition[]).map((xx, ii) => {
                        let direction: NodeDirection = "down";
                        if (ii == x.transitions.length - 1) direction = "none";
                        return (
                          <TooltipProvider key={ii}>
                            <Tooltip>
                              <TooltipTrigger>
                                <div className="flex items-start gap-2 ml-[25rem]">
                                  {" "}
                                  {/* mt-[-5px] - broken */}
                                  <StateNode
                                    color="green"
                                    direction={direction}
                                    isActive={false}
                                  />
                                  {xx.from_state.charAt(0).toUpperCase() +
                                    xx.from_state.slice(1).toLowerCase()}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  <span className="font-semibold">
                                    Trigger:
                                  </span>
                                  <span className="font-mono"> {xx.event}</span>
                                </p>
                                <p>
                                  <span className="font-semibold">Action:</span>
                                  <span className="font-mono">
                                    {" "}
                                    {xx.action}
                                  </span>
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
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

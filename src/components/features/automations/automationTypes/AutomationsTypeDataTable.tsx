import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "@/components/ui/ErrorMessage";
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
import { AutomationModel } from "@/lib/models/AutomationModel";
import { IAutomationType, ITransition } from "@/lib/types/IAutomationType";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import LoadingSkeletonTypes from "@/components/ui/LoadingSkeletonTypes";
//-----------------------------------------↓
export default function AutomationTypesDataTable({
  limit = -1,
  isNav = true,
}: {
  limit: number | undefined;
  isNav: boolean;
}) {
  const automationsTypeQuery = useQuery({
    queryKey: ["automationTypes"],
    queryFn: async () => await AutomationModel.getAutomationTypes("", limit),
    gcTime: 0,
  });

  if (automationsTypeQuery.data && "error" in automationsTypeQuery.data)
    return (
      <ErrorMessage errorMessage={automationsTypeQuery.data as IErrorMessage} />
    );

  if (automationsTypeQuery.error) {
    const error: IErrorMessage = {
      code: "500",
      error: "Internal server error",
      message: "Server responded with undefined",
    };
    return <ErrorMessage errorMessage={error}></ErrorMessage>;
  }

  if (automationsTypeQuery.isLoading) {
    return <LoadingSkeletonTypes />;
  }

  console.log(limit, isNav);
  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Accordion type="single" collapsible>
                {(automationsTypeQuery.data as IAutomationType[]).map((x) => (
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
                      <div className="flex flex-col">
                        {x.states.map((state, stateIndex) => (
                          <StateNodeWithTooltip
                            key={state}
                            state={state}
                            transitions={getTransitionsForState(
                              state,
                              x.transitions
                            )}
                            direction={
                              stateIndex === x.states.length - 1
                                ? "none"
                                : "down"
                            }
                          />
                        ))}
                      </div>
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

// -----------------------------------------------------------------------

const getTransitionsForState = (state: string, transitions: ITransition[]) => {
  return transitions.filter((t) => t.from_state === state);
};

const TransitionDetails = ({
  transition,
  isLast,
}: {
  transition: ITransition;
  isLast: boolean;
}) => (
  <div>
    <p>
      <span className="font-semibold">To: </span>
      <span className="font-mono">{transition.to_state}</span>
    </p>
    {transition.event && (
      <p>
        <span className="font-semibold">Trigger: </span>
        <span className="font-mono">{transition.event}</span>
      </p>
    )}
    {transition.action && (
      <p>
        <span className="font-semibold">Action: </span>
        <span className="font-mono">{transition.action}</span>
      </p>
    )}
    {!isLast && <hr className="my-2" />}
  </div>
);

const StateNodeWithTooltip = ({
  state,
  transitions,
  direction,
}: {
  state: string;
  transitions: ITransition[];
  direction: NodeDirection;
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <div className="flex items-start gap-2 ml-[25rem]">
          <StateNode color="green" direction={direction} isActive={false} />
          {state.charAt(0).toUpperCase() + state.slice(1).toLowerCase()}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {transitions.length > 0 ? (
          transitions.map((transition, i) => (
            <TransitionDetails
              key={i}
              transition={transition}
              isLast={i === transitions.length - 1}
            />
          ))
        ) : (
          <p>No outgoing transitions</p>
        )}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table/table";
import { IAutomation } from "@/pages/automations/_shared/IAutomation";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/Button";
import Table_cel_title from "@/components/ui/table/table_cel_title";
import { Badge_timeAgo } from "@/components/ui/table/badge_timeAgo";
import StateNode, { NodeColor, NodeDirection } from "@/components/Node";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IProps {
  automations: IAutomation[] | IErrorMessage;
}

export default function AutomationsTable(props: IProps) {
  const getNodeProps = (
    currentIndex: number,
    activeIndex: number,
    totalStates: number
  ) => {
    const props = {
      isBorder: false,
      isActive: false,
      color: "gray" as NodeColor,
      direction:
        currentIndex === totalStates - 1
          ? ("none" as NodeDirection)
          : ("right" as NodeDirection),
    };

    // If the last node is active, make all nodes green
    if (activeIndex === totalStates - 1) {
      props.color = "green";
      props.isActive = currentIndex === activeIndex;
      return props;
    }

    if (currentIndex < activeIndex) {
      props.color = "gray";
    } else if (currentIndex > activeIndex) {
      props.color = "gray";
      props.isBorder = true;
    } else if (currentIndex === activeIndex) {
      // Change color to green if it's the last state, otherwise yellow
      props.color = "yellow";
      props.isActive = true;
    } else {
      props.color = "gray";
    }

    return props;
  };

  return (
    <Table className="overflow-x-auto">
      <TableBody>
        {(props.automations as IAutomation[]).map(
          (a: IAutomation, index: number) => (
            <TableRow key={`${a.id}-${index}`}>
              <TableCell>
                <Table_cel_title
                  title={a.id.slice(-5)}
                  text={a.id.slice(0, -6).toLowerCase()}
                />
              </TableCell>
              <TableCell>
                <div className="flex">
                  {a.type_object?.states?.map((state, index) => {
                    const activeIndex =
                      a.type_object?.states.indexOf(a.state) ?? -1;
                    const nodeProps = getNodeProps(
                      index,
                      activeIndex,
                      a.type_object?.states?.length ?? 0
                    );

                    return (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger>
                            <StateNode {...nodeProps} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{state}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
                </div>
              </TableCell>
              <TableCell>
                <Badge_timeAgo date={new Date(a.last_activity)} />
              </TableCell>
              <TableCell className="text-end">
                <Link
                  className={buttonVariants({ variant: "outline" })}
                  to={`#`}
                >
                  Logs
                </Link>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}

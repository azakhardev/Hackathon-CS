import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  // TableCaption,
  // TableHead,
  // TableHeader,
} from "@/components/ui/table/table";
import { IAutomation } from "@/pages/automations/types/IAutomation";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/Button";
import Table_cel_title from "@/components/ui/table/table_cel_title";
import { Badge_timeAgo } from "@/components/ui/table/badge_timeAgo";
import StateNode from "@/components/Node";
import { IAutomationType } from "../types/IAutomationType";
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
  // const navigate = useNavigate();
  // onClick={() => handleRowClick(a.id)}
  // function handleRowClick(id: string) {
  //   navigate(`/automations/${id}`);
  // }
  /*
  if a.state == i
    if i is last =>
  else => color=gray
   */
  return (
    <Table className="overflow-x-auto">
      {/* <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] text-white">Id</TableHead>
          <TableHead className="text-white">State</TableHead>
          <TableHead className="text-white">Last Activity</TableHead>
          <TableHead className="text-white">Type</TableHead>
          <TableHead className="text-white">Action</TableHead>
        </TableRow>
      </TableHeader> */}
      <TableBody>
        {(props.automations as IAutomation[]).map((a: IAutomation) => (
          <TableRow key={a.id}>
            <TableCell>
              <Table_cel_title
                title={a.id.slice(-5)}
                text={a.id.slice(0, -6).toLowerCase() /*.replace(/_/g, " ")*/}
              />
            </TableCell>
            <TableCell>
              <div className="flex">
                {a.type_object?.states?.map((state, index: number) => {
                  let isBorder = false;
                  let isActive = false;
                  const activeIndex =
                    a.type_object?.states.indexOf(a.state) ?? -1;

                  let color = "state_gray";
                  let direction = "->";
                  if (index < activeIndex) color = "state_gray";
                  else if (index > activeIndex) {
                    color = "state_gray";
                    isBorder = true;
                  } else if (index === activeIndex) {
                    color = "state_yellow";
                    isActive = true;
                  } else color = "state_gray";

                  if (index === (a.type_object?.states?.length ?? 0) - 1)
                    direction = "none";

                  return (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger>
                          <StateNode
                            color={color}
                            isBorder={isBorder}
                            isActive={isActive}
                            direction={direction}
                          />
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
            {/* <TableCell className="text-end">
              <Link
                className={buttonVariants({ variant: "outline" })}
                to={`/automations/${a.id}`}
              >
                Metrics
              </Link>
            </TableCell> */}
            <TableCell className="text-end">
              <Link className={buttonVariants({ variant: "outline" })} to={`#`}>
                Logs
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
  return (
    <>
      {(props.automations as IAutomation[]).map((a) => (
        <div key={a.id} className="automation-container">
          {a.type_object?.states.map((state, index) => {
            // Determine the active index for the current automation
            const activeIndex = a.type_object?.states.indexOf(a.type) ?? -1;

            // Determine the styles based on the index relative to the active state
            let style = {};
            if (index < activeIndex) {
              // Gray background for states before the active one
              style = { backgroundColor: "gray", color: "white" };
            } else if (index === activeIndex) {
              // Yellow background for the active state
              style = { backgroundColor: "yellow", color: "black" };
            } else {
              // Border only for states after the active state
              style = { border: "2px solid black", color: "black" };
            }

            return (
              <div key={index} style={style} className="state-box">
                {state}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

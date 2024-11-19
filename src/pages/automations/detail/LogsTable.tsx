import { IAutomationLog } from "@/pages/automations/detail/IAutomationLog";
import { IErrorMessage } from "@/lib/types/IErrorMessage";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table/table";
import { Badge_timeAgo } from "@/components/ui/table/badge_timeAgo";
import Badge_Link from "@/components/ui/table/Badge_Link";
import StateNode, { NodeColor, NodeDirection } from "@/components/Node";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TableCelTitleLog from "@/components/ui/table/table_cel_titleLog";
import {
  InfoIcon,
  OctagonAlert,
  SearchXIcon,
  TriangleAlert,
} from "lucide-react";

interface IProps {
  logs: IAutomationLog[] | IErrorMessage;
}
//If from=[0]&&to=[arr.len] => success => color=green

export default function LogsTable(props: IProps) {
  const getNodeProps = (
    currentIndex: number,
    fromIndex: number,
    toIndex: number,
    totalStates: number,
    type: string
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

    if (currentIndex === fromIndex || currentIndex === toIndex) {
      switch (type) {
        case "INFO":
          props.color = "log_blue";
          break;
        case "WARNING":
          props.color = "log_yellow";
          break;
        case "ERROR":
          props.color = "log_red";
          break;
        default:
          props.color = "red";
          break;
      }
      props.isActive = true;
    } else {
      props.color = "gray";
    }

    return props;
  };

  const getTitleProps = (type: string) => {
    const props2 = {
      color: "gray" as NodeColor,
      icon: (<SearchXIcon />) as JSX.Element,
    };

    switch (type) {
      case "INFO":
        props2.color = "log_blue";
        props2.icon = <InfoIcon className="text-log_blue" />;
        break;
      case "WARNING":
        props2.color = "log_yellow";
        props2.icon = <TriangleAlert className="text-log_yellow" />;
        break;
      case "ERROR":
        props2.color = "log_red";
        props2.icon = <OctagonAlert className="text-log_red" />;
        break;
      default:
        break;
    }
    console.log(type);

    return props2;
  };
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
        {(props.logs as IAutomationLog[]).map((l) => {
          const pp = getTitleProps(l.level);
          return (
            <TableRow key={l.timestamp}>
              <TableCell>
                <TableCelTitleLog
                  title={l.type}
                  text={l.description}
                  icon={pp.icon}
                  color={pp.color}
                />
              </TableCell>
              {/* <TableCell>
              <h3>{l.type}</h3>
              <p>{l.description}</p>
              <span>
                {l.to_state} {l.from_state}
              </span>
            </TableCell> */}
              <TableCell>
                <div className="flex">
                  {l.type_object?.states?.map((state, index) => {
                    const toIndex =
                      l.type_object?.states.indexOf(l.to_state) ?? -1;
                    const fromIndex =
                      l.type_object?.states.indexOf(l.from_state) ?? -1;
                    const nodeProps = getNodeProps(
                      index,
                      toIndex,
                      fromIndex,
                      l.type_object?.states?.length ?? 0,
                      l.level
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
              <TableCell className="font-medium">
                <Badge_timeAgo date={new Date(l.timestamp)} />
                <span>new log was created on</span>
                <Badge_Link title={l.automation_id.slice(-5)} route="#" />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

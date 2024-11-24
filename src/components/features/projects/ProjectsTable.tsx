import { IErrorMessage } from "@/lib/types/IErrorMessage";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  // TableCaption,
  // TableHead,
  // TableHeader,
} from "@/components/ui/table/table";
import { IProject } from "@/lib/types/IProject";
import Table_cel_title from "@/components/ui/table/table_cel_title";
import { JobCells } from "@/components/features/jobs/JobsTable";
import { CheckIcon, Star, StarIcon, WorkflowIcon } from "lucide-react";
import IconButton from "@/components/IconButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface IProps {
  projects: IProject[] | IErrorMessage;
  searchText?: string;
}

export default function ProjectsTable(props: IProps) {
  const [storage, setStorage] = useState(
    (JSON.parse(localStorage.getItem("favorite")) as string[]) ?? []
  );

  function handleStarClick(value: string) {
    if (storage.includes(value)) {
      setStorage((oldStorage) => {
        const newStorage = [...oldStorage];
        newStorage.splice(storage.indexOf(value), 1);
        localStorage.setItem("favorite", JSON.stringify(newStorage));
        return newStorage;
      });
    } else {
      setStorage((oldStorage) => {
        const newStorage = [...oldStorage];
        newStorage.push(value);
        localStorage.setItem("favorite", JSON.stringify(newStorage));
        return newStorage;
      });
    }
  }

  return (
    <Table>
      <TableBody>
        {(props.projects as IProject[]).map((p) => {
          const name = p.name.toUpperCase().slice(4);
          let starClass = "";
          if (storage.includes(p.name))
            starClass += "fill-state_yellow stroke-none";
          else starClass += "hidden group-hover:block";
          return (
            <TableRow key={p.name}>
              <TableCell className="font-medium group">
                <Table_cel_title
                  title={name}
                  text=""
                  searchText={props.searchText}
                  icon={
                    <div className="flex items-center justify-center cursor-pointer">
                      <StarIcon
                        onClick={() => {
                          handleStarClick(p.name);
                        }}
                        className={cn(starClass)}
                        size={15}
                      />
                    </div>
                  }
                />
              </TableCell>
              <JobCells {...p.job} />
              <TableCell className="flex flex-row justify-end gap-2">
                <IconButton
                  url={`/projects/${p.job.SAS}`}
                  icon={<CheckIcon size={16} />}
                  text={`${name.toLowerCase()}'s JOBS`}
                  tab="jobs"
                />
                <IconButton
                  url={`/projects/${p.job.SAS}`}
                  icon={<WorkflowIcon size={16} />}
                  text={`${name.toLowerCase()}'s AUTOMATIONS`}
                  tab="automations"
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

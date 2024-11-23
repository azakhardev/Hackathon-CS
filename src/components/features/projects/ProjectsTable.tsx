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

interface IProps {
  projects: IProject[] | IErrorMessage;
  searchText?: string;
}

export default function ProjectsTable(props: IProps) {
  const [storage, setStorage] = useState(
    (JSON.parse(localStorage.getItem("favorite")) as string[]) ?? []
  );

  console.log(storage);

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
          return (
            <TableRow key={p.name}>
              <TableCell className="font-medium">
                <Table_cel_title
                  title={name}
                  text=""
                  searchText={props.searchText}
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
                <div className="flex justify-center items-center cursor-pointer">
                  <StarIcon
                    onClick={() => {
                      handleStarClick(p.name);
                    }}
                    fill={storage.includes(p.name) ? "yellow" : undefined}
                    strokeWidth={storage.includes(p.name) ? 1 : 2}
                    stroke={storage.includes(p.name) ? "black" : "white"}
                  />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

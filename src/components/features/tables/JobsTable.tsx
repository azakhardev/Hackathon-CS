import { IJobs } from "@/lib/types/IJobs";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { badgeVariants } from "@/components/ui/badge";

interface IProps {
  jobs: IJobs[] | IErrorMessage;
}

// enum Progression {
//   Queued = 25,
//   In_Progress = 50,
//   Failed = 75,
//   Success = 100,
// }
// const status = "In_Progress";

//   console.log(Progression[status as keyof typeof Progression]);
// <Progress
//               value={Progression[status as keyof typeof Progression]}
//               max={100}
//             />

export default function JobsTable(props: IProps) {
  return (
    <Table className="overflow-x-auto max-h-[400px]">
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Info</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(props.jobs as IJobs[]).map((j) => (
          <TableRow key={j.id}>
            <TableCell className="font-medium">{j.id}</TableCell>
            <TableCell>{j.state}</TableCell>
            <TableCell>
              <Link
                to={`/jobs?sas=${j.SAS}`}
                className={badgeVariants({ variant: "outline" })}
              >
                {j.SAS.slice(4)}
              </Link>
              on runner{" "}
              <Link
                to={`/runners/${j.runner}`}
                className={badgeVariants({ variant: "outline" })}
              >
                {j.runner.slice(j.runner.length - 5).toUpperCase()}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

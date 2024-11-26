import { IJobs } from "@/lib/types/IJobs";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table/table";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { Link } from "react-router-dom";
import { badgeVariants } from "@/components/ui/badge";
import { Table_cel_state } from "@/components/ui/table/table_cel_state";
import Table_cel_title from "@/components/ui/table/table_cel_title";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { useTranslation } from "react-i18next";
import { RunnerActions } from "@/lib/enums/ERunnerActions";
import { buildDescription, parseRunnerAction, tagJoin } from "@/lib/functions/jobsFunc";

interface IProps {
  jobs: IJobs[] | IErrorMessage | undefined;
  searchText?: string;
}

export default function JobsTable(props: IProps) {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  return (
    <Table>
      <TableBody>
        {(props.jobs as IJobs[]).map((j) => {
          let text = buildDescription(parseRunnerAction(j.runner), t);
          if (isMobile) text += ` ${j.SAS.slice(4)}`;
          return (
            <TableRow key={j.id}>
              <TableCell className={`font-medium`}>
                <Table_cel_title
                  title={j.id}
                  text={text}
                  searchText={props.searchText}
                />
              </TableCell>
              <JobCells job={{ ...j }} isMobile={isMobile} />
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export function JobCells({ job, isMobile }: { job: IJobs; isMobile: boolean }) {
  const action = parseRunnerAction(job.runner);
  const { t } = useTranslation();
  return (
    <>
      <TableCell>
        <Table_cel_state
          title={job.state}
          text={job.timestamp}
          type={job.state}
        />
      </TableCell>
      {!isMobile && (
        <TableCell>
          <Link
            to={`/projects/${job.SAS}?tabs=jobs`}
            className={badgeVariants({ variant: "outline" })}
          >
            {job.SAS.toUpperCase().slice(4)}
          </Link>
          <span className="mx-[4px]">
            {tagJoin({ action, state: job.state, t })}
          </span>
          {action !== RunnerActions.waiting.toString() && (
            <Link
              to={`/runners/${job.runner}`}
              className={badgeVariants({ variant: "outline" })}
            >
              {job.runner.slice(job.runner.length - 5).toUpperCase()}
            </Link>
          )}
        </TableCell>
      )}
    </>
  );
}



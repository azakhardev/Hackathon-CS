import { IJobs } from "@/lib/types/IJobs";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  // TableCaption,
  // TableHead,
  // TableHeader,
} from "@/components/ui/table/table";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import { Link } from "react-router-dom";
import { badgeVariants } from "@/components/ui/badge";
import { Table_cel_state } from "@/components/ui/table/table_cel_state";
import Table_cel_title from "@/components/ui/table/table_cel_title";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

interface IProps {
  jobs: IJobs[] | IErrorMessage | undefined;
  searchText?: string;
}

export default function JobsTable(props: IProps) {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  return (
    <Table>
      {/* <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] text-white">Id</TableHead>
          <TableHead className="text-white">Status</TableHead>
          <TableHead className="text-white">Info</TableHead>
        </TableRow>
      </TableHeader> */}
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
        <TableCell className="flex gap-1">
          <Link
            to={`/projects/${job.SAS}?tabs=jobs` /*`/jobs/${job.runner}`*/}
            className={badgeVariants({ variant: "outline" })}
          >
            {job.SAS.toUpperCase().slice(4)}
          </Link>
          <span>{tagJoin({ action, state: job.state, t })}</span>
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

enum RunnerActions {
  waiting = "waiting",
  build = "build",
  test = "test",
  deploy_dev = "deploy_dev",
  deploy_prod = "deploy_prod",
}
enum JobStates {
  queued = "queued",
  in_progress = "in_progress",
  success = "success",
  failed = "failed",
}

export function parseRunnerAction(RunnerId: string) {
  const buildRegex = /^runner-csas-dev-csas-linux-[a-zA-Z0-9]{5}$/;
  const deployDevRegex = /^runner-csas-ops-csas-linux-[a-zA-Z0-9]{5}$/;

  if (RunnerId === "none") return RunnerActions.waiting;
  else if (RunnerId.includes("csas-dev") && buildRegex.test(RunnerId))
    return RunnerActions.build;
  else if (
    RunnerId.includes("csas-dev") &&
    RunnerId.includes("csas-linux-test")
  )
    return RunnerActions.test;
  else if (RunnerId.includes("csas-ops") && deployDevRegex.test(RunnerId))
    return RunnerActions.deploy_dev;
  else if (
    RunnerId.includes("csas-ops") &&
    RunnerId.includes("csas-linux-prod")
  )
    return RunnerActions.deploy_prod;

  return RunnerActions.waiting;
  // else return RunnerActions.build; //TODO: FIX it later !!!!!!!!!!!!!!!!!!!!!!!!!

  // const prod = `${RunnerId.split("-")[1]}-${RunnerId.split("-")[2]}`;
  // const action = RunnerId.split("-").slice(3, -1).join("-");

  // switch (`${prod}-${action}`) {
  //   case "csas-dev-csas-linux":
  //     return RunnerActions.build;
  //   case "csas-dev-csas-linux-test":
  //     return RunnerActions.test;
  //   case "csas-ops-csas-linux":
  //     return RunnerActions.deploy_dev;
  //   case "csas-ops-csas-linux-test":
  //     return RunnerActions.deploy_prod;
  //   default:
  //     return RunnerActions.waiting;
  // }

  // throw new Error("Unknown runner ID format");
}

export function buildDescription(action: RunnerActions, t: TFunction) {
  switch (action) {
    case RunnerActions.waiting:
      return `${t("translation:runners:desc_waiting")}`;
    case RunnerActions.build:
      return `${t("translation:runners:desc_build")}`;
    case RunnerActions.test:
      return `${t("translation:runners:desc_test")}`;
    case RunnerActions.deploy_dev:
      return `${t("translation:runners:desc_deploy_dev")}`;
    case RunnerActions.deploy_prod:
      return `${t("translation:runners:desc_deploy_prod")}`;
    default:
      return `${t("translation:runners:desc_default")}`;
  }
}

// RUNNER builders
export function buildRunnerText(action: string, t: TFunction) {
  action = parseRunnerAction(action);
  switch (action) {
    case RunnerActions.waiting:
      return `${t("translation:runners:action_waiting")}`;
    case RunnerActions.build:
      return `${t("translation:common:is")} ${t(
        "translation:runners:action_build"
      )}`;
    case RunnerActions.test:
      return `${t("translation:common:is")} ${t(
        "translation:runners:action_test"
      )}`;
    case RunnerActions.deploy_dev:
      return `${t("translation:common:is")} ${t(
        "translation:runners:action_deploy_dev"
      )}`;
    case RunnerActions.deploy_prod:
      return `${t("translation:common:is")} ${t(
        "translation:runners:action_deploy_prod"
      )}`;
  }
  return action;
}
export function buildRunnerDescription(action: string, t: TFunction) {
  action = parseRunnerAction(action);
  switch (action) {
    case RunnerActions.waiting:
      return t("translation:runners:action_waiting");
    case RunnerActions.build:
      return t("translation:runners:action_build");
    case RunnerActions.test:
      return t("translation:runners:action_test");
    case RunnerActions.deploy_dev:
      return t("translation:runners:action_deploy_dev");
    case RunnerActions.deploy_prod:
      return t("translation:runners:action_deploy_prod");
  }
  return action;
}

function verbMap(t: TFunction): { [key in JobStates]: string } {
  return {
    [JobStates.success]: t("translation:jobsVerbsMap:success"),
    [JobStates.in_progress]: t("translation:jobsVerbsMap:in_progress"),
    [JobStates.queued]: t("translation:jobsVerbsMap:queued"),
    [JobStates.failed]: t("translation:jobsVerbsMap:failed"),
  };
}
function actionMap(t: TFunction): { [key in RunnerActions]: string } {
  return {
    [RunnerActions.waiting]: t("translation:runnerActionMap:waiting"), //always
    [RunnerActions.build]: t("translation:runnerActionMap:build"),
    [RunnerActions.test]: t("translation:runnerActionMap:test"),
    [RunnerActions.deploy_dev]: t("translation:runnerActionMap:deploy_dev"),
    [RunnerActions.deploy_prod]: t("translation:runnerActionMap:deploy_prod"),
  };
}
export function tagJoin({
  action,
  state,
  t,
}: {
  action: RunnerActions;
  state: string;
  t: TFunction;
}): string {
  if (!(state in JobStates)) {
    throw new Error("Unknown job state");
  }
  const actionText = actionMap(t)[action];
  if (action === RunnerActions.waiting) {
    return actionText;
  }
  const verb = verbMap(t)[state as JobStates];
  if (!verb || !actionText) {
    throw new Error("Unknown job state or action");
  }
  return `${verb} ${actionText} ${t("translation:common:by")}`;
}

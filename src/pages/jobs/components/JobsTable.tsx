import { IJobs } from "@/pages/jobs/types/IJobs";

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

interface IProps {
  jobs: IJobs[] | IErrorMessage;
}

export default function JobsTable(props: IProps) {
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
        {(props.jobs as IJobs[]).map((j) => (
          <TableRow key={j.id}>
            <TableCell className="font-medium">
              <Table_cel_title
                title={j.id}
                text={buildDescription(parseRunnerAction(j.runner))}
              />
            </TableCell>
            <JobCells {...j} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function JobCells(job: IJobs) {
  const action = parseRunnerAction(job.runner);
  return (
    <>
      <TableCell>
        <Table_cel_state
          title={job.state}
          text={job.timestamp}
          type={job.state}
        />
      </TableCell>
      <TableCell>
        <Link
          to={"#" /*`/jobs/${job.runner}`*/}
          className={badgeVariants({ variant: "outline" })}
        >
          {job.SAS.toUpperCase().slice(4)}
        </Link>
        <span>{tagJoin({ action, state: job.state })}</span>
        {action !== RunnerActions.waiting.toString() && (
          <Link
            to={`/runners/${job.runner}`}
            className={badgeVariants({ variant: "outline" })}
          >
            {job.runner.slice(job.runner.length - 5).toUpperCase()}
          </Link>
        )}
      </TableCell>
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
  if (RunnerId === "none") return RunnerActions.waiting;
  else if (RunnerId.includes("csas-dev") && RunnerId.includes("csas-linux"))
    return RunnerActions.build;
  else if (
    RunnerId.includes("csas-dev") &&
    RunnerId.includes("csas-linux-test")
  )
    return RunnerActions.test;
  else if (RunnerId.includes("csas-ops") && RunnerId.includes("csas-linux"))
    return RunnerActions.deploy_dev;
  else if (
    RunnerId.includes("csas-ops") &&
    RunnerId.includes("csas-linux-prod")
  )
    return RunnerActions.deploy_prod;
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

export function buildDescription(action: RunnerActions) {
  switch (action) {
    case RunnerActions.waiting:
      return "Waiting for runner";
    case RunnerActions.build:
      return "Building";
    case RunnerActions.test:
      return "Testing";
    case RunnerActions.deploy_dev:
      return "Deploying to dev";
    case RunnerActions.deploy_prod:
      return "Deploying to prod";
    default:
      return "Unknown action";
  }
}

// RUNNER builders
export function buildRunnerText(action: string) {
  action = parseRunnerAction(action);
  switch (action) {
    case RunnerActions.waiting:
      return "wtf???";
    case RunnerActions.build:
      return "is build runner";
    case RunnerActions.test:
      return "is test runner";
    case RunnerActions.deploy_dev:
      return "is DEV deployer";
    case RunnerActions.deploy_prod:
      return "is PROD deployer";
  }
  return action;
}
export function buildRunnerDescription(action: string) {
  action = parseRunnerAction(action);
  switch (action) {
    case RunnerActions.waiting:
      return "wtf???";
    case RunnerActions.build:
      return "Build runner";
    case RunnerActions.test:
      return "Test runner";
    case RunnerActions.deploy_dev:
      return "Dev deployer";
    case RunnerActions.deploy_prod:
      return "Prod deployer";
  }
  return action;
}

const verbMap: { [key in JobStates]: string } = {
  [JobStates.success]: "was",
  [JobStates.in_progress]: "is being",
  [JobStates.queued]: "will be",
  [JobStates.failed]: "failed to be",
};
const actionMap: { [key in RunnerActions]: string } = {
  [RunnerActions.waiting]: "is waiting for runner", //always
  [RunnerActions.build]: "built",
  [RunnerActions.test]: "tested",
  [RunnerActions.deploy_dev]: "deployed to dev",
  [RunnerActions.deploy_prod]: "deployed to prod",
};
export function tagJoin({
  action,
  state,
}: {
  action: RunnerActions;
  state: string;
}): string {
  if (!(state in JobStates)) {
    throw new Error("Unknown job state");
  }
  const actionText = actionMap[action];
  if (action === RunnerActions.waiting) {
    return actionText;
  }
  const verb = verbMap[state as JobStates];
  if (!verb || !actionText) {
    throw new Error("Unknown job state or action");
  }
  return `${verb} ${actionText} by`;
}

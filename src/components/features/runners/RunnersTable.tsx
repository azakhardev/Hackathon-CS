import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table/table";
import { Table_cel_state } from "@/components/ui/table/table_cel_state";
import Table_cel_title from "@/components/ui/table/table_cel_title";
import { IErrorMessage } from "@/lib/types/IErrorMessage";
import {
  buildRunnerDescription,
  buildRunnerText as runnerRoleText,
} from "@/components/features/jobs/JobsTable";
import { IRunner } from "@/lib/types/IRunner";
import IconButton from "@/components/IconButton";
import { CheckIcon, PieChartIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/lib/hooks/use-mobile";

interface IProps {
  runners: (IRunner[] | IErrorMessage)[] | undefined;
  searchText?: string;
}

export default function RunnersTable(props: IProps) {
  // onClick={() => handleRowClick(r.id)}
  // const navigate = useNavigate();

  // function handleRowClick(id: string) {
  //   navigate(`/runners/${id}`);
  // }

  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const runnerData =
    props.runners
      ?.filter((item): item is IRunner[] => Array.isArray(item))
      .flat() || [];

  if (!runnerData.length) {
    return <p>No runners available or an error occurred.</p>;
  }

  return (
    <Table>
      <TableBody>
        {runnerData.map((r, index) => {
          const title = r.id.slice(r.id.length - 5).toUpperCase();
          return (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <Table_cel_title
                  title={title}
                  text={buildRunnerDescription(r.id, t)}
                  searchText={props.searchText}
                />
              </TableCell>
              <TableCell>
                <Table_cel_state title={r.state} text="" type={r.state} />
              </TableCell>
              {!isMobile && (
                <TableCell>
                  <div className="flex gap-1">
                    <Badge variant="outline" title={title}>
                      {title}
                    </Badge>
                    {runnerRoleText(r.id, t)}
                  </div>
                </TableCell>
              )}
              <TableCell className="flex flex-row justify-end gap-2">
                <IconButton
                  url={`/runners/${r.id}`}
                  icon={<CheckIcon size={16} />}
                  text={`${title.toLowerCase()}${t(
                    "translation:runners:icon_jobs"
                  )}`}
                  tab="jobs"
                />
                <IconButton
                  url={`/runners/${r.id}`}
                  icon={<PieChartIcon size={16} />}
                  text={`${title.toLowerCase()}${t(
                    "translation:runners:icon_metrics"
                  )}`}
                  tab="metrics"
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

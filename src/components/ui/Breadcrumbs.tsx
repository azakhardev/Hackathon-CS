import { Link, useLocation } from "react-router-dom";
import { HomeIcon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

interface IBreadcrumbs {
  type?: "runner" | "automationType" | "automationLogs" | "project";
}

export default function Breadcrumbs({ type }: IBreadcrumbs) {
  const pathname = useLocation().pathname;

  const segments = pathname.split("/");

  return (
    <div className="flex gap-1 text-xs items-center mb-4">
      <Link to="/">
        <HomeIcon width={18} />
      </Link>
      {segments.map((item, i) => {
        if (item != "") {
          let splitted = item;
          switch (type) {
            case "runner":
              splitted = item.split("-")[item.split("-").length - 1];
              break;
            case "automationLogs":
              splitted = item.split("-")[item.split("-").length - 1];
              break;
            case "automationType":
              const splittedArr = item.split(/(?=[A-Z])/);
              splitted = splittedArr[0] + " " + splittedArr[1];
              break;
            case "project":
              splitted = item.split("_")[item.split("_").length - 1];
              break;
            default:
              break;
          }

          return (
            <Fragment key={i}>
              <span className="text-primary opacity-40 px-1 font-black">/</span>
              <Link to={`${segments.slice(0, i + 1).join("/")}`}>
                {splitted.toUpperCase()}
              </Link>
            </Fragment>
          );
        }
      })}
    </div>
  );
}

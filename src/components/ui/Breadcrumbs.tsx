import { Link, useLocation } from "react-router-dom";
import { HomeIcon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

interface IBreadcrumbs {
  type?: "runner" | "automationType" | "automationLogs" | "project";
}

export default function Breadcrumbs({ type }: IBreadcrumbs) {
  const pathname = useLocation().pathname;

  const segments = pathname.split("/");

  return (
    <div className="flex items-center gap-2 px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <Link to="/">
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink>/</BreadcrumbLink>
            </BreadcrumbItem>
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
                <>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <Link key={i} to={`${segments.slice(0, i + 1).join("/")}`}>
                    <BreadcrumbItem>
                      {i === segments.length - 1 ? (
                        <BreadcrumbPage className="capitalize">
                          {splitted.toLowerCase()}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink className="capitalize">
                          {splitted.toLowerCase()}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </Link>
                </>
              );
            }
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

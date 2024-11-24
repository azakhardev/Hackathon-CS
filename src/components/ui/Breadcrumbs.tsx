import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

export default function Breadcrumbs() {
  const pathname = useLocation().pathname;

  const segments = pathname.split("/");

  let urlDefined = "";
  if (segments.length > 1 && segments[segments.length - 2] === "automations")
    urlDefined = `/projects/${segments[2]}?tabs=automations`;
  //todo: different path coming from automations directly?
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
            let url = `${segments.slice(0, i + 1).join("/")}`;

            if (item != "") {
              if (item.startsWith("automationTypes")) item = "automation types";
              if (item.startsWith("SAS_")) item = item.slice(4);
              if (item.startsWith("runner-")) item = item.slice(-5);
              if (item === "automations") url = urlDefined;

              return (
                <>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <Link key={i} to={url}>
                    <BreadcrumbItem>
                      {i === segments.length - 1 ? (
                        <BreadcrumbPage className="capitalize">
                          {item.toLowerCase()}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink className="capitalize">
                          {item.toLowerCase()}
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

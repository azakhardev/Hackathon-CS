import { badgeVariants } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export default function Badge_Link({
  title = "Click me",
  route = "#",
  className = "",
}: {
  title?: string;
  route?: string;
  className?: string;
}) {
  return (
    <Link
      className={`${badgeVariants({ variant: "outline" })} ${className}`}
      to={route}
    >
      {title}
    </Link>
  );
}

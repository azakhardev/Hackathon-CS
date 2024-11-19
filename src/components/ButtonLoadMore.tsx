import React from "react";
import { Button } from "./ui/Button";
import { Separator } from "./ui/separator";

interface ButtonLoadMoreProps {
  className?: string;
  title?: string;
}

export default function ButtonLoadMore({
  className = "",
  title = "More",
  onClick,
}: ButtonLoadMoreProps & { onClick?: () => void }) {
  return (
    <div
      className={`flex flex-row justify-center items-center overflow-hidden ${className}`}
    >
      <Separator className="flex-grow" />
      <Button variant="outline" onClick={onClick}>
        {title}
      </Button>
      <Separator className="flex-grow" />
    </div>
  );
}

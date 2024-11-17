import { Button } from "@/components/ui/Button";
import React from "react";

interface ButtonLoadMoreProps {
  show: boolean;
  onClick: () => void;
}

export default function ButtonLoadMore({ show, onClick }: ButtonLoadMoreProps) {
  return (
    <Button
      className={show ? "w-full" : "hidden"}
      variant="outline"
      onClick={onClick}
    >
      Load more
    </Button>
  );
}

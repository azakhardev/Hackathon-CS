import React from "react";

export default function TableFilterNav({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-wrap justify-between gap-4 mb-4 sm:flex-row sm:flex-nowrap">
      {left}
      <div className="flex flex-wrap justify-end flex-1 gap-2 sm:flex-nowrap">
        {right}
      </div>
    </div>
  );
}

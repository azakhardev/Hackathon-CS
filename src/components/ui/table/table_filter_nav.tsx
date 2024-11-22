import React from "react";

export default function TableFilterNav({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="flex justify-between gap-4 mb-4">
      {left}
      <div className="flex justify-end flex-1 gap-2">{right}</div>
    </div>
  );
}

// export default function TableFilterNav({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <div className="flex justify-end flex-1 gap-2">{children}</div>;
// }

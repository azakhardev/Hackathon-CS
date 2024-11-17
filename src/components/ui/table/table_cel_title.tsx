import React from "react";

interface TableCelTitleProps {
  title: string;
  text: string;
}

const TableCelTitle: React.FC<TableCelTitleProps> = ({ title, text }) => {
  return (
    <div className="flex flex-col">
      <div className="text-base font-semibold text-primary">{title}</div>
      <div className="text-sm font-light text-muted-foreground">{text}</div>
    </div>
  );
};

export default TableCelTitle;

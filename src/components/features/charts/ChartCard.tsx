import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface ChartCardProps2 {
  header: string;
  description?: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export function ChartCard2({
  header,
  description,
  icon,
  content,
}: ChartCardProps2) {
  return (
    <Card className="flex flex-col w-full gap-5 bg-bg_primary bg-bg_default">
      {/* bg-bg_secondary */}
      <CardHeader className="border-b">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>{header}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {React.cloneElement(icon as React.ReactElement, { size: 40 })}
        </div>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}

interface ChartCardProps {
  header: React.ReactNode;
  description?: React.ReactNode;
  content: React.ReactNode;
}

export default function ChartCard({ header, content }: ChartCardProps) {
  return (
    <Card className="flex flex-col w-full gap-5 bg-bg_secondary">
      {/* bg-bg_secondary */}
      <CardHeader className="border-b">{header}</CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}

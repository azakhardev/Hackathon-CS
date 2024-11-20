import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

interface ChartCardProps {
  header: React.ReactNode;
  content: React.ReactNode;
}

export default function ChartCard({ header, content }: ChartCardProps) {
  return (
    <Card className="flex flex-col gap-5">
      <CardHeader className="border-b">
        <div className="flex items-center w-full gap-2">{header}</div>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}

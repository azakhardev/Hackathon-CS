import React from "react";

export default function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="pb-2 text-3xl font-semibold tracking-tight scroll-m-20 first:mt-0">
      {children}
    </h2>
  );
}

import React from "react";

export default function H1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`mb-6 text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl ${className}`}
    >
      {children}
    </h1>
  );
}

import * as React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-svh flex items-center justify-center p-6">{children}</div>;
}
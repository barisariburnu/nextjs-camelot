"use client";

import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { Separator } from "@workspace/ui/components/separator";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip";

type Crumb = { label: string; href?: string };

interface DashboardLayoutProps {
  breadcrumbs?: Crumb[];
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({
  breadcrumbs,
  right,
  children,
  className,
}: DashboardLayoutProps) {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((c, i) => {
                  const isLast = i === breadcrumbs.length - 1;
                  return (
                    <React.Fragment key={`${c.label}-${i}`}>
                      {i > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                      <BreadcrumbItem className={`${i < breadcrumbs.length - 1 ? "hidden md:block" : ""} min-w-0`}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            {isLast || !c.href ? (
                              <BreadcrumbPage className="truncate max-w-[60vw] sm:max-w-[320px] md:max-w-[480px]">{c.label}</BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink href={c.href} className="truncate max-w-[40vw] sm:max-w-[240px] md:max-w-[360px]">{c.label}</BreadcrumbLink>
                            )}
                          </TooltipTrigger>
                          <TooltipContent>{c.label}</TooltipContent>
                        </Tooltip>
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          ) : null}
        </div>
        <div className="ml-auto px-4 flex items-center gap-2">
          {right}
          <ThemeToggle />
        </div>
      </header>
      <div className={`flex flex-1 flex-col gap-4 p-4 pt-0 ${className ?? ""}`}>
        {children}
      </div>
    </>
  );
}
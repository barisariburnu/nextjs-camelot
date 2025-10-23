"use client";

import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { ProjectExplorer } from "@/components/project-explorer";
import { ProjectHeaderCard } from "@/components/project-header-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { Separator } from "@workspace/ui/components/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import { useProjectSelection } from "@/hooks/use-project-selection";
import type { Project } from "@/components/providers";

export default function Page() {
  const { selectedProject } = useProjectSelection();

  // Filtering state
  const [query, setQuery] = React.useState("");
  const [code, setCode] = React.useState("");
  const [category, setCategory] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<Project["status"] | null>(null);
  const [priority, setPriority] = React.useState<Project["priority"] | null>(
    null
  );
  const [dateStart, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  const [sortBy, setSortBy] = React.useState<keyof Project>("createdAt");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("desc");

  const clearFilters = React.useCallback(() => {
    setQuery("");
    setCode("");
    setCategory(null);
    setStatus(null);
    setPriority(null);
    setDateStart("");
    setDateEnd("");
    setSortBy("createdAt");
    setSortDir("desc");
  }, []);

  const activeFilters = React.useMemo(() => {
    const filters: string[] = [];
    if (query) filters.push(`Arama: ${query}`);
    if (code) filters.push(`Kod: ${code}`);
    if (category) filters.push(`Kategori: ${category}`);
    if (status) filters.push(`Durum: ${status}`);
    if (priority) filters.push(`Öncelik: ${priority}`);
    if (dateStart) filters.push(`Başlangıç: ${dateStart}`);
    if (dateEnd) filters.push(`Bitiş: ${dateEnd}`);
    return filters;
  }, [query, code, category, status, priority, dateStart, dateEnd]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Camelot</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Persistent header card - always visible */}
          <ProjectHeaderCard
            query={query}
            setQuery={setQuery}
            code={code}
            setCode={setCode}
            category={category}
            setCategory={setCategory}
            status={status}
            setStatus={setStatus}
            priority={priority}
            setPriority={setPriority}
            dateStart={dateStart}
            setDateStart={setDateStart}
            dateEnd={dateEnd}
            setDateEnd={setDateEnd}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortDir={sortDir}
            setSortDir={setSortDir}
            clearFilters={clearFilters}
            activeFilters={activeFilters}
          />

          {/* Project Explorer - always visible */}
          <ProjectExplorer
            query={query}
            code={code}
            category={category}
            status={status}
            priority={priority}
            dateStart={dateStart}
            dateEnd={dateEnd}
            sortBy={sortBy}
            sortDir={sortDir}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

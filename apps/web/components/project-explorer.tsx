"use client";

import * as React from "react";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { Grid, List } from "lucide-react";

import dynamic from "next/dynamic";

import type { Project } from "@/components/providers";
import {
  useProjectsQuery,
  useProjectSelection,
} from "@/hooks/use-project-selection";

const LazySelectedProjectDetails = dynamic(
  () =>
    import("./selected-project-details").then((m) => m.SelectedProjectDetails),
  {
    ssr: false,
    loading: () => (
      <div className="grid gap-3 md:grid-cols-2">
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-24 md:col-span-2" />
      </div>
    ),
  }
);

interface ProjectExplorerProps {
  query: string;
  code: string;
  category: string | null;
  status: Project["status"] | null;
  priority: Project["priority"] | null;
  dateStart: string;
  dateEnd: string;
  sortBy: keyof Project;
  sortDir: "asc" | "desc";
}

export function ProjectExplorer(props: ProjectExplorerProps) {
  const { data: projects = [] } = useProjectsQuery();
  const { selectedProject, selectProject, isLoading, clearSelection } =
    useProjectSelection();

  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 12;

  const filtered = React.useMemo(() => {
    let list = projects;
    if (props.query)
      list = list.filter((p) =>
        p.name.toLowerCase().includes(props.query.toLowerCase())
      );
    if (props.code)
      list = list.filter((p) =>
        p.code.toLowerCase().includes(props.code.toLowerCase())
      );
    if (props.category)
      list = list.filter((p) => p.category === props.category);
    if (props.status) list = list.filter((p) => p.status === props.status);
    if (props.priority)
      list = list.filter((p) => p.priority === props.priority);
    if (props.dateStart)
      list = list.filter(
        (p) => new Date(p.createdAt) >= new Date(props.dateStart)
      );
    if (props.dateEnd)
      list = list.filter(
        (p) => new Date(p.createdAt) <= new Date(props.dateEnd)
      );
    list = [...list].sort((a, b) => {
      const va = a[props.sortBy];
      const vb = b[props.sortBy];
      const cmp = va < vb ? -1 : va > vb ? 1 : 0;
      return props.sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [
    projects,
    props.query,
    props.code,
    props.category,
    props.status,
    props.priority,
    props.dateStart,
    props.dateEnd,
    props.sortBy,
    props.sortDir,
  ]);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = filtered.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [
    props.query,
    props.code,
    props.category,
    props.status,
    props.priority,
    props.dateStart,
    props.dateEnd,
  ]);

  // If a project is selected, show project details instead of list
  if (selectedProject) {
    return (
      <section
        aria-label="Proje detayları"
        className="rounded-xl border bg-background"
      >
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                Proje Detayları
              </h3>
              <p className="text-sm text-muted-foreground">
                {selectedProject.name}
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Project Info Card */}
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h4 className="font-medium mb-3">Proje Bilgileri</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Proje Kodu:</span>
                    <Badge variant="outline">{selectedProject.code}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kategori:</span>
                    <span>{selectedProject.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Durum:</span>
                    <Badge
                      className={getStatusBadgeClass(selectedProject.status)}
                    >
                      {selectedProject.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Öncelik:</span>
                    <Badge
                      variant="outline"
                      className={
                        selectedProject.priority === "Yüksek"
                          ? "border-[oklch(var(--priority-high)/0.20)] text-priority-high"
                          : selectedProject.priority === "Normal"
                            ? "border-[oklch(var(--priority-normal)/0.20)] text-priority-normal"
                            : "border-[oklch(var(--priority-low)/0.20)] text-priority-low"
                      }
                    >
                      {selectedProject.priority}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Proje Sahibi:</span>
                    <span>{selectedProject.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Oluşturma Tarihi:
                    </span>
                    <span>
                      {new Date(selectedProject.createdAt).toLocaleDateString(
                        "tr-TR"
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div className="rounded-lg border p-4">
                <h4 className="font-medium mb-3">Açıklama</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedProject.description ||
                    "Bu proje için henüz açıklama eklenmemiş."}
                </p>
              </div>
            </div>

            {/* Project Statistics */}
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h4 className="font-medium mb-3">Proje İstatistikleri</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-primary">
                      {Math.floor(Math.random() * 100)}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Tamamlanma
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-success">
                      {Math.floor(Math.random() * 50) + 10}
                    </div>
                    <div className="text-xs text-muted-foreground">Görev</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-info">
                      {Math.floor(Math.random() * 10) + 1}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Ekip Üyesi
                    </div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-warning">
                      {Math.floor(Math.random() * 30) + 5}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Gün Kaldı
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="rounded-lg border p-4 border-[oklch(var(--border)/0.25)]">
                <h4 className="font-medium mb-3">Son Aktiviteler</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-[oklch(var(--success))]"></div>
                    <span className="text-muted-foreground">
                      Görev tamamlandı
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      2 saat önce
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-[oklch(var(--info))]"></div>
                    <span className="text-muted-foreground">
                      Yeni yorum eklendi
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      5 saat önce
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-[oklch(var(--warning))]"></div>
                    <span className="text-muted-foreground">
                      Dosya yüklendi
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      1 gün önce
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="Proje listesi"
      className="rounded-xl border bg-background"
    >
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">Projeler</h3>
            <p className="text-sm text-muted-foreground">
              Sonuç: {filtered.length} proje
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 rounded-lg border transition-all hover:shadow-md border-border hover:border-primary/50 flex flex-col h-full"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {project.code}
                    </Badge>
                    <Badge
                      className={`${getStatusBadgeClass(project.status)} text-xs`}
                    >
                      {project.status}
                    </Badge>
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <h4 className="font-medium text-sm mb-2 line-clamp-2 leading-tight">
                        {project.name}
                      </h4>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      {project.name}
                    </TooltipContent>
                  </Tooltip>

                  <div className="space-y-1 mb-3 flex-grow">
                    <div className="text-xs text-muted-foreground">
                      {project.category}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {project.owner}
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        project.priority === "Yüksek"
                          ? "border-[oklch(var(--priority-high)/0.20)] text-priority-high"
                          : project.priority === "Normal"
                            ? "border-[oklch(var(--priority-normal)/0.20)] text-priority-normal"
                            : "border-[oklch(var(--priority-low)/0.20)] text-priority-low"
                      }`}
                    >
                      {project.priority}
                    </Badge>
                  </div>

                  <Button
                    size="sm"
                    className="w-full mt-auto"
                    onClick={() => selectProject(project)}
                    disabled={isLoading}
                  >
                    Projeyi Seç
                  </Button>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <div className="text-muted-foreground">
                    <div className="text-lg font-medium mb-2">
                      Sonuç bulunamadı
                    </div>
                    <p className="text-sm">Filtreleri değiştirmeyi deneyin</p>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-muted-foreground">
                  Sayfa {currentPage} / {totalPages} ({filtered.length} toplam
                  proje)
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Önceki
                  </Button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Sonraki
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="space-y-2">
              {paginatedProjects.map((project) => (
                <div
                  key={project.id}
                  className="w-full p-4 rounded-lg border transition-all hover:shadow-sm border-border hover:border-primary/50"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <Badge variant="outline" className="text-xs shrink-0">
                          {project.code}
                        </Badge>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <h4 className="font-medium text-sm truncate">
                              {project.name}
                            </h4>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            {project.name}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {project.category} • {project.owner}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          project.priority === "Yüksek"
                            ? "border-[oklch(var(--priority-high)/0.20)] text-priority-high"
                            : project.priority === "Normal"
                              ? "border-[oklch(var(--priority-normal)/0.20)] text-priority-normal"
                              : "border-[oklch(var(--priority-low)/0.20)] text-priority-low"
                        }`}
                      >
                        {project.priority}
                      </Badge>
                      <Badge
                        className={`${getStatusBadgeClass(project.status)} text-xs`}
                      >
                        {project.status}
                      </Badge>
                      <Button
                        size="sm"
                        onClick={() => selectProject(project)}
                        disabled={isLoading}
                      >
                        Seç
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-muted-foreground">
                    <div className="text-lg font-medium mb-2">
                      Sonuç bulunamadı
                    </div>
                    <p className="text-sm">Filtreleri değiştirmeyi deneyin</p>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination for list view */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-muted-foreground">
                  Sayfa {currentPage} / {totalPages} ({filtered.length} toplam
                  proje)
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Önceki
                  </Button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Sonraki
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function getStatusBadgeClass(status: Project["status"]) {
  switch (status) {
    case "Devam Eden":
      return "bg-[oklch(var(--info)/0.15)] text-info border border-[oklch(var(--info)/0.20)]";
    case "Tamamlanan":
      return "bg-[oklch(var(--success)/0.15)] text-success border border-[oklch(var(--success)/0.20)]";
    case "Bekleyen":
      return "bg-[oklch(var(--warning)/0.15)] text-warning border border-[oklch(var(--warning)/0.20)]";
    default:
      return "bg-muted text-muted-foreground border border-border";
  }
}

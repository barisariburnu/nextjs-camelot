"use client";

import * as React from "react";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Separator } from "@workspace/ui/components/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  Calendar,
  Clock,
  User,
  Building,
  AlertCircle,
  CheckCircle,
  Pause,
} from "lucide-react";

import type { Project } from "@/components/providers";
import { useProjectSelection } from "@/hooks/use-project-selection";

const categories = ["Kamulaştırma", "Arıtma", "İçme Suyu", "Atık Su", "Sayaç"];
const statuses: Array<Project["status"]> = [
  "Devam Eden",
  "Tamamlanan",
  "Bekleyen",
];
const priorities: Array<Project["priority"]> = ["Düşük", "Normal", "Yüksek"];

interface ProjectHeaderCardProps {
  query: string;
  setQuery: (value: string) => void;
  code: string;
  setCode: (value: string) => void;
  category: string | null;
  setCategory: (value: string | null) => void;
  status: Project["status"] | null;
  setStatus: (value: Project["status"] | null) => void;
  priority: Project["priority"] | null;
  setPriority: (value: Project["priority"] | null) => void;
  dateStart: string;
  setDateStart: (value: string) => void;
  dateEnd: string;
  setDateEnd: (value: string) => void;
  sortBy: keyof Project;
  setSortBy: (value: keyof Project) => void;
  sortDir: "asc" | "desc";
  setSortDir: (value: "asc" | "desc") => void;
  clearFilters: () => void;
  activeFilters: string[];
}

function getStatusIcon(status: Project["status"]) {
  switch (status) {
    case "Devam Eden":
      return <AlertCircle className="h-4 w-4 text-info" />;
    case "Tamamlanan":
      return <CheckCircle className="h-4 w-4 text-success" />;
    case "Bekleyen":
      return <Pause className="h-4 w-4 text-warning" />;
    default:
      return null;
  }
}

// Statü rozeti için semantik sınıflar
function getStatusBadgeClass(status: Project["status"]) {
  switch (status) {
    case "Devam Eden":
      return "text-info border-[oklch(var(--info)/0.12)] bg-[oklch(var(--info)/0.06)]";
    case "Tamamlanan":
      return "text-success border-[oklch(var(--success)/0.12)] bg-[oklch(var(--success)/0.06)]";
    case "Bekleyen":
      return "text-warning border-[oklch(var(--warning)/0.12)] bg-[oklch(var(--warning)/0.06)]";
    default:
      return "text-muted-foreground";
  }
}

function getPriorityColor(priority: Project["priority"]) {
  switch (priority) {
    case "Yüksek":
      return "border-[oklch(var(--priority-high)/0.12)] text-priority-high";
    case "Normal":
      return "border-[oklch(var(--priority-normal)/0.12)] text-priority-normal";
    case "Düşük":
      return "border-[oklch(var(--priority-low)/0.12)] text-priority-low";
    default:
      return "border-[oklch(var(--priority-low)/0.12)] text-priority-low";
  }
}

export function ProjectHeaderCard(props: ProjectHeaderCardProps) {
  const { selectedProject, clearSelection } = useProjectSelection();

  if (selectedProject) {
    // Proje seçili - proje bilgi kartı göster
    return (
      <div className="rounded-xl border bg-background p-4 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              {getStatusIcon(selectedProject.status)}
              <h2 className="text-lg font-semibold tracking-tight truncate">
                {selectedProject.name}
              </h2>
              <Badge variant="outline" className={`shrink-0 text-xs ${getStatusBadgeClass(selectedProject.status)}`}>
                {selectedProject.status}
              </Badge>
              <Badge variant="outline" className="shrink-0">
                {selectedProject.code}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {selectedProject.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Kategori</div>
                  <div className="text-sm font-medium">
                    {selectedProject.category}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Sorumlu</div>
                  <div className="text-sm font-medium">
                    {selectedProject.owner}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Başlangıç</div>
                  <div className="text-sm font-medium">
                    {new Date(selectedProject.startDate).toLocaleDateString(
                      "tr-TR"
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Öncelik</div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getPriorityColor(selectedProject.priority)}`}
                  >
                    {selectedProject.priority}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Düzenle
            </Button>
            <Button variant="ghost" size="sm" onClick={clearSelection}>
              Projeden Çık
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Proje seçili değil - filtreleme kartı göster
  return (
    <div className="rounded-xl border bg-background p-4 md:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold tracking-tight">Proje Seçimi</h2>
        <p className="text-sm text-muted-foreground">
          Arama ve filtreleme ile projelerinizi keşfedin
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            Proje adı
          </label>
          <Input
            placeholder="Ara..."
            value={props.query}
            onChange={(e) => props.setQuery(e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            Proje kodu
          </label>
          <Input
            placeholder="PRJ-0001"
            value={props.code}
            onChange={(e) => props.setCode(e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            Kategori
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {props.category ?? "Tümü"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {categories.map((c) => (
                <DropdownMenuItem key={c} onClick={() => props.setCategory(c)}>
                  {c}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => props.setCategory(null)}>
                Temizle
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">
            Durum
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {props.status ?? "Tümü"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {statuses.map((s) => (
                <DropdownMenuItem key={s} onClick={() => props.setStatus(s)}>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(s)}
                    {s}
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => props.setStatus(null)}>
                Temizle
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Öncelik: {props.priority ?? "Tümü"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {priorities.map((p) => (
                <DropdownMenuItem key={p} onClick={() => props.setPriority(p)}>
                  {p}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => props.setPriority(null)}>
                Temizle
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Sırala: {props.sortBy} {props.sortDir === "asc" ? "↑" : "↓"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {(
                ["name", "code", "createdAt", "priority", "status"] as Array<
                  keyof Project
                >
              ).map((key) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => props.setSortBy(key)}
                >
                  {key === "name"
                    ? "Ad"
                    : key === "code"
                      ? "Kod"
                      : key === "createdAt"
                        ? "Tarih"
                        : key}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  props.setSortDir(props.sortDir === "asc" ? "desc" : "asc")
                }
              >
                {props.sortDir === "asc" ? "Azalan" : "Artan"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {props.activeFilters?.length > 0 && (
          <>
            <Separator orientation="vertical" className="h-4" />
            <Button variant="ghost" size="sm" onClick={props.clearFilters}>
              Filtreleri Temizle
            </Button>
          </>
        )}
      </div>

      {props.activeFilters?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {props.activeFilters.map((chip) => (
            <Badge key={chip} variant="secondary" className="text-xs">
              {chip}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

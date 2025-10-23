"use client";
import * as React from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Badge } from "@workspace/ui/components/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@workspace/ui/components/sheet";
import { Separator } from "@workspace/ui/components/separator";
import {
  ChevronsUpDown,
  Loader2,
  FolderOpen,
  CheckCircle2,
  Clock,
  Search,
  Plus,
} from "lucide-react";
import type { Project } from "./providers";
import {
  useProjectsQuery,
  useProjectSelection,
} from "@/hooks/use-project-selection";

// Basit görsel eşleştirme (kategoriye göre)
const categoryImages: Record<string, string> = {
  "Kamulaştırma":
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop",
  "Arıtma":
    "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop",
  "İçme Suyu":
    "https://images.unsplash.com/photo-1506807803488-8eafc15316c1?q=80&w=1200&auto=format&fit=crop",
  "Atık Su":
    "https://images.unsplash.com/photo-1556761175-4b46a572b88b?q=80&w=1200&auto=format&fit=crop",
  "Sayaç":
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
};

const statuses: Array<Project["status"]> = [
  "Devam Eden",
  "Tamamlanan",
  "Bekleyen",
];
const priorities: Array<Project["priority"]> = ["Düşük", "Normal", "Yüksek"];

export function ProjectSelect() {
  const { isMobile, setOpen } = useSidebar();
  const { selectedProject, selectProject } = useProjectSelection();
  const { data: projects = [], isLoading } = useProjectsQuery();

  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<Project["status"] | null>(null);
  const [priority, setPriority] = React.useState<Project["priority"] | null>(
    null
  );

  const categories = React.useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))).sort(),
    [projects]
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects
      .filter((p) => (category ? p.category === category : true))
      .filter((p) => (status ? p.status === status : true))
      .filter((p) => (priority ? p.priority === priority : true))
      .filter((p) =>
        q
          ? `${p.name} ${p.category} ${p.status} ${p.priority}`
              .toLowerCase()
              .includes(q)
          : true
      );
  }, [projects, category, status, priority, query]);

  React.useEffect(() => {
    console.groupCollapsed("ProjectSelect: yükleme durumu");
    console.debug("isLoading:", isLoading, "projects:", projects.length);
    if (!isLoading && projects.length === 0) {
      console.warn("Projects boş. Demo veri seti yüklenmedi ya da Providers devre dışı.");
    }
    console.groupEnd();
  }, [isLoading, projects]);

  React.useEffect(() => {
    console.debug("ProjectSelect: filtreler", { query, category, status, priority });
  }, [query, category, status, priority]);

  React.useEffect(() => {
    console.debug("ProjectSelect: filtrelenmiş sonuç sayısı", filtered.length);
  }, [filtered]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Proje Seçimi</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <SidebarMenuButton size="sm" tooltip="Proje Seç">
                <FolderOpen className="mr-2 h-4 w-4" />
                <span>
                  {selectedProject ? selectedProject.name : "Proje Seçimi"}
                </span>
                <ChevronsUpDown className="ml-auto h-4 w-4" />
              </SidebarMenuButton>
            </SheetTrigger>

            <SheetContent side={isMobile ? "bottom" : "top"} className="max-h-[85vh]">
              <SheetHeader>
                <SheetTitle>Proje Seçimi</SheetTitle>
                <SheetDescription>
                  Arama, filtreleme ve örnek kartlarla hızlı seçim yap.
                </SheetDescription>
              </SheetHeader>

              <div className="mt-4 flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Proje ara..."
                    className="pl-8"
                  />
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    // Basit yönlendirme – gerçek sayfa hazırsa güncellenebilir
                    window.location.href = "/dashboard/projects/new";
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" /> Yeni Proje Oluştur
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <Badge
                    onClick={() => setCategory(null)}
                    className={`${
                      category === null ? "bg-primary text-primary-foreground" : "cursor-pointer"
                    } select-none`}
                  >
                    Tümü
                  </Badge>
                  {categories.map((c) => (
                    <Badge
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`${
                        category === c
                          ? "bg-primary text-primary-foreground"
                          : "cursor-pointer"
                      } select-none`}
                    >
                      {c}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <Badge
                    onClick={() => setStatus(null)}
                    className={`${
                      status === null ? "bg-secondary" : "cursor-pointer"
                    } select-none`}
                  >
                    Durum: Tümü
                  </Badge>
                  {statuses.map((s) => (
                    <Badge
                      key={s}
                      onClick={() => setStatus(s)}
                      className={`${
                        status === s ? "bg-secondary" : "cursor-pointer"
                      } select-none`}
                    >
                      {s}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <Badge
                    onClick={() => setPriority(null)}
                    className={`${
                      priority === null ? "bg-accent" : "cursor-pointer"
                    } select-none`}
                  >
                    Öncelik: Tümü
                  </Badge>
                  {priorities.map((p) => (
                    <Badge
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`${
                        priority === p ? "bg-accent" : "cursor-pointer"
                      } select-none`}
                    >
                      {p}
                    </Badge>
                  ))}
                </div>
              </div>

              <ScrollArea className="mt-4 h-[48vh] pr-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Yükleniyor...
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="text-sm text-muted-foreground">Sonuç bulunamadı.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {filtered.map((p, idx) => {
                      const img = categoryImages[p.category] ??
                        "https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=1200&auto=format&fit=crop";
                      return (
                        <div
                          key={`${p.id}-${idx}`}
                          className="group rounded-lg border bg-card text-card-foreground overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="relative h-28 w-full overflow-hidden">
                            <img
                              src={img}
                              alt={p.category}
                              className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
                            />
                            <div className="absolute left-2 top-2">
                              <Badge variant="secondary">{p.category}</Badge>
                            </div>
                          </div>
                          <div className="p-3 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <div className="font-medium truncate">{p.name}</div>
                                <div className="text-xs text-muted-foreground truncate">
                                  {p.description ?? "Açıklama mevcut değil"}
                                </div>
                              </div>
                              {p.status === "Tamamlanan" ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                              ) : p.status === "Bekleyen" ? (
                                <Clock className="h-4 w-4 text-amber-500 flex-shrink-0" />
                              ) : null}
                            </div>

                            <div className="flex items-center justify-between">
                              <Badge variant="outline">Öncelik: {p.priority}</Badge>
                              <div className="flex items-center gap-2">
                                <SheetClose asChild>
                                  <Button
                                     size="sm"
                                     variant="secondary"
                                     onClick={() => {
                                       console.debug("ProjectSelect: selectProject", { id: p.id, name: p.name });
                                       selectProject(p);
                                       if (isMobile) setOpen(false);
                                     }}
                                   >
                                     Seç
                                   </Button>
                                </SheetClose>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>

              <Separator className="my-4" />

              {selectedProject ? (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground truncate">
                    Seçili Proje: {selectedProject.name}
                  </div>
                  <SheetClose asChild>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        console.debug("ProjectSelect: clearSelection");
                        selectProject(null);
                      }}
                    >
                      Projeden Çık
                    </Button>
                  </SheetClose>
                </div>
              ) : null}
            </SheetContent>
          </Sheet>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
"use client";

import * as React from "react";
import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useProjectSelection } from "@/hooks/use-project-selection";

export function SelectedProjectCard() {
  const { selectedProject, isLoading, clearSelection } = useProjectSelection();

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-background p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-9 w-32" />
        </div>
        <Separator className="my-4" />
        <div className="grid gap-4 md:grid-cols-4">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      </div>
    );
  }

  if (!selectedProject) return null;

  return (
    <section
      aria-label="Seçili Proje Bilgisi"
      className="rounded-xl border bg-background p-4"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs text-muted-foreground">Seçili Proje</div>
          <div className="text-lg font-medium leading-tight">
            {selectedProject.name}
          </div>
          <div className="text-sm text-muted-foreground">
            Durum: {selectedProject.status}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="destructive" onClick={clearSelection}>
            Projeden Çık
          </Button>
          <Button>Detaya Git</Button>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="grid gap-4 md:grid-cols-4">
        <div>
          <div className="text-xs text-muted-foreground">Başlangıç</div>
          <div>
            {new Date(selectedProject.startDate).toLocaleDateString("tr-TR")}
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Bitiş</div>
          <div>
            {new Date(selectedProject.endDate).toLocaleDateString("tr-TR")}
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Sorumlu</div>
          <div>{selectedProject.owner}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Öncelik</div>
          <div>{selectedProject.priority}</div>
        </div>
      </div>
    </section>
  );
}

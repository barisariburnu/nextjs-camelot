"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import type { Project } from "@/components/providers"

export function SelectedProjectDetails({ project, onClear }: { project: Project; onClear: () => void }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div>
        <div className="text-xs text-muted-foreground">Proje Adı</div>
        <div className="text-lg font-medium tracking-tight truncate">{project.name}</div>
      </div>
      <div>
        <div className="text-xs text-muted-foreground">Proje Kodu</div>
        <div className="text-lg font-medium tracking-tight">{project.code}</div>
      </div>
      <div>
        <div className="text-xs text-muted-foreground">Kategori</div>
        <div>{project.category}</div>
      </div>
      <div>
        <div className="text-xs text-muted-foreground">Durum</div>
        <div>{project.status}</div>
      </div>
      <div>
        <div className="text-xs text-muted-foreground">Öncelik</div>
        <div>{project.priority}</div>
      </div>
      <div>
        <div className="text-xs text-muted-foreground">Başlangıç</div>
        <div>{new Date(project.startDate).toLocaleDateString("tr-TR")}</div>
      </div>
      <div>
        <div className="text-xs text-muted-foreground">Bitiş</div>
        <div>{new Date(project.endDate).toLocaleDateString("tr-TR")}</div>
      </div>
      <div>
        <div className="text-xs text-muted-foreground">Sorumlu</div>
        <div>{project.owner}</div>
      </div>
      <div className="md:col-span-2">
        <div className="text-xs text-muted-foreground">Açıklama</div>
        <p className="mt-1 text-sm leading-relaxed">{project.description}</p>
      </div>
      <div className="md:col-span-2 flex justify-end gap-2">
        <Button variant="secondary" onClick={onClear}>Projeden Çık</Button>
        <Button>Detaya Git</Button>
      </div>
    </div>
  )
}
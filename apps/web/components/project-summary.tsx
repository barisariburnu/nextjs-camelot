"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Progress } from "@workspace/ui/components/progress";
import { Project, ProjectCategory, ProjectSummary } from "@/lib/types";
import { CalendarDays, Users, MapPin, DollarSign } from "lucide-react";

interface ProjectSummaryProps {
  project: Project;
  summary: ProjectSummary;
  showTitle?: boolean;
}

export function ProjectSummaryComponent({
  project,
  summary,
  showTitle = true,
}: ProjectSummaryProps) {
  const getCategoryColor = (category: ProjectCategory) => {
    switch (category) {
      case ProjectCategory.KAMULASTIRMA:
        return "bg-[oklch(var(--info)/0.15)] text-info border-[oklch(var(--info)/0.20)]";
      case ProjectCategory.IRTIFAK:
        return "bg-[oklch(var(--success)/0.15)] text-success border-[oklch(var(--success)/0.20)]";
      case ProjectCategory.KAMULASTIRMA_IRTIFAK:
        return "bg-[oklch(var(--accent)/0.15)] text-[oklch(var(--accent))] border-[oklch(var(--accent)/0.20)]";
      case ProjectCategory.TAHSIS:
        return "bg-[oklch(var(--warning)/0.15)] text-warning border-[oklch(var(--warning)/0.20)]";
      case ProjectCategory.DEVIR:
        return "bg-muted text-foreground border-border";
      default:
        return "bg-muted text-foreground border-border";
    }
  };

  const completionPercentage =
    summary.toplamMalik > 0
      ? Math.round((summary.tamamlananIslemler / summary.toplamMalik) * 100)
      : 0;

  const budgetUsagePercentage =
    summary.toplamButce > 0
      ? Math.round((summary.harcananTutar / summary.toplamButce) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* Proje Başlık Bilgileri */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          {showTitle && (
            <h1 className="text-3xl font-bold">{project.ad}</h1>
          )}
          <div className="flex items-center gap-2 mt-2">
            <Badge className={getCategoryColor(project.kategori)}>
              {project.kategori}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Sorumlu: {project.sorumluKisi}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>
            {project.baslangicTarihi.toLocaleDateString("tr-TR")}
            {project.bitisTarihi &&
              ` - ${project.bitisTarihi.toLocaleDateString("tr-TR")}`}
          </span>
        </div>
      </div>

      {/* Özet Kartları */}
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] gap-3 sm:grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] sm:gap-4 md:grid-cols-[repeat(auto-fit,_minmax(260px,_1fr))] md:gap-6 [touch-action:manipulation]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Alan</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.toplamAlan.toLocaleString("tr-TR")} m²
            </div>
            <p className="text-xs text-muted-foreground">
              {project.areas.length} farklı ada/parsel
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Malik Sayısı</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.toplamMalik}</div>
            <p className="text-xs text-muted-foreground">
              {summary.tamamlananIslemler} tamamlandı,{" "}
              {summary.bekleyenIslemler} bekliyor
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bütçe Durumu</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.toplamButce.toLocaleString("tr-TR")} ₺
            </div>
            <p className="text-xs text-muted-foreground">
              {summary.harcananTutar.toLocaleString("tr-TR")} ₺ harcanmış
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">İlerleme</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">%{completionPercentage}</div>
            <Progress value={completionPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Tamamlanan işlemler
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detaylı İstatistikler */}
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(260px,_1fr))] gap-4 md:gap-6 [touch-action:manipulation]">
        <Card>
          <CardHeader>
            <CardTitle>İşlem Durumu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Tamamlanan Ödemeler</span>
              <span className="font-semibold text-success">
                {project.tamamlananOdemeSayisi}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Bekleyen Ödemeler</span>
              <span className="font-semibold text-warning">
                {project.bekleyenOdemeSayisi}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Dava Süreçleri</span>
              <span className="font-semibold text-priority-high">
                {project.davaSayisi}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bütçe Analizi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Bütçe Kullanımı</span>
                <span>%{budgetUsagePercentage}</span>
              </div>
              <Progress value={budgetUsagePercentage} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Kalan Bütçe</span>
              <span className="font-semibold text-info">
                {summary.kalanButce.toLocaleString("tr-TR")} ₺
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {project.aciklama && (
        <Card>
          <CardHeader>
            <CardTitle>Proje Açıklaması</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{project.aciklama}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ProjectCategory } from "@/lib/types";
import {
  MapPin,
  Users,
  Calendar,
  TrendingUp,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import Link from "next/link";

// Mock project data
const mockProjects = [
  {
    id: "1",
    name: "Merkez Mahallesi Kamulaştırma Projesi",
    category: ProjectCategory.KAMULASTIRMA,
    sorumluKisi: "Ahmet Yılmaz",
    baslangicTarihi: new Date("2024-01-15"),
    bitisTarihi: new Date("2024-12-31"),
    toplamAlan: 15000,
    malikSayisi: 45,
    butce: 2500000,
    tamamlanmaOrani: 48,
    durum: "Devam Ediyor",
  },
  {
    id: "2",
    name: "Yeni Yerleşim İrtifak Projesi",
    category: ProjectCategory.IRTIFAK,
    sorumluKisi: "Fatma Demir",
    baslangicTarihi: new Date("2024-02-01"),
    bitisTarihi: new Date("2024-10-30"),
    toplamAlan: 8500,
    malikSayisi: 28,
    butce: 1200000,
    tamamlanmaOrani: 72,
    durum: "Devam Ediyor",
  },
  {
    id: "3",
    name: "Sanayi Bölgesi Tahsis Projesi",
    category: ProjectCategory.TAHSIS,
    sorumluKisi: "Mehmet Kaya",
    baslangicTarihi: new Date("2023-11-15"),
    bitisTarihi: new Date("2024-08-15"),
    toplamAlan: 25000,
    malikSayisi: 12,
    butce: 3500000,
    tamamlanmaOrani: 95,
    durum: "Tamamlanıyor",
  },
];

export default function ProjectsPage() {
  const getCategoryBadge = (category: ProjectCategory) => {
    const configs = {
      [ProjectCategory.KAMULASTIRMA]: {
        text: "Kamulaştırma",
        variant: "default" as const,
        color: "bg-[oklch(var(--info)/0.15)] text-info border border-[oklch(var(--info)/0.20)]",
      },
      [ProjectCategory.IRTIFAK]: {
        text: "İrtifak",
        variant: "secondary" as const,
        color: "bg-[oklch(var(--success)/0.15)] text-success border border-[oklch(var(--success)/0.20)]",
      },
      [ProjectCategory.KAMULASTIRMA_IRTIFAK]: {
        text: "Kamulaştırma-İrtifak",
        variant: "outline" as const,
        color: "bg-[oklch(var(--accent)/0.15)] text-[oklch(var(--accent))] border border-[oklch(var(--accent)/0.20)]",
      },
      [ProjectCategory.TAHSIS]: {
        text: "Tahsis",
        variant: "secondary" as const,
        color: "bg-[oklch(var(--warning)/0.15)] text-warning border border-[oklch(var(--warning)/0.20)]",
      },
      [ProjectCategory.DEVIR]: {
        text: "Devir",
        variant: "outline" as const,
        color: "bg-muted text-foreground border border-border",
      },
    };
    return configs[category];
  };

  const getStatusColor = (tamamlanmaOrani: number) => {
    if (tamamlanmaOrani >= 90) return "text-success";
    if (tamamlanmaOrani >= 50) return "text-warning";
    return "text-priority-high";
  };

  return (
    <DashboardLayout
      className="py-6"
      breadcrumbs={[
        { label: "Yönetim Paneli", href: "/" },
        { label: "Projeler" },
      ]}
      right={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Ara
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrele
          </Button>
          <Link href="/projects/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Proje
            </Button>
          </Link>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Sayfa Başlığı */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Proje Yönetimi</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Kamulaştırma, İrtifak, Tahsis ve Devir projelerini yönetin
            </p>
          </div>
        </div>

        {/* Proje İstatistikleri */}
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] gap-3 sm:gap-4 [touch-action:manipulation]">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Toplam Proje
                  </p>
                  <p className="text-2xl font-bold">{mockProjects.length}</p>
                </div>
                <MapPin className="h-8 w-8 text-info" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Aktif Proje
                  </p>
                  <p className="text-2xl font-bold">
                    {
                      mockProjects.filter((p) => p.durum === "Devam Ediyor")
                        .length
                    }
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Toplam Malik
                  </p>
                  <p className="text-2xl font-bold">
                    {mockProjects.reduce((sum, p) => sum + p.malikSayisi, 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-info" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Toplam Bütçe
                  </p>
                  <p className="text-2xl font-bold">
                    {(
                      mockProjects.reduce((sum, p) => sum + p.butce, 0) /
                      1000000
                    ).toFixed(1)}
                    M ₺
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Proje Listesi */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockProjects.map((project) => {
              const categoryBadge = getCategoryBadge(project.category);

              return (
                <Card
                  key={project.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2 line-clamp-2">
                          {project.name}
                        </CardTitle>
                        <Badge className={categoryBadge.color}>
                          {categoryBadge.text}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Proje Bilgileri */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sorumlu:</span>
                        <span className="font-medium">
                          {project.sorumluKisi}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Alan:</span>
                        <span className="font-medium">
                          {project.toplamAlan.toLocaleString("tr-TR")} m²
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Malik:</span>
                        <span className="font-medium">{project.malikSayisi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bütçe:</span>
                        <span className="font-medium">
                          {project.butce.toLocaleString("tr-TR")} ₺
                        </span>
                      </div>
                      <div className={`flex justify-between ${getStatusColor(project.tamamlanmaOrani)}`}>
                        <span className="text-muted-foreground">Tamamlanma:</span>
                        <span className="font-medium">
                          %{project.tamamlanmaOrani}
                        </span>
                      </div>
                    </div>

                    {/* Hızlı Aksiyonlar */}
                    <div className="flex items-center gap-2">
                      <Link href={`/projects/${project.id}`}>
                        <Button size="sm" variant="outline">
                          Detay
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline">
                        Paylaş
                      </Button>
                      <Button size="sm">Düzenle</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

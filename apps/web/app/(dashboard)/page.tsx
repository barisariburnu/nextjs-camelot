import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import {
  MapPin,
  Users,
  Calendar,
  TrendingUp,
  FileText,
  Settings,
  BarChart3,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function Dashboard() {
  return (
    <DashboardLayout
      className="py-6"
      breadcrumbs={[{ label: "Yönetim Paneli" }]}
    >
      {/* Başlık */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Yönetim Paneli</h1>
        <p className="text-muted-foreground">
          Proje yönetimi ve kamulaştırma süreçlerinizi takip edin
        </p>
      </div>

      {/* Hızlı İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Aktif Projeler
                </p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-success">+2 bu ay</p>
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
                  Toplam Malik
                </p>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-xs text-info">+45 bu hafta</p>
              </div>
              <Users className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Bekleyen Ödemeler
                </p>
                <p className="text-2xl font-bold">₺2.4M</p>
                <p className="text-xs text-warning">18 işlem</p>
              </div>
              <TrendingUp className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Dava Süreçleri
                </p>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-priority-high">3 acil</p>
              </div>
              <FileText className="h-8 w-8 text-priority-high" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ana Menü Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link href="/projects">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Proje Yönetimi</CardTitle>
                <MapPin className="h-6 w-6 text-info" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Kamulaştırma, İrtifak, Tahsis ve Devir projelerini yönetin
              </p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">12 Aktif Proje</Badge>
                <Button size="sm">Görüntüle</Button>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Malik Yönetimi</CardTitle>
                <Users className="h-6 w-6 text-success" />
              </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Malik bilgileri, ödeme durumları ve süreç takibi
            </p>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">1,247 Malik</Badge>
              <Button size="sm" variant="outline">
                Yakında
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Ödeme Takibi</CardTitle>
              <TrendingUp className="h-6 w-6 text-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Ödeme durumları, bütçe analizi ve finansal raporlar
            </p>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">₺2.4M Bekleyen</Badge>
              <Button size="sm" variant="outline">
                Yakında
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Dava Süreçleri</CardTitle>
              <FileText className="h-6 w-6 text-priority-high" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Mahkeme süreçleri, dava takibi ve hukuki işlemler
            </p>
            <div className="flex items-center justify-between">
              <Badge variant="destructive">8 Aktif Dava</Badge>
              <Button size="sm" variant="outline">
                Yakında
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Raporlar</CardTitle>
              <BarChart3 className="h-6 w-6 text-info" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Detaylı raporlar, analizler ve performans metrikleri
            </p>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">15 Rapor Türü</Badge>
              <Button size="sm" variant="outline">
                Yakında
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Ayarlar</CardTitle>
              <Settings className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Sistem ayarları, kullanıcı yönetimi ve konfigürasyon
            </p>
            <div className="flex items-center justify-between">
              <Badge variant="outline">Sistem Yönetimi</Badge>
              <Button size="sm" variant="outline">
                Yakında
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Son Aktiviteler */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Son Aktiviteler</CardTitle>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border transition-colors bg-[oklch(var(--info)/0.10)] border-[oklch(var(--info)/0.20)]">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-info" />
                <div>
                  <p className="font-medium">
                    Merkez Mahallesi Projesi güncellendi
                  </p>
                  <p className="text-sm text-muted-foreground">2 saat önce</p>
                </div>
              </div>
              <Badge variant="secondary">Proje</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border transition-colors bg-[oklch(var(--success)/0.10)] border-[oklch(var(--success)/0.20)]">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-success" />
                <div>
                  <p className="font-medium">5 yeni malik kaydı eklendi</p>
                  <p className="text-sm text-muted-foreground">4 saat önce</p>
                </div>
              </div>
              <Badge variant="secondary">Malik</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border transition-colors bg-[oklch(var(--priority-high)/0.10)] border-[oklch(var(--priority-high)/0.20)]">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-priority-high" />
                <div>
                  <p className="font-medium">Dava süreci başlatıldı</p>
                  <p className="text-sm text-muted-foreground">1 gün önce</p>
                </div>
              </div>
              <Badge variant="destructive">Dava</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

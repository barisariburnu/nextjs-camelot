"use client";

import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ProjectSummaryComponent } from "@/components/project-summary";
import { ProjectFilter } from "@/components/project-filter";
import { ProjectAreasTable } from "@/components/project-areas-table";
import { PropertyOwnerList } from "@/components/property-owner-list";
import { PaymentStatusSummary } from "@/components/payment-status";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@workspace/ui/components/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@workspace/ui/components/tabs";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip";
import {
    Project,
    ProjectCategory,
    ProcessStatus,
    FilterCriteria,
    PropertyOwner,
    ProjectArea,
    ProjectSummary as ProjectSummaryType,
} from "@/lib/types";
import {
    MapPin,
    Users,
    FileText,
    TrendingUp,
    Download,
    Share2,
    Settings,
} from "lucide-react";

// Mock data - gerçek uygulamada API'den gelecek
const mockProject: Project = {
    id: "1",
    ad: "Merkez Mahallesi Kamulaştırma Projesi",
    kategori: ProjectCategory.KAMULASTIRMA,
    sorumluKisi: "Ahmet Yılmaz",
    baslangicTarihi: new Date("2024-01-15"),
    bitisTarihi: new Date("2024-12-31"),
    durum: "Devam Ediyor",
    areas: [],
    toplamMalikSayisi: 45,
    tamamlananOdemeSayisi: 0,
    bekleyenOdemeSayisi: 0,
    davaSayisi: 0,
    toplamAlan: 15000,
    malikSayisi: 45,
    butce: 2500000,
    harcananButce: 1200000,
    tamamlanmaOrani: 48,
    aciklama:
        "Merkez mahallesi kentsel dönüşüm projesi kapsamında gerçekleştirilen kamulaştırma çalışmaları.",
};

const mockProjectAreas: ProjectArea[] = [
    {
        id: "1",
        ada: "123",
        parsel: "45",
        nitelik: "Arsa",
        yuzolcumu: 2500,
        kamulaştırmaAlani: 2500,
        malikler: [],
        tapuDurumu: "Tapu Tahsis",
        alan: 2500,
        malikSayisi: 8,
        odemeToplamTutari: 450000,
        odenenTutar: 200000,
        davaliMalikSayisi: 2,
        tamamlananMalikSayisi: 3,
    },
    {
        id: "2",
        ada: "124",
        parsel: "12",
        nitelik: "Arsa",
        yuzolcumu: 1800,
        kamulaştırmaAlani: 1800,
        malikler: [],
        tapuDurumu: "Tapu Tahsis",
        alan: 1800,
        malikSayisi: 5,
        odemeToplamTutari: 320000,
        odenenTutar: 320000,
        davaliMalikSayisi: 0,
        tamamlananMalikSayisi: 5,
    },
    {
        id: "3",
        ada: "125",
        parsel: "78",
        nitelik: "Arsa",
        yuzolcumu: 3200,
        kamulaştırmaAlani: 3200,
        malikler: [],
        tapuDurumu: "Tapu Tahsis",
        alan: 3200,
        malikSayisi: 12,
        odemeToplamTutari: 580000,
        odenenTutar: 150000,
        davaliMalikSayisi: 4,
        tamamlananMalikSayisi: 2,
    },
];

const mockOwners: PropertyOwner[] = [
    {
        id: "1",
        kimlikNo: "12345678901",
        tcKimlikNo: "12345678901",
        ad: "Mehmet",
        soyad: "Demir",
        telefon: "0532 123 45 67",
        email: "mehmet.demir@email.com",
        adres: "Merkez Mah. Atatürk Cad. No:15",
        hissePay: 1,
        hissePayda: 4,
        processStatus: ProcessStatus.PAYMENT_COMPLETED,
        odemeTutari: 85000,
        odenenTutar: 85000,
        kalanTutar: 0,
        sonIslemTarihi: new Date("2024-01-20"),
        ada: "123",
        parsel: "45",
        hissePayi: "1/4",
    },
    {
        id: "2",
        kimlikNo: "98765432109",
        tcKimlikNo: "98765432109",
        ad: "Ayşe",
        soyad: "Kaya",
        telefon: "0533 987 65 43",
        email: "ayse.kaya@email.com",
        adres: "Yeni Mah. İnönü Sok. No:8",
        hissePay: 1,
        hissePayda: 2,
        processStatus: ProcessStatus.PAYMENT_PENDING,
        odemeTutari: 120000,
        odenenTutar: 60000,
        kalanTutar: 60000,
        sonIslemTarihi: new Date("2024-01-18"),
        ada: "124",
        parsel: "12",
        hissePayi: "1/2",
    },
    {
        id: "3",
        kimlikNo: "11223344556",
        tcKimlikNo: "11223344556",
        ad: "Fatma",
        soyad: "Özkan",
        telefon: "0534 111 22 33",
        email: "fatma.ozkan@email.com",
        adres: "Çarşı Mah. Cumhuriyet Cad. No:42",
        hissePay: 1,
        hissePayda: 3,
        processStatus: ProcessStatus.LAWSUIT_PROCESS,
        odemeTutari: 95000,
        odenenTutar: 0,
        kalanTutar: 95000,
        mahkemeEsasNo: "2024/123",
        sonIslemTarihi: new Date("2024-01-15"),
        ada: "125",
        parsel: "78",
        hissePayi: "1/3",
    },
    {
        id: "4",
        kimlikNo: "55667788990",
        tcKimlikNo: "55667788990",
        ad: "Ali",
        soyad: "Şahin",
        telefon: "0535 555 66 77",
        email: "ali.sahin@email.com",
        adres: "Bahçe Mah. Gül Sok. No:23",
        hissePay: 1,
        hissePayda: 8,
        processStatus: ProcessStatus.PAYMENT_PENDING,
        odemeTutari: 75000,
        odenenTutar: 25000,
        kalanTutar: 50000,
        sonIslemTarihi: new Date("2024-01-22"),
        ada: "123",
        parsel: "45",
        hissePayi: "1/8",
    },
];

const mockProjectSummary: ProjectSummaryType = {
    toplamAlan: mockProject.toplamAlan || 0,
    toplamMalik: mockProject.malikSayisi || 0,
    tamamlananIslemler: mockOwners.filter(
        (m) => m.processStatus === ProcessStatus.PAYMENT_COMPLETED
    ).length,
    bekleyenIslemler: mockOwners.filter(
        (m) => m.processStatus === ProcessStatus.PAYMENT_PENDING
    ).length,
    toplamButce: mockProject.butce || 0,
    harcananTutar: mockProject.harcananButce || 0,
    kalanButce: (mockProject.butce || 0) - (mockProject.harcananButce || 0),
};

export function ProjectDetailClient() {
    const [activeTab, setActiveTab] = useState("overview");
    const [filters, setFilters] = useState<FilterCriteria>({});

    // Filtrelenmiş veriler
    const filteredOwners = useMemo(() => {
        return mockOwners.filter((owner) => {
            if (filters.ada && owner.ada !== filters.ada) return false;
            if (filters.parsel && owner.parsel !== filters.parsel) return false;
            if (
                filters.malikKimlikNo &&
                !owner.tcKimlikNo?.includes(filters.malikKimlikNo)
            )
                return false;
            if (
                filters.mahkemeEsasNo &&
                owner.mahkemeEsasNo !== filters.mahkemeEsasNo
            )
                return false;
            if (
                filters.processStatus &&
                owner.processStatus !== filters.processStatus
            )
                return false;
            return true;
        });
    }, [filters]);

    const filteredProjectAreas = useMemo(() => {
        return mockProjectAreas.filter((area) => {
            if (filters.ada && area.ada !== filters.ada) return false;
            if (filters.parsel && area.parsel !== filters.parsel) return false;
            return true;
        });
    }, [filters]);

    const getCategoryBadge = (category: ProjectCategory) => {
        const configs = {
            [ProjectCategory.KAMULASTIRMA]: {
                text: "Kamulaştırma",
                variant: "default" as const,
            },
            [ProjectCategory.IRTIFAK]: {
                text: "İrtifak",
                variant: "secondary" as const,
            },
            [ProjectCategory.KAMULASTIRMA_IRTIFAK]: {
                text: "Kamulaştırma-İrtifak",
                variant: "outline" as const,
            },
            [ProjectCategory.TAHSIS]: {
                text: "Tahsis",
                variant: "secondary" as const,
            },
            [ProjectCategory.DEVIR]: { text: "Devir", variant: "outline" as const },
        };
        return configs[category];
    };

    const categoryBadge = getCategoryBadge(
        mockProject.kategori || ProjectCategory.KAMULASTIRMA
    );

    return (
        <DashboardLayout
            className="py-6"
            breadcrumbs={[
                { label: "Yönetim Paneli", href: "/" },
                { label: "Projeler", href: "/projects" },
                { label: mockProject.ad || "Proje" },
            ]}
            right={
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Paylaş
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Rapor Al
                    </Button>
                    <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Ayarlar
                    </Button>
                </div>
            }
        >
            <div className="space-y-6">
                <div className="flex items-start justify-between">
                    <div className="min-w-0">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <h1 className="text-2xl font-bold truncate">
                                    {mockProject.ad || "Proje Detayları"}
                                </h1>
                            </TooltipTrigger>
                            <TooltipContent>{mockProject.ad || "Proje Detayları"}</TooltipContent>
                        </Tooltip>
                        <p className="text-muted-foreground text-sm mt-1">
                            {mockProject.sorumluKisi} tarafından yönetiliyor
                        </p>
                    </div>
                    <Badge variant={categoryBadge.variant}>{categoryBadge.text}</Badge>
                </div>

                <section>
                    <ProjectSummaryComponent
                        project={mockProject}
                        summary={mockProjectSummary}
                        showTitle={false}
                    />
                </section>

                <section>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                                Arama ve Filtreleme
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ProjectFilter
                                onFilterChange={setFilters}
                                onClearFilters={() => setFilters({})}
                                activeFilters={filters}
                            />
                        </CardContent>
                    </Card>
                </section>

                <section>
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="space-y-6"
                    >
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="overview" className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                <span className="hidden sm:inline">Genel Bakış</span>
                                <span className="sm:hidden">Genel</span>
                            </TabsTrigger>
                            <TabsTrigger value="areas" className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="hidden sm:inline">Proje Alanları</span>
                                <span className="sm:hidden">Alanlar</span>
                            </TabsTrigger>
                            <TabsTrigger value="owners" className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="hidden sm:inline">Malik Listesi</span>
                                <span className="sm:hidden">Malikler</span>
                            </TabsTrigger>
                            <TabsTrigger value="payments" className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span className="hidden sm:inline">Ödemeler</span>
                                <span className="sm:hidden">Ödeme</span>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Proje İstatistikleri</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">
                                                    Toplam Alan:
                                                </span>
                                                <span className="font-medium">
                                                    {mockProject.toplamAlan?.toLocaleString("tr-TR") || 0} m²
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">
                                                    Malik Sayısı:
                                                </span>
                                                <span className="font-medium">
                                                    {mockProject.malikSayisi}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Bütçe:</span>
                                                <span className="font-medium">
                                                    {mockProject.butce?.toLocaleString("tr-TR") || 0} ₺
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Harcanan:</span>
                                                <span className="font-medium">
                                                    {mockProject.harcananButce?.toLocaleString("tr-TR") || 0} ₺
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">İlerleme:</span>
                                                <span className="font-medium">
                                                    %{mockProject.tamamlanmaOrani}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <PaymentStatusSummary propertyOwners={filteredOwners} />
                            </div>
                        </TabsContent>

                        <TabsContent value="areas" className="space-y-6">
                            <ProjectAreasTable areas={filteredProjectAreas} />
                        </TabsContent>

                        <TabsContent value="owners" className="space-y-6">
                            <PropertyOwnerList propertyOwners={filteredOwners} />
                        </TabsContent>

                        <TabsContent value="payments" className="space-y-6">
                            <PaymentStatusSummary
                                propertyOwners={filteredOwners}
                                showCategoryBreakdown={true}
                            />

                            <Card>
                                <CardHeader>
                                    <CardTitle>Ödeme Detayları</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {filteredOwners.map((owner) => (
                                            <div
                                                key={owner.id}
                                                className="p-4 border border-border rounded-lg"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <div className="font-medium">
                                                            {owner.ad} {owner.soyad}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            Ada: {owner.ada}, Parsel: {owner.parsel}
                                                        </div>
                                                    </div>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            owner.processStatus ===
                                                                ProcessStatus.PAYMENT_COMPLETED
                                                                ? "bg-[oklch(var(--success)/0.15)] text-success border-[oklch(var(--success)/0.20)]"
                                                                : owner.processStatus ===
                                                                    ProcessStatus.PAYMENT_PENDING
                                                                    ? "bg-[oklch(var(--warning)/0.15)] text-warning border-[oklch(var(--warning)/0.20)]"
                                                                    : "bg-[oklch(var(--priority-high)/0.15)] text-priority-high border-[oklch(var(--priority-high)/0.20)]"
                                                        }
                                                    >
                                                        {owner.processStatus ===
                                                            ProcessStatus.PAYMENT_COMPLETED && "Tamamlandı"}
                                                        {owner.processStatus ===
                                                            ProcessStatus.PAYMENT_PENDING && "Bekliyor"}
                                                        {owner.processStatus ===
                                                            ProcessStatus.LAWSUIT_PROCESS && "Dava"}
                                                    </Badge>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                    <div>
                                                        <span className="text-muted-foreground">
                                                            Toplam:
                                                        </span>
                                                        <div className="font-medium">
                                                            {owner.odemeTutari?.toLocaleString("tr-TR")} ₺
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground">
                                                            Ödenen:
                                                        </span>
                                                        <div className="font-medium text-success">
                                                            {owner.odenenTutar?.toLocaleString("tr-TR")} ₺
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground">
                                                            Kalan:
                                                        </span>
                                                        <div className="font-medium text-warning">
                                                            {owner.kalanTutar?.toLocaleString("tr-TR")} ₺
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground">
                                                            Son İşlem:
                                                        </span>
                                                        <div className="font-medium">
                                                            {owner.sonIslemTarihi.toLocaleDateString("tr-TR")}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </section>
            </div>
        </DashboardLayout>
    );
}

"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { ProjectAreasTable } from "@/components/project-areas-table";
import { ParcelOwnerList } from "@/components/parcel-owner-list";
import { SettlementTable } from "@/components/settlement-table";
import { LawsuitTable } from "@/components/lawsuit-table";
import { PaymentSummaryTable } from "@/components/payment-summary-table";
import {
    ProjectArea,
    PropertyOwner,
    ProcessStatus,
    Settlement,
    Lawsuit,
    PaymentSummary,
} from "@/lib/types";
import { FileBarChart } from "lucide-react";

// Mock data - Project Areas
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
    {
        id: "4",
        ada: "126",
        parsel: "23",
        nitelik: "Bina",
        yuzolcumu: 1500,
        kamulaştırmaAlani: 1500,
        malikler: [],
        tapuDurumu: "Tapu Tahsis",
        alan: 1500,
        malikSayisi: 6,
        odemeToplamTutari: 380000,
        odenenTutar: 280000,
        davaliMalikSayisi: 1,
        tamamlananMalikSayisi: 4,
    },
];

// Mock data - Property Owners
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
    {
        id: "5",
        kimlikNo: "66778899001",
        tcKimlikNo: "66778899001",
        ad: "Zeynep",
        soyad: "Yıldız",
        telefon: "0536 666 77 88",
        email: "zeynep.yildiz@email.com",
        adres: "Park Mah. Akasya Blv. No:56",
        hissePay: 1,
        hissePayda: 6,
        processStatus: ProcessStatus.PAYMENT_COMPLETED,
        odemeTutari: 95000,
        odenenTutar: 95000,
        kalanTutar: 0,
        sonIslemTarihi: new Date("2024-02-01"),
        ada: "126",
        parsel: "23",
        hissePayi: "1/6",
    },
];

// Mock data - Settlements
const mockSettlements: Settlement[] = [
    {
        id: "1",
        ada: "123",
        parsel: "45",
        uzlasilanMalikSayisi: 6,
        uzlasilamayanMalikSayisi: 2,
        kalanMalikSayisi: 0,
        toplamMalikSayisi: 8,
        uzlasmaTarihi: new Date("2024-02-15"),
        uzlasmaTutari: 380000,
    },
    {
        id: "2",
        ada: "124",
        parsel: "12",
        uzlasilanMalikSayisi: 5,
        uzlasilamayanMalikSayisi: 0,
        kalanMalikSayisi: 0,
        toplamMalikSayisi: 5,
        uzlasmaTarihi: new Date("2024-01-28"),
        uzlasmaTutari: 320000,
    },
    {
        id: "3",
        ada: "125",
        parsel: "78",
        uzlasilanMalikSayisi: 8,
        uzlasilamayanMalikSayisi: 4,
        kalanMalikSayisi: 0,
        toplamMalikSayisi: 12,
        uzlasmaTarihi: new Date("2024-02-10"),
        uzlasmaTutari: 420000,
    },
    {
        id: "4",
        ada: "126",
        parsel: "23",
        uzlasilanMalikSayisi: 5,
        uzlasilamayanMalikSayisi: 1,
        kalanMalikSayisi: 0,
        toplamMalikSayisi: 6,
        uzlasmaTarihi: new Date("2024-02-20"),
        uzlasmaTutari: 350000,
    },
];

// Mock data - Lawsuits
const mockLawsuits: Lawsuit[] = [
    {
        id: "1",
        ada: "123",
        parsel: "45",
        dosyaTuru: "kamulaştırma",
        mahkemeAdi: "Bursa 2. Asliye Hukuk Mahkemesi",
        esasNo: "2024/123",
        kararNo: undefined,
        acilisTarihi: new Date("2024-01-15"),
        durusmaTarihi: new Date("2024-03-20"),
        durum: "Devam Ediyor",
        davaTutari: 120000,
        aciklama: "Bedel itirazı davası",
    },
    {
        id: "2",
        ada: "125",
        parsel: "78",
        dosyaTuru: "bedel_artırma",
        mahkemeAdi: "Bursa 4. Asliye Hukuk Mahkemesi",
        esasNo: "2024/87",
        kararNo: undefined,
        acilisTarihi: new Date("2024-02-01"),
        durusmaTarihi: new Date("2024-04-15"),
        durum: "Devam Ediyor",
        davaTutari: 85000,
        aciklama: "Bedel artırma talebi",
    },
    {
        id: "3",
        ada: "126",
        parsel: "23",
        dosyaTuru: "ecrimisil",
        mahkemeAdi: "Bursa 1. Asliye Hukuk Mahkemesi",
        esasNo: "2023/456",
        kararNo: "2024/45",
        acilisTarihi: new Date("2023-11-10"),
        durusmaTarihi: undefined,
        durum: "Karar Verildi",
        davaTutari: 35000,
        aciklama: "Ecrimisil bedeli davası",
    },
    {
        id: "4",
        ada: "125",
        parsel: "78",
        dosyaTuru: "kamulaştırma",
        mahkemeAdi: "Bursa 3. Asliye Hukuk Mahkemesi",
        esasNo: "2024/234",
        kararNo: undefined,
        acilisTarihi: new Date("2024-01-25"),
        durusmaTarihi: new Date("2024-03-30"),
        durum: "Devam Ediyor",
        davaTutari: 95000,
        aciklama: "Kamulaştırma bedel itirazı",
    },
];

// Mock data - Payment Summaries
const mockPaymentSummaries: PaymentSummary[] = [
    {
        id: "1",
        ada: "123",
        parsel: "45",
        toplamMalikSayisi: 8,
        odenenMalikSayisi: 3,
        odenenTutar: 200000,
        kalanMalikSayisi: 5,
        kalanTutar: 250000,
        toplamTutar: 450000,
        tamamlanmaOrani: 44.4,
    },
    {
        id: "2",
        ada: "124",
        parsel: "12",
        toplamMalikSayisi: 5,
        odenenMalikSayisi: 5,
        odenenTutar: 320000,
        kalanMalikSayisi: 0,
        kalanTutar: 0,
        toplamTutar: 320000,
        tamamlanmaOrani: 100,
    },
    {
        id: "3",
        ada: "125",
        parsel: "78",
        toplamMalikSayisi: 12,
        odenenMalikSayisi: 2,
        odenenTutar: 150000,
        kalanMalikSayisi: 10,
        kalanTutar: 430000,
        toplamTutar: 580000,
        tamamlanmaOrani: 25.9,
    },
    {
        id: "4",
        ada: "126",
        parsel: "23",
        toplamMalikSayisi: 6,
        odenenMalikSayisi: 4,
        odenenTutar: 280000,
        kalanMalikSayisi: 2,
        kalanTutar: 100000,
        toplamTutar: 380000,
        tamamlanmaOrani: 73.7,
    },
];

export default function ReportsPage() {
    return (
        <DashboardLayout
            className="py-6"
            breadcrumbs={[
                { label: "Yönetim Paneli", href: "/" },
                { label: "Raporlar" },
            ]}
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <FileBarChart className="h-6 w-6" />
                            Kapsamlı Proje Raporları
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">
                            Tüm proje verilerinin detaylı görünümü
                        </p>
                    </div>
                </div>

                {/* Table 1: Project Areas */}
                <section>
                    <ProjectAreasTable areas={mockProjectAreas} />
                </section>

                {/* Table 2: Parcel Owner List (Ada/Parsel Bazlı) */}
                <section>
                    <ParcelOwnerList propertyOwners={mockOwners} />
                </section>

                {/* Table 3: Settlements */}
                <section>
                    <SettlementTable settlements={mockSettlements} />
                </section>

                {/* Table 4: Lawsuits */}
                <section>
                    <LawsuitTable lawsuits={mockLawsuits} />
                </section>

                {/* Table 5: Payment Summaries */}
                <section>
                    <PaymentSummaryTable paymentSummaries={mockPaymentSummaries} />
                </section>
            </div>
        </DashboardLayout>
    );
}

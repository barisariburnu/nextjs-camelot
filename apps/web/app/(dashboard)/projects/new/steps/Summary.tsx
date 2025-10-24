"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@workspace/ui/components/card";
import { FileText, Building2, Users, BarChart3, CheckCircle2 } from "lucide-react";

// Kullanıcıya gösterilecek etiket eşleştirmeleri
const LABELS = {
  department: {
    strateji: "Strateji Geliştirme Daire Başkanlığı",
    bilgi: "Bilgi İşlem Daire Başkanlığı",
    insan: "İnsan Kaynakları Daire Başkanlığı",
    mali: "Mali Hizmetler Daire Başkanlığı",
    hukuk: "Hukuk İşleri Daire Başkanlığı",
  },
  projectResponsible: {
    ahmet: "Ahmet Yılmaz",
    mehmet: "Mehmet Demir",
    ayse: "Ayşe Kaya",
  },
  projectStatus: {
    bekleyen: "Bekleyen",
    devam: "Devam Eden",
    tamamlanan: "Tamamlanan",
  },
  projectType: {
    atik: "Atıksu Projesi",
    yagmur: "Yağmursuyu Projesi",
    icme: "İçmesuyu Projesi",
  },
  expropriationNeed: {
    var: "Var",
    yok: "Yok",
  },
  planRevision: {
    var: "Var",
    yok: "Yok",
  },
  neighborhood: {
    merkez: "Merkez",
    kavak: "Kavak",
    baglar: "Bağlar",
  },
  investmentType: {
    yeni: "Yeni Yatırım",
    bakim: "Bakım Onarım",
    genisletme: "Genişletme",
  },
} as const;

const displayLabel = (field: keyof typeof LABELS, value?: string) => {
  if (!value || value.trim() === "") return "-";
  const map = LABELS[field];
  return (map as Record<string, string>)[value] ?? value;
};

interface StepProps {
  formData: any;
  currentStep: number;
  progress: number;
}

export default function Summary({ formData, currentStep, progress }: StepProps) {
  return (
    <div className="space-y-6">
      {/* Özet Paneli */}
      <div className="bg-muted/50 rounded-lg p-6 border">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Proje Özeti</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Aşağıda girdiğiniz tüm bilgilerin özeti yer almaktadır. Kaydetmeden önce bilgileri kontrol ediniz.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Proje Bilgileri */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Proje Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">Daire Başkanlığı:</span>
                  <p className="mt-1">{displayLabel("department", formData.department)}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Proje Adı:</span>
                  <p className="mt-1">{formData.projectName || "-"}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Proje Kodu:</span>
                  <p className="mt-1">{formData.projectCode || "-"}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Proje Türü:</span>
                  <p className="mt-1">{displayLabel("projectType", formData.projectType)}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Proje Sorumlusu:</span>
                  <p className="mt-1">{displayLabel("projectResponsible", formData.projectResponsible)}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Proje Durumu:</span>
                  <p className="mt-1">{displayLabel("projectStatus", formData.projectStatus)}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Başlangıç Tarihi:</span>
                  <p className="mt-1">{formData.projectStartDate || "-"}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Bitiş Tarihi:</span>
                  <p className="mt-1">{formData.projectEndDate || "-"}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Mahalle:</span>
                  <p className="mt-1">{displayLabel("neighborhood", formData.neighborhood)}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Kamulaştırma Var mı?</span>
                  <p className="mt-1">{displayLabel("expropriationNeed", formData.expropriationNeed)}</p>
                </div>
                <div className="col-span-2">
                  <span className="font-medium text-muted-foreground">Plan Tadilatı Var mı?</span>
                  <p className="mt-1">{displayLabel("planRevision", formData.planRevision)}</p>
                </div>
                <div className="col-span-2">
                  <span className="font-medium text-muted-foreground">Proje Açıklaması:</span>
                  <p className="mt-1">{formData.projectDescription || "-"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Onaylar */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" />
                Onaylar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">YK Kararı Tarihi:</span>
                  <p className="mt-1">{formData.decisionDate || "-"}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">YK Kararı Sayı:</span>
                  <p className="mt-1">{formData.decisionNumber || "-"}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">KYK Tarihi:</span>
                  <p className="mt-1">{formData.kykDate || "-"}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">KYK Sayı:</span>
                  <p className="mt-1">{formData.kykNumber || "-"}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Cumhurbaşkanı Olur Tarihi:</span>
                  <p className="mt-1">{formData.presidentApprovalDate || "-"}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Cumhurbaşkanı Olur Sayı:</span>
                  <p className="mt-1">{formData.presidentApprovalNumber || "-"}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Meclis Kararı Tarihi:</span>
                  <p className="mt-1">{formData.parliamentDate || "-"}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Meclis Kararı Sayı:</span>
                  <p className="mt-1">{formData.parliamentNumber || "-"}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Resmi Gazete Tarihi:</span>
                  <p className="mt-1">{formData.officialGazetteDate || "-"}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Resmi Gazete Sayı:</span>
                  <p className="mt-1">{formData.officialGazetteNumber || "-"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Genel Bilgiler */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Genel Bilgiler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">Yatırım Türü:</span>
                  <p className="mt-1">{displayLabel("investmentType", formData.investmentType)}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Yatırım Yılı:</span>
                  <p className="mt-1">{formData.investmentYear || "-"}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Proje Onay Tarihi:</span>
                  <p className="mt-1">{formData.projectApprovalDate || "-"}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Proje Keşif Tutarı:</span>
                  <p className="mt-1">{formData.projectBudget ? `${formData.projectBudget} TL` : "-"}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Parsel Adedi:</span>
                  <p className="mt-1">{formData.parcelCount || "-"}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Toplam Uzunluk:</span>
                  <p className="mt-1">{formData.totalLength || "-"}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Toplam Alan:</span>
                  <p className="mt-1">{formData.totalArea || "-"}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">İstimlak Alanı:</span>
                  <p className="mt-1">{formData.expropriationArea || "-"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* İstatistikler */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Form İstatistikleri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tamamlanan Adımlar:</span>
                  <span className="font-medium">{currentStep - 1}/4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Form Tamamlanma:</span>
                  <span className="font-medium text-primary">%{Math.round(progress)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Doldurulmuş Alanlar:</span>
                  <span className="font-medium">
                    {Object.values(formData).filter((value: any) => value && value.toString().trim() !== "").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Onay Mesajı */}
        <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-primary">Bilgiler Kontrol Edildi</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Yukarıdaki bilgilerin doğruluğunu kontrol ettikten sonra "Kaydet" butonuna tıklayarak projeyi oluşturabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
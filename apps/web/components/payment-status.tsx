"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Progress } from "@workspace/ui/components/progress";
import { PaymentInfo, ProcessStatus, PropertyOwner } from "@/lib/types";
import {
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  TrendingUp,
  FileText,
} from "lucide-react";

interface PaymentStatusProps {
  malik: PropertyOwner;
  payments?: PaymentInfo[];
  showDetails?: boolean;
}

export function PaymentStatus({
  malik,
  payments = [],
  showDetails = false,
}: PaymentStatusProps) {
  const getStatusConfig = (status: ProcessStatus) => {
    switch (status) {
      case ProcessStatus.PAYMENT_COMPLETED:
        return {
          color:
            "bg-[oklch(var(--success)/0.15)] text-success border border-[oklch(var(--success)/0.20)]",
          icon: <CheckCircle className="h-4 w-4" />,
          label: "Ödeme Tamamlandı",
          bgColor: "bg-[oklch(var(--success)/0.10)]",
          textColor: "text-success",
        };
      case ProcessStatus.PAYMENT_PENDING:
        return {
          color:
            "bg-[oklch(var(--warning)/0.15)] text-warning border border-[oklch(var(--warning)/0.20)]",
          icon: <Clock className="h-4 w-4" />,
          label: "Ödeme Yapılacak",
          bgColor: "bg-[oklch(var(--warning)/0.10)]",
          textColor: "text-warning",
        };
      case ProcessStatus.LAWSUIT_PROCESS:
        return {
          color:
            "bg-[oklch(var(--priority-high)/0.15)] text-priority-high border border-[oklch(var(--priority-high)/0.20)]",
          icon: <AlertCircle className="h-4 w-4" />,
          label: "Dava Sürecinde",
          bgColor: "bg-[oklch(var(--priority-high)/0.10)]",
          textColor: "text-priority-high",
        };
      default:
        return {
          color: "bg-muted text-muted-foreground border-border",
          icon: <FileText className="h-4 w-4" />,
          label: "Belirsiz",
          bgColor: "bg-muted/50",
          textColor: "text-muted-foreground",
        };
    }
  };

  const statusConfig = getStatusConfig(malik.processStatus);

  const getPaymentProgress = () => {
    if (!malik.odemeTutari || malik.odemeTutari === 0) return 0;
    const odenen = malik.odenenTutar || 0;
    return Math.round((odenen / malik.odemeTutari) * 100);
  };

  const progress = getPaymentProgress();

  if (!showDetails) {
    // Kompakt görünüm
    return (
      <div className="flex items-center gap-2">
        <Badge
          className={`${statusConfig.color} flex items-center gap-1 transition-colors`}
        >
          {statusConfig.icon}
          {statusConfig.label}
        </Badge>
        {malik.odemeTutari && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground transition-colors">
            <div className="w-16 bg-muted rounded-full h-1.5">
              <div
                className="bg-success h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs">{progress}%</span>
          </div>
        )}
      </div>
    );
  }

  // Detaylı görünüm
  return (
    <Card className={statusConfig.bgColor}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className={`flex items-center gap-2 ${statusConfig.textColor}`}>
            {statusConfig.icon}
            <span className="text-lg">Ödeme Durumu</span>
          </div>
          <Badge className={`${statusConfig.color} transition-colors`}>
            {statusConfig.label}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {malik.odemeTutari ? (
          <>
            {/* Ödeme Özeti */}
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] gap-3 sm:gap-4 [touch-action:manipulation]">
              <div className="text-center p-3 bg-card rounded-lg border border-border transition-colors">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <DollarSign className="h-4 w-4 text-info" />
                  <span className="text-sm text-muted-foreground">
                    Toplam Tutar
                  </span>
                </div>
                <div className="text-xl font-bold text-info">
                  {malik.odemeTutari.toLocaleString("tr-TR")} ₺
                </div>
              </div>

              {malik.odenenTutar !== undefined && (
                <div className="text-center p-3 bg-card rounded-lg border border-border transition-colors">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm text-muted-foreground">
                      Ödenen
                    </span>
                  </div>
                  <div className="text-xl font-bold text-success">
                    {malik.odenenTutar.toLocaleString("tr-TR")} ₺
                  </div>
                </div>
              )}

              {malik.kalanTutar !== undefined && malik.kalanTutar > 0 && (
                <div className="text-center p-3 bg-card rounded-lg border border-border transition-colors">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="h-4 w-4 text-warning" />
                    <span className="text-sm text-muted-foreground">Kalan</span>
                  </div>
                  <div className="text-xl font-bold text-warning">
                    {malik.kalanTutar.toLocaleString("tr-TR")} ₺
                  </div>
                </div>
              )}
            </div>

            {/* İlerleme Çubuğu */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Ödeme İlerlemesi
                </span>
                <span className="text-sm font-bold text-foreground">
                  {progress}%
                </span>
              </div>
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Durum Açıklaması */}
            <div className="p-3 bg-card rounded-lg border border-border transition-colors">
              <div className="flex items-start gap-2">
                {statusConfig.icon}
                <div>
                  <div className="font-medium text-foreground">
                    {statusConfig.label}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {malik.processStatus === ProcessStatus.PAYMENT_COMPLETED &&
                      "Tüm ödemeler başarıyla tamamlanmıştır."}
                    {malik.processStatus === ProcessStatus.PAYMENT_PENDING &&
                      "Ödeme işlemleri devam etmektedir."}
                    {malik.processStatus === ProcessStatus.LAWSUIT_PROCESS &&
                      "Dava süreci devam etmektedir. Mahkeme kararı beklenmektedir."}
                  </div>
                  {malik.mahkemeEsasNo && (
                    <div className="text-sm text-priority-high mt-1">
                      Mahkeme Esas No: {malik.mahkemeEsasNo}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Son İşlem Tarihi */}
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border transition-colors">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Son İşlem Tarihi
                </span>
              </div>
              <span className="font-medium">
                {malik.sonIslemTarihi.toLocaleDateString("tr-TR")}
              </span>
            </div>

            {/* Ödeme Geçmişi */}
            {payments.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  Ödeme Geçmişi ({payments.length})
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-2 bg-card rounded border border-border transition-colors"
                    >
                      <div>
                        <div className="font-medium">
                          {payment.tutar.toLocaleString("tr-TR")} ₺
                        </div>
                        {payment.odemeTarihi && (
                          <div className="text-xs text-muted-foreground">
                            {payment.odemeTarihi.toLocaleDateString("tr-TR")}
                          </div>
                        )}
                      </div>
                      {payment.odemeYontemi && (
                        <Badge
                          variant="outline"
                          className="text-xs transition-colors"
                        >
                          {payment.odemeYontemi}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-6">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <div className="text-muted-foreground">
              Ödeme tutarı henüz belirlenmemiştir.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Ödeme durumu özet bileşeni
export function PaymentStatusSummary({
  propertyOwners,
  showCategoryBreakdown = true,
}: {
  propertyOwners: PropertyOwner[];
  showCategoryBreakdown?: boolean;
}) {
  const toplamMalikler = propertyOwners.length;
  const completedPayments = propertyOwners.filter(
    (m) => m.processStatus === ProcessStatus.PAYMENT_COMPLETED
  ).length;
  const pendingPayments = propertyOwners.filter(
    (m) => m.processStatus === ProcessStatus.PAYMENT_PENDING
  ).length;
  const lawsuits = propertyOwners.filter(
    (m) => m.processStatus === ProcessStatus.LAWSUIT_PROCESS
  ).length;

  const totalAmount = propertyOwners.reduce(
    (sum, malik) => sum + (malik.odemeTutari || 0),
    0
  );
  const paidAmount = propertyOwners.reduce(
    (sum, malik) => sum + (malik.odenenTutar || 0),
    0
  );
  const remainingAmount = totalAmount - paidAmount;

  const overallProgress =
    totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-muted-foreground" />
          Ödeme Durumu Özeti
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Genel İstatistikler */}
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] gap-3 sm:gap-4 [touch-action:manipulation]">
          <div className="text-center p-3 rounded-lg border transition-colors bg-[oklch(var(--info)/0.10)] border-[oklch(var(--info)/0.12)]">
            <div className="text-2xl font-bold text-info">
              {toplamMalikler}
            </div>
            <div className="text-sm text-muted-foreground">Toplam Malik</div>
          </div>
          <div className="text-center p-3 rounded-lg border transition-colors bg-[oklch(var(--success)/0.10)] border-[oklch(var(--success)/0.12)]">
            <div className="text-2xl font-bold text-success">
              {completedPayments}
            </div>
            <div className="text-sm text-muted-foreground">Tamamlanan</div>
          </div>
          <div className="text-center p-3 rounded-lg border transition-colors bg-[oklch(var(--warning)/0.10)] border-[oklch(var(--warning)/0.12)]">
            <div className="text-2xl font-bold text-warning">
              {pendingPayments}
            </div>
            <div className="text-sm text-muted-foreground">Bekleyen</div>
          </div>
          <div className="text-center p-3 rounded-lg border transition-colors bg-[oklch(var(--priority-high)/0.10)] border-[oklch(var(--priority-high)/0.12)]">
            <div className="text-2xl font-bold text-priority-high">
              {lawsuits}
            </div>
            <div className="text-sm text-muted-foreground">Dava</div>
          </div>
        </div>

        {/* Genel İlerleme */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">Genel İlerleme</span>
            <span className="font-bold">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        {/* Finansal Özet */}
        {totalAmount > 0 && (
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] gap-3 sm:gap-4 [touch-action:manipulation]">
            <div className="text-center p-4 rounded-lg border transition-colors bg-[oklch(var(--info)/0.10)] border-[oklch(var(--info)/0.12)]">
              <div className="text-lg font-bold text-info">
                {totalAmount.toLocaleString("tr-TR")} ₺
              </div>
              <div className="text-sm text-muted-foreground">Toplam Bütçe</div>
            </div>
            <div className="text-center p-4 rounded-lg border transition-colors bg-[oklch(var(--success)/0.10)] border-[oklch(var(--success)/0.12)]">
              <div className="text-lg font-bold text-success">
                {paidAmount.toLocaleString("tr-TR")} ₺
              </div>
              <div className="text-sm text-muted-foreground">Ödenen Tutar</div>
            </div>
            <div className="text-center p-4 rounded-lg border transition-colors bg-[oklch(var(--warning)/0.10)] border-[oklch(var(--warning)/0.12)]">
              <div className="text-lg font-bold text-warning">
                {remainingAmount.toLocaleString("tr-TR")} ₺
              </div>
              <div className="text-sm text-muted-foreground">Kalan Tutar</div>
            </div>
          </div>
        )}

        {/* Kategori Dağılımı */}
        {showCategoryBreakdown && (
          <div className="space-y-3">
            <h4 className="font-medium">Durum Dağılımı</h4>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-[oklch(var(--success)/0.10)] border border-[oklch(var(--success)/0.12)] rounded transition-colors">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Ödeme Tamamlandı</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{completedPayments}</span>
                  <span className="text-xs text-muted-foreground">
                    (
                    {toplamMalikler > 0
                      ? Math.round((completedPayments / toplamMalikler) * 100)
                      : 0}
                    %)
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-[oklch(var(--warning)/0.10)] border border-[oklch(var(--warning)/0.12)] rounded transition-colors">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-warning" />
                  <span className="text-sm">Ödeme Yapılacak</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{pendingPayments}</span>
                  <span className="text-xs text-muted-foreground">
                    (
                    {toplamMalikler > 0
                      ? Math.round((pendingPayments / toplamMalikler) * 100)
                      : 0}
                    %)
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-[oklch(var(--priority-high)/0.10)] border border-[oklch(var(--priority-high)/0.12)] rounded transition-colors">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-priority-high" />
                  <span className="text-sm">Dava Sürecinde</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{lawsuits}</span>
                  <span className="text-xs text-muted-foreground">
                    (
                    {toplamMalikler > 0
                      ? Math.round((lawsuits / toplamMalikler) * 100)
                      : 0}
                    %)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

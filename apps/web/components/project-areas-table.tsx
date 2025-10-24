"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { ProjectArea, ProcessStatus } from "@/lib/types";
import { Eye, MapPin, Users, ChevronRight } from "lucide-react";

interface ProjectAreasTableProps {
  areas: ProjectArea[];
  onAreaSelect?: (area: ProjectArea) => void;
}

export function ProjectAreasTable({
  areas,
  onAreaSelect,
}: ProjectAreasTableProps) {
  const [selectedArea, setSelectedArea] = useState<ProjectArea | null>(null);

  const getStatusColor = (status: ProcessStatus) => {
    switch (status) {
      case ProcessStatus.PAYMENT_COMPLETED:
        return "bg-[oklch(var(--success)/0.15)] text-success border border-[oklch(var(--success)/0.20)]";
      case ProcessStatus.PAYMENT_PENDING:
        return "bg-[oklch(var(--warning)/0.15)] text-warning border border-[oklch(var(--warning)/0.20)]";
      case ProcessStatus.LAWSUIT_PROCESS:
        return "bg-[oklch(var(--priority-high)/0.15)] text-priority-high border border-[oklch(var(--priority-high)/0.20)]";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusLabel = (status: ProcessStatus) => {
    switch (status) {
      case ProcessStatus.PAYMENT_COMPLETED:
        return "Ödeme Tamamlandı";
      case ProcessStatus.PAYMENT_PENDING:
        return "Ödeme Yapılacak";
      case ProcessStatus.LAWSUIT_PROCESS:
        return "Dava Sürecinde";
      default:
        return status;
    }
  };

  const getAreaSummary = (area: ProjectArea) => {
    const totalPropertyOwners = area.malikler.length;
    const completedPayments = area.malikler.filter(
      (m) => m.processStatus === ProcessStatus.PAYMENT_COMPLETED
    ).length;
    const pendingPayments = area.malikler.filter(
      (m) => m.processStatus === ProcessStatus.PAYMENT_PENDING
    ).length;
    const lawsuits = area.malikler.filter(
      (m) => m.processStatus === ProcessStatus.LAWSUIT_PROCESS
    ).length;

    return {
      totalPropertyOwners,
      completedPayments,
      pendingPayments,
      lawsuits,
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          Proje Alanları ({areas.length} Alan)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border [touch-action:manipulation]">
          {/* Masaüstü: standart tablo */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ada/Parsel</TableHead>
                  <TableHead>Nitelik</TableHead>
                  <TableHead>Yüzölçümü</TableHead>
                  <TableHead>Kamulaştırma Alanı</TableHead>
                  <TableHead>Owner Count</TableHead>
                  <TableHead>Durum Özeti</TableHead>
                  <TableHead>Tapu Durumu</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {areas.map((area) => {
                  const summary = getAreaSummary(area);
                  return (
                    <TableRow
                      key={area.id}
                      className="hover:bg-accent/50 transition-colors"
                    >
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-semibold">Ada: {area.ada}</div>
                          <div className="text-sm text-muted-foreground">
                            Parsel: {area.parsel}
                          </div>
                          {area.pafta && (
                            <div className="text-xs text-muted-foreground">
                              Pafta: {area.pafta}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{area.nitelik}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{area.yuzolcumu.toLocaleString("tr-TR")} m²</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">
                            {area.kamulaştırmaAlani.toLocaleString("tr-TR")} m²
                          </div>
                          <div className="text-xs text-muted-foreground">
                            %
                            {(
                              (area.kamulaştırmaAlani / area.yuzolcumu) *
                              100
                            ).toFixed(1)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {summary.totalPropertyOwners}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {summary.completedPayments > 0 && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-[oklch(var(--success)/0.15)] text-success border border-[oklch(var(--success)/0.20)]"
                            >
                              {summary.completedPayments} Tamamlandı
                            </Badge>
                          )}
                          {summary.pendingPayments > 0 && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-[oklch(var(--warning)/0.15)] text-warning border border-[oklch(var(--warning)/0.20)]"
                            >
                              {summary.pendingPayments} Bekliyor
                            </Badge>
                          )}
                          {summary.lawsuits > 0 && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-[oklch(var(--priority-high)/0.15)] text-priority-high border border-[oklch(var(--priority-high)/0.20)]"
                            >
                              {summary.lawsuits} Dava
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {area.tapuDurumu}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedArea(area)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>
                                  Alan Detayları - Ada: {area.ada}, Parsel:{" "}
                                  {area.parsel}
                                </DialogTitle>
                              </DialogHeader>
                              {selectedArea && (
                                <AreaDetailView area={selectedArea} />
                              )}
                            </DialogContent>
                          </Dialog>
                          {onAreaSelect && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onAreaSelect(area)}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobil: kart tabanlı, yatay kaydırma olmadan */}
          <div className="md:hidden space-y-3 p-2">
            {areas.map((area) => {
              const summary = getAreaSummary(area);
              return (
                <div
                  key={area.id}
                  className="rounded-lg border border-border p-3 bg-card"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold truncate">
                        Ada: {area.ada}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        Parsel: {area.parsel}
                        {area.pafta ? ` · Pafta: ${area.pafta}` : ""}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          {area.nitelik}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Tapu: {area.tapuDurumu}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {summary.totalPropertyOwners}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedArea(area)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>
                                Alan Detayları - Ada: {area.ada}, Parsel:{" "}
                                {area.parsel}
                              </DialogTitle>
                            </DialogHeader>
                            {selectedArea && (
                              <AreaDetailView area={selectedArea} />
                            )}
                          </DialogContent>
                        </Dialog>
                        {onAreaSelect && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onAreaSelect(area)}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-lg p-2 bg-muted/40">
                      <div className="text-xs text-muted-foreground">
                        Yüzölçümü
                      </div>
                      <div className="text-sm font-medium">
                        {area.yuzolcumu.toLocaleString("tr-TR")} m²
                      </div>
                    </div>
                    <div className="rounded-lg p-2 bg-muted/40">
                      <div className="text-xs text-muted-foreground">
                        Kamulaştırma Alanı
                      </div>
                      <div className="text-sm font-medium">
                        {area.kamulaştırmaAlani.toLocaleString("tr-TR")} m²
                      </div>
                      <div className="text-xs text-muted-foreground">
                        %
                        {(
                          (area.kamulaştırmaAlani / area.yuzolcumu) *
                          100
                        ).toFixed(1)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {summary.completedPayments > 0 && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-[oklch(var(--success)/0.15)] text-success border border-[oklch(var(--success)/0.20)]"
                      >
                        {summary.completedPayments} Tamamlandı
                      </Badge>
                    )}
                    {summary.pendingPayments > 0 && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-[oklch(var(--warning)/0.15)] text-warning border border-[oklch(var(--warning)/0.20)]"
                      >
                        {summary.pendingPayments} Bekliyor
                      </Badge>
                    )}
                    {summary.lawsuits > 0 && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-[oklch(var(--priority-high)/0.15)] text-priority-high border border-[oklch(var(--priority-high)/0.20)]"
                      >
                        {summary.lawsuits} Dava
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AreaDetailView({ area }: { area: ProjectArea }) {
  const summary = {
    totalPropertyOwners: area.malikler.length,
    completedPayments: area.malikler.filter(
      (m) => m.processStatus === ProcessStatus.PAYMENT_COMPLETED
    ).length,
    pendingPayments: area.malikler.filter(
      (m) => m.processStatus === ProcessStatus.PAYMENT_PENDING
    ).length,
    lawsuits: area.malikler.filter(
      (m) => m.processStatus === ProcessStatus.LAWSUIT_PROCESS
    ).length,
  };

  return (
    <div className="space-y-6">
      {/* Alan Bilgileri */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Konum Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Ada:</span>
              <span className="font-medium">{area.ada}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Parsel:</span>
              <span className="font-medium">{area.parsel}</span>
            </div>
            {area.pafta && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Pafta:</span>
                <span className="font-medium">{area.pafta}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Alan Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Nitelik:</span>
              <span className="font-medium">{area.nitelik}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Yüzölçümü:</span>
              <span className="font-medium">
                {area.yuzolcumu.toLocaleString("tr-TR")} m²
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Kamulaştırma:
              </span>
              <span className="font-medium">
                {area.kamulaştırmaAlani.toLocaleString("tr-TR")} m²
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Durum Özeti</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Total Property Owners:
              </span>
              <span className="font-medium">{summary.totalPropertyOwners}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-success">Tamamlanan:</span>
              <span className="font-medium">{summary.completedPayments}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-warning">Bekleyen:</span>
              <span className="font-medium">{summary.pendingPayments}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-priority-high">Dava:</span>
              <span className="font-medium">{summary.lawsuits}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ek Bilgiler */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tapu Durumu</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline">{area.tapuDurumu}</Badge>
          </CardContent>
        </Card>

        {area.imar_durumu && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">İmar Durumu</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline">{area.imar_durumu}</Badge>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Owner List Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">
            Malik Listesi ({area.malikler.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {area.malikler.map((owner) => (
              <div
                key={owner.id}
                className="flex items-center justify-between p-2 border rounded"
              >
                <div>
                  <div className="font-medium">
                    {owner.ad} {owner.soyad}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Hisse: {owner.hissePay}/{owner.hissePayda}
                  </div>
                </div>
                <Badge
                  className={`text-xs transition-colors ${
                    owner.processStatus === ProcessStatus.PAYMENT_COMPLETED
                      ? "bg-[oklch(var(--success)/0.15)] text-success border border-[oklch(var(--success)/0.20)]"
                      : owner.processStatus === ProcessStatus.PAYMENT_PENDING
                        ? "bg-[oklch(var(--warning)/0.15)] text-warning border border-[oklch(var(--warning)/0.20)]"
                        : "bg-[oklch(var(--priority-high)/0.15)] text-priority-high border border-[oklch(var(--priority-high)/0.20)]"
                  }`}
                >
                  {owner.processStatus === ProcessStatus.PAYMENT_COMPLETED
                    ? "Tamamlandı"
                    : owner.processStatus === ProcessStatus.PAYMENT_PENDING
                      ? "Bekliyor"
                      : "Dava"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

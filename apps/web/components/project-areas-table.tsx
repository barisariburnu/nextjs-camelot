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
  DialogFooter,
} from "@workspace/ui/components/dialog";
import { ProjectArea, ProcessStatus } from "@/lib/types";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { toast } from "@workspace/ui/components/sonner";
import {
  Eye,
  MapPin,
  Users,
  ChevronRight,
  Pencil,
  Save,
  X,
  Loader2,
} from "lucide-react";

interface ProjectAreasTableProps {
  areas: ProjectArea[];
  onAreaSelect?: (area: ProjectArea) => void;
}

// Reusable field error helper
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${id}-error`} className="text-destructive text-xs mt-1">
      {message}
    </p>
  );
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
                  <TableHead>Malik Sayısı</TableHead>
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
                            <DialogContent className="w-[calc(100vw-2rem)] sm:w-auto sm:max-w-4xl md:max-w-5xl lg:max-w-6xl h-[90vh] sm:h-auto sm:max-h-[80vh] overflow-y-auto rounded-none sm:rounded-lg p-4 sm:p-6 [touch-action:pan-y] pb-[env(safe-area-inset-bottom)]">
                              <DialogHeader className="sticky top-0 z-10 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-4 sm:p-6 pr-10 sm:pr-12">
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
                          <DialogContent className="w-[calc(100vw-2rem)] sm:w-auto sm:max-w-4xl md:max-w-5xl lg:max-w-6xl h-[90vh] sm:h-auto sm:max-h-[80vh] overflow-y-auto rounded-none sm:rounded-lg p-4 sm:p-6 [touch-action:pan-y] pb-[env(safe-area-inset-bottom)]">
                            <DialogHeader className="sticky top-0 z-10 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-4 sm:p-6 pr-10 sm:pr-12">
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
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<ProjectArea>({ ...area });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const validate = (data: ProjectArea) => {
    const next: Record<string, string> = {};
    if (!data.ada?.trim()) next.ada = "Ada gerekli";
    if (!data.parsel?.trim()) next.parsel = "Parsel gerekli";
    if (!data.nitelik?.trim()) next.nitelik = "Nitelik gerekli";
    if (data.yuzolcumu != null && data.yuzolcumu <= 0)
      next.yuzolcumu = "Yüzölçümü 0'dan büyük olmalı";
    if (data.kamulaştırmaAlani != null && data.kamulaştırmaAlani < 0)
      next.kamulaştırmaAlani = "Kamulaştırma negatif olamaz";
    if (
      data.yuzolcumu != null &&
      data.kamulaştırmaAlani != null &&
      data.kamulaştırmaAlani > data.yuzolcumu
    ) {
      next.kamulaştırmaAlani = "Kamulaştırma, yüzölçümünden fazla olamaz";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onCancel = () => {
    setForm({ ...area });
    setErrors({});
    setIsEditing(false);
    toast.info("Değişiklikler geri alındı.");
  };

  const onSave = async () => {
    if (!validate(form)) {
      toast.error("Lütfen hatalı alanları düzeltin.");
      return;
    }
    try {
      setIsSaving(true);
      // Simulated save – replace with API integration
      await new Promise((r) => setTimeout(r, 400));
      setIsEditing(false);
      toast.success("Alan bilgileri başarıyla güncellendi.");
    } catch (e) {
      toast.error("Kaydetme sırasında bir hata oluştu.");
    } finally {
      setIsSaving(false);
    }
  };

  const summary = {
    totalPropertyOwners: form.malikler.length,
    completedPayments: form.malikler.filter(
      (m) => m.processStatus === ProcessStatus.PAYMENT_COMPLETED
    ).length,
    pendingPayments: form.malikler.filter(
      (m) => m.processStatus === ProcessStatus.PAYMENT_PENDING
    ).length,
    lawsuits: form.malikler.filter(
      (m) => m.processStatus === ProcessStatus.LAWSUIT_PROCESS
    ).length,
  };

  return (
    <div className="space-y-6">
      {/* Üst Aksiyonlar */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant={isEditing ? "outline" : "default"}
          size="sm"
          onClick={() => setIsEditing((v) => !v)}
          aria-pressed={isEditing}
        >
          {isEditing ? (
            <span className="inline-flex items-center gap-1">
              <X className="h-4 w-4" /> Düzenlemeyi Kapat
            </span>
          ) : (
            <span className="inline-flex items-center gap-1">
              <Pencil className="h-4 w-4" /> Düzenle
            </span>
          )}
        </Button>
      </div>

      {/* Alan Bilgileri */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Konum Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="ada">Ada</Label>
                  <Input
                    id="ada"
                    value={form.ada}
                    onChange={(e) => setForm({ ...form, ada: e.target.value })}
                    aria-invalid={!!errors.ada}
                    aria-describedby="ada-error"
                  />
                  <FieldError id="ada" message={errors.ada} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="parsel">Parsel</Label>
                  <Input
                    id="parsel"
                    value={form.parsel}
                    onChange={(e) =>
                      setForm({ ...form, parsel: e.target.value })
                    }
                    aria-invalid={!!errors.parsel}
                    aria-describedby="parsel-error"
                  />
                  <FieldError id="parsel" message={errors.parsel} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="pafta">Pafta</Label>
                  <Input
                    id="pafta"
                    value={form.pafta ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, pafta: e.target.value })
                    }
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Ada:</span>
                  <span className="font-medium">{form.ada}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Parsel:</span>
                  <span className="font-medium">{form.parsel}</span>
                </div>
                {form.pafta && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Pafta:
                    </span>
                    <span className="font-medium">{form.pafta}</span>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Alan Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1 sm:col-span-3">
                  <Label htmlFor="nitelik">Nitelik</Label>
                  <Input
                    id="nitelik"
                    value={form.nitelik}
                    onChange={(e) =>
                      setForm({ ...form, nitelik: e.target.value })
                    }
                    aria-invalid={!!errors.nitelik}
                    aria-describedby="nitelik-error"
                  />
                  <FieldError id="nitelik" message={errors.nitelik} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="yuzolcumu">Yüzölçümü (m²)</Label>
                  <Input
                    id="yuzolcumu"
                    type="number"
                    value={form.yuzolcumu}
                    onChange={(e) =>
                      setForm({ ...form, yuzolcumu: Number(e.target.value) })
                    }
                    aria-invalid={!!errors.yuzolcumu}
                    aria-describedby="yuzolcumu-error"
                    inputMode="numeric"
                    min={1}
                  />
                  <FieldError id="yuzolcumu" message={errors.yuzolcumu} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="kamulastirma">Kamulaştırma (m²)</Label>
                  <Input
                    id="kamulastirma"
                    type="number"
                    value={form.kamulaştırmaAlani}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        kamulaştırmaAlani: Number(e.target.value),
                      })
                    }
                    aria-invalid={!!errors.kamulaştırmaAlani}
                    aria-describedby="kamulastirma-error"
                    inputMode="numeric"
                    min={0}
                  />
                  <FieldError
                    id="kamulastirma"
                    message={errors.kamulaştırmaAlani}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Nitelik:
                  </span>
                  <span className="font-medium">{form.nitelik}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Yüzölçümü:
                  </span>
                  <span className="font-medium">
                    {form.yuzolcumu.toLocaleString("tr-TR")} m²
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Kamulaştırma:
                  </span>
                  <span className="font-medium">
                    {form.kamulaştırmaAlani.toLocaleString("tr-TR")} m²
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Durum Özeti</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Toplam Malik:
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Tapu Durumu</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-1">
                <Label htmlFor="tapuDurumu">Tapu Durumu</Label>
                <Input
                  id="tapuDurumu"
                  value={form.tapuDurumu ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, tapuDurumu: e.target.value })
                  }
                />
              </div>
            ) : (
              <Badge variant="outline">{form.tapuDurumu}</Badge>
            )}
          </CardContent>
        </Card>

        {area.imar_durumu && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">İmar Durumu</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-1">
                  <Label htmlFor="imarDurumu">İmar Durumu</Label>
                  <Input
                    id="imarDurumu"
                    value={form.imar_durumu ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, imar_durumu: e.target.value })
                    }
                  />
                </div>
              ) : (
                <Badge variant="outline">{form.imar_durumu}</Badge>
              )}
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
      {isEditing && (
        <DialogFooter
          className="sticky bottom-0 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t p-4 sm:p-6"
          aria-live="polite"
        >
          <div className="flex items-center justify-end gap-2 w-full">
            <Button
              variant="ghost"
              onClick={onCancel}
              size="lg"
              disabled={isSaving}
            >
              <span className="inline-flex items-center gap-1">
                <X className="h-4 w-4" /> Vazgeç
              </span>
            </Button>
            <Button
              variant="default"
              onClick={onSave}
              size="lg"
              disabled={isSaving}
              aria-busy={isSaving}
            >
              <span className="inline-flex items-center gap-1">
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isSaving ? "Kaydediliyor..." : "Kaydet"}
              </span>
            </Button>
          </div>
        </DialogFooter>
      )}
    </div>
  );
}

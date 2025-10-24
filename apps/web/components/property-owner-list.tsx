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
  DialogClose,
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Textarea } from "@workspace/ui/components/textarea";
import { toast } from "@workspace/ui/components/sonner";
import { PropertyOwner, ProcessStatus } from "@/lib/types";
import {
  User,
  Eye,
  Calendar,
  Gavel,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Pencil,
  Save,
  X,
  Loader2,
} from "lucide-react";

interface PropertyOwnerListProps {
  propertyOwners: PropertyOwner[];
  onPropertyOwnerSelect?: (owner: PropertyOwner) => void;
  showAreaInfo?: boolean;
}

// Basit, yeniden kullanılabilir hata bileşeni
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${id}-error`} className="text-destructive text-xs mt-1">
      {message}
    </p>
  );
}

export function PropertyOwnerList({
  propertyOwners,
  onPropertyOwnerSelect,
  showAreaInfo = false,
}: PropertyOwnerListProps) {
  const [selectedPropertyOwner, setSelectedPropertyOwner] =
    useState<PropertyOwner | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "status" | "date">("name");
  const [filterStatus, setFilterStatus] = useState<ProcessStatus | "all">(
    "all"
  );

  const getStatusColor = (status: ProcessStatus) => {
    switch (status) {
      case ProcessStatus.PAYMENT_COMPLETED:
        return "bg-[oklch(var(--success)/0.15)] text-success border border-[oklch(var(--success)/0.20)] transition-colors";
      case ProcessStatus.PAYMENT_PENDING:
        return "bg-[oklch(var(--warning)/0.15)] text-warning border border-[oklch(var(--warning)/0.20)] transition-colors";
      case ProcessStatus.LAWSUIT_PROCESS:
        return "bg-[oklch(var(--priority-high)/0.15)] text-priority-high border border-[oklch(var(--priority-high)/0.20)] transition-colors";
      default:
        return "bg-muted text-foreground/80 border transition-colors";
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

  const getStatusIcon = (status: ProcessStatus) => {
    switch (status) {
      case ProcessStatus.PAYMENT_COMPLETED:
        return <CreditCard className="h-4 w-4 text-success" />;
      case ProcessStatus.PAYMENT_PENDING:
        return <Calendar className="h-4 w-4 text-warning" />;
      case ProcessStatus.LAWSUIT_PROCESS:
        return <Gavel className="h-4 w-4 text-priority-high" />;
      default:
        return <User className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const filteredOwners = propertyOwners.filter(
    (owner) => filterStatus === "all" || owner.processStatus === filterStatus
  );

  const sortedOwners = [...filteredOwners].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return `${a.ad} ${a.soyad}`.localeCompare(`${b.ad} ${b.soyad}`, "tr");
      case "status":
        return a.processStatus.localeCompare(b.processStatus);
      case "date":
        return (
          new Date(b.sonIslemTarihi).getTime() -
          new Date(a.sonIslemTarihi).getTime()
        );
      default:
        return 0;
    }
  });

  const getPaymentProgress = (owner: PropertyOwner) => {
    if (!owner.odemeTutari || owner.odemeTutari === 0) return 0;
    const odenen = owner.odenenTutar || 0;
    return Math.round((odenen / owner.odemeTutari) * 100);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            Malik Listesi ({filteredOwners.length}/{propertyOwners.length})
          </CardTitle>
          <div className="flex items-center gap-2">
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as ProcessStatus | "all")
              }
              className="text-sm border rounded px-2 py-1"
            >
              <option value="all">Tüm Durumlar</option>
              <option value={ProcessStatus.PAYMENT_COMPLETED}>
                Ödeme Tamamlandı
              </option>
              <option value={ProcessStatus.PAYMENT_PENDING}>
                Ödeme Yapılacak
              </option>
              <option value={ProcessStatus.LAWSUIT_PROCESS}>
                Dava Sürecinde
              </option>
            </select>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "name" | "status" | "date")
              }
              className="text-sm border rounded px-2 py-1"
            >
              <option value="name">İsme Göre</option>
              <option value="status">Duruma Göre</option>
              <option value="date">Tarihe Göre</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border [touch-action:manipulation]">
          {/* Masaüstü: standart tablo */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Malik</TableHead>
                  <TableHead>Kimlik No</TableHead>
                  <TableHead>İletişim</TableHead>
                  <TableHead>Hak Sahipliği</TableHead>
                  <TableHead>Ödeme Durumu</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOwners.map((owner) => {
                  return (
                    <TableRow
                      key={owner.id}
                      className="hover:bg-accent/50 transition-colors"
                    >
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-semibold truncate">
                            {owner.ad} {owner.soyad}
                          </div>
                          <div className="text-sm text-muted-foreground truncate">
                            {owner.email || "-"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {owner.kimlikNo || owner.tcKimlikNo || "-"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{owner.telefon || "-"}</div>
                          {owner.adres && (
                            <div className="text-xs text-muted-foreground truncate max-w-[240px]">
                              {owner.adres}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">
                            {owner.hissePay}/{owner.hissePayda}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            %
                            {(
                              (owner.hissePay / owner.hissePayda) *
                              100
                            ).toFixed(2)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(owner.processStatus)}
                          <Badge
                            className={getStatusColor(owner.processStatus)}
                          >
                            {getStatusLabel(owner.processStatus)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedPropertyOwner(owner)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="w-[calc(100vw-2rem)] sm:w-auto sm:max-w-3xl md:max-w-4xl lg:max-w-5xl h-[90vh] sm:h-auto sm:max-h-[80vh] overflow-y-auto rounded-none sm:rounded-lg p-4 sm:p-6 [touch-action:pan-y] pb-[env(safe-area-inset-bottom)]" showCloseButton={false} onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
                              <DialogHeader className="sticky top-0 z-10 w-full bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-4 sm:p-6 pr-12">
                                <DialogTitle>
                                  Malik Detayları - {owner.ad} {owner.soyad}
                                </DialogTitle>
                              </DialogHeader>
                              <DialogClose className="absolute right-4 top-4 z-20 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
                                <X className="h-4 w-4" />
                                <span className="sr-only">Kapat</span>
                              </DialogClose>
                              {selectedPropertyOwner && (
                                <OwnerDetailView
                                  owner={selectedPropertyOwner}
                                />
                              )}
                            </DialogContent>
                          </Dialog>
                          {onPropertyOwnerSelect && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onPropertyOwnerSelect(owner)}
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

          {/* Mobil: kart tabanlı görünüm, yatay kaydırma olmadan */}
          <div className="md:hidden space-y-3 p-2">
            {sortedOwners.map((owner) => {
              return (
                <div
                  key={owner.id}
                  className="rounded-lg border border-border p-3 bg-card"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold truncate">
                        {owner.ad} {owner.soyad}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {owner.email || "-"}
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div className="rounded-lg p-2 bg-muted/40">
                          <div className="text-xs text-muted-foreground">
                            Kimlik No
                          </div>
                          <div className="text-sm font-medium">
                            {owner.kimlikNo || owner.tcKimlikNo || "-"}
                          </div>
                        </div>
                        <div className="rounded-lg p-2 bg-muted/40">
                          <div className="text-xs text-muted-foreground">
                            Telefon
                          </div>
                          <div className="text-sm font-medium">
                            {owner.telefon || "-"}
                          </div>
                        </div>
                      </div>
                      {owner.adres && (
                        <div className="mt-2 text-xs text-muted-foreground truncate">
                          {owner.adres}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">
                          Hak Sahipliği
                        </div>
                        <div className="text-sm font-medium">
                          {owner.hissePay}/{owner.hissePayda}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          %
                          {((owner.hissePay / owner.hissePayda) * 100).toFixed(
                            4
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedPropertyOwner(owner)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-[calc(100vw-2rem)] sm:w-auto sm:max-w-3xl md:max-w-4xl lg:max-w-5xl h-[90vh] sm:h-auto sm:max-h-[80vh] overflow-y-auto rounded-none sm:rounded-lg p-4 sm:p-6 [touch-action:pan-y] pb-[env(safe-area-inset-bottom)]" showCloseButton={false} onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
                            <DialogHeader className="sticky top-0 z-10 w-full bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-4 sm:p-6 pr-12">
                              <DialogTitle>
                                Malik Detayları - {owner.ad} {owner.soyad}
                              </DialogTitle>
                            </DialogHeader>
                            <DialogClose className="absolute right-4 top-4 z-20 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
                              <X className="h-4 w-4" />
                              <span className="sr-only">Kapat</span>
                            </DialogClose>
                            {selectedPropertyOwner && (
                              <OwnerDetailView owner={selectedPropertyOwner} />
                            )}
                          </DialogContent>
                        </Dialog>
                        {onPropertyOwnerSelect && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onPropertyOwnerSelect(owner)}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    {getStatusIcon(owner.processStatus)}
                    <Badge className={getStatusColor(owner.processStatus)}>
                      {getStatusLabel(owner.processStatus)}
                    </Badge>
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

function OwnerDetailView({ owner }: { owner: PropertyOwner }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<PropertyOwner>({ ...owner });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const getPaymentProgress = (owner: PropertyOwner) => {
    if (!owner.odemeTutari || owner.odemeTutari === 0) return 0;
    const odenen = owner.odenenTutar || 0;
    return Math.round((odenen / owner.odemeTutari) * 100);
  };

  const validate = (data: PropertyOwner) => {
    const next: Record<string, string> = {};
    if (!data.ad?.trim()) next.ad = "Ad zorunlu";
    if (!data.soyad?.trim()) next.soyad = "Soyad zorunlu";
    if (data.tcKimlikNo && !/^\d{11}$/.test(data.tcKimlikNo))
      next.tcKimlikNo = "TC Kimlik No 11 haneli olmalı";
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      next.email = "Geçerli bir e-posta adresi girin";
    if (data.telefon && !/^\+?\d[\d\s-]{8,}$/.test(data.telefon))
      next.telefon = "Geçerli bir telefon numarası girin";
    if (data.hissePay != null && data.hissePay < 0)
      next.hissePay = "Hisse payı 0'dan küçük olamaz";
    if (data.hissePayda != null && data.hissePayda <= 0)
      next.hissePayda = "Hisse payda 0'dan büyük olmalı";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onCancel = () => {
    setForm({ ...owner });
    setErrors({});
    setIsEditing(false);
  };

  const onSave = async () => {
    if (!validate(form)) {
      toast.error("Lütfen hatalı alanları düzeltin.");
      return;
    }
    try {
      setIsSaving(true);
      // Simüle edilen kayıt; gerçek API entegrasyonunda burada await çağrısı yapılacak
      await new Promise((r) => setTimeout(r, 400));
      setIsEditing(false);
      toast.success("Malik bilgileri başarıyla güncellendi.");
    } catch (e) {
      toast.error("Kaydetme sırasında bir hata oluştu.");
    } finally {
      setIsSaving(false);
    }
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

      {!isEditing && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg bg-muted/40 p-3">
          <Badge variant="outline" className="text-xs">
            Hak: {form.hissePay}/{form.hissePayda} · %
            {((form.hissePay / form.hissePayda) * 100).toFixed(4)}
          </Badge>
          <Badge className={getStatusColor(form.processStatus)}>
            {getStatusLabel(form.processStatus)}
          </Badge>
          {form.telefon && (
            <Badge variant="outline" className="text-xs">
              {form.telefon}
            </Badge>
          )}
          {form.email && (
            <Badge variant="outline" className="text-xs">
              {form.email}
            </Badge>
          )}
        </div>
      )}

      {/* Temel Bilgiler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Kişisel Bilgiler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="ad">Ad</Label>
                  <Input
                    id="ad"
                    value={form.ad}
                    onChange={(e) => setForm({ ...form, ad: e.target.value })}
                    aria-invalid={!!errors.ad}
                    aria-describedby="ad-error"
                  />
                  <FieldError id="ad" message={errors.ad} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="soyad">Soyad</Label>
                  <Input
                    id="soyad"
                    value={form.soyad}
                    onChange={(e) =>
                      setForm({ ...form, soyad: e.target.value })
                    }
                    aria-invalid={!!errors.soyad}
                    aria-describedby="soyad-error"
                  />
                  <FieldError id="soyad" message={errors.soyad} />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <Label htmlFor="tcKimlikNo">TC Kimlik No</Label>
                  <Input
                    id="tcKimlikNo"
                    value={form.tcKimlikNo ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, tcKimlikNo: e.target.value })
                    }
                    aria-invalid={!!errors.tcKimlikNo}
                    aria-describedby="tcKimlikNo-error"
                    inputMode="numeric"
                  />
                  <FieldError id="tcKimlikNo" message={errors.tcKimlikNo} />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <Label htmlFor="vergiNo">Vergi No</Label>
                  <Input
                    id="vergiNo"
                    value={form.vergiNo ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, vergiNo: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <Label htmlFor="kimlikNo">Kimlik No</Label>
                  <Input
                    id="kimlikNo"
                    value={form.kimlikNo}
                    onChange={(e) =>
                      setForm({ ...form, kimlikNo: e.target.value })
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-muted/40 p-2 col-span-2">
                  <div className="text-xs text-muted-foreground">Ad Soyad</div>
                  <div className="font-medium">
                    {form.ad} {form.soyad}
                  </div>
                </div>
                {form.tcKimlikNo && (
                  <div className="rounded-lg bg-muted/40 p-2">
                    <div className="text-xs text-muted-foreground">
                      TC Kimlik No
                    </div>
                    <div className="font-medium">{form.tcKimlikNo}</div>
                  </div>
                )}
                {form.vergiNo && (
                  <div className="rounded-lg bg-muted/40 p-2">
                    <div className="text-xs text-muted-foreground">
                      Vergi No
                    </div>
                    <div className="font-medium">{form.vergiNo}</div>
                  </div>
                )}
                <div className="rounded-lg bg-muted/40 p-2">
                  <div className="text-xs text-muted-foreground">Kimlik No</div>
                  <div className="font-medium">{form.kimlikNo}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">İletişim Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isEditing ? (
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="telefon">Telefon</Label>
                  <Input
                    id="telefon"
                    value={form.telefon ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, telefon: e.target.value })
                    }
                    aria-invalid={!!errors.telefon}
                    aria-describedby="telefon-error"
                    inputMode="tel"
                  />
                  <FieldError id="telefon" message={errors.telefon} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">E-posta</Label>
                  <Input
                    id="email"
                    value={form.email ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                    inputMode="email"
                  />
                  <FieldError id="email" message={errors.email} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="adres">Adres</Label>
                  <Textarea
                    id="adres"
                    value={form.adres ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, adres: e.target.value })
                    }
                    rows={3}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {form.telefon && (
                  <div className="rounded-lg bg-muted/40 p-2">
                    <div className="text-xs text-muted-foreground">Telefon</div>
                    <div className="font-medium">{form.telefon}</div>
                  </div>
                )}
                {form.email && (
                  <div className="rounded-lg bg-muted/40 p-2">
                    <div className="text-xs text-muted-foreground">E-posta</div>
                    <div className="font-medium">{form.email}</div>
                  </div>
                )}
                {form.adres && (
                  <div className="rounded-lg bg-muted/40 p-2">
                    <div className="text-xs text-muted-foreground">Adres</div>
                    <div className="font-medium">{form.adres}</div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Hisse ve Süreç Bilgileri */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Hisse Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="hissePay">Hisse Pay</Label>
                  <Input
                    id="hissePay"
                    type="number"
                    value={form.hissePay}
                    onChange={(e) =>
                      setForm({ ...form, hissePay: Number(e.target.value) })
                    }
                    aria-invalid={!!errors.hissePay}
                    aria-describedby="hissePay-error"
                    min={0}
                  />
                  <FieldError id="hissePay" message={errors.hissePay} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="hissePayda">Hisse Payda</Label>
                  <Input
                    id="hissePayda"
                    type="number"
                    value={form.hissePayda}
                    onChange={(e) =>
                      setForm({ ...form, hissePayda: Number(e.target.value) })
                    }
                    aria-invalid={!!errors.hissePayda}
                    aria-describedby="hissePayda-error"
                    min={1}
                  />
                  <FieldError id="hissePayda" message={errors.hissePayda} />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <Label>Yüzde</Label>
                  <div className="text-sm font-medium">
                    %{((form.hissePay / form.hissePayda) * 100).toFixed(4)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-muted/40 p-2">
                  <div className="text-xs text-muted-foreground">
                    Hisse Oranı
                  </div>
                  <div className="font-medium">
                    {form.hissePay}/{form.hissePayda}
                  </div>
                </div>
                <div className="rounded-lg bg-muted/40 p-2">
                  <div className="text-xs text-muted-foreground">Yüzde</div>
                  <div className="font-medium">
                    %{((form.hissePay / form.hissePayda) * 100).toFixed(4)}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Süreç Durumu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Durum</Label>
                  <Select
                    value={form.processStatus}
                    onValueChange={(v) =>
                      setForm({ ...form, processStatus: v as ProcessStatus })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Durum seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ProcessStatus.PAYMENT_COMPLETED}>
                        Ödeme Tamamlandı
                      </SelectItem>
                      <SelectItem value={ProcessStatus.PAYMENT_PENDING}>
                        Ödeme Yapılacak
                      </SelectItem>
                      <SelectItem value={ProcessStatus.LAWSUIT_PROCESS}>
                        Dava Sürecinde
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="sonIslemTarihi">Son İşlem Tarihi</Label>
                  <Input
                    id="sonIslemTarihi"
                    type="date"
                    value={(form.sonIslemTarihi instanceof Date
                      ? form.sonIslemTarihi
                      : new Date(form.sonIslemTarihi)
                    )
                      .toISOString()
                      .slice(0, 10)}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        sonIslemTarihi: new Date(e.target.value),
                      })
                    }
                    aria-invalid={!!errors.sonIslemTarihi}
                    aria-describedby="sonIslemTarihi-error"
                  />
                  <FieldError
                    id="sonIslemTarihi"
                    message={errors.sonIslemTarihi}
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <Label htmlFor="mahkemeEsasNo">Mahkeme Esas No</Label>
                  <Input
                    id="mahkemeEsasNo"
                    value={form.mahkemeEsasNo ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, mahkemeEsasNo: e.target.value })
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(form.processStatus)}
                  <Badge className={getStatusColor(form.processStatus)}>
                    {getStatusLabel(form.processStatus)}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-muted/40 p-2">
                    <div className="text-xs text-muted-foreground">
                      Son İşlem
                    </div>
                    <div className="font-medium">
                      {(form.sonIslemTarihi instanceof Date
                        ? form.sonIslemTarihi
                        : new Date(form.sonIslemTarihi)
                      ).toLocaleDateString("tr-TR")}
                    </div>
                  </div>
                  {form.mahkemeEsasNo && (
                    <div className="rounded-lg bg-[oklch(var(--priority-high)/0.12)] border border-[oklch(var(--priority-high)/0.24)] p-2">
                      <div className="text-xs text-priority-high">
                        Mahkeme Esas No
                      </div>
                      <div className="font-medium text-priority-high">
                        {form.mahkemeEsasNo}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Ödeme Bilgileri */}
      {owner.odemeTutari && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Ödeme Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="odemeTutari">Toplam Tutar (₺)</Label>
                  <Input
                    id="odemeTutari"
                    type="number"
                    value={form.odemeTutari ?? 0}
                    onChange={(e) =>
                      setForm({ ...form, odemeTutari: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="odenenTutar">Ödenen (₺)</Label>
                  <Input
                    id="odenenTutar"
                    type="number"
                    value={form.odenenTutar ?? 0}
                    onChange={(e) =>
                      setForm({ ...form, odenenTutar: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="kalanTutar">Kalan (₺)</Label>
                  <Input
                    id="kalanTutar"
                    type="number"
                    value={form.kalanTutar ?? 0}
                    onChange={(e) =>
                      setForm({ ...form, kalanTutar: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="sm:col-span-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Ödeme İlerlemesi</span>
                    <span>{getPaymentProgress(form)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-success h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getPaymentProgress(form)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-[oklch(var(--info)/0.10)] rounded">
                    <div className="text-lg font-bold text-info">
                      {(form.odemeTutari ?? 0).toLocaleString("tr-TR")} ₺
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Toplam Tutar
                    </div>
                  </div>
                  {form.odenenTutar !== undefined && (
                    <div className="text-center p-3 bg-[oklch(var(--success)/0.10)] rounded">
                      <div className="text-lg font-bold text-success">
                        {(form.odenenTutar ?? 0).toLocaleString("tr-TR")} ₺
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Ödenen
                      </div>
                    </div>
                  )}
                  {form.kalanTutar !== undefined && (
                    <div className="text-center p-3 bg-[oklch(var(--warning)/0.10)] rounded">
                      <div className="text-lg font-bold text-warning">
                        {(form.kalanTutar ?? 0).toLocaleString("tr-TR")} ₺
                      </div>
                      <div className="text-sm text-muted-foreground">Kalan</div>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Ödeme İlerlemesi</span>
                    <span>{getPaymentProgress(form)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-success h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getPaymentProgress(form)}%` }}
                    ></div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
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

function getStatusColor(status: ProcessStatus) {
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
}

function getStatusIcon(status: ProcessStatus) {
  switch (status) {
    case ProcessStatus.PAYMENT_COMPLETED:
      return <CreditCard className="h-4 w-4 text-success" />;
    case ProcessStatus.PAYMENT_PENDING:
      return <Calendar className="h-4 w-4 text-warning" />;
    case ProcessStatus.LAWSUIT_PROCESS:
      return <Gavel className="h-4 w-4 text-priority-high" />;
    default:
      return <User className="h-4 w-4 text-muted-foreground" />;
  }
}

function getStatusLabel(status: ProcessStatus) {
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
}

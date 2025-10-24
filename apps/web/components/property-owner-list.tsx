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
import { PropertyOwner, ProcessStatus } from "@/lib/types";
import {
  User,
  Eye,
  ExternalLink,
  Calendar,
  Gavel,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  PieChart,
  ChevronRight,
} from "lucide-react";

interface PropertyOwnerListProps {
  propertyOwners: PropertyOwner[];
  onPropertyOwnerSelect?: (owner: PropertyOwner) => void;
  showAreaInfo?: boolean;
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
                            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>
                                  Malik Detayları - {owner.ad} {owner.soyad}
                                </DialogTitle>
                              </DialogHeader>
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
                          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>
                                Malik Detayları - {owner.ad} {owner.soyad}
                              </DialogTitle>
                            </DialogHeader>
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
  const getPaymentProgress = (owner: PropertyOwner) => {
    if (!owner.odemeTutari || owner.odemeTutari === 0) return 0;
    const odenen = owner.odenenTutar || 0;
    return Math.round((odenen / owner.odemeTutari) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Temel Bilgiler */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Kişisel Bilgiler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Ad Soyad:</span>
              <span className="font-medium">
                {owner.ad} {owner.soyad}
              </span>
            </div>
            {owner.tcKimlikNo && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  TC Kimlik No:
                </span>
                <span className="font-medium">{owner.tcKimlikNo}</span>
              </div>
            )}
            {owner.vergiNo && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Vergi No:</span>
                <span className="font-medium">{owner.vergiNo}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Kimlik No:</span>
              <span className="font-medium">{owner.kimlikNo}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">İletişim Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {owner.telefon && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{owner.telefon}</span>
              </div>
            )}
            {owner.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{owner.email}</span>
              </div>
            )}
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span className="text-sm">{owner.adres}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hisse ve Süreç Bilgileri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Hisse Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Hisse Oranı:
              </span>
              <span className="font-medium">
                {owner.hissePay}/{owner.hissePayda}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Yüzde:</span>
              <span className="font-medium">
                %{((owner.hissePay / owner.hissePayda) * 100).toFixed(4)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Süreç Durumu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              {getStatusIcon(owner.processStatus)}
              <Badge className={getStatusColor(owner.processStatus)}>
                {getStatusLabel(owner.processStatus)}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Son İşlem:</span>
              <span className="font-medium">
                {owner.sonIslemTarihi.toLocaleDateString("tr-TR")}
              </span>
            </div>
            {owner.mahkemeEsasNo && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Mahkeme Esas No:
                </span>
                <span className="font-medium text-priority-high">
                  {owner.mahkemeEsasNo}
                </span>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-[oklch(var(--info)/0.10)] rounded">
                <div className="text-lg font-bold text-info">
                  {owner.odemeTutari.toLocaleString("tr-TR")} ₺
                </div>
                <div className="text-sm text-muted-foreground">
                  Toplam Tutar
                </div>
              </div>
              {owner.odenenTutar && (
                <div className="text-center p-3 bg-[oklch(var(--success)/0.10)] rounded">
                  <div className="text-lg font-bold text-success">
                    {owner.odenenTutar.toLocaleString("tr-TR")} ₺
                  </div>
                  <div className="text-sm text-muted-foreground">Ödenen</div>
                </div>
              )}
              {owner.kalanTutar && (
                <div className="text-center p-3 bg-[oklch(var(--warning)/0.10)] rounded">
                  <div className="text-lg font-bold text-warning">
                    {owner.kalanTutar.toLocaleString("tr-TR")} ₺
                  </div>
                  <div className="text-sm text-muted-foreground">Kalan</div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Ödeme İlerlemesi</span>
                <span>{getPaymentProgress(owner)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-success h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getPaymentProgress(owner)}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
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

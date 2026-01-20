"use client";

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
import { Badge } from "@workspace/ui/components/badge";
import { Lawsuit } from "@/lib/types";
import { Scale, Calendar, FileText } from "lucide-react";

interface LawsuitTableProps {
    lawsuits: Lawsuit[];
}

export function LawsuitTable({ lawsuits }: LawsuitTableProps) {
    const getStatusBadge = (durum: string) => {
        switch (durum.toLowerCase()) {
            case "devam ediyor":
                return {
                    variant: "outline" as const,
                    className:
                        "bg-[oklch(var(--warning)/0.15)] text-warning border-[oklch(var(--warning)/0.20)]",
                };
            case "karar verildi":
                return {
                    variant: "outline" as const,
                    className:
                        "bg-[oklch(var(--success)/0.15)] text-success border-[oklch(var(--success)/0.20)]",
                };
            case "temyiz":
                return {
                    variant: "outline" as const,
                    className:
                        "bg-[oklch(var(--info)/0.15)] text-info border-[oklch(var(--info)/0.20)]",
                };
            default:
                return {
                    variant: "outline" as const,
                    className: "",
                };
        }
    };

    const formatFileType = (dosyaTuru: string) => {
        const typeMap: Record<string, string> = {
            "kamulaştırma": "Kamulaştırma",
            "bedel_artırma": "Bedel Artırma",
            "ecrimisil": "Ecrimisil",
            "tahliye": "Tahliye",
        };
        return typeMap[dosyaTuru] || dosyaTuru;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-muted-foreground" />
                    Dava Takibi
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Ada</TableHead>
                                <TableHead>Parsel</TableHead>
                                <TableHead>Dosya Türü</TableHead>
                                <TableHead>Mahkeme</TableHead>
                                <TableHead>Esas No</TableHead>
                                <TableHead>Açılış Tarihi</TableHead>
                                <TableHead className="text-right">Durum</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lawsuits.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        Dava verisi bulunamadı.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                lawsuits.map((lawsuit) => {
                                    const statusBadge = getStatusBadge(lawsuit.durum);
                                    return (
                                        <TableRow key={lawsuit.id}>
                                            <TableCell className="font-medium">
                                                {lawsuit.ada}
                                            </TableCell>
                                            <TableCell>{lawsuit.parsel}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                                    <span>{formatFileType(lawsuit.dosyaTuru)}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-[200px] truncate">
                                                {lawsuit.mahkemeAdi}
                                            </TableCell>
                                            <TableCell>
                                                <code className="text-xs bg-muted px-2 py-1 rounded">
                                                    {lawsuit.esasNo}
                                                </code>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-3 w-3 text-muted-foreground" />
                                                    <span className="text-sm">
                                                        {lawsuit.acilisTarihi.toLocaleDateString("tr-TR")}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Badge
                                                    variant={statusBadge.variant}
                                                    className={statusBadge.className}
                                                >
                                                    {lawsuit.durum}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
                {lawsuits.length > 0 && (
                    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                        <div>Toplam {lawsuits.length} dava kaydı</div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className="bg-[oklch(var(--warning)/0.15)] text-warning border-[oklch(var(--warning)/0.20)]"
                                >
                                    Devam Ediyor
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className="bg-[oklch(var(--success)/0.15)] text-success border-[oklch(var(--success)/0.20)]"
                                >
                                    Karar Verildi
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className="bg-[oklch(var(--info)/0.15)] text-info border-[oklch(var(--info)/0.20)]"
                                >
                                    Temyiz
                                </Badge>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

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
import { Settlement } from "@/lib/types";
import { Handshake, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface SettlementTableProps {
    settlements: Settlement[];
}

export function SettlementTable({ settlements }: SettlementTableProps) {
    const getTrendIcon = (settlement: Settlement) => {
        const uzlasmaOrani =
            (settlement.uzlasilanMalikSayisi / settlement.toplamMalikSayisi) * 100;

        if (uzlasmaOrani >= 70) {
            return <TrendingUp className="h-4 w-4 text-success" />;
        } else if (uzlasmaOrani >= 40) {
            return <Minus className="h-4 w-4 text-warning" />;
        } else {
            return <TrendingDown className="h-4 w-4 text-destructive" />;
        }
    };

    const getProgressColor = (settlement: Settlement) => {
        const uzlasmaOrani =
            (settlement.uzlasilanMalikSayisi / settlement.toplamMalikSayisi) * 100;

        if (uzlasmaOrani >= 70) return "bg-success";
        if (uzlasmaOrani >= 40) return "bg-warning";
        return "bg-destructive";
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Handshake className="h-5 w-5 text-muted-foreground" />
                    Uzlaşma Durumu
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Ada</TableHead>
                                <TableHead>Parsel</TableHead>
                                <TableHead className="text-center">Uzlaşılan</TableHead>
                                <TableHead className="text-center">Uzlaşılamayan</TableHead>
                                <TableHead className="text-center">Kalan</TableHead>
                                <TableHead className="text-center">Toplam</TableHead>
                                <TableHead className="text-right">İlerleme</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {settlements.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        Uzlaşma verisi bulunamadı.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                settlements.map((settlement) => {
                                    const uzlasmaOrani =
                                        (settlement.uzlasilanMalikSayisi /
                                            settlement.toplamMalikSayisi) *
                                        100;

                                    return (
                                        <TableRow key={settlement.id}>
                                            <TableCell className="font-medium">
                                                {settlement.ada}
                                            </TableCell>
                                            <TableCell>{settlement.parsel}</TableCell>
                                            <TableCell className="text-center">
                                                <Badge
                                                    variant="outline"
                                                    className="bg-[oklch(var(--success)/0.15)] text-success border-[oklch(var(--success)/0.20)]"
                                                >
                                                    {settlement.uzlasilanMalikSayisi}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge
                                                    variant="outline"
                                                    className="bg-[oklch(var(--destructive)/0.15)] text-destructive border-[oklch(var(--destructive)/0.20)]"
                                                >
                                                    {settlement.uzlasilamayanMalikSayisi}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge
                                                    variant="outline"
                                                    className="bg-[oklch(var(--warning)/0.15)] text-warning border-[oklch(var(--warning)/0.20)]"
                                                >
                                                    {settlement.kalanMalikSayisi}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center font-medium">
                                                {settlement.toplamMalikSayisi}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {getTrendIcon(settlement)}
                                                    <div className="w-24">
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                                                <div
                                                                    className={`h-full ${getProgressColor(
                                                                        settlement
                                                                    )} transition-all`}
                                                                    style={{ width: `${uzlasmaOrani}%` }}
                                                                />
                                                            </div>
                                                            <span className="text-xs font-medium w-10 text-right">
                                                                {uzlasmaOrani.toFixed(0)}%
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
                {settlements.length > 0 && (
                    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                        <div>Toplam {settlements.length} kayıt</div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-success" />
                                <span>Yüksek (%70+)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-warning" />
                                <span>Orta (%40-69)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-destructive" />
                                <span>Düşük (%0-39)</span>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

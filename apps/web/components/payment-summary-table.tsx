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
import { PaymentSummary } from "@/lib/types";
import { Receipt, TrendingUp, CheckCircle2, Clock } from "lucide-react";

interface PaymentSummaryTableProps {
    paymentSummaries: PaymentSummary[];
}

export function PaymentSummaryTable({
    paymentSummaries,
}: PaymentSummaryTableProps) {
    const getProgressColor = (tamamlanmaOrani: number) => {
        if (tamamlanmaOrani >= 80) return "bg-success";
        if (tamamlanmaOrani >= 50) return "bg-warning";
        return "bg-destructive";
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const totals = paymentSummaries.reduce(
        (acc, item) => ({
            toplamMalik: acc.toplamMalik + item.toplamMalikSayisi,
            odenenMalik: acc.odenenMalik + item.odenenMalikSayisi,
            kalanMalik: acc.kalanMalik + item.kalanMalikSayisi,
            odenenTutar: acc.odenenTutar + item.odenenTutar,
            kalanTutar: acc.kalanTutar + item.kalanTutar,
            toplamTutar: acc.toplamTutar + item.toplamTutar,
        }),
        {
            toplamMalik: 0,
            odenenMalik: 0,
            kalanMalik: 0,
            odenenTutar: 0,
            kalanTutar: 0,
            toplamTutar: 0,
        }
    );

    const genelTamamlanmaOrani =
        totals.toplamTutar > 0
            ? (totals.odenenTutar / totals.toplamTutar) * 100
            : 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-muted-foreground" />
                    Ödeme Özeti
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Ada</TableHead>
                                <TableHead>Parsel</TableHead>
                                <TableHead className="text-center">Ödenen Malik</TableHead>
                                <TableHead className="text-right">Ödenen Tutar</TableHead>
                                <TableHead className="text-center">Kalan Malik</TableHead>
                                <TableHead className="text-right">Kalan Tutar</TableHead>
                                <TableHead className="text-right">Toplam</TableHead>
                                <TableHead className="text-right">İlerleme</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paymentSummaries.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        Ödeme verisi bulunamadı.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <>
                                    {paymentSummaries.map((payment) => (
                                        <TableRow key={payment.id}>
                                            <TableCell className="font-medium">
                                                {payment.ada}
                                            </TableCell>
                                            <TableCell>{payment.parsel}</TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-success" />
                                                    <span className="font-medium">
                                                        {payment.odenenMalikSayisi}
                                                    </span>
                                                    <span className="text-muted-foreground text-xs">
                                                        / {payment.toplamMalikSayisi}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right text-success font-medium">
                                                {formatCurrency(payment.odenenTutar)}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Clock className="h-4 w-4 text-warning" />
                                                    <span className="font-medium">
                                                        {payment.kalanMalikSayisi}
                                                    </span>
                                                    <span className="text-muted-foreground text-xs">
                                                        / {payment.toplamMalikSayisi}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right text-warning font-medium">
                                                {formatCurrency(payment.kalanTutar)}
                                            </TableCell>
                                            <TableCell className="text-right font-semibold">
                                                {formatCurrency(payment.toplamTutar)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <div className="w-24">
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                                                <div
                                                                    className={`h-full ${getProgressColor(
                                                                        payment.tamamlanmaOrani
                                                                    )} transition-all`}
                                                                    style={{
                                                                        width: `${payment.tamamlanmaOrani}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                            <span className="text-xs font-medium w-10 text-right">
                                                                {payment.tamamlanmaOrani.toFixed(0)}%
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {paymentSummaries.length > 1 && (
                                        <TableRow className="bg-muted/50 font-semibold">
                                            <TableCell colSpan={2}>TOPLAM</TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-success" />
                                                    <span>{totals.odenenMalik}</span>
                                                    <span className="text-muted-foreground text-xs font-normal">
                                                        / {totals.toplamMalik}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right text-success">
                                                {formatCurrency(totals.odenenTutar)}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Clock className="h-4 w-4 text-warning" />
                                                    <span>{totals.kalanMalik}</span>
                                                    <span className="text-muted-foreground text-xs font-normal">
                                                        / {totals.toplamMalik}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right text-warning">
                                                {formatCurrency(totals.kalanTutar)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {formatCurrency(totals.toplamTutar)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <TrendingUp className="h-4 w-4 text-success" />
                                                    <span className="text-sm">
                                                        {genelTamamlanmaOrani.toFixed(0)}%
                                                    </span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </div>
                {paymentSummaries.length > 0 && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-success" />
                                <span className="text-muted-foreground">Ödenen</span>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold text-success">
                                    {formatCurrency(totals.odenenTutar)}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {totals.odenenMalik} malik
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-warning" />
                                <span className="text-muted-foreground">Kalan</span>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold text-warning">
                                    {formatCurrency(totals.kalanTutar)}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {totals.kalanMalik} malik
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                                <Receipt className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Toplam</span>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold">
                                    {formatCurrency(totals.toplamTutar)}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {totals.toplamMalik} malik
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

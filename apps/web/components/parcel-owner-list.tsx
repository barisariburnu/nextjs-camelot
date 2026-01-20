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
import { PropertyOwner } from "@/lib/types";
import { MapPin, Users } from "lucide-react";

interface ParcelOwnerSummary {
    ada: string;
    parsel: string;
    malikSayisi: number;
}

interface ParcelOwnerListProps {
    propertyOwners: PropertyOwner[];
}

export function ParcelOwnerList({ propertyOwners }: ParcelOwnerListProps) {
    // Group owners by ada/parsel
    const parcelSummaries: ParcelOwnerSummary[] = Object.values(
        propertyOwners.reduce(
            (acc, owner) => {
                const key = `${owner.ada || "?"}-${owner.parsel || "?"}`;
                if (!acc[key]) {
                    acc[key] = {
                        ada: owner.ada || "-",
                        parsel: owner.parsel || "-",
                        malikSayisi: 0,
                    };
                }
                acc[key].malikSayisi++;
                return acc;
            },
            {} as Record<string, ParcelOwnerSummary>
        )
    ).sort((a, b) => {
        // Sort by ada first, then parsel
        const adaCompare = a.ada.localeCompare(b.ada, "tr", { numeric: true });
        if (adaCompare !== 0) return adaCompare;
        return a.parsel.localeCompare(b.parsel, "tr", { numeric: true });
    });

    const totalParcels = parcelSummaries.length;
    const totalOwners = propertyOwners.length;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    Ada/Parsel Bazlı Malik Listesi
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Ada</TableHead>
                                <TableHead>Parsel</TableHead>
                                <TableHead className="text-right">Malik Sayısı</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {parcelSummaries.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        Veri bulunamadı.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                parcelSummaries.map((summary) => (
                                    <TableRow
                                        key={`${summary.ada}-${summary.parsel}`}
                                        className="hover:bg-accent/50 transition-colors"
                                    >
                                        <TableCell className="font-medium">{summary.ada}</TableCell>
                                        <TableCell className="font-medium">
                                            {summary.parsel}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-semibold">
                                                    {summary.malikSayisi}
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                {parcelSummaries.length > 0 && (
                    <div className="mt-4 flex items-center justify-between text-sm">
                        <div className="text-muted-foreground">
                            Toplam {totalParcels} ada/parsel
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>Toplam {totalOwners} malik</span>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

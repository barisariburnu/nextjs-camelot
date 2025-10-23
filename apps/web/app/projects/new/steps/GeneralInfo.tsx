"use client";

import * as React from "react";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@workspace/ui/components/select";

interface StepProps {
  formData: any;
  onChange: (field: string, value: string) => void;
}

export default function GeneralInfo({ formData, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Kamulaştırma Planı Özet Bilgileri</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Parsel Adedi</Label>
                <Input placeholder="İmarlı" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">İmar Dışı</Label>
                <Input placeholder="İmar Dışı" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">TOPLAM</Label>
                <Input disabled className="bg-muted" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Uzunluk (km)</Label>
                <Input />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium"> </Label>
                <Input />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">TOPLAM</Label>
                <Input disabled className="bg-muted" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">İstimlak m2</Label>
                <Input />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium"> </Label>
                <Input />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">TOPLAM</Label>
                <Input disabled className="bg-muted" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">İrtifak Alanı (m2)</Label>
                <Input />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Bitiş</Label>
                <Input />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">TOPLAM</Label>
                <Input disabled className="bg-muted" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Genel Bilgiler</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Yatırım Yılı (Başlangıç-Bitiş)</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Bitiş</Label>
                <Input type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Yatırım Türü</Label>
              <Select value={formData.investmentType} onValueChange={(value) => onChange("investmentType", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yeni">Yeni Yatırım</SelectItem>
                  <SelectItem value="bakim">Bakım Onarım</SelectItem>
                  <SelectItem value="genisletme">Genişletme</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Proje Onay Tarihi ve Sayısı</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Sayı</Label>
                <Input placeholder="Sayı" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Proje Keşif Tutarı(TL)</Label>
              <Input placeholder="Tutar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
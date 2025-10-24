"use client";

import * as React from "react";
import { Input } from "@workspace/ui/components/input";
import { AlertCircle } from "lucide-react";
import { Label } from "@workspace/ui/components/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@workspace/ui/components/select";

interface StepProps {
  formData: any;
  errors: any;
  onChange: (field: string, value: string) => void;
}

export default function BasicInfo({ formData, errors, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="department" className="text-sm font-medium">
            Projenin İlgili Olduğu Daire Başkanlığı *
          </Label>
          <Select value={formData.department} onValueChange={(value) => onChange("department", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="strateji">Strateji Geliştirme Daire Başkanlığı</SelectItem>
              <SelectItem value="bilgi">Bilgi İşlem Daire Başkanlığı</SelectItem>
              <SelectItem value="insan">İnsan Kaynakları Daire Başkanlığı</SelectItem>
              <SelectItem value="mali">Mali İşler Daire Başkanlığı</SelectItem>
              <SelectItem value="hukuk">Hukuk İşleri Daire Başkanlığı</SelectItem>
            </SelectContent>
          </Select>
          {errors?.department && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.department}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectName" className="text-sm font-medium">
            Proje Adı *
          </Label>
          <Input
            id="projectName"
            value={formData.projectName}
            onChange={(e) => onChange("projectName", e.target.value)}
            placeholder="Proje Adı Giriniz"
            className={errors?.projectName ? "border-[oklch(var(--destructive))]" : ""}
          />
          {errors?.projectName && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.projectName}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectResponsible" className="text-sm font-medium">
            Proje Sorumlusu *
          </Label>
          <Select value={formData.projectResponsible} onValueChange={(value) => onChange("projectResponsible", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ahmet">Ahmet Yılmaz</SelectItem>
              <SelectItem value="mehmet">Mehmet Demir</SelectItem>
              <SelectItem value="ayse">Ayşe Kaya</SelectItem>
            </SelectContent>
          </Select>
          {errors?.projectResponsible && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.projectResponsible}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectStatus" className="text-sm font-medium">
            Proje Durumu *
          </Label>
          <Select value={formData.projectStatus} onValueChange={(value) => onChange("projectStatus", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bekleyen">Bekleyen</SelectItem>
              <SelectItem value="devam">Devam Eden</SelectItem>
              <SelectItem value="tamamlanan">Tamamlanan</SelectItem>
            </SelectContent>
          </Select>
          {errors?.projectStatus && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.projectStatus}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectStartDate" className="text-sm font-medium">
            Proje Başlangıç Tarihi
          </Label>
          <Input
            id="projectStartDate"
            type="date"
            value={formData.projectStartDate}
            onChange={(e) => onChange("projectStartDate", e.target.value)}
            placeholder="gg.aa.yyyy"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectType" className="text-sm font-medium">
            Proje Türü *
          </Label>
          <Select value={formData.projectType} onValueChange={(value) => onChange("projectType", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="atik">Atıksu Projesi</SelectItem>
              <SelectItem value="yagmur">Yağmursuyu Projesi</SelectItem>
              <SelectItem value="icme">İçmesuyu Projesi</SelectItem>
            </SelectContent>
          </Select>
          {errors?.projectType && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.projectType}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="expropriationNeed" className="text-sm font-medium">
            Kamulaştırma Var Mı?
          </Label>
          <Select value={formData.expropriationNeed} onValueChange={(value) => onChange("expropriationNeed", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="var">Var</SelectItem>
              <SelectItem value="yok">Yok</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="planRevision" className="text-sm font-medium">
            Plan Tadilatı Var Mı?
          </Label>
          <Select value={formData.planRevision} onValueChange={(value) => onChange("planRevision", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="var">Var</SelectItem>
              <SelectItem value="yok">Yok</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="neighborhood" className="text-sm font-medium">
            Mahalle Seçiniz
          </Label>
          <Select value={formData.neighborhood} onValueChange={(value) => onChange("neighborhood", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="merkez">Merkez</SelectItem>
              <SelectItem value="kavak">Kavak</SelectItem>
              <SelectItem value="baglar">Bağlar</SelectItem>
            </SelectContent>
          </Select>
          {errors?.neighborhood && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.neighborhood}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
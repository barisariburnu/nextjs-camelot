"use client";

import * as React from "react";
import { Input } from "@workspace/ui/components/input";
import { AlertCircle } from "lucide-react";
import { Label } from "@workspace/ui/components/label";

interface StepProps {
  formData: any;
  errors: any;
  onChange: (field: string, value: string) => void;
}

export default function Approvals({ formData, errors, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="decisionDate" className="text-sm font-medium">
            Yönetim Kurulu Kararı - Tarih *
          </Label>
          <Input
            id="decisionDate"
            type="date"
            value={formData.decisionDate}
            onChange={(e) => onChange("decisionDate", e.target.value)}
            className={errors?.decisionDate ? "border-red-500" : ""}
          />
          {errors?.decisionDate && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.decisionDate}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="decisionNumber" className="text-sm font-medium">Sayı</Label>
          <Input
            id="decisionNumber"
            value={formData.decisionNumber}
            onChange={(e) => onChange("decisionNumber", e.target.value)}
            placeholder="Sayı"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="kykDate" className="text-sm font-medium">
            Kamu Yarari Kararı (KYK) - Tarih *
          </Label>
          <Input
            id="kykDate"
            type="date"
            value={formData.kykDate}
            onChange={(e) => onChange("kykDate", e.target.value)}
            className={errors?.kykDate ? "border-red-500" : ""}
          />
          {errors?.kykDate && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.kykDate}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="kykNumber" className="text-sm font-medium">Sayı</Label>
          <Input
            id="kykNumber"
            value={formData.kykNumber}
            onChange={(e) => onChange("kykNumber", e.target.value)}
            placeholder="Sayı"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="presidentApprovalDate" className="text-sm font-medium">
            Cumhurbaşkanı Olur - Tarih
          </Label>
          <Input
            id="presidentApprovalDate"
            type="date"
            value={formData.presidentApprovalDate}
            onChange={(e) => onChange("presidentApprovalDate", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="presidentApprovalNumber" className="text-sm font-medium">Sayı</Label>
          <Input
            id="presidentApprovalNumber"
            value={formData.presidentApprovalNumber}
            onChange={(e) => onChange("presidentApprovalNumber", e.target.value)}
            placeholder="Sayı"
          />
        </div>
      </div>
    </div>
  );
}
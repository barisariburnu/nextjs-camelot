'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Badge } from "@workspace/ui/components/badge";
import { FilterCriteria, ProcessStatus } from "@/lib/types";
import { Search, X, Filter } from "lucide-react";

interface ProjectFilterProps {
  onFilterChange: (criteria: FilterCriteria) => void;
  onClearFilters: () => void;
  activeFilters: FilterCriteria;
}

export function ProjectFilter({ onFilterChange, onClearFilters, activeFilters }: ProjectFilterProps) {
  const [filters, setFilters] = useState<FilterCriteria>(activeFilters);
  const [isExpanded, setIsExpanded] = useState(false);

  // Semantik tonlar: filtre chip'leri için yumuşak arka plan + sınır
  const tone = {
    info:
      "text-info border-[oklch(var(--info)/0.12)] bg-[oklch(var(--info)/0.06)] transition-colors hover:bg-[oklch(var(--info)/0.12)] hover:border-[oklch(var(--info)/0.18)]",
    success:
      "text-success border-[oklch(var(--success)/0.12)] bg-[oklch(var(--success)/0.06)] transition-colors hover:bg-[oklch(var(--success)/0.12)] hover:border-[oklch(var(--success)/0.18)]",
    warning:
      "text-warning border-[oklch(var(--warning)/0.12)] bg-[oklch(var(--warning)/0.06)] transition-colors hover:bg-[oklch(var(--warning)/0.12)] hover:border-[oklch(var(--warning)/0.18)]",
    danger:
      "text-priority-high border-[oklch(var(--priority-high)/0.12)] bg-[oklch(var(--priority-high)/0.06)] transition-colors hover:bg-[oklch(var(--priority-high)/0.12)] hover:border-[oklch(var(--priority-high)/0.18)]",
  } as const;

  const getFilterChipClass = (
    key: keyof FilterCriteria,
    value?: string
  ): string => {
    const base = "group cursor-pointer text-xs"; // group: ikon hover efekti için
    if (key === "processStatus") {
      if (value === ProcessStatus.PAYMENT_COMPLETED) return `${base} ${tone.success}`;
      if (value === ProcessStatus.PAYMENT_PENDING) return `${base} ${tone.warning}`;
      if (value === ProcessStatus.LAWSUIT_PROCESS) return `${base} ${tone.danger}`;
    }
    return `${base} ${tone.info}`;
  };

  const handleFilterChange = (key: keyof FilterCriteria, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value || undefined
    };
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    const emptyFilters: FilterCriteria = {};
    setFilters(emptyFilters);
    onClearFilters();
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => value && value.trim() !== '').length;
  };

  const getProcessStatusLabel = (status: ProcessStatus) => {
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            Filtreleme ve Arama
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFilterCount()} aktif filtre
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Daralt' : 'Genişlet'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Hızlı Arama */}
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] gap-3 sm:gap-4 [touch-action:manipulation]">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Ada</label>
            <Input
              placeholder="Ada numarası..."
              value={filters.ada || ''}
              onChange={(e) => handleFilterChange('ada', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Parsel</label>
            <Input
              placeholder="Parsel numarası..."
              value={filters.parsel || ''}
              onChange={(e) => handleFilterChange('parsel', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Malik Kimlik No</label>
            <Input
              placeholder="TC/Vergi numarası..."
              value={filters.malikKimlikNo || ''}
              onChange={(e) => handleFilterChange('malikKimlikNo', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Mahkeme Esas No</label>
            <Input
              placeholder="Esas numarası..."
              value={filters.mahkemeEsasNo || ''}
              onChange={(e) => handleFilterChange('mahkemeEsasNo', e.target.value)}
            />
          </div>
        </div>

        {/* Gelişmiş Filtreler */}
        {isExpanded && (
          <div className="border-t pt-4 space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">Gelişmiş Filtreler</h4>
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] gap-3 sm:gap-4 [touch-action:manipulation]">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Süreç Durumu</label>
                <Select
                  value={filters.processStatus || ''}
                  onValueChange={(value) => handleFilterChange('processStatus', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Durum seçin..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tümü</SelectItem>
                    <SelectItem value={ProcessStatus.PAYMENT_COMPLETED}>
                      {getProcessStatusLabel(ProcessStatus.PAYMENT_COMPLETED)}
                    </SelectItem>
                    <SelectItem value={ProcessStatus.PAYMENT_PENDING}>
                      {getProcessStatusLabel(ProcessStatus.PAYMENT_PENDING)}
                    </SelectItem>
                    <SelectItem value={ProcessStatus.LAWSUIT_PROCESS}>
                      {getProcessStatusLabel(ProcessStatus.LAWSUIT_PROCESS)}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Aktif Filtreler */}
        {getActiveFilterCount() > 0 && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-muted-foreground">Aktif Filtreler</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-destructive hover:text-destructive/90"
              >
                <X className="h-4 w-4 mr-1" />
                Tümünü Temizle
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeFilters.ada && (
                <Badge variant="outline" className={`flex items-center gap-1 ${getFilterChipClass('ada', activeFilters.ada)}`}>
                  Ada: {activeFilters.ada}
                  <button
                    type="button"
                    aria-label="Ada filtresini kaldır"
                    className="ml-1 rounded-sm p-0.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    onClick={() => handleFilterChange('ada', '')}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {activeFilters.parsel && (
                <Badge variant="outline" className={`flex items-center gap-1 ${getFilterChipClass('parsel', activeFilters.parsel)}`}>
                  Parsel: {activeFilters.parsel}
                  <button
                    type="button"
                    aria-label="Parsel filtresini kaldır"
                    className="ml-1 rounded-sm p-0.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    onClick={() => handleFilterChange('parsel', '')}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {activeFilters.malikKimlikNo && (
                <Badge variant="outline" className={`flex items-center gap-1 ${getFilterChipClass('malikKimlikNo', activeFilters.malikKimlikNo)}`}>
                  Kimlik: {activeFilters.malikKimlikNo}
                  <button
                    type="button"
                    aria-label="Kimlik filtresini kaldır"
                    className="ml-1 rounded-sm p-0.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    onClick={() => handleFilterChange('malikKimlikNo', '')}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {activeFilters.mahkemeEsasNo && (
                <Badge variant="outline" className={`flex items-center gap-1 ${getFilterChipClass('mahkemeEsasNo', activeFilters.mahkemeEsasNo)}`}>
                  Mahkeme: {activeFilters.mahkemeEsasNo}
                  <button
                    type="button"
                    aria-label="Mahkeme filtresini kaldır"
                    className="ml-1 rounded-sm p-0.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    onClick={() => handleFilterChange('mahkemeEsasNo', '')}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {activeFilters.processStatus && (
                <Badge variant="outline" className={`flex items-center gap-1 ${getFilterChipClass('processStatus', activeFilters.processStatus)}`}>
                  Durum: {getProcessStatusLabel(activeFilters.processStatus)}
                  <button
                    type="button"
                    aria-label="Durum filtresini kaldır"
                    className="ml-1 rounded-sm p-0.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    onClick={() => handleFilterChange('processStatus', '')}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Aksiyon Butonları */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
          <Button onClick={handleApplyFilters} className="w-full sm:w-auto flex items-center justify-center gap-2">
            <Search className="h-4 w-4" />
            Filtrele
          </Button>
          {getActiveFilterCount() > 0 && (
            <Button variant="outline" onClick={handleClearFilters} className="w-full sm:w-auto">
              Filtreleri Temizle
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
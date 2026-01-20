// Proje kategorileri
export enum ProjectCategory {
  KAMULASTIRMA = "Kamulaştırma",
  IRTIFAK = "İrtifak",
  KAMULASTIRMA_IRTIFAK = "Kamulaştırma-İrtifak",
  TAHSIS = "Tahsis",
  DEVIR = "Devir",
}

// Süreç durumları
export enum ProcessStatus {
  PAYMENT_COMPLETED = "ödeme_tamamlandı",
  PAYMENT_PENDING = "ödeme_yapılacak",
  LAWSUIT_PROCESS = "dava_sürecinde",
}

// Owner (Property Owner) information
export interface PropertyOwner {
  id: string;
  kimlikNo: string;
  ad: string;
  soyad: string;
  tcKimlikNo?: string;
  vergiNo?: string;
  adres: string;
  telefon?: string;
  email?: string;
  hissePay: number;
  hissePayda: number;
  processStatus: ProcessStatus;
  mahkemeEsasNo?: string;
  sonIslemTarihi: Date;
  odemeTutari?: number;
  odenenTutar?: number;
  kalanTutar?: number;
  ada?: string;
  parsel?: string;
  hissePayi?: string;
}

// Ada/Parsel bilgileri
export interface ProjectArea {
  id: string;
  ada: string;
  parsel: string;
  pafta?: string;
  nitelik: string;
  yuzolcumu: number;
  kamulaştırmaAlani: number;
  malikler: PropertyOwner[];
  tapuDurumu: string;
  imar_durumu?: string;
  // Additional properties used in mock data
  alan?: number;
  malikSayisi?: number;
  odemeToplamTutari?: number;
  odenenTutar?: number;
  davaliMalikSayisi?: number;
  tamamlananMalikSayisi?: number;
}

// Mahkeme bilgileri
export interface CourtInfo {
  mahkemeAdi: string;
  esasNo: string;
  kararNo?: string;
  kararTarihi?: Date;
  durusmatarihi?: Date;
  durum: string;
}

// Ödeme bilgileri
export interface PaymentInfo {
  id: string;
  malikId: string;
  tutar: number;
  odenenTutar: number;
  kalanTutar: number;
  odemeTarihi?: Date;
  odemeYontemi?: string;
  aciklama?: string;
}

// Proje bilgileri
export interface Project {
  id: string;
  ad: string;
  kategori: ProjectCategory;
  aciklama?: string;
  baslangicTarihi: Date;
  bitisTarihi?: Date;
  durum: string;
  sorumluKisi: string;
  butce?: number;
  harcananTutar?: number;
  areas: ProjectArea[];
  toplamMalikSayisi: number;
  tamamlananOdemeSayisi: number;
  bekleyenOdemeSayisi: number;
  davaSayisi: number;
  // Additional properties used in mock data
  toplamAlan?: number;
  malikSayisi?: number;
  harcananButce?: number;
  tamamlanmaOrani?: number;
}

// Filtreleme kriterleri
export interface FilterCriteria {
  ada?: string;
  parsel?: string;
  malikKimlikNo?: string;
  mahkemeEsasNo?: string;
  processStatus?: ProcessStatus;
}

// Arama sonuçları
export interface SearchResult {
  areas: ProjectArea[];
  malikler: PropertyOwner[];
  totalCount: number;
}

// Proje özet bilgileri
export interface ProjectSummary {
  toplamAlan: number;
  toplamMalik: number;
  tamamlananIslemler: number;
  bekleyenIslemler: number;
  toplamButce: number;
  harcananTutar: number;
  kalanButce: number;
}

// Uzlaşma bilgileri
export interface Settlement {
  id: string;
  ada: string;
  parsel: string;
  uzlasilanMalikSayisi: number;
  uzlasilamayanMalikSayisi: number;
  kalanMalikSayisi: number;
  toplamMalikSayisi: number;
  uzlasmaTarihi?: Date;
  uzlasmaTutari?: number;
}

// Dava bilgileri
export interface Lawsuit {
  id: string;
  ada: string;
  parsel: string;
  dosyaTuru: string;
  mahkemeAdi: string;
  esasNo: string;
  kararNo?: string;
  acilisTarihi: Date;
  durusmaTarihi?: Date;
  durum: string;
  davaTutari?: number;
  aciklama?: string;
}

// Ödeme özeti
export interface PaymentSummary {
  id: string;
  ada: string;
  parsel: string;
  toplamMalikSayisi: number;
  odenenMalikSayisi: number;
  odenenTutar: number;
  kalanMalikSayisi: number;
  kalanTutar: number;
  toplamTutar: number;
  tamamlanmaOrani: number;
}

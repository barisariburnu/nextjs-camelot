"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";

export type Project = {
  id: string;
  name: string;
  code: string;
  description: string;
  category: string;
  status: "Devam Eden" | "Tamamlanan" | "Bekleyen";
  priority: "Düşük" | "Normal" | "Yüksek";
  createdAt: string;
  startDate: string;
  endDate: string;
  owner: string;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

function generateSampleProjects(): Project[] {
  const categories = [
    "Kamulaştırma",
    "Arıtma",
    "İçme Suyu",
    "Atık Su",
    "Sayaç",
  ];
  const statuses: Array<Project["status"]> = [
    "Devam Eden",
    "Tamamlanan",
    "Bekleyen",
  ];
  const priorities: Array<Project["priority"]> = ["Düşük", "Normal", "Yüksek"];
  const owners = [
    "Ali Yılmaz",
    "Ayşe Demir",
    "Mehmet Koç",
    "Zeynep Kaya",
    "Fatma Özkan",
    "Ahmet Şahin",
    "Elif Çelik",
    "Mustafa Arslan",
    "Seda Polat",
    "Emre Doğan",
    "Gülşen Aydın",
    "Okan Yıldız",
  ];

  const projectTemplates = [
    // Kamulaştırma projeleri
    {
      name: "Kamulaştırma - Bursa Büyükşehir Belediyesi / BUSKI Genel Müdürlüğü",
      category: "Kamulaştırma",
      desc: "Büyükşehir belediyesi kamulaştırma işlemleri ve arazi edinimi süreçlerinin dijital yönetimi.",
    },
    {
      name: "İstanbul Kamulaştırma Takip Sistemi",
      category: "Kamulaştırma",
      desc: "İstanbul genelinde yapılan kamulaştırma işlemlerinin takibi ve raporlanması.",
    },
    {
      name: "Ankara Büyükşehir Kamulaştırma Projesi",
      category: "Kamulaştırma",
      desc: "Ankara ili genelinde kamulaştırma süreçlerinin otomasyonu ve dijitalleştirilmesi.",
    },
    {
      name: "İzmir Kamulaştırma Değerleme Sistemi",
      category: "Kamulaştırma",
      desc: "Kamulaştırma yapılacak arazilerin değerlemesi ve bedel tespiti sistemi.",
    },
    {
      name: "Adana Kamulaştırma Bedel Ödeme Takibi",
      category: "Kamulaştırma",
      desc: "Kamulaştırma bedellerinin ödenmesi ve takibi için geliştirilen platform.",
    },

    // Arıtma projeleri
    {
      name: "Arıtma Tesisleri İzleme ve Yönetim Platformu",
      category: "Arıtma",
      desc: "Atık su arıtma tesislerinin gerçek zamanlı izlenmesi ve operasyonel yönetimi.",
    },
    {
      name: "Marmara Bölgesi Arıtma Tesisleri Entegrasyonu",
      category: "Arıtma",
      desc: "Marmara bölgesindeki tüm arıtma tesislerinin merkezi sistemle entegrasyonu.",
    },
    {
      name: "Endüstriyel Atık Su Arıtma İzleme",
      category: "Arıtma",
      desc: "Endüstriyel tesislerin atık su arıtma süreçlerinin izlenmesi ve raporlanması.",
    },
    {
      name: "Biyolojik Arıtma Optimizasyon Sistemi",
      category: "Arıtma",
      desc: "Biyolojik arıtma süreçlerinin optimizasyonu için AI destekli sistem.",
    },
    {
      name: "Arıtma Tesisi Bakım Yönetim Sistemi",
      category: "Arıtma",
      desc: "Arıtma tesislerinin periyodik bakım ve onarım süreçlerinin yönetimi.",
    },

    // İçme Suyu projeleri
    {
      name: "İçme Suyu Dağıtım Optimizasyonu",
      category: "İçme Suyu",
      desc: "Şehir genelinde içme suyu dağıtım ağının optimizasyonu ve basınç yönetimi.",
    },
    {
      name: "İçme Suyu Kalite İzleme Sistemi",
      category: "İçme Suyu",
      desc: "İçme suyu kalitesinin gerçek zamanlı izlenmesi ve analizi.",
    },
    {
      name: "Su Deposu Seviye Takip Sistemi",
      category: "İçme Suyu",
      desc: "Şehir genelindeki su depolarının seviye takibi ve otomatik yönetimi.",
    },
    {
      name: "İçme Suyu Şebeke Haritası Dijitalleştirme",
      category: "İçme Suyu",
      desc: "Mevcut içme suyu şebeke haritalarının dijital ortama aktarılması.",
    },
    {
      name: "Su Kayıp Kaçak Tespit Sistemi",
      category: "İçme Suyu",
      desc: "İçme suyu şebekesindeki kayıp ve kaçakların tespiti için akıllı sistem.",
    },

    // Atık Su projeleri
    {
      name: "Atık Su Hatları Bakım ve Onarım",
      category: "Atık Su",
      desc: "Atık su hatlarının bakım, onarım ve yenileme süreçlerinin dijital yönetimi.",
    },
    {
      name: "Kanalizasyon Şebeke Yönetim Sistemi",
      category: "Atık Su",
      desc: "Kanalizasyon şebekesinin haritalaması ve operasyonel yönetimi.",
    },
    {
      name: "Yağmur Suyu Drenaj Sistemi İzleme",
      category: "Atık Su",
      desc: "Yağmur suyu drenaj sistemlerinin izlenmesi ve taşkın erken uyarı sistemi.",
    },
    {
      name: "Atık Su Pompa İstasyonları Otomasyonu",
      category: "Atık Su",
      desc: "Atık su pompa istasyonlarının otomatik kontrolü ve uzaktan yönetimi.",
    },
    {
      name: "Endüstriyel Atık Su Deşarj İzleme",
      category: "Atık Su",
      desc: "Endüstriyel tesislerin atık su deşarjlarının izlenmesi ve kontrolü.",
    },

    // Sayaç projeleri
    {
      name: "Sayaç Okuma ve Faturalandırma",
      category: "Sayaç",
      desc: "Akıllı su sayaçlarının otomatik okunması ve faturalandırma süreçleri.",
    },
    {
      name: "Akıllı Su Sayacı Altyapı Projesi",
      category: "Sayaç",
      desc: "Şehir genelinde akıllı su sayacı altyapısının kurulumu ve yönetimi.",
    },
    {
      name: "Sayaç Veri Analiz ve Raporlama",
      category: "Sayaç",
      desc: "Su sayacı verilerinin analizi ve tüketim raporlarının oluşturulması.",
    },
    {
      name: "Uzaktan Sayaç Okuma Sistemi",
      category: "Sayaç",
      desc: "Su sayaçlarının uzaktan okunması için IoT tabanlı sistem.",
    },
    {
      name: "Sayaç Arıza Tespit ve Bakım Sistemi",
      category: "Sayaç",
      desc: "Su sayaçlarındaki arızaların tespiti ve bakım süreçlerinin yönetimi.",
    },
  ];

  const base: Project[] = [];

  // İlk 25 proje için template'leri kullan
  for (let i = 0; i < Math.min(25, projectTemplates.length); i++) {
    const template = projectTemplates[i]!;
    const statusIndex = i % statuses.length;
    const priorityIndex = i % priorities.length;
    const ownerIndex = i % owners.length;
    const start = new Date(2023 + (i % 2), i % 12, (i % 28) + 1);
    const end = new Date(start);
    end.setMonth(start.getMonth() + (i % 12) + 1);

    base.push({
      id: String(i + 1),
      name: template.name,
      code: `PRJ-${String(i + 1).padStart(4, "0")}`,
      description: template.desc,
      category: template.category,
      status: statuses[statusIndex]!,
      priority: priorities[priorityIndex]!,
      createdAt: start.toISOString(),
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      owner: owners[ownerIndex]!,
    });
  }

  // Kalan projeler için otomatik oluştur
  for (let i = 25; i < 200; i++) {
    const cat = categories[i % categories.length]!;
    const st = statuses[i % statuses.length]!;
    const pr = priorities[i % priorities.length]!;
    const owner = owners[i % owners.length]!;
    const start = new Date(2023 + (i % 2), i % 12, (i % 28) + 1);
    const end = new Date(start);
    end.setMonth(start.getMonth() + (i % 8) + 1);

    const projectTypes = {
      Kamulaştırma: [
        "Arazi Edinimi",
        "Değerleme",
        "Bedel Ödeme",
        "Hukuki Süreç",
      ],
      Arıtma: [
        "Tesis İzleme",
        "Kalite Kontrol",
        "Bakım Onarım",
        "Kapasite Artırım",
      ],
      "İçme Suyu": [
        "Dağıtım",
        "Kalite İzleme",
        "Şebeke Yönetimi",
        "Depo Yönetimi",
      ],
      "Atık Su": ["Toplama", "İletim", "Pompalama", "Drenaj"],
      Sayaç: ["Okuma", "Faturalandırma", "Bakım", "Değişim"],
    };

    const typeOptions = projectTypes[cat as keyof typeof projectTypes] || [
      "Genel",
    ];
    const projectType = typeOptions[i % typeOptions.length];
    const cityNames = [
      "İstanbul",
      "Ankara",
      "İzmir",
      "Bursa",
      "Antalya",
      "Adana",
      "Konya",
      "Gaziantep",
      "Şanlıurfa",
      "Kocaeli",
    ];
    const cityName = cityNames[i % cityNames.length];

    base.push({
      id: String(i + 1),
      name: `${cityName} ${cat} ${projectType} Projesi ${i - 24}`,
      code: `PRJ-${String(i + 1).padStart(4, "0")}`,
      description: `${cityName} ili ${cat.toLowerCase()} kategorisinde ${projectType?.toLowerCase()} süreçlerinin dijitalleştirilmesi ve otomasyonu projesi. Operasyon, izleme ve raporlama süreçlerini kapsar.`,
      category: cat,
      status: st,
      priority: pr,
      createdAt: start.toISOString(),
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      owner,
    });
  }

  return base;
}

// Generate sample projects once
const sampleProjects = generateSampleProjects();

export function Providers({ children }: { children: React.ReactNode }) {
  // Initialize data only once when the component mounts
  React.useEffect(() => {
    console.log("Providers useEffect running...");
    const existingData = queryClient.getQueryData<Project[]>(["projects"]);
    console.log("Existing projects data:", existingData?.length || 0);
    
    if (!existingData || existingData.length === 0) {
      console.log("Initializing projects data with", sampleProjects.length, "projects");
      queryClient.setQueryData(["projects"], sampleProjects);
      
      // Verify data was set
      const verifyData = queryClient.getQueryData<Project[]>(["projects"]);
      console.log("Verified projects data after setting:", verifyData?.length || 0);
    }
    
    if (queryClient.getQueryData(["selected-project"]) === undefined) {
      queryClient.setQueryData(["selected-project"], null);
    }
    if (queryClient.getQueryData(["selected-project-loading"]) === undefined) {
      queryClient.setQueryData(["selected-project-loading"], false);
    }
  }, []); // Empty dependency array - run only once

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  );
}

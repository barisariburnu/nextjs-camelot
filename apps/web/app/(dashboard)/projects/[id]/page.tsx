import { ProjectDetailClient } from "./project-detail-client";

// Bu fonksiyon statik export için gereklidir.
// Proje ID'leri için gerekli statik parametreleri üretir.
export async function generateStaticParams() {
  // Demo amaçlı ilk 25 projenin sayfasını oluşturuyoruz.
  // Daha fazla proje için dizi genişletilebilir.
  return Array.from({ length: 25 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}

export default function ProjectDetailPage() {
  return <ProjectDetailClient />;
}

"use client";

import * as React from "react";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Separator } from "@workspace/ui/components/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  Building,
  FileText,
  MapPin,
  Clock,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import BasicInfo from "./steps/BasicInfo";
import Approvals from "./steps/Approvals";
import Notes from "./steps/Notes";
import GeneralInfo from "./steps/GeneralInfo";
import Summary from "./steps/Summary";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@workspace/ui/components/card";
import { Progress } from "@workspace/ui/components/progress";
import { toast } from "@workspace/ui/components/sonner";

interface ProjectFormData {
  // Proje Bilgileri
  department: string; // Daire Başkanlığı
  projectName: string; // Proje Adı
  projectCode: string; // Proje Kodu (opsiyonel)
  projectType: string; // Proje Türü
  projectResponsible: string; // Proje Sorumlusu
  projectStatus: string; // Proje Durumu
  projectStartDate: string;
  projectEndDate: string;
  projectDescription: string;
  planRevision: string; // Plan Tadilatı Var mı?
  neighborhood: string; // Mahalle

  // Yönetim Kurulu Kararı
  decisionDate: string;
  decisionNumber: string;

  // Kamu Yarari Kararı (KYK)
  kykDate: string;
  kykNumber: string;

  // Cumhurbaşkanı Olur
  presidentApprovalDate: string;
  presidentApprovalNumber: string;

  // Meclis Kararı
  parliamentDate: string;
  parliamentNumber: string;

  // Resmi Gazete
  officialGazetteDate: string;
  officialGazetteNumber: string;

  // Kamulaştırma Planı Özet Bilgileri
  parcelCount: string;
  totalLength: string;
  totalArea: string;
  expropriationArea: string;

  // Genel Bilgiler
  investmentYear: string;
  investmentType: string;
  projectApprovalDate: string;
  projectBudget: string;

  // Diğer Bilgiler
  province: string;
  district: string;
  contractorCompany: string;
  expropriationNeed: string;
}

const initialFormData: ProjectFormData = {
  department: "",
  projectName: "",
  projectCode: "",
  projectType: "",
  projectResponsible: "",
  projectStatus: "",
  projectStartDate: "",
  projectEndDate: "",
  projectDescription: "",
  planRevision: "",
  neighborhood: "",
  decisionDate: "",
  decisionNumber: "",
  kykDate: "",
  kykNumber: "",
  presidentApprovalDate: "",
  presidentApprovalNumber: "",
  parliamentDate: "",
  parliamentNumber: "",
  officialGazetteDate: "",
  officialGazetteNumber: "",
  parcelCount: "",
  totalLength: "",
  totalArea: "",
  expropriationArea: "",
  investmentYear: "",
  investmentType: "",
  projectApprovalDate: "",
  projectBudget: "",
  province: "",
  district: "",
  contractorCompany: "",
  expropriationNeed: "",
};

type Step = { id: number; title: string; icon: React.ElementType };

const steps: Step[] = [
  { id: 1, title: "Proje Bilgileri", icon: FileText },
  { id: 2, title: "Tesis Bilgileri", icon: CheckCircle2 },
  { id: 3, title: "Notlar", icon: FileText },
  { id: 4, title: "Özet Bilgi", icon: Building },
  { id: 5, title: "Önizleme", icon: MapPin },
];

export default function NewProjectPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] =
    React.useState<ProjectFormData>(initialFormData);
  const formDataRef = React.useRef<ProjectFormData>(initialFormData);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Partial<ProjectFormData>>({});

  // İlerleme hesaplamasını adım indeksine göre yap
  const stepIndex = Math.max(
    0,
    steps.findIndex((s) => s.id === currentStep)
  );
  const progress = ((stepIndex + 1) / steps.length) * 100;

  // Başlık için aktif adımı güvenli şekilde bul
  const activeStep: Step = React.useMemo(
    () => steps.find((s) => s.id === currentStep) ?? steps[0]!,
    [currentStep]
  );

  // Klavye kısayolları için useEffect
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Eğer input, textarea, select, button veya combobox gibi interaktif bir elementte ise kısayolları çalıştırma
      const target = event.target as HTMLElement;
      const tag = target.tagName;
      const role = target.getAttribute("role");
      const isEditableOrInteractive =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        tag === "BUTTON" ||
        target.isContentEditable ||
        (role
          ? ["button", "combobox", "menu", "listbox", "textbox"].includes(role)
          : false) ||
        !!target.closest(
          '[data-slot="select-trigger"],[data-slot="dropdown-menu-trigger"]'
        );

      if (isEditableOrInteractive) {
        return;
      }

      switch (event.key) {
        case "ArrowRight":
        case "Enter":
          event.preventDefault();
          if (currentStep < steps.length) {
            handleNext();
          }
          break;
        case "ArrowLeft":
          event.preventDefault();
          if (currentStep > 1) {
            handlePrevious();
          }
          break;
        case "Escape":
          event.preventDefault();
          router.back();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentStep, router]);

  const handleInputChange = (field: keyof ProjectFormData, value: string) => {
    // Ref’i anında güncelle (UI hızlı gezinmede en güncel veriyi kullanır)
    formDataRef.current = {
      ...formDataRef.current,
      [field]: value,
    } as ProjectFormData;

    // State’i güncelle (UI render için)
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Hata mesajını alan bazında temizle
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Adapter: step bileşenleri string param bekliyor, burada keyof'a çeviriyoruz
  const handleStepChange = (field: string, value: string) => {
    handleInputChange(field as keyof ProjectFormData, value);
  };

  const validateStep = (stepId: number) => {
    const errors: Record<string, string> = {};
    const data = formDataRef.current; // Her zaman en güncel değerleri kullan

    if (stepId === 1) {
      if (!data.projectName?.trim()) {
        errors.projectName = "Proje adı zorunludur.";
      }
      if (!data.projectType?.trim()) {
        errors.projectType = "Proje türü zorunludur.";
      }
      if (!data.department?.trim()) {
        errors.department = "Daire başkanlığı zorunludur.";
      }
      if (!data.projectResponsible?.trim()) {
        errors.projectResponsible = "Proje sorumlusu zorunludur.";
      }
      if (!data.projectStatus?.trim()) {
        errors.projectStatus = "Proje durumu zorunludur.";
      }
    }

    if (stepId === 2) {
      if (!data.decisionDate?.trim()) {
        errors.decisionDate = "YK kararı tarihi zorunludur.";
      }
      if (!data.kykDate?.trim()) {
        errors.kykDate = "KYK tarihi zorunludur.";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
      // Adım geçişinde genel hataları temizle (kullanıcı dostu deneyim)
      setErrors({});
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    // Geri geçişte hataları temizle, gerekli olduğunda tekrar doğrulanır
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Proje başarıyla oluşturuldu!", {
        duration: 3000,
      });
      router.push("/dashboard");
    } catch (error) {
      toast.error("Proje oluşturulurken bir hata oluştu.", {
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfo
            formData={formData}
            errors={errors}
            onChange={handleStepChange}
          />
        );

      case 2:
        return (
          <Approvals
            formData={formData}
            errors={errors}
            onChange={handleStepChange}
          />
        );

      case 3:
        return <Notes />;

      case 4:
        return <GeneralInfo formData={formData} onChange={handleStepChange} />;

      case 5:
        return (
          <Summary
            formData={formData}
            currentStep={currentStep}
            progress={progress}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Camelot</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Yeni Proje</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-4">
            <ThemeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold">Yeni Proje</h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Proje bilgilerini adım adım doldurun
                </p>
              </div>
            </div>
            <Badge variant="outline" className="gap-2">
              <Clock className="h-4 w-4" />
              Adım {currentStep} / {steps.length}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground">
                İlerleme
              </span>
              <span className="text-sm text-muted-foreground">
                %{Math.round(progress)}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Steps Navigation */}
          <div className="flex items-center justify-center mb-8 overflow-x-auto px-4">
            <div className="flex items-center gap-1 sm:gap-2 min-w-max">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <React.Fragment key={step.id}>
                    <div
                      className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md"
                          : isCompleted
                            ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                            : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      ) : (
                        <Icon className="h-4 w-4 flex-shrink-0" />
                      )}
                      <span className="text-xs sm:text-sm font-medium whitespace-nowrap hidden sm:inline">
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-4 sm:w-8 h-px bg-border flex-shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <Card className="w-full">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-2">
                {React.createElement(activeStep.icon, {
                  className: "h-5 w-5",
                })}
                {activeStep.title}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Temel proje bilgilerini girin"}
                {currentStep === 2 &&
                  "Tesis bilgilerini ve onay tarihlerini girin"}
                {currentStep === 3 && "Proje notlarını ekleyin"}
                {currentStep === 4 && "Özet bilgileri ve genel verileri girin"}
                {currentStep === 5 &&
                  "Tüm bilgilerin önizlemesini görüntüleyin"}
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-8">{renderStepContent()}</CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 max-w-6xl mx-auto">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Önceki
            </Button>

            <Button
              variant="ghost"
              className="mx-2"
              onClick={() => router.back()}
            >
              Vazgeç
            </Button>

            {currentStep === steps.length ? (
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="gap-2 min-w-[120px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Kaydet
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={handleNext} className="gap-2">
                Sonraki
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Button>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

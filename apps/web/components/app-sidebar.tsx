"use client";

import * as React from "react";
import {
  LifeBuoy,
  Bell,
  LayoutDashboard,
  Settings2,
  Archive,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { NavSecondary } from "@/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@workspace/ui/components/sidebar";
import { useProjectSelection } from "@/hooks/use-project-selection";

// Genel menü öğeleri (proje seçili değilken)
const generalNav = [
  {
    title: "Yönetim Paneli",
    url: "/",
    icon: LayoutDashboard,
    isActive: true,
    items: [{ title: "Genel Görünüm", url: "/" }],
  },
  {
    title: "Duyurular",
    url: "/announcements",
    icon: Bell,
    items: [{ title: "Tüm Duyurular", url: "/announcements" }],
  },
  {
    title: "Tanımlamalar",
    url: "/definitions",
    icon: Settings2,
    items: [{ title: "Genel Tanımlar", url: "/definitions" }],
  },
  {
    title: "Hata Logları",
    url: "/error-logs",
    icon: SquareTerminal,
    items: [{ title: "Sistem Hataları", url: "/error-logs" }],
  },
  {
    title: "Parametre Yönetimi",
    url: "/parameters",
    icon: Settings2,
    items: [{ title: "Parametreler", url: "/parameters" }],
  },
  {
    title: "Arşiv",
    url: "/archive",
    icon: Archive,
    items: [{ title: "Arşiv", url: "/archive" }],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { selectedProject } = useProjectSelection();

  // Proje seçili olduğunda gösterilecek proje özel menü
  const projectNav = React.useMemo(() => {
    if (!selectedProject) return [];
    return [
      {
        title: "Proje Panosu",
        url: "#",
        icon: LayoutDashboard,
        items: [
          { title: "Genel", url: "#" },
          { title: "Aktiviteler", url: "#" },
        ],
      },
      {
        title: "Ödemeler",
        url: "#",
        icon: SquareTerminal,
        items: [
          { title: "Toplam Ödeme", url: "#" },
          { title: "Yıl İçinde Tamamlanan", url: "#" },
          { title: "Bekleyen Ödeme", url: "#" },
        ],
      },
      {
        title: "Raporlar",
        url: "#",
        icon: SquareTerminal,
        items: [
          { title: "Genel Raporlar", url: "#" },
          { title: "Detaylı Raporlar", url: "#" },
        ],
      },
      {
        title: "Parametreler",
        url: "#",
        icon: Settings2,
        items: [{ title: "Proje Parametreleri", url: "#" }],
      },
      {
        title: "Hata Logları",
        url: "#",
        icon: SquareTerminal,
        items: [{ title: "Proje Hataları", url: "#" }],
      },
      {
        title: "Arşiv",
        url: "#",
        icon: Archive,
        items: [{ title: "Proje Arşivi", url: "#" }],
      },
    ];
  }, [selectedProject]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <LayoutDashboard className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Kamulaştırma</span>
                  <span className="truncate text-xs">
                    SUKI Genel Müdürlüğü
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={generalNav} />
        {selectedProject && (
          <div className="animate-in fade-in-0 slide-in-from-top-1 duration-300">
            <NavMain items={projectNav} />
          </div>
        )}
        <NavSecondary
          items={[
            { title: "Destek", url: "#", icon: LifeBuoy },
            { title: "Geri Bildirim", url: "#", icon: Bell },
          ]}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: "Barış Arıburnu",
            email: "barisariburnu@gmail.com",
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

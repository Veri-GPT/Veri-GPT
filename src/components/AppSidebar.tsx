
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { 
  File, 
  BarChart, 
  FileText, 
  MessageSquare, 
  RefreshCcw, 
  Wrench, 
  Home, 
  BookOpen,
  HelpCircle
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";

/**
 * Ana kenar çubuğu bileşeni
 * Kullanıcıların uygulamada gezinebileceği ana menüyü sağlar
 */
export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Sistemi sıfırlama fonksiyonu - oturum verilerini temizler
  const handleReset = () => {
    sessionStorage.removeItem('fileData');
    toast.success("Sistem sıfırlandı");
    navigate('/');
  };

  // Ana menü öğeleri - kullanıcının erişebileceği temel sayfalar
  const mainMenuItems = [
    {
      title: "Ana Sayfa",
      icon: Home,
      path: "/",
    },
    {
      title: "Veri Yükle",
      icon: File,
      path: "/upload",
    },
    {
      title: "Veri Önizleme",
      icon: FileText,
      path: "/preview",
    },
    {
      title: "Veri Sohbeti",
      icon: MessageSquare,
      path: "/chat",
    },
    {
      title: "Görselleştirme",
      icon: BarChart,
      path: "/visualize",
    },
  ];
  
  // Diğer menü öğeleri - yardımcı sayfalar
  const otherMenuItems = [
    {
      title: "Dokümantasyon",
      icon: BookOpen,
      path: "/docs",
    },
    {
      title: "Geliştirici",
      icon: Wrench,
      path: "/developer",
    },
  ];

  // Aktif sayfa kontrolü - menüde hangi sayfanın aktif olduğunu belirler
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar variant="inset" className="border-r animate-slide-in">
      {/* Kenar çubuğu başlığı */}
      <SidebarHeader className="px-4 py-6">
        <div onClick={() => navigate('/')} className="cursor-pointer">
          <div className="flex items-center space-x-2">
            <div className="bg-primary w-8 h-8 rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold">V</span>
            </div>
            <h1 className="text-2xl font-bold text-sidebar-foreground">VeriGPT</h1>
          </div>
          <p className="text-xs text-sidebar-foreground/70 mt-1">Veri Analiz Platformu</p>
        </div>
      </SidebarHeader>
      
      {/* Kenar çubuğu içeriği */}
      <SidebarContent className="px-2">
        <SidebarGroup>
          {/* Yeni analiz başlatma butonu */}
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleReset}
              className="flex items-center space-x-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:bg-primary/90 w-full px-3 py-4 mb-3 rounded-lg shadow-md transition-all hover:shadow-lg"
            >
              <RefreshCcw className="h-5 w-5" />
              <span className="font-bold">Yeni Analiz Başlat</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarGroupLabel>Gezinti</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={isActive(item.path) ? "bg-sidebar-accent/20 text-sidebar-accent" : ""}
                  >
                    <a 
                      href={item.path} 
                      className="flex items-center space-x-2 transition-all hover:bg-sidebar-accent/10"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.path);
                      }}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Diğer menü bölümü */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel>Diğer</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {otherMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={isActive(item.path) ? "bg-sidebar-accent/20 text-sidebar-accent" : ""}
                  >
                    <a 
                      href={item.path} 
                      className="flex items-center space-x-2 transition-all hover:bg-sidebar-accent/10"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.path);
                      }}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {/* Yardım butonu */}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  onClick={() => {
                    toast.info("Yardım merkezine hoş geldiniz! Şu anda bu özellik geliştirilme aşamasındadır.", {
                      description: "Sorularınızı şimdilik dokümantasyon sayfasında yanıtları bulabilirsiniz.",
                      action: {
                        label: "Dokümantasyon",
                        onClick: () => navigate("/docs")
                      }
                    });
                  }}
                >
                  <Button variant="ghost" className="flex items-center justify-start space-x-2 transition-all hover:bg-sidebar-accent/10 w-full">
                    <HelpCircle className="h-5 w-5" />
                    <span>Yardım</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      {/* Kenar çubuğu alt bilgisi */}
      <SidebarFooter className="px-4 py-4">
        <div className="flex items-center justify-center">
          <span className="text-sm text-sidebar-foreground/70">VeriGPT v1.0.0</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

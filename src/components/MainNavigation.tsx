
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ArrowRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

/**
 * Ana navigasyon bileşeni
 * Uygulama genelindeki temel menü yapısını sağlar
 * Animasyonlu kaydırma ve hızlı başlangıç özelliklerini içerir
 */
export function MainNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  // Yumuşak kaydırma fonksiyonu - belirtilen bölüme animasyonlu geçiş yapar
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  // Ana sayfada değilken direkt bölümlere gitme fonksiyonu
  const navigateToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // Ana sayfaya git ve ardından bölüme kaydır
      navigate('/');
      // Sayfa yüklendikten sonra kaydırma işlemini gerçekleştir
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      // Zaten ana sayfadaysak direkt kaydır
      scrollToSection(sectionId);
    }
  };

  // Menü öğeleri konfigürasyonu - her öğenin hedef bölümü tanımlanmış
  const menuItems = [
    { 
      title: "Ana Sayfa", 
      action: () => navigate("/"),
      description: "VeriGPT ana sayfa",
      isHome: true
    },
    { 
      title: "Temel Özellikler", 
      action: () => navigateToSection("features"),
      description: "Platform özellikleri",
      isHome: false
    },
    { 
      title: "Nasıl Çalışır", 
      action: () => navigateToSection("how-it-works"),
      description: "Kullanım kılavuzu",
      isHome: false
    },
    { 
      title: "Dokümantasyon", 
      action: () => navigate("/docs"),
      description: "Teknik dokümantasyon",
      isHome: false
    }
  ];

  // Aktif menü öğesini belirleme algoritması
  const getActiveMenuItem = () => {
    if (location.pathname === '/docs') return "Dokümantasyon";
    if (location.pathname === '/') return "Ana Sayfa";
    return "";
  };

  const activeMenuItem = getActiveMenuItem();

  return (
    <div className="fixed w-full h-16 bg-background/95 backdrop-blur-md z-50 border-b">
      <div className="container max-w-7xl h-full flex items-center justify-between">
        {/* Logo ve marka adı */}
        <Link to="/" className="flex items-center gap-2 font-semibold hover:scale-105 transition-transform duration-200">
          <div className="bg-primary w-8 h-8 rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold">V</span>
          </div>
          <span className="text-xl">VeriGPT</span>
        </Link>
        
        {/* Masaüstü navigasyon menüsü */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {menuItems.map((item) => (
            <button 
              key={item.title} 
              onClick={item.action}
              className={`hover:text-primary transition-all duration-300 hover:scale-105 relative group ${
                activeMenuItem === item.title ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.title}
              {/* Aktif menü göstergesi */}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                activeMenuItem === item.title ? "w-full" : ""
              }`}></span>
            </button>
          ))}
        </nav>

        {/* Hemen Başlayın butonu ve mobil menü */}
        <div className="flex items-center gap-4">
          {/* Hemen Başlayın butonu - masaüstünde görünür */}
          <Button 
            onClick={() => navigate('/upload')} 
            className="hidden md:flex bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all hover:scale-105"
            size="sm"
          >
            Hemen Başlayın
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>

          {/* Mobil menü */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="hover:scale-105 transition-transform">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-sm">
              <SheetHeader>
                <SheetTitle>VeriGPT</SheetTitle>
                <SheetDescription>
                  Menüye buradan ulaşabilirsiniz.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {menuItems.map((item) => (
                  <button 
                    key={item.title} 
                    onClick={item.action}
                    className={`hover:text-primary transition-colors block py-2 text-left hover:bg-accent/50 rounded-md px-2 ${
                      activeMenuItem === item.title ? "text-primary bg-accent/30" : "text-muted-foreground"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
                
                {/* Mobil Hemen Başlayın butonu */}
                <Button 
                  onClick={() => navigate('/upload')} 
                  className="mt-4 w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all"
                >
                  Hemen Başlayın
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}


import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainNavigation } from "@/components/MainNavigation";
import { 
  BarChart, 
  FileText, 
  MessageSquare, 
  Upload, 
  ArrowRight, 
  Layers, 
  Shield, 
  Code, 
  Zap,
  Github,
  ChevronDown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const Landing = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <MainNavigation />
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-0 bg-blue-500 w-96 h-96 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 bg-purple-500 w-96 h-96 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 animate-fade-in" variant="outline">VeriGPT v1.0.0</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Verilerinizi Anlamlandırın
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 animate-fade-in">
              VeriGPT, veri analizi ve görselleştirme süreçlerini basitleştirmek için geliştirilmiş açık kaynaklı yapay zeka destekli bir platformdur.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in mb-8">
              <Button 
                onClick={() => navigate('/upload')} 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition-all transform hover:scale-105"
              >
                Hemen Deneyin
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => navigate('/docs')} 
                variant="outline" 
                size="lg"
                className="hover:scale-105 transition-all"
              >
                Dokümantasyon
              </Button>
            </div>

            <Button
              variant="ghost"
              onClick={() => scrollToSection('features')}
              className="animate-bounce"
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="bg-slate-800/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Temel Özellikler</h2>
            <p className="text-slate-300 max-w-2xl mx-auto animate-fade-in">
              VeriGPT ile verilerinizi yükleyin, sorular sorun ve anlamlandırın.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Upload className="h-5 w-5" />,
                title: "Kolay Veri Yükleme",
                description: "CSV ve Excel dosyalarını kolayca yükleyin ve analiz edin.",
                color: "blue",
                href: "/upload"
              },
              {
                icon: <FileText className="h-5 w-5" />,
                title: "Veri Önizleme",
                description: "Verilerinizi hızlıca analiz edin ve önizleyin.",
                color: "purple",
                href: "/preview"
              },
              {
                icon: <MessageSquare className="h-5 w-5" />,
                title: "Veri Sohbeti",
                description: "Yapay zeka ile verileriniz hakkında sorular sorun.",
                color: "pink",
                href: "/chat"
              },
              {
                icon: <BarChart className="h-5 w-5" />,
                title: "Görselleştirme",
                description: "Detaylı grafik ve görselleştirmeler oluşturun.",
                color: "green",
                href: "/visualize"
              }
            ].map((feature, index) => (
              <Card 
                key={index}
                className={`bg-slate-800 border-slate-700 overflow-hidden group hover:border-${feature.color}-500 transition-all duration-300 animate-fade-in hover:scale-105`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-1 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600`}></div>
                <CardContent className="p-6">
                  <div className={`mb-4 rounded-full bg-${feature.color}-500/10 w-12 h-12 flex items-center justify-center text-${feature.color}-400 group-hover:text-${feature.color}-300 transition-colors`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    variant="ghost" 
                    className={`group-hover:text-${feature.color}-400 transition-colors p-0`} 
                    onClick={() => navigate(feature.href)}
                  >
                    <span>Deneyin</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Nasıl Çalışır?</h2>
            <p className="text-slate-300 max-w-2xl mx-auto animate-fade-in">
              VeriGPT, veri analizi sürecinizi 4 basit adımda kolaylaştırır.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "1",
                title: "Veri Yükleme",
                description: "CSV veya Excel dosyanızı sürükleyip bırakın veya dosya gezgininden seçin.",
                color: "blue"
              },
              {
                number: "2", 
                title: "Veri Önizleme",
                description: "Yüklenen verilerin otomatik önizlemesini görüntüleyin ve kontrol edin.",
                color: "purple"
              },
              {
                number: "3",
                title: "Analiz ve Sohbet", 
                description: "Verilerinizle ilgili soruları doğal dil ile sorun.",
                color: "pink"
              },
              {
                number: "4",
                title: "Görselleştirme",
                description: "Analizlerinizi çeşitli grafik türleriyle görselleştirin.",
                color: "green"
              }
            ].map((step, index) => (
              <div 
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`bg-${step.color}-500/10 text-${step.color}-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold transition-all hover:scale-110`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Open Source Banner */}
      <section className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Açık Kaynaklı ve Ücretsiz</h2>
              <p className="text-slate-300 mb-4 animate-fade-in">
                VeriGPT tamamen açık kaynak kodludur ve MIT lisansı altında ücretsiz olarak sunulur. 
                Eğitim ve araştırma amaçlı kullanım için tasarlanmıştır.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in">
                <a
                  href="https://github.com/Veri-GPT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <Button variant="outline" className="gap-2 hover:scale-105 transition-all">
                    <Github className="h-5 w-5" />
                    GitHub'da Görüntüle
                  </Button>
                </a>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/docs')}
                  className="hover:scale-105 transition-all"
                >
                  Dokümantasyon
                </Button>
              </div>
            </div>
            
            <div className="lg:w-1/3 flex justify-center">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Layers className="h-8 w-8" />, text: "Modüler Tasarım", color: "blue" },
                  { icon: <Shield className="h-8 w-8" />, text: "Güvenli", color: "green" },
                  { icon: <Code className="h-8 w-8" />, text: "Özelleştirilebilir", color: "purple" },
                  { icon: <Zap className="h-8 w-8" />, text: "Hızlı", color: "yellow" }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={`bg-slate-800/60 p-4 rounded-lg flex flex-col items-center text-center animate-float hover:bg-slate-700/60 transition-all cursor-pointer`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className={`text-${item.color}-400 mb-2`}>
                      {item.icon}
                    </div>
                    <span className="text-sm text-slate-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Hemen Başlayın</h2>
            <p className="text-slate-300 mb-8 animate-fade-in">
              Verilerinizi yükleyin, analiz edin ve görselleştirin. Yapay zeka destekli veri analizi deneyimini keşfedin.
            </p>
            <Button 
              onClick={() => navigate('/upload')} 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 animate-pulse-soft transition-all hover:scale-110"
            >
              Şimdi Deneyin
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-800/80 py-8 border-t border-slate-700/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-primary w-8 h-8 rounded-md flex items-center justify-center mr-2">
                <span className="text-primary-foreground font-bold">V</span>
              </div>
              <span className="text-lg font-bold">VeriGPT</span>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-2">
              <a href="/docs" className="text-slate-300 hover:text-white transition-colors">Dokümantasyon</a>
              <a href="https://github.com/Veri-GPT/Veri-GPT" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">GitHub</a>
              <a href="/upload" className="text-slate-300 hover:text-white transition-colors">Başlayın</a>
            </div>
          </div>
          
          <div className="border-t border-slate-700/50 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} VeriGPT. MIT Lisansı ile açık kaynak olarak sunulmuştur.
            </p>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm">Gizlilik Politikası</a>
              <a href="/terms" className="text-slate-400 hover:text-white transition-colors text-sm">Kullanım Koşulları</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

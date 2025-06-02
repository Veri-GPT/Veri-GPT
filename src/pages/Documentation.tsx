
import { useState } from "react";
import { MainNavigation } from "@/components/MainNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Book, 
  Code, 
  FileText, 
  Terminal, 
  Database,
  Github,
  ChevronRight,
  CheckCircle2,
  MessageSquare,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Documentation() {
  const [activeSection, setActiveSection] = useState("giris");

  const sidebarItems = [
    { id: "giris", title: "Giriş", icon: <Book className="h-4 w-4" /> },
    { id: "nedir", title: "Nedir?", icon: <FileText className="h-4 w-4" /> },
    { id: "ozellikler", title: "Özellikler", icon: <Database className="h-4 w-4" /> },
    { id: "baslangic", title: "Başlangıç", icon: <Terminal className="h-4 w-4" /> },
    { id: "sss", title: "SSS", icon: <MessageSquare className="h-4 w-4" /> }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      <MainNavigation />
      
      {/* Header */}
      <div className="bg-slate-800/70 pt-28 pb-6 border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2">
            <Book className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">VeriGPT Dokümantasyon</h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mt-6">
            <p className="text-slate-300 mb-4 md:mb-0">
              Kapsamlı kullanım kılavuzu ve geliştirici dokümantasyonu
            </p>
            
            <div className="flex items-center space-x-2">
              <a href="https://github.com/Veri-GPT" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2">
                  <Github className="h-4 w-4" />
                  <span className="hidden md:inline">GitHub'da Görüntüle</span>
                  <span className="inline md:hidden">GitHub</span>
                </Button>
              </a>
              <Link to="/upload">
                <Button size="sm" className="gap-1">
                  Hemen Deneyin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="baslangic">
          <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-3 h-auto gap-2 bg-transparent">
            <TabsTrigger value="baslangic" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <FileText className="h-4 w-4 mr-2" />
              Başlangıç
            </TabsTrigger>
            <TabsTrigger value="kurulum" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Terminal className="h-4 w-4 mr-2" />
              Kurulum
            </TabsTrigger>
            <TabsTrigger value="gelistirici" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Code className="h-4 w-4 mr-2" />
              Geliştirici
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="baslangic">
              <div className="grid md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="md:col-span-1">
                  <Card className="bg-slate-800 border-slate-700 sticky top-4">
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-4">İçindekiler</h3>
                      <nav>
                        <ul className="space-y-1">
                          {sidebarItems.map((item) => (
                            <li key={item.id}>
                              <button
                                onClick={() => scrollToSection(item.id)}
                                className={`w-full text-left flex items-center gap-2 py-2 px-3 rounded-md text-sm transition-all duration-200 ${
                                  activeSection === item.id
                                    ? "bg-primary/20 text-primary transform scale-105" 
                                    : "hover:bg-slate-700/50 text-gray-300 hover:text-white hover:translate-x-1"
                                }`}
                              >
                                {item.icon}
                                {item.title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Main content */}
                <div className="md:col-span-3">
                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-6">
                      <section id="giris" className="mb-8 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4">VeriGPT Dokümantasyonu</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                          VeriGPT, CSV ve Excel verilerini analiz etmek, görselleştirmek ve anlamlandırmak için tasarlanmış açık kaynak bir yapay zeka aracıdır. 
                          Bu dokümantasyon, VeriGPT'yi nasıl kuracağınızı, kullanacağınızı ve kendi projelerinize entegre edeceğinizi öğrenmenize yardımcı olacaktır.
                        </p>
                        <div className="flex items-center gap-2 bg-blue-500/10 text-blue-400 p-3 rounded-md border border-blue-500/20">
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                          <p className="text-sm">
                            <strong>Son Güncelleme:</strong> Haziran 2025 - VeriGPT v1.0.0 sürümüne göre hazırlanmıştır
                          </p>
                        </div>
                      </section>

                      <Separator className="my-6 bg-slate-700" />
                      
                      <section id="nedir" className="mb-8 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4">VeriGPT Nedir?</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                          VeriGPT, veri analizi ve görselleştirme sürecini basitleştiren açık kaynaklı bir yapay zeka aracıdır. 
                          Kullanıcılar CSV veya Excel dosyalarını platforma yükleyebilir, yapay zeka ile veri hakkında sohbet edebilir ve 
                          anlamlı görselleştirmeler oluşturabilirler.
                        </p>
                        <p className="text-gray-300 leading-relaxed mb-4">
                          VeriGPT, Gemini AI motorunu kullanarak verilerinizi anlamlandırır ve doğal dil sorguları ile 
                          karmaşık analizleri kolayca gerçekleştirmenize olanak tanır.
                        </p>
                        
                        <h3 className="text-xl font-bold mt-6 mb-3">Desteklenen Dosya Türleri:</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-300">
                          <li>CSV (.csv)</li>
                          <li>Microsoft Excel (.xlsx, .xls)</li>
                          
                        </ul>
                      </section>

                      <Separator className="my-6 bg-slate-700" />
                      
                      <section id="ozellikler" className="mb-8 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4">Temel Özellikler</h2>
                        
                        <div className="space-y-4">
                          <div className="bg-slate-700/30 p-4 rounded-md border border-slate-700 hover:border-primary/50 transition-all">
                            <h3 className="text-lg font-bold mb-2 flex items-center">
                              <Database className="h-5 w-5 mr-2 text-primary" />
                              Veri Yükleme ve Önizleme
                            </h3>
                            <p className="text-gray-300">
                              Sürükle-bırak arayüzü ile veri yükleme, otomatik sütun algılama ve veri tipi belirleme, 
                              anlamlı veri önizlemeleri oluşturma.
                            </p>
                          </div>

                          <div className="bg-slate-700/30 p-4 rounded-md border border-slate-700 hover:border-primary/50 transition-all">
                            <h3 className="text-lg font-bold mb-2 flex items-center">
                              <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                              Yapay Zeka Sohbeti
                            </h3>
                            <p className="text-gray-300">
                              Gemini AI ile verileriniz hakkında sorular sorun, doğal dil ile karmaşık analiz görevlerini tamamlayın, 
                              verilerdeki anomalileri ve trendleri keşfedin.
                            </p>
                          </div>

                          <div className="bg-slate-700/30 p-4 rounded-md border border-slate-700 hover:border-primary/50 transition-all">
                            <h3 className="text-lg font-bold mb-2 flex items-center">
                              <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                              Veri Görselleştirme
                            </h3>
                            <p className="text-gray-300">
                              Çubuk grafikleri, pasta grafikleri, çizgi grafikleri, dağılım grafikleri ve daha fazlasını otomatik olarak oluşturun, 
                              grafik yapılandırmalarını özelleştirin, görselleştirmeleri dışa aktarın ve paylaşın.
                            </p>
                          </div>
                        </div>
                      </section>

                      <Separator className="my-6 bg-slate-700" />
                      
                      <section id="baslangic" className="mb-8 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4">Hızlı Başlangıç</h2>
                        
                        <div className="bg-slate-700/30 p-4 rounded-md border border-slate-700 mb-4">
                          <h3 className="text-lg font-bold mb-2">Web Uygulaması</h3>
                          <p className="text-gray-300 mb-3">
                            VeriGPT'yi hemen kullanmaya başlamak için:
                          </p>
                          <ol className="list-decimal list-inside space-y-2 text-gray-300">
                            <li>Ana sayfadaki "Hemen Deneyin" butonuna tıklayın</li>
                            <li>CSV veya Excel dosyanızı yükleyin</li>
                            <li>Verilerin önizlemesini kontrol edin</li>
                            <li>Yapay zeka sohbeti veya görselleştirme sayfasına geçiş yapın</li>
                          </ol>
                          <div className="mt-4">
                            <Link to="/upload">
                              <Button size="sm" className="hover:scale-105 transition-all">
                                Uygulamayı Başlat
                                <ChevronRight className="ml-1 h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                        
                        <div className="bg-slate-700/30 p-4 rounded-md border border-slate-700">
                          <h3 className="text-lg font-bold mb-2">Yerel Kurulum</h3>
                          <p className="text-gray-300 mb-3">
                            VeriGPT'yi kendi bilgisayarınızda çalıştırmak için:
                          </p>
                          <div className="bg-slate-800 p-3 rounded-md overflow-x-auto mb-4">
                            <pre className="text-sm">
                              <code className="text-gray-300">
                                <span className="text-blue-400"># Depoyu klonlayın</span>{"\n"}
                                git clone https://github.com/Veri-GPT/Veri-GPT{"\n"}
                                cd verigpt{"\n\n"}
                                <span className="text-blue-400"># Bağımlılıkları yükleyin</span>{"\n"}
                                npm install{"\n\n"}
                                <span className="text-blue-400"># Uygulamayı başlatın</span>{"\n"}
                                npm run dev
                              </code>
                            </pre>
                          </div>
                          <p className="text-gray-300">
                            Daha detaylı bilgi için "Kurulum" sekmesine bakın.
                          </p>
                        </div>
                      </section>

                      <Separator className="my-6 bg-slate-700" />
                      
                      <section id="sss" className="mb-4 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4">Sıkça Sorulan Sorular</h2>
                        
                        <div className="space-y-4">
                          {[
                            {
                              question: "VeriGPT tamamen ücretsiz mi?",
                              answer: "Evet, VeriGPT tamamen açık kaynak ve ücretsizdir. MIT lisansı altında sunulmaktadır ve eğitim ile araştırma amaçlı kullanıma açıktır."
                            },
                            {
                              question: "Ne kadar büyüklükte dosyalar yükleyebilirim?",
                              answer: "Web sürümünde 10MB'a kadar dosya yükleyebilirsiniz. Daha büyük dosyalar için yerel kurulum yapmanız önerilir."
                            },
                            {
                              question: "Yüklenen verilerimin gizliliği nasıl sağlanıyor?",
                              answer: "Yüklenen veriler sadece tarayıcınızda işlenir ve sunuculara kaydedilmez. Tüm analizler tarayıcınızda çalışan JavaScript ile gerçekleştirilir."
                            },
                            {
                              question: "VeriGPT'yi kendi projem içinde kullanabilir miyim?",
                              answer: "Evet, VeriGPT'yi kendi projenizde eğitim ve araştırma amaçlı kullanabilirsiniz. Ticari kullanım için kullanım koşullarına bakın."
                            }
                          ].map((faq, i) => (
                            <div key={i} className="bg-slate-700/30 p-4 rounded-md border border-slate-700 hover:border-primary/50 transition-all">
                              <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                              <p className="text-gray-300">{faq.answer}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="kurulum">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Kurulum Kılavuzu</h2>
                  
                  <div className="space-y-6">
                    <section className="animate-fade-in">
                      <h3 className="text-xl font-bold mb-4">Sistem Gereksinimleri</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-300">
                        <li>Node.js 16.x veya üstü</li>
                        <li>npm 8.x veya yarn 1.22.x</li>
                        <li>Modern bir web tarayıcısı (Chrome, Firefox, Safari, Edge)</li>
                      </ul>
                    </section>
                    
                    <Separator className="bg-slate-700" />
                    
                    <section className="animate-fade-in">
                      <h3 className="text-xl font-bold mb-4">Adım Adım Kurulum</h3>
                      <div className="space-y-4">
                        <div className="bg-slate-700/30 p-4 rounded-md">
                          <h4 className="font-bold mb-2">1. Repository'yi Klonlayın</h4>
                          <div className="bg-slate-800 p-3 rounded-md">
                            <code className="text-green-400">git clone https://github.com/verigpt/verigpt.git</code>
                          </div>
                        </div>
                        
                        <div className="bg-slate-700/30 p-4 rounded-md">
                          <h4 className="font-bold mb-2">2. Klasöre Geçin</h4>
                          <div className="bg-slate-800 p-3 rounded-md">
                            <code className="text-green-400">cd verigpt</code>
                          </div>
                        </div>
                        
                        <div className="bg-slate-700/30 p-4 rounded-md">
                          <h4 className="font-bold mb-2">3. Bağımlılıkları Yükleyin</h4>
                          <div className="bg-slate-800 p-3 rounded-md">
                            <code className="text-green-400">npm install</code>
                          </div>
                        </div>
                        
                        <div className="bg-slate-700/30 p-4 rounded-md">
                          <h4 className="font-bold mb-2">4. Uygulamayı Başlatın</h4>
                          <div className="bg-slate-800 p-3 rounded-md">
                            <code className="text-green-400">npm run dev</code>
                          </div>
                          <p className="text-sm text-gray-400 mt-2">
                            Uygulama http://localhost:5173 adresinde çalışacaktır.
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="gelistirici">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Geliştirici Kılavuzu</h2>
                  
                  <div className="space-y-6">
                    <section className="animate-fade-in">
                      <h3 className="text-xl font-bold mb-4">Teknoloji Stack</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-700/30 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Frontend</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>React 18</li>
                            <li>TypeScript</li>
                            <li>Vite</li>
                            <li>Tailwind CSS</li>
                            <li>Shadcn/ui</li>
                          </ul>
                        </div>
                        
                        <div className="bg-slate-700/30 p-4 rounded-md">
                          <h4 className="font-bold mb-2">Özellikler</h4>
                          <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>CSV/Excel Parser</li>
                            <li>Data Visualization</li>
                            <li>AI Chat Integration</li>
                            <li>Responsive Design</li>
                          </ul>
                        </div>
                      </div>
                    </section>
                    
                    <Separator className="bg-slate-700" />
                    
                    <section className="animate-fade-in">
                      <h3 className="text-xl font-bold mb-4">Katkıda Bulunma</h3>
                      <p className="text-gray-300 mb-4">
                        VeriGPT açık kaynak bir projedir ve katkılarınızı memnuniyetle karşılarız:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-300">
                        <li>Repository'yi fork edin</li>
                        <li>Feature branch oluşturun</li>
                        <li>Değişikliklerinizi commit edin</li>
                        <li>Pull request gönderin</li>
                      </ol>
                    </section>
                    
                    <section className="animate-fade-in">
                      <h3 className="text-xl font-bold mb-4">Lisans</h3>
                      <div className="bg-slate-700/30 p-4 rounded-md">
                        <p className="text-gray-300">
                          VeriGPT MIT lisansı altında yayınlanmıştır. Bu yazılım yalnızca eğitim ve araştırma amaçlı kullanım için tasarlanmıştır.
                          Ticari kullanım yasaktır.
                        </p>
                      </div>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

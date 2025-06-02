
import { MainNavigation } from "@/components/MainNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, AlertTriangle, Info } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <MainNavigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <FileText className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Kullanım Koşulları</h1>
            <p className="text-slate-300 text-lg">
              VeriGPT kullanım şartları ve koşulları
            </p>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-md mb-8">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-red-400 mb-2">Ticari Kullanım Yasağı</h3>
                <p className="text-red-300">
                  Bu yazılım yalnızca eğitim, araştırma ve kişisel kullanım amaçlıdır. 
                  Ticari amaçlarla kullanılması kesinlikle yasaktır.
                </p>
              </div>
            </div>
          </div>

          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardContent className="p-8">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold mb-4">Kabul Edilen Kullanım</h2>
                  <div className="space-y-4 text-slate-300">
                    <p>VeriGPT aşağıdaki amaçlar için kullanılabilir:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Eğitim amaçlı veri analizi öğrenme</li>
                      <li>Akademik araştırma projelerinde veri görselleştirme</li>
                      <li>Kişisel veri analizi ve öğrenme</li>
                      <li>Açık kaynak proje geliştirme</li>
                      <li>Nonprofit organizasyonlarda veri analizi</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Yasak Kullanımlar</h2>
                  <div className="space-y-4 text-slate-300">
                    <p>VeriGPT aşağıdaki amaçlar için kullanılamaz:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Ticari kar amacı güden faaliyetler</li>
                      <li>Ücretli danışmanlık hizmetleri</li>
                      <li>Kurumsal veri analiz hizmetleri satışı</li>
                      <li>Lisanslı yazılım olarak yeniden dağıtım</li>
                      <li>Telif hakkı ihlali yapan içerik üretimi</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Sorumluluk Reddi</h2>
                  <div className="space-y-4 text-slate-300">
                    <p>
                      VeriGPT "olduğu gibi" sunulmaktadır. Kullanımdan doğabilecek:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Veri kaybı</li>
                      <li>Yanlış analiz sonuçları</li>
                      <li>Sistem arızaları</li>
                      <li>Güvenlik açıkları</li>
                    </ul>
                    <p>gibi durumlardan geliştirici ekibi sorumlu tutulamaz.</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Açık Kaynak Lisansı</h2>
                  <div className="space-y-4 text-slate-300">
                    <p>
                      VeriGPT MIT lisansı altında yayınlanmıştır ancak ticari kullanım 
                      bu koşullar ile kısıtlanmıştır. Kaynak kodu inceleyebilir, 
                      geliştirebilir ve non-ticari projelerinizde kullanabilirsiniz.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Değişiklikler</h2>
                  <p className="text-slate-300">
                    Bu kullanım koşulları önceden haber verilmeksizin güncellenebilir. 
                    Güncel koşulları düzenli olarak kontrol etmeniz önerilir.
                  </p>
                </section>

                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-md">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-blue-400 text-sm">
                      <strong>İletişim:</strong> Sorularınız için GitHub repository'miz üzerinden issue açabilirsiniz.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

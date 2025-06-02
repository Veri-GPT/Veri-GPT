
import { MainNavigation } from "@/components/MainNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, FileText, AlertTriangle } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <MainNavigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Gizlilik Politikası</h1>
            <p className="text-slate-300 text-lg">
              VeriGPT verilerinizin gizliliğini korur ve şeffaflığı sağlar
            </p>
          </div>

          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardContent className="p-8">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-primary" />
                    Veri Toplama ve İşleme
                  </h2>
                  <div className="space-y-4 text-slate-300">
                    <p>
                      VeriGPT, veri analizinizi kolaylaştırmak için tasarlanmıştır. Platformumuz:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Yüklediğiniz CSV ve Excel dosyalarını yalnızca tarayıcınızda işler</li>
                      <li>Verilerinizi sunucularımızda saklamaz veya üçüncü taraflarla paylaşmaz</li>
                      <li>Tüm analiz işlemleri yerel olarak gerçekleştirilir</li>
                      <li>Oturum sonlandırıldığında tüm veriler otomatik olarak silinir</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Çerezler ve Yerel Depolama</h2>
                  <div className="space-y-4 text-slate-300">
                    <p>
                      Kullanıcı deneyimini iyileştirmek için minimal düzeyde yerel depolama kullanırız:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Tema tercihinizi hatırlamak için</li>
                      <li>Dil ayarlarınızı kaydetmek için</li>
                      <li>Uygulama performansını optimize etmek için</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Güvenlik</h2>
                  <div className="space-y-4 text-slate-300">
                    <p>
                      Verilerinizin güvenliği bizim önceliğimizdir:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>HTTPS şifrelemesi ile güvenli veri aktarımı</li>
                      <li>Veriler yalnızca tarayıcı belleğinde tutulur</li>
                      <li>Düzenli güvenlik güncellemeleri</li>
                      <li>Açık kaynak kodlu şeffaflık</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">İletişim</h2>
                  <p className="text-slate-300">
                    Gizlilik politikamız hakkında sorularınız için GitHub repository'miz üzerinden iletişime geçebilirsiniz.
                  </p>
                </section>

                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-md">
                  <p className="text-blue-400 text-sm">
                    <strong>Son Güncelleme:</strong> Bu politika 2025 yılında güncellenmiştir ve değişiklikler hakkında bilgilendirileceksiniz.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

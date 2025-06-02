
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Github, Globe } from "lucide-react";

const Developer = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Geliştirici</h1>
          <p className="text-muted-foreground mt-2">
            VeriGPT Hakkında Bilgiler
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>VeriGPT Nedir?</CardTitle>
              <CardDescription>Yapay zeka destekli veri analiz platformu</CardDescription>
            </CardHeader>
            <CardContent>
              <p>VeriGPT, çeşitli veri formatlarını (CSV, Excel) yükleyip analiz etmenize, 
              verilerinizle sohbet etmenize ve interaktif grafikler oluşturmanıza olanak tanıyan masaüstü 
              tarzında geliştirilmiş bir web uygulamasıdır.</p>
              
              <p className="mt-4">Verilerinizi hızlı bir şekilde anlamanıza ve değer çıkarmanıza yardımcı olur.</p>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-4">
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" asChild className="flex gap-2">
                  <a href="https://github.com/Veri-GPT" target="_blank" rel="noreferrer">
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className="flex gap-2">
                  <a href="https://verigpt.netlify.app" target="_blank" rel="noreferrer">
                    <Globe className="h-4 w-4" />
                    Web Sitesi
                  </a>
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>İletişim</CardTitle>
              <CardDescription>Projemizi takip edin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>VP</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">VeriGPT Ekibi</h3>
                  
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-2">
              <Button variant="outline" size="sm" asChild className="w-full flex justify-center gap-2">
                <a href="https://github.com/Veri-GPT" target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sürüm Bilgisi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Sürüm:</span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Son Güncelleme:</span>
                <span>{new Date().toLocaleDateString('tr-TR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Desteklenen Dosya Formatları:</span>
                <span>CSV, Excel</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Developer;

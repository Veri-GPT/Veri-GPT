
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { toast } from "sonner";

/**
 * Sohbet mesajı türü tanımı
 * Kullanıcı ve asistan mesajlarını saklar
 */
interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

/**
 * Dosya verisi türü tanımı
 * CSV/Excel dosyalarından yüklenen veri yapısını saklar
 */
interface FileData {
  headers: string[];
  data: any[][];
  fileName: string;
  rowCount: number;
}

/**
 * Sohbet arayüzü props türü tanımı
 */
interface ChatInterfaceProps {
  fileName?: string;
  isDataLoaded: boolean;
  fileData: FileData | null;
}

/**
 * Mesajlardaki özel formatları HTML'e dönüştürür
 * **kalın** yazıları <strong> etiketleriyle çevreler
 */
const formatMessage = (text: string): string => {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
};

/**
 * Büyük veri setlerinden akıllı örnekler oluşturan algoritma
 * Veri setinin başından, ortasından ve sonundan örnekler alır
 * Sayısal sütunlar için temel istatistikleri hesaplar
 */
const createDataSample = (fileData: FileData | null): string => {
  if (!fileData) return '';
  
  const { headers, data, fileName, rowCount } = fileData;
  
  // Veri meta bilgilerini hazırla
  let dataContext = `Dosya: ${fileName}\nToplam satır: ${rowCount}\nSütunlar: ${headers.join(', ')}\n`;
  
  // Akıllı örnekleme algoritması
  const sampleSize = Math.min(5, rowCount);
  const firstRows = data.slice(0, sampleSize);
  dataContext += `\nİlk ${sampleSize} satır:\n${firstRows.map(row => row.join(', ')).join('\n')}`;
  
  // Büyük veri setleri için orta ve son örnekler
  if (rowCount > 10) {
    const middleIndex = Math.floor(rowCount / 2);
    const middleRows = data.slice(middleIndex - 2, middleIndex + 3);
    dataContext += `\n\nOrta bölümden örnekler:\n${middleRows.map(row => row.join(', ')).join('\n')}`;
    
    const lastRows = data.slice(-sampleSize);
    dataContext += `\n\nSon ${sampleSize} satır:\n${lastRows.map(row => row.join(', ')).join('\n')}`;
  }
  
  return dataContext;
};

/**
 * Ana sohbet arayüzü bileşeni
 * Kullanıcıların veri seti hakkında Gemini AI ile sohbet etmesini sağlar
 */
export function ChatInterface({ fileName, isDataLoaded, fileData }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  /**
   * API anahtarını güvenli şekilde al
   * Önce ortam değişkenlerinden, sonra localStorage'dan kontrol eder
   */
  const getApiKey = (): string => {
       return import.meta.env.VITE_GEMINI_API_KEY;
  };

  /**
   * Mesaj listesinin sonuna otomatik kaydırma algoritması
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Yeni mesaj geldiğinde otomatik kaydırma efekti
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Veri yüklendiğinde hoş geldin mesajı algoritması
  useEffect(() => {
    if (isDataLoaded && fileName && messages.length === 0) {
      const welcomeMessage = `**${fileName}** dosyanız başarıyla analiz edildi. Bu veri seti hakkında istediğiniz soruları sorabilirsiniz.`;
      
      setMessages([
        {
          role: "assistant",
          content: welcomeMessage,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isDataLoaded, fileName, messages.length]);

  /**
   * Ana form gönderme algoritması
   * Kullanıcı mesajını Gemini 2.0 Flash API'sine gönderir
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    if (!isDataLoaded) {
      toast.error("Lütfen önce veri dosyası yükleyin");
      return;
    }
    
    const apiKey = getApiKey();
    if (!apiKey) {
      toast.error("Gemini API anahtarı bulunamadı");
      return;
    }
    
    // Kullanıcı mesajını sisteme ekle
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Veri özetleme algoritmasını çalıştır
      const dataContext = createDataSample(fileData);
      
      // Türkçe sistem promptu oluştur
      const prompt = `Sen uzman bir veri analisti ve bilim insanısın. Kullanıcı "${fileName}" dosyasını yükledi.

Veri analizi:
${dataContext}

Kullanıcı sorusu: ${input}

Lütfen Türkçe yanıt ver ve sadece veri ile ilgili sorulara yanıt ver. Önemli bilgileri **kalın** yaz.`;
      
      // Gemini 2.0 Flash API çağrısı - verdiğiniz curl örneğine göre
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`API Hatası: ${response.status}`);
      }
      
      const data = await response.json();
      
      // API yanıtını çıkar ve doğrula
      const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
        "Üzgünüm, şu anda isteğinizi işleyemiyorum. Lütfen tekrar deneyin.";
      
      // AI yanıtını mesaj listesine ekle
      const aiMessage: Message = {
        role: "assistant",
        content: aiResponseText,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      
    } catch (error) {
      console.error("Gemini API çağrı hatası:", error);
      
      const errorMessage = error instanceof Error ? error.message : "Bilinmeyen hata";
      toast.error(`AI yanıt hatası: ${errorMessage}`);
      
      // Hata mesajını kullanıcıya göster
      const errorResponse: Message = {
        role: "assistant",
        content: "Üzgünüm, şu anda bir teknik sorun yaşıyorum. Lütfen tekrar deneyin.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-8rem)]">
      <CardHeader>
        <CardTitle>AI Veri Analisti</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <p 
                  className="whitespace-pre-wrap leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                />
                <div className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString('tr-TR')}
                </div>
              </div>
            </div>
          ))}
          
          {/* Yükleniyor animasyon algoritması */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg p-4 bg-secondary text-secondary-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  <span className="ml-2 text-sm opacity-70">AI düşünüyor...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      {/* Mesaj giriş alanı */}
      <CardFooter className="pt-4 border-t">
        <form onSubmit={handleSubmit} className="flex w-full items-end gap-2">
          <div className="flex-grow">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isDataLoaded ? "Veri setiniz hakkında soru sorun..." : "Önce veri yükleyin..."}
              disabled={!isDataLoaded || isLoading}
              className="min-h-[60px] resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>
          <Button 
            type="submit" 
            size="icon" 
            disabled={!isDataLoaded || isLoading || !input.trim()}
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

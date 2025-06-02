
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { FileUploader } from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';

// CSV veri işleme fonksiyonu
function parseCSV(text: string) {
  const lines = text.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  const rows = lines.slice(1)
    .filter(line => line.trim() !== '')
    .map(line => line.split(',').map(cell => cell.trim()));
  
  return { headers, data: rows };
}

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const text = e.target?.result as string;
        try {
          const { headers, data } = parseCSV(text);
          
          // Veriyi sessionStorage'da depolayın
          sessionStorage.setItem('fileData', JSON.stringify({ 
            headers, 
            data, 
            fileName: file.name,
            rowCount: data.length
          }));
          
          toast.success("CSV dosyası başarıyla işlendi");
        } catch (error) {
          console.error("CSV ayrıştırma hatası:", error);
          toast.error("CSV dosyası işlenirken hata oluştu");
        }
      };
      
      reader.onerror = () => {
        toast.error("Dosya okuma hatası");
      };
      
      reader.readAsText(file);
    } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          
          // Excel verilerini JSON'a dönüştür
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          if (jsonData && jsonData.length > 0) {
            const headers = jsonData[0] as string[];
            const rows = jsonData.slice(1) as any[][];
            
            // Veriyi sessionStorage'da depola
            sessionStorage.setItem('fileData', JSON.stringify({ 
              headers, 
              data: rows, 
              fileName: file.name,
              rowCount: rows.length
            }));
            
            toast.success("Excel dosyası başarıyla işlendi");
          } else {
            toast.error("Excel dosyası boş veya geçersiz");
          }
        } catch (error) {
          console.error("Excel ayrıştırma hatası:", error);
          toast.error("Excel dosyası işlenirken hata oluştu");
        }
      };
      
      reader.onerror = () => {
        toast.error("Dosya okuma hatası");
      };
      
      reader.readAsBinaryString(file);
    }
  };

  const handleContinue = () => {
    if (uploadedFile) {
      navigate("/preview");
    } else {
      toast.error("Devam etmeden önce lütfen bir dosya yükleyin");
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Veri Yükle</h1>
          <p className="text-muted-foreground mt-2">
            VeriGPT ile veri analizi yapmak için bir CSV veya Excel dosyası yükleyin
          </p>
        </div>
        
        <FileUploader onFileUpload={handleFileUpload} />
        
        {uploadedFile && (
          <div className="flex justify-end">
            <Button 
              onClick={handleContinue}
              className="flex items-center gap-2"
            >
              Önizlemeye Devam Et
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;

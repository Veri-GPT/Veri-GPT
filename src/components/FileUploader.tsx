
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { File, Upload } from "lucide-react";
import { toast } from "sonner";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

export function FileUploader({ onFileUpload }: FileUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndProcessFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const validateAndProcessFile = (file: File) => {
    const validExtensions = ['.csv', '.xlsx', '.xls'];
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    
    if (!validExtensions.includes(fileExtension)) {
      toast.error("Sadece CSV ve Excel dosyaları desteklenmektedir");
      return;
    }
    
    toast.success(`${file.name} başarıyla yüklendi`);
    onFileUpload(file);
  };

  return (
    <Card 
      className={`border-dashed border-2 p-10 flex flex-col items-center justify-center min-h-[400px] ${
        isDragActive ? "drag-active" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        accept=".csv,.xlsx,.xls" 
        onChange={handleFileChange}
      />
      
      <div className="bg-primary/10 p-4 rounded-full mb-6">
        <File className="h-10 w-10 text-primary" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">Veri dosyanızı yükleyin</h3>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        CSV veya Excel dosyanızı buraya sürükleyip bırakın veya dosya seçmek için aşağıdaki butona tıklayın
      </p>
      
      <div className="flex gap-4">
        <Button 
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Dosya Seç
        </Button>
      </div>
      
      <div className="mt-6 text-sm text-muted-foreground">
        Desteklenen formatlar: .csv, .xlsx, .xls
      </div>
    </Card>
  );
}

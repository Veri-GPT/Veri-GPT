
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { DataPreviewTable } from "@/components/DataPreviewTable";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FileData {
  headers: string[];
  data: any[][];
  fileName: string;
  rowCount: number;
}

const Preview = () => {
  const [fileData, setFileData] = useState<FileData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = sessionStorage.getItem('fileData');
    if (storedData) {
      setFileData(JSON.parse(storedData));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleChatWithData = () => {
    navigate('/chat');
  };

  if (!fileData) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Yükleniyor...</h2>
            <p className="text-muted-foreground">Verileriniz hazırlanırken lütfen bekleyin.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Veri Önizleme</h1>
            <p className="text-muted-foreground mt-2">
              Verilerinizi analiz öncesinde inceleyin
            </p>
          </div>
          <Button
            onClick={handleChatWithData}
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Veri ile Sohbet Et
          </Button>
        </div>

        <DataPreviewTable
          headers={fileData.headers}
          data={fileData.data}
          fileName={fileData.fileName}
          rowCount={fileData.rowCount}
        />
      </div>
    </Layout>
  );
};

export default Preview;

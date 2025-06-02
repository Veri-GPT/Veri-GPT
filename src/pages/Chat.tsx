
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { ChatInterface } from "@/components/ChatInterface";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface FileData {
  headers: string[];
  data: any[][];
  fileName: string;
  rowCount: number;
}

const Chat = () => {
  const [fileData, setFileData] = useState<FileData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem('fileData');
      if (storedData) {
        setFileData(JSON.parse(storedData));
      } else {
        toast.error("Önce veri yüklemelisiniz");
        navigate('/');
      }
    } catch (error) {
      console.error("Veri yükleme hatası:", error);
      toast.error("Veri yükleme hatası");
      navigate('/');
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Veriniz ile Sohbet Edin</h1>
          {fileData && (
            <p className="text-muted-foreground mt-2">
              {fileData.fileName} Dosya ile sohbet et
              <span className="ml-2 text-sm">({fileData.rowCount} satır)</span>
            </p>
          )}
        </div>

        <ChatInterface 
          fileName={fileData?.fileName}
          isDataLoaded={!!fileData}
          fileData={fileData}
        />
      </div>
    </Layout>
  );
};

export default Chat;

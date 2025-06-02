
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { ChartDisplay } from "@/components/ChartDisplay";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface FileData {
  headers: string[];
  data: any[][];
  fileName: string;
  rowCount: number;
}

// Dizi verisini Recharts için nesne formatına dönüştürme
const convertToChartData = (headers: string[], data: any[][]) => {
  return data.map(row => {
    const rowData: Record<string, any> = {};
    headers.forEach((header, index) => {
      // Sayısal değerleri dönüştürmeye çalış
      const value = row[index];
      if (value !== undefined && value !== null) {
        const parsedValue = !isNaN(parseFloat(value)) ? parseFloat(value) : value;
        rowData[header] = parsedValue;
      } else {
        rowData[header] = null; // Null veya undefined değerler için null kullan
      }
    });
    return rowData;
  });
};

const Visualize = () => {
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = sessionStorage.getItem('fileData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setFileData(parsedData);
        
        // Dizi verisini grafik için nesne formatına dönüştür
        const formattedData = convertToChartData(parsedData.headers, parsedData.data);
        setChartData(formattedData);
      } catch (error) {
        console.error("Veri dönüştürme hatası:", error);
        toast.error("Veri görselleştirilemedi. Format hatası.");
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!fileData) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Veriler yükleniyor...</h2>
            <p className="text-muted-foreground">Görselleştirmeleriniz hazırlanırken lütfen bekleyin.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Verinizi Görselleştirin</h1>
          <p className="text-muted-foreground mt-2">
            {fileData.fileName} dosyasından etkileşimli grafikler oluşturun
            <span className="ml-2 text-sm">({fileData.rowCount} satır)</span>
          </p>
        </div>

        <ChartDisplay 
          data={chartData}
          columns={fileData.headers}
        />
      </div>
    </Layout>
  );
};

export default Visualize;

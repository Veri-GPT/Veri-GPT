
import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { 
  ChartBar, 
  ChartLine, 
  ChartPie, 
  ChartScatter, 
  BarChart2, 
  LineChart as LineChartIcon, 
  Download,
  RefreshCcw,
  Search,
  Filter,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2
} from "lucide-react";
import { toast } from "sonner";

interface ChartDisplayProps {
  data: any[];
  columns: string[];
}

type ChartType = 'bar' | 'line' | 'pie' | 'scatter' | 'area' | 'stacked-bar';

export function ChartDisplay({ data, columns }: ChartDisplayProps) {
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [xAxis, setXAxis] = useState<string>(columns[0] || '');
  const [yAxisList, setYAxisList] = useState<string[]>(columns.length > 1 ? [columns[1]] : []);
  const [chartHeight, setChartHeight] = useState<number>(400);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [animationDuration, setAnimationDuration] = useState<number>(300);
  const [chartTitle, setChartTitle] = useState<string>("Veri Grafiği");
  const [colorScheme, setColorScheme] = useState<string>("default");
  const [maxDataPoints, setMaxDataPoints] = useState<number>(100);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedColumns, setSelectedColumns] = useState<Record<string, boolean>>({});
  const [dataView, setDataView] = useState<'all' | 'filtered'>('all');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [chartScale, setChartScale] = useState<number>(100); // percentage scale

  // Toplam veri noktası sayısını sakla
  const totalDataPoints = useMemo(() => data.length, [data]);

  // Başlangıçta tüm sütunları seçili yap
  useEffect(() => {
    const initialSelection = columns.reduce((acc, col) => {
      acc[col] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setSelectedColumns(initialSelection);
  }, [columns]);

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    const chartContainer = document.getElementById('chart-container');
    if (!chartContainer) return;

    if (!isFullscreen) {
      if (chartContainer.requestFullscreen) {
        chartContainer.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Zoom in/out functions
  const zoomIn = () => {
    setChartScale(prev => Math.min(prev + 20, 200));
  };

  const zoomOut = () => {
    setChartScale(prev => Math.max(prev - 20, 50));
  };

  // Sayısal değerlere sahip sütunları filtrele
  const numericColumns = useMemo(() => {
    return columns.filter(column => {
      return data.some(item => typeof item[column] === 'number');
    });
  }, [columns, data]);

  // Benzersiz değerlere sahip sütunları bul (kategorik veriler için)
  const categoricalColumns = useMemo(() => {
    return columns.filter(column => {
      const uniqueValues = new Set(data.map(item => item[column]));
      return uniqueValues.size <= Math.min(data.length / 2, 30); // Heuristik olarak benzersiz değer sayısı sınırlı olanlar kategorik olabilir
    });
  }, [columns, data]);

  // Y eksenine sütun eklemek veya çıkarmak için
  const handleYAxisToggle = (column: string) => {
    if (yAxisList.includes(column)) {
      setYAxisList(yAxisList.filter(col => col !== column));
    } else {
      setYAxisList([...yAxisList, column]);
    }
  };

  // Sütunları filtrelemek için
  const handleColumnToggle = (column: string, checked: boolean) => {
    setSelectedColumns(prev => ({
      ...prev,
      [column]: checked
    }));
  };

  // Renk şemaları
  const COLOR_SCHEMES = {
    default: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
    blues: ['#004c6d', '#1a6e8e', '#3490af', '#4eb2d0', '#68d4f1', '#8de5ff', '#b2f0ff', '#d7faff'],
    reds: ['#6a040f', '#9d0208', '#d00000', '#dc2f02', '#e85d04', '#f48c06', '#faa307', '#ffba08'],
    greens: ['#004b23', '#006400', '#007200', '#008000', '#38b000', '#70e000', '#9ef01a', '#ccff33'],
    purples: ['#3c096c', '#5a189a', '#7b2cbf', '#9d4edd', '#c77dff', '#e0aaff', '#ead6ff', '#f3e8ff'],
    categorical: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf']
  };

  // Grafiği resim olarak indirme fonksiyonu
  const downloadChart = () => {
    try {
      const svgElement = document.querySelector('.recharts-wrapper svg');
      if (!svgElement) {
        throw new Error('SVG elementi bulunamadı');
      }

      const svgData = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `${chartTitle.replace(/\s+/g, '-')}-${new Date().toISOString().slice(0, 10)}`;
        downloadLink.href = pngFile;
        downloadLink.click();
        
        toast.success("Grafik başarıyla indirildi");
      };
      
      img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
    } catch (err) {
      console.error('Grafik indirilemedi:', err);
      toast.error("Grafik indirilemedi. Lütfen tekrar deneyin.");
    }
  };

  // Veriyi filtrele
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    return data.filter(item => {
      // Arama terimini kontrol et
      if (searchTerm) {
        const searchMatch = Object.entries(item).some(([key, value]) => {
          if (!selectedColumns[key]) return false;
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        });
        if (!searchMatch) return false;
      }

      // Seçili sütunlara göre filtrele
      const hasAllSelectedColumns = Object.entries(selectedColumns)
        .filter(([_, isSelected]) => isSelected)
        .every(([colName, _]) => item[colName] !== undefined);
      
      return hasAllSelectedColumns;
    });
  }, [data, searchTerm, selectedColumns]);

  // Grafik için veriyi hazırla
  const prepareChartData = useMemo(() => {
    if (!filteredData || filteredData.length === 0 || yAxisList.length === 0) return [];
    
    // Pasta grafiği için veriyi grupla
    if (chartType === 'pie') {
      const groupedData = filteredData.reduce((acc: any[], item) => {
        const xValue = item[xAxis];
        if (xValue === undefined) return acc;
        
        const yValue = item[yAxisList[0]] || 0; // Pasta grafikte sadece ilk y ekseni kullanılır
        
        const existingItem = acc.find(d => d[xAxis] === xValue);
        if (existingItem) {
          existingItem.value = (existingItem.value || 0) + yValue;
        } else {
          acc.push({
            [xAxis]: xValue,
            value: yValue,
            name: `${xValue}`
          });
        }
        return acc;
      }, []);
      
      // En büyük maxDataPoints değeri kadar al
      return groupedData
        .sort((a, b) => b.value - a.value)
        .slice(0, maxDataPoints);
    }
    
    // Diğer grafikler için veriyi hazırla
    // Kullanıcının belirttiği maksimum veri noktası sayısını kullan
    return filteredData.slice(0, maxDataPoints);
  }, [filteredData, chartType, xAxis, yAxisList, maxDataPoints]);

  const renderChart = () => {
    if (!prepareChartData || prepareChartData.length === 0 || yAxisList.length === 0) {
      return <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Görüntülenecek veri yok veya bir Y ekseni seçilmedi</p>
      </div>;
    }

    const selectedColorScheme = COLOR_SCHEMES[colorScheme as keyof typeof COLOR_SCHEMES] || COLOR_SCHEMES.default;

    // Apply scale styling
    const scaleStyle = {
      width: `${chartScale}%`,
      height: `${chartScale}%`,
      transition: 'transform 0.3s',
      margin: '0 auto',
    };

    switch (chartType) {
      case 'bar':
        return (
          <div style={scaleStyle}>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart data={prepareChartData} className="animate-fade-in">
                {showGrid && <CartesianGrid strokeDasharray="3 3" />}
                <XAxis 
                  dataKey={xAxis} 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                  tick={{fontSize: 12}} 
                />
                <YAxis />
                <Tooltip />
                <Legend />
                {yAxisList.map((column, index) => (
                  <Bar 
                    key={column} 
                    dataKey={column} 
                    name={column} 
                    fill={selectedColorScheme[index % selectedColorScheme.length]} 
                    animationDuration={animationDuration}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
        
      case 'stacked-bar':
        return (
          <div style={scaleStyle}>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart data={prepareChartData} className="animate-fade-in">
                {showGrid && <CartesianGrid strokeDasharray="3 3" />}
                <XAxis 
                  dataKey={xAxis} 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                  tick={{fontSize: 12}} 
                />
                <YAxis />
                <Tooltip />
                <Legend />
                {yAxisList.map((column, index) => (
                  <Bar 
                    key={column} 
                    dataKey={column} 
                    name={column} 
                    stackId="a"
                    fill={selectedColorScheme[index % selectedColorScheme.length]} 
                    animationDuration={animationDuration}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
        
      case 'line':
        return (
          <div style={scaleStyle}>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <LineChart data={prepareChartData} className="animate-fade-in">
                {showGrid && <CartesianGrid strokeDasharray="3 3" />}
                <XAxis 
                  dataKey={xAxis} 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                  tick={{fontSize: 12}} 
                />
                <YAxis />
                <Tooltip />
                <Legend />
                {yAxisList.map((column, index) => (
                  <Line 
                    key={column}
                    type="monotone" 
                    dataKey={column} 
                    name={column}
                    stroke={selectedColorScheme[index % selectedColorScheme.length]} 
                    animationDuration={animationDuration}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
        
      case 'area':
        return (
          <div style={scaleStyle}>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <AreaChart data={prepareChartData} className="animate-fade-in">
                {showGrid && <CartesianGrid strokeDasharray="3 3" />}
                <XAxis 
                  dataKey={xAxis} 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                  tick={{fontSize: 12}} 
                />
                <YAxis />
                <Tooltip />
                <Legend />
                {yAxisList.map((column, index) => (
                  <Area 
                    key={column}
                    type="monotone" 
                    dataKey={column} 
                    name={column}
                    stroke={selectedColorScheme[index % selectedColorScheme.length]}
                    fill={selectedColorScheme[index % selectedColorScheme.length]}
                    fillOpacity={0.3}
                    animationDuration={animationDuration}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );
        
      case 'pie':
        // Pasta grafikte sadece ilk y ekseni kullanılır
        return (
          <div style={scaleStyle}>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <PieChart className="animate-fade-in">
                <Pie
                  data={prepareChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={chartHeight / 3}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey={xAxis}
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  animationDuration={animationDuration}
                >
                  {prepareChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={selectedColorScheme[index % selectedColorScheme.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
        
      case 'scatter':
        return (
          <div style={scaleStyle}>
            <ResponsiveContainer width="100%" height={chartHeight}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 30 }} className="animate-fade-in">
                {showGrid && <CartesianGrid strokeDasharray="3 3" />}
                <XAxis 
                  dataKey={xAxis} 
                  type="number" 
                  name={xAxis} 
                  domain={['auto', 'auto']}
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  tick={{fontSize: 12}}
                />
                <YAxis 
                  dataKey={yAxisList[0]} 
                  type="number" 
                  name={yAxisList[0]} 
                  domain={['auto', 'auto']}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                {yAxisList.length > 0 && (
                  <Scatter 
                    name={`${xAxis} vs ${yAxisList[0]}`} 
                    data={prepareChartData} 
                    fill={selectedColorScheme[0]}
                    animationDuration={animationDuration}
                  />
                )}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap justify-between items-center">
          <CardTitle>
            <Input 
              className="text-xl font-bold border-none shadow-none focus-visible:ring-0 px-0"
              value={chartTitle} 
              onChange={(e) => setChartTitle(e.target.value)}
              placeholder="Grafik Başlığı"
            />
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-2 py-0">
              {filteredData.length} / {totalDataPoints} veri
            </Badge>
            <Button variant="outline" size="sm" onClick={downloadChart}>
              <Download className="h-4 w-4 mr-1" />
              İndir
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              <RefreshCcw className="h-4 w-4 mr-1" />
              Yenile
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Verilerde ara..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm whitespace-nowrap">Maks. veri:</span>
            <Select value={maxDataPoints.toString()} onValueChange={(value) => setMaxDataPoints(Number(value))}>
              <SelectTrigger className="w-24 h-9">
                <SelectValue placeholder="50" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
                <SelectItem value="250">250</SelectItem>
                <SelectItem value="500">500</SelectItem>
                <SelectItem value="1000">1000</SelectItem>
                <SelectItem value="2500">2500</SelectItem>
                <SelectItem value="5000">5000</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1.5" 
            onClick={() => setDataView(dataView === 'all' ? 'filtered' : 'all')}
          >
            <Filter className="h-4 w-4" />
            <span>{dataView === 'filtered' ? 'Tüm Sütunlar' : 'Sütunları Filtrele'}</span>
          </Button>
        </div>
        
        {dataView === 'filtered' && (
          <div className="mt-4 p-3 border rounded-md bg-background/50 animate-fade-in">
            <h3 className="text-sm font-medium mb-2">Görüntülenecek Sütunları Seçin</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {columns.map((column) => (
                <div key={column} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`column-${column}`} 
                    checked={selectedColumns[column] || false} 
                    onCheckedChange={(checked) => handleColumnToggle(column, Boolean(checked))}
                  />
                  <label 
                    htmlFor={`column-${column}`} 
                    className="text-sm truncate max-w-full cursor-pointer"
                  >
                    {column}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <Tabs defaultValue="chart-type" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chart-type">Grafik Türü</TabsTrigger>
            <TabsTrigger value="data-selection">Veri Seçimi</TabsTrigger>
            <TabsTrigger value="appearance">Görünüm</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chart-type" className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mt-4">
              <Button 
                variant={chartType === 'bar' ? "default" : "outline"} 
                onClick={() => setChartType('bar')}
                className="flex flex-col items-center justify-center h-24 w-full transition-all hover:scale-105"
              >
                <BarChart2 className="h-10 w-10 mb-2" />
                <span>Sütun Grafik</span>
              </Button>
              
              <Button 
                variant={chartType === 'line' ? "default" : "outline"} 
                onClick={() => setChartType('line')}
                className="flex flex-col items-center justify-center h-24 w-full transition-all hover:scale-105"
              >
                <LineChartIcon className="h-10 w-10 mb-2" />
                <span>Çizgi Grafik</span>
              </Button>
              
              <Button 
                variant={chartType === 'pie' ? "default" : "outline"} 
                onClick={() => setChartType('pie')}
                className="flex flex-col items-center justify-center h-24 w-full transition-all hover:scale-105"
              >
                <ChartPie className="h-10 w-10 mb-2" />
                <span>Pasta Grafik</span>
              </Button>
              
              <Button 
                variant={chartType === 'scatter' ? "default" : "outline"} 
                onClick={() => setChartType('scatter')}
                className="flex flex-col items-center justify-center h-24 w-full transition-all hover:scale-105"
              >
                <ChartScatter className="h-10 w-10 mb-2" />
                <span>Dağılım</span>
              </Button>
              
              <Button 
                variant={chartType === 'area' ? "default" : "outline"} 
                onClick={() => setChartType('area')}
                className="flex flex-col items-center justify-center h-24 w-full transition-all hover:scale-105"
              >
                <LineChartIcon className="h-10 w-10 mb-2" />
                <span>Alan Grafik</span>
              </Button>
              
              <Button 
                variant={chartType === 'stacked-bar' ? "default" : "outline"} 
                onClick={() => setChartType('stacked-bar')}
                className="flex flex-col items-center justify-center h-24 w-full transition-all hover:scale-105"
              >
                <BarChart2 className="h-10 w-10 mb-2" />
                <span>Yığın Sütun</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="data-selection">
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="xaxis">X Ekseni</Label>
                <Select value={xAxis} onValueChange={setXAxis}>
                  <SelectTrigger id="xaxis">
                    <SelectValue placeholder="X Ekseni" />
                  </SelectTrigger>
                  <SelectContent>
                    {chartType === 'scatter' 
                      ? numericColumns.map((column) => (
                          <SelectItem key={column} value={column}>
                            {column}
                          </SelectItem>
                        ))
                      : columns.map((column) => (
                          <SelectItem key={column} value={column}>
                            {column}
                          </SelectItem>
                        ))
                    }
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Y Ekseni Seçimi</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                  {numericColumns.map((column) => (
                    <Button
                      key={column}
                      variant={yAxisList.includes(column) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleYAxisToggle(column)}
                      className={`justify-start truncate transition-all hover:scale-105 ${yAxisList.includes(column) ? 'bg-primary' : ''}`}
                    >
                      {column}
                    </Button>
                  ))}
                </div>
                {numericColumns.length === 0 && (
                  <p className="text-muted-foreground text-sm mt-2">
                    Sayısal sütun bulunamadı. Veri türleri uygun olmayabilir.
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="appearance">
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="color-scheme">Renk Şeması</Label>
                <Select value={colorScheme} onValueChange={setColorScheme}>
                  <SelectTrigger id="color-scheme">
                    <SelectValue placeholder="Renk Şeması" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Varsayılan</SelectItem>
                    <SelectItem value="blues">Maviler</SelectItem>
                    <SelectItem value="reds">Kırmızılar</SelectItem>
                    <SelectItem value="greens">Yeşiller</SelectItem>
                    <SelectItem value="purples">Morlar</SelectItem>
                    <SelectItem value="categorical">Kategorik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="chart-height">Grafik Yüksekliği: {chartHeight}px</Label>
                <Slider 
                  id="chart-height"
                  min={200} 
                  max={800} 
                  step={50}
                  value={[chartHeight]}
                  onValueChange={(value) => setChartHeight(value[0])}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="chart-scale">Grafik Yakınlaştırma: {chartScale}%</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline" 
                    size="icon"
                    onClick={zoomOut}
                    disabled={chartScale <= 50}
                    className="h-8 w-8"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Slider 
                    id="chart-scale"
                    min={50} 
                    max={200} 
                    step={10}
                    value={[chartScale]}
                    onValueChange={(value) => setChartScale(value[0])}
                    className="flex-1"
                  />
                  <Button
                    variant="outline" 
                    size="icon"
                    onClick={zoomIn}
                    disabled={chartScale >= 200}
                    className="h-8 w-8"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline" 
                    size="icon"
                    onClick={toggleFullscreen}
                    className="h-8 w-8 ml-2"
                  >
                    {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="show-grid"
                  checked={showGrid}
                  onCheckedChange={setShowGrid}
                />
                <Label htmlFor="show-grid">Izgarayı Göster</Label>
              </div>
              
              <div>
                <Label htmlFor="animation-duration">Animasyon Süresi: {animationDuration}ms</Label>
                <Slider 
                  id="animation-duration"
                  min={0} 
                  max={2000} 
                  step={100}
                  value={[animationDuration]}
                  onValueChange={(value) => setAnimationDuration(value[0])}
                  className="mt-2"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardHeader>
      <CardContent className="pt-4">
        <div id="chart-container" className="w-full overflow-x-auto animate-fade-in">
          {renderChart()}
        </div>
      </CardContent>
    </Card>
  );
}

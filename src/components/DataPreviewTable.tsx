
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface DataPreviewTableProps {
  headers: string[];
  data: any[][];
  fileName: string;
  rowCount: number;
}

export function DataPreviewTable({ headers, data, fileName, rowCount }: DataPreviewTableProps) {
  const [pageSize, setPageSize] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAllData, setShowAllData] = useState<boolean>(false);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / pageSize);
  
  // Calculate displayed rows based on pagination or showAllData flag
  const displayRows = showAllData 
    ? data 
    : data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  
  // Handle page change
  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // Toggle view all data
  const toggleViewAll = () => {
    setShowAllData(prev => !prev);
    if (!showAllData) {
      // Reset to first page when switching to view all
      setCurrentPage(1);
    }
  };

  // Handle page size change
  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    // Reset to first page when changing page size
    setCurrentPage(1);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Veri Önizleme</CardTitle>
            <CardDescription>
              {showAllData 
                ? `Tüm veriyi görüntüleme (${rowCount} satır)` 
                : `Sayfa ${currentPage}/${totalPages} (${displayRows.length}/${rowCount} satır görüntüleniyor)`
              }
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs">
            {fileName}
          </Badge>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Sayfa Boyutu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 Satır</SelectItem>
                <SelectItem value="25">25 Satır</SelectItem>
                <SelectItem value="50">50 Satır</SelectItem>
                <SelectItem value="100">100 Satır</SelectItem>
                <SelectItem value="250">250 Satır</SelectItem>
                <SelectItem value="500">500 Satır</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant={showAllData ? "default" : "outline"} 
              onClick={toggleViewAll}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              {showAllData ? "Sayfalı Görüntüle" : "Tümünü Görüntüle"}
            </Button>
          </div>
          
          {!showAllData && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                {`Sayfa ${currentPage}/${totalPages}`}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto max-h-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((header, index) => (
                  <TableHead key={index}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayRows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>
                      {cell !== null && cell !== undefined ? String(cell) : "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

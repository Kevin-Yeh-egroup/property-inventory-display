'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Truck, RotateCcw, BarChart3, List, MapPin, Building, Download } from 'lucide-react';
import { Property } from '@/types/property';
import PropertyDetailList from '@/components/property-detail-list';
import { exportToCSV, exportToXLSX } from '@/lib/export-utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ResultPageProps {
  properties: Property[];
  onReset: () => void;
}

export default function ResultPage({
  properties,
  onReset,
}: ResultPageProps) {
  const [viewMode, setViewMode] = useState<'detail' | 'summary'>('detail');
  
  // 根據分類統計，如果沒有分類則根據財產別判斷
  const landCount = properties.filter(p => (p.category || p.propertyType) === '土地').length;
  const houseCount = properties.filter(p => (p.category || p.propertyType) === '房屋').length;
  const vehicleCount = properties.filter(p => (p.category || p.propertyType) === '車輛').length;
  const totalCount = landCount + houseCount + vehicleCount;

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full max-w-7xl space-y-6">
        {/* Header Card */}
        <Card className="p-8 border border-border shadow-lg bg-card">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              財產清冊查詢結果
            </h1>
            <p className="text-muted-foreground">
              {viewMode === 'detail' ? '掃描完成，以下為您的財產詳細清單' : '掃描完成，以下為您的財產統計'}
            </p>
          </div>
        </Card>

        {/* View Mode Toggle */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => setViewMode('detail')}
            variant={viewMode === 'detail' ? 'default' : 'outline'}
            size="lg"
            className="flex-1 max-w-xs"
          >
            <List className="w-4 h-4 mr-2" />
            詳細清單
          </Button>
          <Button
            onClick={() => setViewMode('summary')}
            variant={viewMode === 'summary' ? 'default' : 'outline'}
            size="lg"
            className="flex-1 max-w-xs"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            總比數統計
          </Button>
        </div>

        {/* Content Area */}
        {viewMode === 'detail' ? (
          <PropertyDetailList properties={properties} />
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Total Property Card */}
              <Card className="p-6 border border-border shadow-md bg-primary/5">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground font-medium mb-2">
                    財產總筆數
                  </p>
                  <p className="text-4xl font-bold text-primary">{totalCount}</p>
                  <p className="text-xs text-muted-foreground mt-2">共計筆數</p>
                </div>
              </Card>

              {/* Land Card */}
              <Card className="p-6 border border-border shadow-md bg-green-50 dark:bg-green-950/20">
                <div className="flex flex-col items-center gap-2">
                  <MapPin className="w-8 h-8 text-green-600 dark:text-green-400" />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground font-medium mb-1">
                      土地
                    </p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {landCount}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">筆</p>
                  </div>
                </div>
              </Card>

              {/* House Card */}
              <Card className="p-6 border border-border shadow-md bg-blue-50 dark:bg-blue-950/20">
                <div className="flex flex-col items-center gap-2">
                  <Building className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground font-medium mb-1">
                      房屋
                    </p>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {houseCount}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">筆</p>
                  </div>
                </div>
              </Card>

              {/* Vehicle Card */}
              <Card className="p-6 border border-border shadow-md bg-amber-50 dark:bg-amber-950/20">
                <div className="flex flex-col items-center gap-2">
                  <Truck className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground font-medium mb-1">
                      車輛
                    </p>
                    <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                      {vehicleCount}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">筆</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Details Card */}
            <Card className="p-6 border border-border shadow-md">
              <h2 className="text-lg font-semibold text-foreground mb-4">財產統計詳情</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-foreground flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                    土地
                  </span>
                  <span className="font-bold text-lg text-foreground">{landCount} 筆</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-foreground flex items-center gap-2">
                    <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    房屋
                  </span>
                  <span className="font-bold text-lg text-foreground">{houseCount} 筆</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="text-foreground flex items-center gap-2">
                    <Truck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    車輛
                  </span>
                  <span className="font-bold text-lg text-foreground">
                    {vehicleCount} 筆
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                  <span className="text-foreground font-medium">總計</span>
                  <span className="font-bold text-lg text-primary">{totalCount} 筆</span>
                </div>
              </div>
            </Card>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            onClick={onReset}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            重新上傳
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Download className="w-4 h-4 mr-2" />
                下載資料
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => exportToCSV(properties, '財產清冊')}
                className="cursor-pointer"
              >
                <Download className="w-4 h-4 mr-2" />
                下載為 CSV
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => exportToXLSX(properties, '財產清冊')}
                className="cursor-pointer"
              >
                <Download className="w-4 h-4 mr-2" />
                下載為 XLSX
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

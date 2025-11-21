'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, Truck, RotateCcw } from 'lucide-react';

interface ResultPageProps {
  realEstateCount: number;
  personalPropertyCount: number;
  onReset: () => void;
}

export default function ResultPage({
  realEstateCount,
  personalPropertyCount,
  onReset,
}: ResultPageProps) {
  const totalCount = realEstateCount + personalPropertyCount;

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header Card */}
        <Card className="p-8 border border-border shadow-lg bg-card">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              財產清冊查詢結果
            </h1>
            <p className="text-muted-foreground">掃描完成，以下為您的財產統計</p>
          </div>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          {/* Real Estate Card */}
          <Card className="p-6 border border-border shadow-md bg-blue-50 dark:bg-blue-950/20">
            <div className="flex flex-col items-center gap-2">
              <Home className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div className="text-center">
                <p className="text-sm text-muted-foreground font-medium mb-1">
                  不動產
                </p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {realEstateCount}
                </p>
                <p className="text-xs text-muted-foreground mt-1">筆</p>
              </div>
            </div>
          </Card>

          {/* Personal Property Card */}
          <Card className="p-6 border border-border shadow-md bg-amber-50 dark:bg-amber-950/20">
            <div className="flex flex-col items-center gap-2">
              <Truck className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              <div className="text-center">
                <p className="text-sm text-muted-foreground font-medium mb-1">
                  動產
                </p>
                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                  {personalPropertyCount}
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
                <Home className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                不動產
              </span>
              <span className="font-bold text-lg text-foreground">{realEstateCount} 筆</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <span className="text-foreground flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                動產
              </span>
              <span className="font-bold text-lg text-foreground">
                {personalPropertyCount} 筆
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
              <span className="text-foreground font-medium">總計</span>
              <span className="font-bold text-lg text-primary">{totalCount} 筆</span>
            </div>
          </div>
        </Card>

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
          <Button
            size="lg"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            詳細查看
          </Button>
        </div>
      </div>
    </div>
  );
}

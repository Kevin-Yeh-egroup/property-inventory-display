'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload } from 'lucide-react';

interface UploadPageProps {
  onFileSelect: () => void;
}

export default function UploadPage({ onFileSelect }: UploadPageProps) {
  const handleClick = () => {
    // 點擊選擇檔案，直接進入讀取動畫
    onFileSelect();
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md p-8 border border-border shadow-lg">
        <div className="flex flex-col items-center gap-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">財產清冊查詢</h1>
            <p className="text-muted-foreground">全國財產稅總歸戶財產查詢清單</p>
          </div>

          {/* Icon */}
          <div className="bg-primary/10 p-6 rounded-full">
            <Upload className="w-12 h-12 text-primary" />
          </div>

          {/* Description */}
          <div className="text-center space-y-2">
            <p className="text-foreground font-medium">上傳您的財產清冊</p>
            <p className="text-sm text-muted-foreground">
              點選下方按鈕選擇財產清冊檔案，系統將自動解析並統計您的財產資訊
            </p>
          </div>

          {/* File Input (Hidden) */}
          <input
            type="file"
            id="file-input"
            className="hidden"
            accept=".pdf,.xlsx,.xls,.csv,.txt"
          />

          {/* Upload Button */}
          <Button
            onClick={handleClick}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            選擇檔案
          </Button>

          {/* Info */}
          <div className="text-xs text-muted-foreground text-center p-4 bg-muted/30 rounded-lg">
            <p>支援格式：PDF、Excel、CSV、TXT</p>
            <p>檔案大小：不超過 50MB</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

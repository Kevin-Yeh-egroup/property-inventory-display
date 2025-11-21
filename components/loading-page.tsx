'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 在5秒內模擬進度增長
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 25;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md p-8 border border-border shadow-lg">
        <div className="flex flex-col items-center gap-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">正在讀取中</h2>
            <p className="text-sm text-muted-foreground mt-1">解析財產清冊...</p>
          </div>

          {/* Animated Spinner */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin"
              style={{
                animation: 'spin 2s linear infinite',
              }}
            ></div>
          </div>

          {/* Progress Text */}
          <div className="w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">進度</span>
              <span className="text-sm font-semibold text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Status Messages */}
          <div className="text-center text-xs text-muted-foreground space-y-1">
            <p>✓ 檔案讀取中</p>
            <p>⏳ 數據解析中</p>
            <p>準備顯示結果...</p>
          </div>
        </div>
      </Card>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

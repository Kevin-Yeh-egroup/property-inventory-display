'use client';

import { useState } from 'react';
import UploadPage from '@/components/upload-page';
import LoadingPage from '@/components/loading-page';
import ResultPage from '@/components/result-page';

type AppStep = 'upload' | 'loading' | 'result';

export default function Home() {
  const [step, setStep] = useState<AppStep>('upload');
  const [realEstateCount, setRealEstateCount] = useState(0);
  const [personalPropertyCount, setPersonalPropertyCount] = useState(0);

  const handleFileSelect = () => {
    setStep('loading');
    
    // 5秒後進入結果頁面，並生成模擬數據
    setTimeout(() => {
      // 模擬數據：隨機生成不動產和動產筆數
      const realEstate = Math.floor(Math.random() * 10) + 1; // 1-10筆
      const personalProperty = Math.floor(Math.random() * 5) + 1; // 1-5筆
      
      setRealEstateCount(realEstate);
      setPersonalPropertyCount(personalProperty);
      setStep('result');
    }, 5000);
  };

  return (
    <main className="min-h-screen bg-background">
      {step === 'upload' && <UploadPage onFileSelect={handleFileSelect} />}
      {step === 'loading' && <LoadingPage />}
      {step === 'result' && (
        <ResultPage
          realEstateCount={realEstateCount}
          personalPropertyCount={personalPropertyCount}
          onReset={() => {
            setStep('upload');
            setRealEstateCount(0);
            setPersonalPropertyCount(0);
          }}
        />
      )}
    </main>
  );
}

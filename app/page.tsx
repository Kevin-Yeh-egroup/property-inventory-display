'use client';

import { useState } from 'react';
import UploadPage from '@/components/upload-page';
import LoadingPage from '@/components/loading-page';
import ResultPage from '@/components/result-page';
import { Property } from '@/types/property';

type AppStep = 'upload' | 'loading' | 'result';

// 生成模擬財產資料
function generateMockProperties(): Property[] {
  const properties: Property[] = [];
  
  // 固定的測試資料，確保所有欄位正確且一致
  const testData: Property[] = [
    // 土地 1
    {
      propertyType: '土地',
      category: '土地',
      ownershipRatio: '50.00%', // 1/2 = 50%
      area: '125.50',
      currentValue: 'NT$ 5,500,000',
      period: '2022年3月',
      owner: '張三',
      landType: '建',
      city: '台北市',
      location: '中正路100號',
      numerator: '1',
      denominator: '2',
      trustNote: '',
      registrationTime: '2022/03/15',
    },
    // 土地 2
    {
      propertyType: '土地',
      category: '土地',
      ownershipRatio: '33.33%', // 1/3 = 33.33%
      area: '250.75',
      currentValue: 'NT$ 8,200,000',
      period: '2021年7月',
      owner: '張三',
      landType: '田',
      city: '新北市',
      location: '中山路50號',
      numerator: '1',
      denominator: '3',
      trustNote: '信託',
      registrationTime: '2021/07/20',
    },
    // 土地 3
    {
      propertyType: '土地',
      category: '土地',
      ownershipRatio: '25.00%', // 1/4 = 25%
      area: '180.25',
      currentValue: 'NT$ 6,800,000',
      period: '2023年11月',
      owner: '張三',
      landType: '旱',
      city: '桃園市',
      location: '信義路200號',
      numerator: '1',
      denominator: '4',
      trustNote: '',
      registrationTime: '2023/11/05',
    },
    // 房屋 1
    {
      propertyType: '房屋',
      category: '房屋',
      ownershipRatio: '100.00%', // 1/1 = 100%
      area: '85.30',
      currentValue: 'NT$ 12,500,000',
      period: '2020年5月',
      owner: '張三',
      landType: '建',
      city: '台北市',
      location: '仁愛路30號',
      numerator: '1',
      denominator: '1',
      trustNote: '',
      registrationTime: '2020/05/10',
    },
    // 房屋 2
    {
      propertyType: '房屋',
      category: '房屋',
      ownershipRatio: '66.67%', // 2/3 = 66.67%
      area: '120.50',
      currentValue: 'NT$ 15,800,000',
      period: '2022年9月',
      owner: '張三',
      landType: '建',
      city: '台中市',
      location: '和平路88號',
      numerator: '2',
      denominator: '3',
      trustNote: '',
      registrationTime: '2022/09/18',
    },
    // 房屋 3
    {
      propertyType: '房屋',
      category: '房屋',
      ownershipRatio: '40.00%', // 2/5 = 40%
      area: '95.75',
      currentValue: 'NT$ 10,200,000',
      period: '2021年12月',
      owner: '張三',
      landType: '建',
      city: '台南市',
      location: '忠孝路150號',
      numerator: '2',
      denominator: '5',
      trustNote: '信託',
      registrationTime: '2021/12/25',
    },
    // 房屋 4
    {
      propertyType: '房屋',
      category: '房屋',
      ownershipRatio: '75.00%', // 3/4 = 75%
      area: '110.20',
      currentValue: 'NT$ 18,500,000',
      period: '2023年6月',
      owner: '張三',
      landType: '建',
      city: '高雄市',
      location: '復興路220號',
      numerator: '3',
      denominator: '4',
      trustNote: '',
      registrationTime: '2023/06/12',
    },
    // 車輛 1
    {
      propertyType: '車輛',
      category: '車輛',
      ownershipRatio: '1800cc',
      area: '-',
      currentValue: 'NT$ 850,000',
      period: '2021年8月',
      owner: '張三',
      landType: '2021年',
      city: '台北市',
      location: 'BAN-1234',
      numerator: undefined,
      denominator: undefined,
      trustNote: '',
      registrationTime: '2021/08/15',
    },
    // 車輛 2
    {
      propertyType: '車輛',
      category: '車輛',
      ownershipRatio: '2500cc',
      area: '-',
      currentValue: 'NT$ 1,200,000',
      period: '2022年4月',
      owner: '張三',
      landType: '2022年',
      city: '新北市',
      location: 'BAN-5678',
      numerator: undefined,
      denominator: undefined,
      trustNote: '',
      registrationTime: '2022/04/20',
    },
    // 車輛 3
    {
      propertyType: '車輛',
      category: '車輛',
      ownershipRatio: '1500cc',
      area: '-',
      currentValue: 'NT$ 650,000',
      period: '2023年1月',
      owner: '張三',
      landType: '2023年',
      city: '桃園市',
      location: 'BAN-9012',
      numerator: undefined,
      denominator: undefined,
      trustNote: '信託',
      registrationTime: '2023/01/08',
    },
  ];
  
  return testData;
}

export default function Home() {
  const [step, setStep] = useState<AppStep>('upload');
  const [properties, setProperties] = useState<Property[]>([]);

  const handleFileSelect = () => {
    setStep('loading');
    
    // 5秒後進入結果頁面，並生成模擬數據
    setTimeout(() => {
      const mockProperties = generateMockProperties();
      setProperties(mockProperties);
      setStep('result');
    }, 5000);
  };

  return (
    <main className="min-h-screen bg-background">
      {step === 'upload' && <UploadPage onFileSelect={handleFileSelect} />}
      {step === 'loading' && <LoadingPage />}
      {step === 'result' && (
        <ResultPage
          properties={properties}
          onReset={() => {
            setStep('upload');
            setProperties([]);
          }}
        />
      )}
    </main>
  );
}

import * as XLSX from 'xlsx';
import { Property } from '@/types/property';

/**
 * 將財產資料轉換為 CSV 格式並下載
 */
export function exportToCSV(properties: Property[], filename: string = '財產清冊') {
  if (properties.length === 0) {
    alert('沒有資料可以下載');
    return;
  }

  // 定義表頭
  const headers = [
    '財產別',
    '分類',
    '房屋持份比例(汽缸容量)',
    '房地面積(平方公尺)',
    '房地現值金額',
    '所屬年月',
    '財產所有人',
    '地目(車年)',
    '縣市別',
    '房屋座落(地段名稱/BAN名稱)',
    '持分分子',
    '持分分母',
    '信託註記',
    '登記時間',
  ];

  // 轉換資料為二維陣列
  const data = properties.map((property) => {
    // 使用資料中的分類，如果沒有則根據財產別判斷
    const category = property.category || 
      (property.propertyType === '土地' ? '土地' 
      : property.propertyType === '房屋' ? '房屋' 
      : property.propertyType === '車輛' ? '車輛' 
      : '');
    
    return [
      property.propertyType || '',
      category,
      property.ownershipRatio || '',
      property.area || '',
      property.currentValue || '',
      property.period || '',
      property.owner || '',
      property.landType || '',
      property.city || '',
      property.location || '',
      property.numerator || '',
      property.denominator || '',
      property.trustNote || '',
      property.registrationTime || '',
    ];
  });

  // 合併表頭和資料
  const csvContent = [
    headers.join(','),
    ...data.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
  ].join('\n');

  // 添加 BOM 以支援中文
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });

  // 創建下載連結
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 將財產資料轉換為 XLSX 格式並下載
 */
export function exportToXLSX(properties: Property[], filename: string = '財產清冊') {
  if (properties.length === 0) {
    alert('沒有資料可以下載');
    return;
  }

  // 定義表頭
  const headers = [
    '財產別',
    '分類',
    '房屋持份比例(汽缸容量)',
    '房地面積(平方公尺)',
    '房地現值金額',
    '所屬年月',
    '財產所有人',
    '地目(車年)',
    '縣市別',
    '房屋座落(地段名稱/BAN名稱)',
    '持分分子',
    '持分分母',
    '信託註記',
    '登記時間',
  ];

  // 轉換資料為二維陣列
  const data = properties.map((property) => {
    // 使用資料中的分類，如果沒有則根據財產別判斷
    const category = property.category || 
      (property.propertyType === '土地' ? '土地' 
      : property.propertyType === '房屋' ? '房屋' 
      : property.propertyType === '車輛' ? '車輛' 
      : '');
    
    return [
      property.propertyType || '',
      category,
      property.ownershipRatio || '',
      property.area || '',
      property.currentValue || '',
      property.period || '',
      property.owner || '',
      property.landType || '',
      property.city || '',
      property.location || '',
      property.numerator || '',
      property.denominator || '',
      property.trustNote || '',
      property.registrationTime || '',
    ];
  });

  // 創建工作簿
  const wb = XLSX.utils.book_new();
  
  // 合併表頭和資料
  const wsData = [headers, ...data];
  
  // 創建工作表
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  
  // 設置欄寬
  const colWidths = [
    { wch: 10 }, // 財產別
    { wch: 10 }, // 分類
    { wch: 20 }, // 房屋持份比例(汽缸容量)
    { wch: 15 }, // 房地面積(平方公尺)
    { wch: 18 }, // 房地現值金額
    { wch: 12 }, // 所屬年月
    { wch: 12 }, // 財產所有人
    { wch: 12 }, // 地目(車年)
    { wch: 10 }, // 縣市別
    { wch: 25 }, // 房屋座落(地段名稱/BAN名稱)
    { wch: 10 }, // 持分分子
    { wch: 10 }, // 持分分母
    { wch: 10 }, // 信託註記
    { wch: 12 }, // 登記時間
  ];
  ws['!cols'] = colWidths;
  
  // 將工作表添加到工作簿
  XLSX.utils.book_append_sheet(wb, ws, '財產清冊');
  
  // 生成 Excel 文件並下載
  XLSX.writeFile(wb, `${filename}.xlsx`);
}


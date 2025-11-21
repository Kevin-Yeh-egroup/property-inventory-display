// 財產資料型別定義
export interface Property {
  // 財產別
  propertyType: string;
  // 分類（土地、房屋、車輛）
  category?: string;
  // 房屋持份比例(汽缸容量)
  ownershipRatio?: string;
  // 房地面積(平方公尺)
  area?: string;
  // 房地現值金額
  currentValue?: string;
  // 所屬年月
  period?: string;
  // 財產所有人
  owner?: string;
  // 地目(車年)
  landType?: string;
  // 縣市別
  city?: string;
  // 房屋座落(地段名稱/BAN名稱)
  location?: string;
  // 持分分子
  numerator?: string;
  // 持分分母
  denominator?: string;
  // 信託註記
  trustNote?: string;
  // 登記時間
  registrationTime?: string;
}


'use client';

import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Property } from '@/types/property';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface PropertyDetailListProps {
  properties: Property[];
}

export default function PropertyDetailList({ properties }: PropertyDetailListProps) {
  return (
    <Card className="p-6 border border-border shadow-md">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        財產詳細清單
      </h2>
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[80px] whitespace-nowrap">財產別</TableHead>
              <TableHead className="min-w-[80px] whitespace-nowrap">分類</TableHead>
              <TableHead className="min-w-[120px] whitespace-nowrap">房地持份比例<br/>(汽缸容量)</TableHead>
              <TableHead className="min-w-[100px] whitespace-nowrap">房地面積<br/>(平方公尺)</TableHead>
              <TableHead className="min-w-[120px] whitespace-nowrap">房地現值金額</TableHead>
              <TableHead className="min-w-[100px] whitespace-nowrap">所屬年月</TableHead>
              <TableHead className="min-w-[100px] whitespace-nowrap">財產所有人</TableHead>
              <TableHead className="min-w-[80px] whitespace-nowrap">地目<br/>(車年)</TableHead>
              <TableHead className="min-w-[80px] whitespace-nowrap">縣市別</TableHead>
              <TableHead className="min-w-[150px] whitespace-nowrap">房屋座落<br/>(地段名稱/BAN名稱)</TableHead>
              <TableHead className="min-w-[80px] whitespace-nowrap">信託註記</TableHead>
              <TableHead className="min-w-[100px] whitespace-nowrap">登記時間</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} className="text-center text-muted-foreground py-8">
                  尚無財產資料
                </TableCell>
              </TableRow>
            ) : (
              properties.map((property, index) => {
                // 使用資料中的分類，如果沒有則根據財產別判斷
                const category = property.category || 
                  (property.propertyType === '土地' ? '土地' 
                  : property.propertyType === '房屋' ? '房屋' 
                  : property.propertyType === '車輛' ? '車輛' 
                  : '-');
                
                // 判斷是否有持份資訊（土地和房屋有，車輛沒有）
                const hasOwnership = property.numerator && property.denominator;
                const ownershipInfo = hasOwnership 
                  ? `持分：${property.numerator}/${property.denominator}` 
                  : '';
                
                return (
                <TableRow key={index}>
                  <TableCell className="whitespace-nowrap">{property.propertyType || '-'}</TableCell>
                  <TableCell className="whitespace-nowrap">{category}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span>{property.ownershipRatio || '-'}</span>
                      {hasOwnership && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{ownershipInfo}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{property.area || '-'}</TableCell>
                  <TableCell className="whitespace-nowrap">{property.currentValue || '-'}</TableCell>
                  <TableCell className="whitespace-nowrap">{property.period || '-'}</TableCell>
                  <TableCell className="whitespace-nowrap">{property.owner || '-'}</TableCell>
                  <TableCell className="whitespace-nowrap">{property.landType || '-'}</TableCell>
                  <TableCell className="whitespace-nowrap">{property.city || '-'}</TableCell>
                  <TableCell className="whitespace-nowrap">{property.location || '-'}</TableCell>
                  <TableCell className="whitespace-nowrap">{property.trustNote || '-'}</TableCell>
                  <TableCell className="whitespace-nowrap">{property.registrationTime || '-'}</TableCell>
                </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}


export type HotelStatus = 'PENDING' | 'PUBLISHED' | 'REJECTED' | 'OFFLINE';

export interface Hotel {
  id: number;
  name: string;
  nameEn?: string | null;
  address: string;
  starRating: number;
  openingDate: string; // ISO Date string
  description?: string | null;
  
  // 扩展字段
  tags?: string[]; // 前端使用数组，后端存字符串
  nearbyInfo?: any;
  
  status: HotelStatus;
  rejectReason?: string | null;
  merchantId: number;
  
  // 关联图片（预留）
  mainImage?: string;
  images?: string[];

  createdAt: string;
  updatedAt: string;
}

export interface Room {
  id: number;
  name: string;
  price: number; // 单位：分
  discount?: number | null;
  capacity: number;
  size?: number | null; // 平米
  bedType?: string | null;
  imageUrl?: string | null;
  
  hotelId: number;
  createdAt?: string;
  updatedAt?: string;
}

// 酒店详情复合类型（包含房型）
export interface HotelDetail extends Hotel {
  rooms: Room[];
}

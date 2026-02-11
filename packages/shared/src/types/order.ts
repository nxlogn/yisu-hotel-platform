import { Hotel, Room } from './hotel';
import { User } from './user';

export type OrderStatus = 'PENDING' | 'PAID' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: number;
  orderNo: string;
  userId: number;
  roomId: number;
  
  checkIn: string;  // ISO Date
  checkOut: string; // ISO Date
  
  totalAmount: number; // 分
  status: OrderStatus;
  
  createdAt: string;
  
  // 关联信息（可选，用于列表展示）
  hotelName?: string;
  roomName?: string;
  hotelImage?: string;
}

// 订单详情（包含完整关联信息）
export interface OrderDetail extends Order {
  user?: User;
  hotel?: Hotel;
  room?: Room;
}

import request from '../utils/request'
import { Hotel, HotelDetail } from '@yisu/shared'


// 获取酒店列表
export const apiGetHotels = (params?: { keyword?: string }) => {
  return request<Hotel[]>({
    url: '/hotels',
    method: 'GET',
    data: params,
  })
}


// 获取酒店详情
export const apiGetHotelDetail = (id: number) => {
  return request<HotelDetail>({
    url: `/hotels/${id}`,
    method: 'GET',
  })
}
import { View, Text, Image } from '@tarojs/components'
import { useRouter } from '@tarojs/taro'
import './index.scss'

const MOCK_ROOMS = [
  { id: 101, name: '高级大床房', price: 888, info: '含双早 | 35㎡ | 大床', stock: 5 },
  { id: 102, name: '豪华景观双床房', price: 1288, info: '含双早 | 45㎡ | 双床', stock: 2 },
  { id: 103, name: '行政套房', price: 2588, info: '行政礼遇 | 70㎡ | 特大床', stock: 1 }
]

export default function HotelDetail() {
  const router = useRouter()

  return (
    <View className='detail-container'>
      <Image 
        className='header-img' 
        src='https://img.yzcdn.cn/vant/ipad.jpeg' 
        mode='aspectFill' 
      />

      <View className='info-section'>
        <View className='hotel-name'>上海静安瑞吉酒店</View>
        <View className='tags-row'>
          <View className='tag primary'>五星级</View>
          <View className='tag plain'>近地铁</View>
          <View className='tag plain'>含早餐</View>
        </View>
        <View className='address-box'>
          <Text className='address-text'>静安区北京西路1008号</Text>
          <Text className='map-link'>地图/导航</Text>
        </View>
      </View>

      <View className='divider' />

      <View className='room-section'>
        <View className='section-title'>可订房型</View>
        {MOCK_ROOMS.map(room => (
          <View key={room.id} className='room-item'>
            <View className='room-left'>
              <View className='room-name'>{room.name}</View>
              <View className='room-info'>{room.info}</View>
              <View className='room-stock'>仅剩 {room.stock} 间</View>
            </View>
            <View className='room-right'>
              <View className='price-box'>
                <Text className='symbol'>¥</Text>
                <Text className='num'>{room.price}</Text>
              </View>
              <View className='book-btn'>预订</View>
            </View>
          </View>
        ))}
      </View>

      {/* 底部悬浮栏 - 原生实现 */}
      <View className='bottom-bar-placeholder' />
      <View className='bottom-bar'>
        <View className='total-info'>
          <Text className='label'>即将入住：</Text>
          <Text className='date'>05月20日</Text>
        </View>
        <View className='share-btn'>分享给好友</View>
      </View>
    </View>
  )
}
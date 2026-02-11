import { View, Text, Image, ScrollView } from '@tarojs/components'
import { useRouter } from '@tarojs/taro'
import { Button, Divider, Tag, Price, Sticky } from '@nutui/nutui-react-taro'
import './index.scss'

// 模拟房型数据
const MOCK_ROOMS = [
  { id: 101, name: '高级大床房', price: 888, info: '含双早 | 35㎡ | 大床', stock: 5 },
  { id: 102, name: '豪华景观双床房', price: 1288, info: '含双早 | 45㎡ | 双床', stock: 2 },
  { id: 103, name: '行政套房', price: 2588, info: '行政礼遇 | 70㎡ | 特大床', stock: 1 }
]

export default function HotelDetail() {
  const router = useRouter()
  const { id } = router.params // 获取列表页传来的酒店ID

  const handleBook = (room: any) => {
    console.log('预订房型：', room.name)
    // 后续可以跳转到订单创建页
  }

  return (
    <View className='detail-container'>
      {/* 酒店头部图片 */}
      <Image 
        className='header-img' 
        src='https://img.yzcdn.cn/vant/ipad.jpeg' 
        mode='aspectFill' 
      />

      <View className='info-section'>
        <View className='hotel-name'>上海静安瑞吉酒店</View>
        <View className='hotel-tags'>
          <Tag type='danger'>五星级</Tag>
          <Tag type='primary' plain>近地铁</Tag>
          <Tag type='primary' plain>含早餐</Tag>
        </View>
        <View className='address-box'>
          <Text className='address-text'>静安区北京西路1008号</Text>
          <Text className='map-link'>地图/导航</Text>
        </View>
      </View>

      <Divider />

      {/* 房型列表 */}
      <View className='room-section'>
        <View className='section-title'>可订房型</View>
        <View className='room-list'>
          {MOCK_ROOMS.map(room => (
            <View key={room.id} className='room-item'>
              <View className='room-left'>
                <View className='room-name'>{room.name}</View>
                <View className='room-info'>{room.info}</View>
                <View className='room-stock'>仅剩 {room.stock} 间</View>
              </View>
              <View className='room-right'>
                <View className='room-price'>
                  <Price price={room.price} size="normal" currency="¥" />
                  <Text className='unit'>/晚</Text>
                </View>
                <Button type='primary' size='small' onClick={() => handleBook(room)}>
                  预订
                </Button>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 底部悬浮栏 */}
      <Sticky position='bottom'>
        <View className='bottom-bar'>
          <View className='total-info'>
            <Text className='label'>即将入住：</Text>
            <Text className='date'>05月20日 - 05月21日</Text>
          </View>
          <Button type='default' icon='share'>分享</Button>
        </View>
      </Sticky>
    </View>
  )
}
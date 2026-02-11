import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Tag, Rate, Price } from '@nutui/nutui-react-taro'
import { Hotel } from '@yisu/shared'
import './index.scss'

// 模拟数据
const MOCK_HOTELS: Partial<Hotel>[] = [
  {
    id: 1,
    name: '上海静安瑞吉酒店',
    address: '静安区北京西路1008号',
    starRating: 5,
    tags: ['豪华', '外滩视角', '免费停车'],
    mainImage: 'https://img.yzcdn.cn/vant/ipad.jpeg'
  },
  {
    id: 2,
    name: '上海 W 酒店',
    address: '虹口区旅顺路66号',
    starRating: 5,
    tags: ['网红', '外滩夜景'],
    mainImage: 'https://img.yzcdn.cn/vant/ipad.jpeg'
  }
]

export default function HotelList() {
  const goToDetail = (id: number) => {
    Taro.navigateTo({ url: `/pages/hotel/detail/index?id=${id}` })
  }

  return (
    <View className='list-container'>
      <View className='filter-bar'>
        <Text className='filter-item active'>综合排序</Text>
        <Text className='filter-item'>价格</Text>
        <Text className='filter-item'>星级</Text>
        <Text className='filter-item'>筛选</Text>
      </View>

      <View className='hotel-list'>
        {MOCK_HOTELS.map(hotel => (
          <View key={hotel.id} className='hotel-card' onClick={() => goToDetail(hotel.id!)}>
            <Image className='hotel-img' src={hotel.mainImage!} mode='aspectFill' />
            <View className='hotel-info'>
              <View className='hotel-name'>{hotel.name}</View>
              <View className='hotel-rating'>
                <Rate readOnly defaultValue={hotel.starRating} size="12" />
                <Text className='rating-text'>{hotel.starRating}分</Text>
              </View>
              <View className='hotel-tags'>
                {hotel.tags?.map(tag => (
                  <Tag key={tag} type='primary' plain margin='0 4px 0 0'>{tag}</Tag>
                ))}
              </View>
              <View className='hotel-bottom'>
                <View className='hotel-address'>{hotel.address}</View>
                <View className='hotel-price'>
                  <Price price={888} size="normal" currency="¥" />
                  <Text className='price-unit'>起</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
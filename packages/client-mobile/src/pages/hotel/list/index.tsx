import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Tag } from '@nutui/nutui-react-taro'
import { Hotel } from '@yisu/shared'
import './index.scss'

// 扩展前端展示用的类型
interface HotelUI extends Partial<Hotel> {
  price: number;
  score: number;
  comments: number;
  collects: number;
  distance: string; // 距离描述
  discountText?: string; // 钻石优惠文案
}

// 模拟数据 (补全了 price)
const MOCK_HOTELS: HotelUI[] = [
  {
    id: 1,
    name: '上海陆家嘴禧玥酒店',
    address: '近外滩·东方明珠',
    score: 4.8,
    comments: 4695,
    collects: 6.3,
    distance: 'BOSS:25楼是沪上知名米其林新荣记', // 借用这个字段展示榜单信息
    tags: ['免费升房', '新中式风', '免费停车', '一线江景'],
    mainImage: 'https://img14.360buyimg.com/imagetools/jfs/t1/167907/29/10334/51410/60486665E0e585f6e/9b45e2a2754687d5.png',
    price: 936,
    discountText: '钻石贵宾价'
  },
  {
    id: 2,
    name: '艺龙安悦酒店(上海浦东大道歇浦路地铁站店)',
    address: '近歇浦路地铁站·LCM置汇旭辉广场',
    score: 4.7,
    comments: 6729,
    collects: 4.5,
    distance: '临滨江步道可欣赏陆家嘴夜景',
    tags: ['免费停车', '免费洗衣服务', '机器人服务', '自助早餐'],
    mainImage: 'https://img13.360buyimg.com/imagetools/jfs/t1/214343/17/9985/107085/61ca8694E2b56e9c4/18a096c4a8525f23.png',
    price: 199,
    discountText: '钻石贵宾价'
  }
]

export default function HotelList() {
  const goToDetail = (id: number) => {
    Taro.navigateTo({ url: `/pages/hotel/detail/index?id=${id}` })
  }

  return (
    <View className='list-container'>
      {/* 顶部筛选栏 (静态模拟) */}
      <View className='filter-bar'>
        <View className='search-header'>
          <Text className='city'>上海</Text>
          <View className='date-info'>
            <Text className='d-text'>住 01-09</Text>
            <Text className='d-text'>离 01-10</Text>
          </View>
          <View className='search-input'>位置/品牌/酒店</View>
        </View>
        <View className='sort-tabs'>
          <Text className='tab active'>欢迎度排序</Text>
          <Text className='tab'>位置距离</Text>
          <Text className='tab'>价格/星级</Text>
          <Text className='tab'>筛选</Text>
        </View>
        <View className='quick-filters'>
          <Tag plain round>外滩</Tag>
          <Tag plain round>双床房</Tag>
          <Tag plain round>含早餐</Tag>
          <Tag plain round>免费兑早餐</Tag>
        </View>
      </View>

      <ScrollView scrollY className='hotel-list'>
        {MOCK_HOTELS.map(hotel => (
          <View key={hotel.id} className='hotel-card' onClick={() => goToDetail(hotel.id!)}>
            <Image className='hotel-img' src={hotel.mainImage!} mode='aspectFill' />
            <View className='hotel-info'>
              <View className='name-row'>
                <Text className='hotel-name'>{hotel.name}</Text>
                {/* 模拟钻石图标 */}
                <Text className='diamond'>💎💎💎💎</Text>
              </View>
              
              <View className='score-row'>
                <View className='score-box'>
                  <Text className='score'>{hotel.score}</Text>
                  <Text className='level'>超棒</Text>
                </View>
                <Text className='comment-info'>{hotel.comments}点评 · {hotel.collects}万收藏</Text>
              </View>

              <View className='address-text'>{hotel.address}</View>
              <View className='rank-text'>{hotel.distance}</View>

              <View className='tags-row'>
                {hotel.tags?.map(tag => (
                  <Text key={tag} className='simple-tag'>{tag}</Text>
                ))}
              </View>

              {/* 价格区域 */}
              <View className='price-section'>
                <View className='price-box'>
                  <Text className='currency'>¥</Text>
                  <Text className='amount'>{hotel.price}</Text>
                  <Text className='unit'>起</Text>
                </View>
                {hotel.discountText && (
                  <View className='discount-box'>
                    <Text className='d-text'>{hotel.discountText} {'>'}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        ))}
        <View className='list-padding'></View>
      </ScrollView>
    </View>
  )
}
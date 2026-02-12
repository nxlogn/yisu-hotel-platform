import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { Price } from '@nutui/nutui-react-taro'
import { ArrowRight, Location, Share, Service } from '@nutui/icons-react-taro'
import './index.scss'

const MOCK_ROOMS = [
  { id: 101, name: '经典双床房', price: 936, info: '2张1.2米单人床 40㎡ 2人入住 5-15层', stock: 5, tags: ['含早餐', '立即确认'] },
  { id: 102, name: '豪华江景大床房', price: 1288, info: '1张2米特大床 45㎡ 2人入住 10-20层', stock: 2, tags: ['含早餐', '免费取消'] },
]

export default function HotelDetail() {
  const router = useRouter()

  return (
    <View className='detail-container'>
      {/* 1. 顶部自定义导航 (透明背景) */}
      <View className='custom-nav'>
        <View className='nav-icon back' onClick={() => Taro.navigateBack()}>
          <ArrowRight size={16} color="#fff"/>
        </View>
        <View className='nav-right'>
          <View className='nav-icon'>
            <Share size={16} color="#fff" />
          </View>
        </View>
      </View>

      {/* 2. Banner + 浮层按钮 */}
      <View className='hotel-banner'>
        <Image 
          className='banner-img' 
          src='https://img14.360buyimg.com/imagetools/jfs/t1/167907/29/10334/51410/60486665E0e585f6e/9b45e2a2754687d5.png' 
          mode='aspectFill' 
        />
        {/* 浮层按钮 */}
        <View className='banner-actions'>
          <View className='action-btn active'>封面</View>
          <View className='action-btn'>精选</View>
          <View className='action-btn'>位置</View>
          <View className='action-btn'>相册</View>
          <View className='sound-icon'>🔊</View>
        </View>
      </View>

      {/* 3. 核心信息卡片 */}
      <View className='info-card'>
        <View className='header-row'>
          <View className='title-box'>
            <Text className='hotel-name'>上海陆家嘴禧玥酒店</Text>
            <View className='diamond-row'>
              <Text className='diamond'>💎💎💎💎💎</Text>
            </View>
          </View>
          {/* 右上角榜单徽章 */}
          <View className='rank-badge'>
            <View className='cup-icon'>🏆</View>
            <Text className='badge-title'>口碑榜</Text>
            <Text className='badge-desc'>上榜酒店</Text>
          </View>
        </View>

        {/* 榜单条 */}
        <View className='rank-bar'>
          <Text className='rank-text'>上海美景酒店榜 No.16</Text>
          <ArrowRight size={10} color="#b8860b" />
        </View>

        {/* 设施图标网格 (优化样式) */}
        <View className='facility-grid'>
          <View className='facility-item'>
            <Text className='icon'>🏢</Text>
            <Text className='f-text'>2020年开业</Text>
          </View>
          <View className='facility-item'>
            <Text className='icon'>⛩️</Text>
            <Text className='f-text'>新中式风</Text>
          </View>
          <View className='facility-item'>
            <Text className='icon'>🅿️</Text>
            <Text className='f-text'>免费停车</Text>
          </View>
          <View className='facility-item'>
            <Text className='icon'>🌊</Text>
            <Text className='f-text'>一线江景</Text>
          </View>
          <View className='facility-more'>
            <Text>设施/政策</Text>
            <ArrowRight size={10} color="#666" />
          </View>
        </View>

        {/* 蓝色评分栏 */}
        <View className='review-box'>
          <View className='score-box'>
            <Text className='score'>4.8</Text>
            <Text className='level'>超棒</Text>
            <Text className='count'>4695条 {'>'}</Text>
          </View>
          <Text className='review-desc'>“中式风格装修，舒适安逸”</Text>
        </View>

        {/* 地址栏 */}
        <View className='address-box'>
          <View className='addr-info'>
            <Text className='addr-text'>距离塘桥地铁站步行1.5公里,约22分钟</Text>
            <Text className='addr-detail'>浦东新区浦明路868弄3号楼</Text>
          </View>
          <View className='map-icon'>
            <Location size={20} color="#333" />
            <Text className='map-text'>地图</Text>
          </View>
        </View>
      </View>

      {/* 4. 日期选择 */}
      <View className='date-section'>
        <View className='date-row'>
          <Text className='date'>1月09日</Text>
          <Text className='week'>今天</Text>
          <Text className='night-tag'>1晚</Text>
          <Text className='date'>1月10日</Text>
          <Text className='week'>明天</Text>
          <ArrowRight size={12} color="#ccc" style={{ marginLeft: 'auto' }} />
        </View>
        <View className='promo-tip'>
          <Text className='tip-icon'>☾</Text>
          <Text>当前已过0点，如需今天凌晨6点前入住，请选择"今天凌晨"</Text>
        </View>
      </View>

      {/* 5. 房型列表 */}
      <View className='room-list'>
        {MOCK_ROOMS.map(room => (
          <View key={room.id} className='room-card'>
            <View className='room-main'>
              <Image className='room-img' src='https://img10.360buyimg.com/imagetools/jfs/t1/139360/4/18258/395679/5fd044e3E52c50567/46026a76054817c1.jpg' mode='aspectFill' />
              <View className='room-info'>
                <Text className='r-name'>{room.name}</Text>
                <Text className='r-desc'>{room.info}</Text>
                <View className='r-tags'>
                  {room.tags.map(tag => <Text key={tag} className='r-tag'>{tag}</Text>)}
                </View>
              </View>
            </View>
            
            {/* 价格与预订按钮行 */}
            <View className='room-action-row'>
              <View className='cancel-rule'>
                <Text>免费取消</Text>
              </View>
              <View className='price-group'>
                <View className='price-val'>
                  <Text className='symbol'>¥</Text>
                  <Text className='num'>{room.price}</Text>
                </View>
                <View className='book-btn'>查看房型</View>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* 6. 底部浮动栏 */}
      <View className='bottom-bar'>
        <View className='service-btn'>
          <Service size={20} color="#333" />
          <Text className='s-text'>问酒店</Text>
        </View>
        <View className='price-total'>
          <Text className='symbol'>¥</Text>
          <Text className='num'>936</Text>
          <Text className='qi'>起</Text>
        </View>
        <View className='book-btn'>查看房型</View>
      </View>
    </View>
  )
}
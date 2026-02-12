import { View, Text, Image, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Location, Search } from '@nutui/icons-react-taro'
import { useState } from 'react'
import './index.scss'

export default function Index() {
  const [activeTab, setActiveTab] = useState(0)
  
  // 日期状态
  const [startDate, setStartDate] = useState('2026-01-09')
  const [endDate, setEndDate] = useState('2026-01-10')

  const tabs = ['国内', '海外', '钟点房', '民宿']

  // 计算晚数
  const getNights = () => {
    const s = new Date(startDate).getTime()
    const e = new Date(endDate).getTime()
    return Math.max(1, Math.floor((e - s) / (24 * 3600 * 1000)))
  }

  // 格式化日期显示 (01月09日)
  const formatDate = (dateStr: string) => {
    const [_, m, d] = dateStr.split('-')
    return `${m}月${d}日`
  }

  const handleAdClick = () => {
    Taro.navigateTo({ url: '/pages/hotel/detail/index?id=1&from=ad' })
  }

  return (
    <View className='home-container'>
      <View className='top-banner' onClick={handleAdClick}>
        <Image 
          className='banner-img' 
          src='https://img13.360buyimg.com/imagetools/jfs/t1/214343/17/9985/107085/61ca8694E2b56e9c4/18a096c4a8525f23.png' 
          mode='aspectFill' 
        />
        <View className='ad-tag'>广告</View>
      </View>

      <View className='search-section'>
        <View className='custom-tabs'>
          {tabs.map((tab, index) => (
            <View 
              key={tab} 
              className={`tab-item ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
              {activeTab === index && <View className='active-line' />}
            </View>
          ))}
        </View>

        <View className='search-content'>
          <View className='location-row'>
            <View className='city-wrapper'>
              <Text className='city'>上海</Text>
              <View className='arrow-down' />
            </View>
            <View className='search-box-mock'>
              <Search size={14} color="#999" />
              <Text className='placeholder'>位置/品牌/酒店</Text>
            </View>
            <View className='location-icon'>
              <Location size={18} color="#0052ff" />
              <Text className='loc-text'>我的位置</Text>
            </View>
          </View>

          {/* 日期选择器 */}
          <View className='date-row'>
            <Picker mode='date' value={startDate} onChange={(e) => setStartDate(e.detail.value)}>
              <View className='date-item'>
                <Text className='d-val'>{formatDate(startDate)}</Text>
                <Text className='d-label'>今天</Text>
              </View>
            </Picker>
            
            <View className='date-divider'>-</View>

            <Picker mode='date' value={endDate} onChange={(e) => setEndDate(e.detail.value)}>
              <View className='date-item'>
                <Text className='d-val'>{formatDate(endDate)}</Text>
                <Text className='d-label'>明天</Text>
              </View>
            </Picker>

            <View className='date-count'>共{getNights()}晚</View>
          </View>

          <View className='price-row'>
            <Text className='label'>价格/星级</Text>
            <Text className='arrow'>〉</Text>
          </View>

          <View className='quick-tags'>
            <View className='q-tag'>免费停车</View>
            <View className='q-tag'>浦东国际机场</View>
            <View className='q-tag'>虹桥站</View>
          </View>

          <View className='search-btn-box'>
            <View 
              className='main-search-btn' 
              onClick={() => Taro.navigateTo({ url: '/pages/hotel/list/index' })}
            >
              查 询
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
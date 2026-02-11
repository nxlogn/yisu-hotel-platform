import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Button, Calendar } from '@nutui/nutui-react-taro'
import { useState } from 'react'
import './index.scss'

export default function Index() {
  const [isVisible, setIsVisible] = useState(false)
  const [date, setDate] = useState('请选择日期')

  const onConfirm = (values: any) => {
    const start = values[0][3]
    const end = values[1][3]
    setDate(`${start} - ${end}`)
  }

  const handleSearch = () => {
    Taro.navigateTo({ url: '/pages/hotel/list/index' })
  }

  return (
    <View className='home-container'>
      <View className='banner'>
        <View className='banner-title'>易宿，开启您的舒适之旅</View>
      </View>

      <View className='search-card'>
        {/* 使用基础 View 替代 Cell */}
        <View className='search-item' border-bottom>
          <View className='item-left'>
            <Text className='label'>目的地</Text>
            <Text className='value'>上海</Text>
          </View>
          <View className='item-right'>
            <Text className='location-text'>我的位置</Text>
          </View>
        </View>

        <View className='search-item' onClick={() => setIsVisible(true)}>
          <View className='item-left'>
            <Text className='label'>选择日期</Text>
            <Text className='value'>{date}</Text>
          </View>
          <View className='item-arrow'>〉</View>
        </View>
        
        <View className='search-btn-wrapper'>
          <Button block type='primary' onClick={handleSearch}>
            开始搜索
          </Button>
        </View>
      </View>

      <Calendar
        visible={isVisible}
        type="range"
        onClose={() => setIsVisible(false)}
        onConfirm={onConfirm}
      />
    </View>
  )
}
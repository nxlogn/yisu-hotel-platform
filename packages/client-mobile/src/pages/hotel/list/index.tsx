import { View, Text } from '@tarojs/components'
import { definePageConfig } from '@tarojs/taro'
import { Button } from '@nutui/nutui-react-taro'

export default function HotelList() {
  return (
    <View className="hotel-list">
      <Text>酒店列表页</Text>
      <Button type="primary">筛选</Button>
    </View>
  )
}

import { View, Text } from '@tarojs/components'
import { Button } from '@nutui/nutui-react-taro'

export default function UserProfile() {
  return (
    <View className="user-profile">
      <Text>个人中心</Text>
      <Button block type="info">登录</Button>
    </View>
  )
}

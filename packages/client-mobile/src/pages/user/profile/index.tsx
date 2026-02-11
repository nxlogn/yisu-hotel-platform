import { View, Text } from '@tarojs/components'
import { Avatar, Cell, Grid } from '@nutui/nutui-react-taro'
import { User, Order, Coupon, Setting, Service } from '@nutui/icons-react-taro'
import './index.scss'

export default function UserProfile() {
  return (
    <View className='profile-container'>
      {/* 顶部背景与头像 */}
      <View className='profile-header'>
        <Avatar size="large" src='https://img12.360buyimg.com/imagetools/jfs/t1/143720/6/5903/5306/5f28f448E1ad13eec/67605587d7f4616c.jpg' />
        <View className='user-info'>
          <Text className='user-name'>易宿用户_688</Text>
          <Text className='user-role'>普通会员</Text>
        </View>
      </View>

      {/* 我的订单统计 */}
      <View className='stat-card'>
        <Grid columnNum={4}>
          <Grid.Item icon={<Order />} text="全部订单" />
          <Grid.Item icon={<Coupon />} text="优惠券" />
          <Grid.Item icon={<Service />} text="售后/客服" />
          <Grid.Item icon={<User />} text="我的评价" />
        </Grid>
      </View>

      {/* 功能列表 */}
      <View className='menu-list'>
        <Cell.Group>
          <Cell title="个人资料" extra={<Setting size={16} />} />
          <Cell title="酒店收藏" extra="3" />
          <Cell title="常用入住人" />
          <Cell title="关于易宿" extra="v1.0.0" />
        </Cell.Group>
      </View>
      
      <View className='logout-btn'>
        退出登录
      </View>
    </View>
  )
}
export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/hotel/list/index',
    'pages/hotel/detail/index',
    'pages/order/list/index',
    'pages/user/profile/index'
  ],
  tabBar: {
    custom: false,
    color: '#000000',
    selectedColor: '#DC143C',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页'
      },
      {
        pagePath: 'pages/hotel/list/index',
        text: '列表'
      },
      {
        pagePath: 'pages/order/list/index',
        text: '订单'
      },
      {
        pagePath: 'pages/user/profile/index',
        text: '我的'
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '易宿酒店',
    navigationBarTextStyle: 'black'
  }
})

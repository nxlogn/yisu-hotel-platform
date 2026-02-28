import Taro from '@tarojs/taro'
import { ApiResponse } from '@yisu/shared'

const BASE_URL = 'http://localhost:3000'


// 封装核心请求函数
async function request<T>(options: Taro.request.Option): Promise<T> {
  const { url, method = 'GET', data, header = {} } = options

  // 1. 自动拼接 BaseUrl
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`

  // 2. 显示加载中
  Taro.showLoading({ title: '加载中...', mask: true})

  try {
    const res = await Taro.request<ApiResponse<T>>({
      url: fullUrl,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        ...header,
      }
    })

    Taro.hideLoading()

    const { statusCode, data: body } = res

    // 3. 处理 HTTP 状态码
    if( statusCode >= 200 && statusCode < 300) {
      if( body.code === 200 || body.code === 201 ) {
        return body.data
      } else {
        Taro.showToast({
          title: body.msg || '请求失败',
          icon: 'none',
          duration: 2000
        })
        throw new Error(body.msg)
      }
    } else {
      Taro.showToast({
        title: `系统错误: ${statusCode}`,
        icon: 'none'
      })
      throw new Error(`HTTP Error: ${statusCode}`)
    }
  } catch (err) {
    Taro.hideLoading()
    console.error('Network Error:', err)
    throw err
  }
}


export default request
/**
 * 统一 APi响应结构
 * 前后端必须严格遵守次格式
 */

export interface ApiResponse<T = any> {
  code: number // 业务状态码
  msg: string  // 提示信息
  data: T      // 具体数据载荷
}

/**
 * 分页响应结构，预留给列表页使用
 */
export interface PaginatedResponse<T = any> {
  total: number // 总记录数
  list: T[]     // 分页数据列表
  pageSize: number // 每页记录数
  page: number  // 当前页码
}
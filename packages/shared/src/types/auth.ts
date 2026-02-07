import { UserRole } from './user'; // 确保引入了之前定义的枚举

// 注册请求参数
export interface RegisterDto {
  email: string;
  password: string;
  name?: string;
  role?: UserRole; // 允许前端传入 'MERCHANT'
}

// 登录请求参数
export interface LoginDto {
  email: string;
  password: string;
}

// 登录成功返回结果
export interface AuthResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
    name?: string;
    role: UserRole;
  };
}
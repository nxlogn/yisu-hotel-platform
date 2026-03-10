import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import type { RegisterDto } from '@yisu/shared';

// @Controller('auth') 意味着这个类下的所有接口都会以 /auth 开头
@Controller('auth')
export class AuthController {
  // 注入 UsersService
  constructor(private readonly usersService: UsersService) {}

  // @Post('register') 对应的完整路径是 POST /auth/register
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // 接收到前端传来的 registerDto，直接调用 UsersService 中的 create 方法存入数据库
    return this.usersService.create(registerDto);
  }
}
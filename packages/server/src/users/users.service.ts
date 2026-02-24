import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';
import type { RegisterDto } from '@yisu/shared';
// UserRole 是 enum（值），所以不需要 type（如果在 shared 里是 enum 的话）
// 如果你的 shared 里 UserRole 也是 type/interface，这里也要加 type
import { UserRole } from '@yisu/shared'; 

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * 创建用户 (注册逻辑)
   */
  async create(dto: RegisterDto) {
    // 1. 检查邮箱是否已存在
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // 2. 密码加密
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. 写入数据库
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        // 这里为了安全，确保 role 是合法的枚举值，或者给默认值
        role: dto.role || UserRole.USER, 
        name: dto.name,
      },
    });

    // 4. 返回时不包含密码
    const { password, ...result } = user;
    return result;
  }

  /**
   * 根据邮箱查找用户 (登录逻辑用)
   */
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    // 注册prisma模块，isGlobal：true表示全项目通用，不用到处import
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        explicitConnect: true, // 显式链接，有助于避免某些冷启动问题
      },
    })
  ],
  controllers: [],
  providers: [],
})


export class AppModule {}

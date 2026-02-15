
# 服务端开发指南 (Backend Development Guide)

> **文档目标**: 指导服务端开发工作，确保满足大作业评分标准（功能完整性 60% + 代码质量 10% + 技术复杂度 10%）。
> **核心原则**: Type First (类型先行) -> Prisma Schema (模型驱动) -> NestJS Logic (业务实现)。

---

## 🛠 1. 技术架构与规范

* **框架**: NestJS (Node.js)
* **数据库**: MySQL / PostgreSQL (通过 Prisma ORM 管理)
* **语言**: TypeScript (严格模式)
* **通信协议**: RESTful API
* **通用响应格式**:
    ```typescript
    // 位于 packages/shared/src/types/response.ts
    export interface ApiResponse<T = any> {
      code: number; // 200 成功, 非 200 异常
      msg: string;  // 提示信息
      data: T;      // 数据载荷
    }
    ```

---

## 🗄 2. 数据库模型设计 (Database Schema)

> [cite_start]**评分点**: “表结构设计合理” (4分) + “数据维度完整” [cite: 58, 105]。
> **注意**: 必须处理好 角色(Role) 和 状态(Status) 的枚举。

### 核心模型 (Prisma)

请在 `packages/server/prisma/schema.prisma` 中实现：

```prisma
// 1. 用户角色枚举
enum UserRole {
  USER      // C端普通用户
  MERCHANT  // 商户 (负责录入)
  ADMIN     // 管理员 (负责审核)
}

[cite_start]// 2. 酒店状态枚举 [cite: 66]
enum HotelStatus {
  PENDING   // 审核中
  PUBLISHED // 已发布
  REJECTED  // 审核不通过
  OFFLINE   // 下线 (非物理删除，可恢复)
}

// 3. 用户表
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String   // 加密存储
  name      String?
  [cite_start]role      UserRole @default(USER) // [cite: 66] 注册时区分角色
  createdAt DateTime @default(now())
  
  hotels    Hotel[]  // 商户关联的酒店
  orders    Order[]  // 用户的订单
}

// 4. 酒店表 (核心业务)
model Hotel {
  id          Int         @id @default(autoincrement())
  [cite_start]name        String      // [cite: 58] 中文名
  nameEn      String?     [cite_start]// [cite: 58] 英文名
  [cite_start]address     String      // [cite: 58] 地址
  [cite_start]starRating  Int         // [cite: 58] 星级
  [cite_start]openingDate DateTime    // [cite: 58] 开业时间
  description String?     @db.Text
  [cite_start]price       Int         // [cite: 58] 起价 (分)
  
  [cite_start]// 加分项: 扩展信息 [cite: 60-61]
  tags        String?     // JSON/逗号分隔: "亲子,免费停车,靠近机场"
  nearbyInfo  String?     @db.Text // JSON: 周边景点/交通
  
  [cite_start]// 审核流转 [cite: 66]
  status       HotelStatus @default(PENDING)
  rejectReason String?     // 审核不通过原因
  
  merchantId  Int
  merchant    User        @relation(fields: [merchantId], references: [id])
  rooms       Room[]
  createdAt   DateTime    @default(now())
}

// 5. 房型表
model Room {
  id       Int     @id @default(autoincrement())
  name     String  // 如: 豪华大床房
  [cite_start]price    Int     // [cite: 58] 价格
  capacity Int     // 入住人数
  hotelId  Int
  hotel    Hotel   @relation(fields: [hotelId], references: [id])
  orders   Order[]
}

// 6. 订单表
model Order {
  id          Int      @id @default(autoincrement())
  orderNo     String   @unique
  userId      Int
  user        User     @relation(fields: [userId], references: [id])
  roomId      Int
  room        Room     @relation(fields: [roomId], references: [id])
  [cite_start]checkIn     DateTime // [cite: 63] 入住日期
  [cite_start]checkOut    DateTime // [cite: 63] 离店日期
  totalAmount Int
  status      String   // PENDING, PAID, CANCELLED
  createdAt   DateTime @default(now())
}

```

---

## 🧩 3. 模块功能开发清单 (Modules)

根据 PDF 需求拆解为以下模块，建议按顺序开发：

### 3.1 鉴权模块 (Auth Module)

* [ ] **POST /auth/register**: 用户/商户注册 。


* *逻辑*: 接收 `email`, `password`, `role`。如果是商户注册，需标记 `role: MERCHANT`。


* [ ] **POST /auth/login**: 登录 。


* *逻辑*: 校验密码，发放 JWT Token。无需前端选择角色，后端自动识别并返回用户信息。


* [ ] **Guard**: 实现 JWT 守卫，保护后续接口。

### 3.2 酒店管理模块 (Hotel Module - 商户端)

> 
> **目标**: 满足商户录入需求 。
> 
> 

* [ ] **POST /hotels**: 创建酒店。
* *权限*: 仅 `MERCHANT`。
* *逻辑*: 写入基本信息，初始状态设为 `PENDING`。


* [ ] **PUT /hotels/:id**: 编辑酒店。
* 
*逻辑*: 修改信息后，数据需实时更新 。




* [ ] **GET /hotels/my**: 获取当前商户名下的酒店列表。

### 3.3 审核模块 (Admin Module - 管理端)

> 
> **目标**: 满足管理员审核需求 。
> 
> 

* [ ] **GET /admin/hotels**: 获取所有状态的酒店（含待审核）。
* *权限*: 仅 `ADMIN`。


* [ ] **PATCH /admin/hotels/:id/audit**: 审核操作。
* *参数*: `{ status: 'PUBLISHED' | 'REJECTED', reason: '...' }`。
* 
*逻辑*: 若拒绝，必须填写 `reason` 。




* [ ] **PATCH /admin/hotels/:id/offline**: 下线/上线操作。

### 3.4 搜索与展示模块 (Public Module - 用户端)

> 
> **目标**: 满足C端查询需求，需支持复杂筛选 。
> 
> 

* [ ] **GET /hotels**: 酒店列表查询。
* *Query参数*: `city`, `checkIn`, `checkOut`, `keyword`, `starRating`, `priceMin`, `priceMax`。
* *排序*: 推荐排序、价格排序、距离排序（可选）。


* [ ] **GET /hotels/:id**: 酒店详情。
* 
*返回*: 酒店基础信息 + 房型列表 (按价格从低到高排序) 。





### 3.5 订单模块 (Order Module)

* [ ] **POST /orders**: 创建订单。
* *逻辑*: 检查房型库存（简化版可不锁库存，只生成记录），计算总价。


* [ ] **GET /orders/my**: 我的订单列表。

---

## 📅 4. 开发优先级与路线图

1. **Phase 1 (基础架构)**:
* 配置 NestJS + Prisma。
* 实现全局 Response Interceptor (统一 JSON 格式)。
* 完成 Auth 模块 (注册/登录)。


2. **Phase 2 (核心业务 - 生产者)**:
* 完成 **商户端** 酒店录入接口 (让管理端队友有数据可调)。
* 完成 **管理端** 审核接口。


3. **Phase 3 (核心业务 - 消费者)**:
* 完成 **移动端** 列表查询与筛选接口 (这是性能评分重点)。
* 完成 详情页与下单接口。


4. **Phase 4 (优化)**:
* 添加 Swagger 文档 (加分项: 良好的 Readme/文档 )。





---

## ⚠️ 5. 特别注意事项 (踩坑指南)

1. **金额处理**: 数据库存 `Int` (分)，不要存 `Float` (元)，避免精度丢失。
2. **类型共享**: 所有 DTO (Data Transfer Object) 和接口返回类型，**必须** 先在 `packages/shared` 中定义，再在 Server 中引用。
3. **Prisma 7**: 记得使用 `prisma.config.ts` 配置数据库连接，不要在 schema 中硬编码 `env()`。

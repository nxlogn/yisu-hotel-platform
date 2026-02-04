# 🏨 易宿 (YiSu) - 智慧出行酒店预订平台

> **项目代号**: `yisu-hotel-platform`
> **目标**: 打造全栈 TypeScript、高性能、高可用的酒店预订系统。
> **当前状态**: 🚀 开发启动阶段

## 📖 项目简介 (Introduction)

本项目采用 **Monorepo (单体仓库)** 架构，统一管理移动端、PC管理端及服务端代码。核心设计理念是 **"Type First" (类型优先)**，利用 TypeScript 在前后端共享数据定义，最大化提升开发效率与代码健壮性。

## 🛠 技术栈 (Tech Stack)

| 模块 | 技术选型 | 说明 |
| :--- | :--- | :--- |
| **架构管理** | **pnpm + Turborepo** | Monorepo 工作区管理，依赖安装快，磁盘占用小 |
| **语言核心** | **TypeScript (v5)** | 全栈强类型，严禁随意使用 `any` |
| **公共库** | **Local Package** | `packages/shared` 用于存放前后端共用的接口定义、常量 |
| **服务端** | **NestJS + Prisma** | 企业级 Node.js 框架，RESTful API，ORM 数据库操作 |
| **移动端** | **Taro (React) + NutUI** | 覆盖 H5 与 小程序，京东风格组件库 |
| **管理端** | **Next.js + Ant Design** | SSR 渲染，高性能 PC 后台管理系统 |

---

## 📂 目录结构 (Structure)

请务必熟悉目录结构，不要将代码放错位置。

```text
yisu-hotel-platform/
├── package.json           # 根依赖管理，定义启动脚本
├── pnpm-workspace.yaml    # 工作区定义
├── packages/              # 核心代码目录
│   ├── shared/            # 【核心】公共类型库
│   │   ├── src/types/     # 存放 interface (如 User, Hotel, Order)
│   │   └── package.json   # 命名为 @yisu/shared
│   │
│   ├── server/            # 后端服务 (NestJS)
│   │   └── src/           # 包含 Controller, Service, Database
│   │
│   ├── client-mobile/     # 移动端 (Taro)
│   │   └── src/pages/     # 首页、列表、详情页
│   │
│   └── client-admin/      # PC后台 (Next.js)
│       └── src/app/       # 登录、商户管理、审核页面

```

---

## 🚀 快速开始 (Getting Started)

### 1. 环境准备

确保你的本地环境满足以下要求：

* **Node.js**: >= 18.0.0
* **pnpm**: >= 8.0.0 (必须使用 pnpm，不要用 npm/yarn)

```bash
# 如果未安装 pnpm
npm install -g pnpm

```

### 2. 安装依赖 & 启动

在项目**根目录**下执行：

```bash
# 1. 安装所有子项目的依赖
pnpm install

# 2. 一键启动所有服务 (Server + Mobile + Admin)
pnpm dev

```

启动成功后：

* 🚀 **Server**: `http://localhost:3000`
* 📱 **Mobile**: `http://localhost:10086` (具体端口看控制台)
* 💻 **Admin**: `http://localhost:3001`

### 单独启动某个端

如果你只想开发移动端，可以只启动移动端，减少电脑发热：

```bash
pnpm dev:mobile  # 只启动移动端
pnpm dev:admin   # 只启动后台
pnpm dev:server  # 只启动后端

```

---

## 🤝 开发协作规范 (Workflow)

> **必读**：详细的团队协作流程与 Git 规范请务必阅读：[📖 团队协作与开发流程指南](./WORKFLOW.md)

为了拿高分（代码质量分 & 团队协作分），请严格遵守以下流程：

### 1. 类型先行原则 (Type First) 👑

**这是我们项目最大的优势，请务必执行：**

* ❌ **禁止**：前端直接写页面，后端直接写接口，最后才去对字段。
* ✅ **正确**：
1. 遇到新功能（如“酒店详情”），先在 `packages/shared/types` 定义 `interface HotelDetail`。
2. 前端在页面中引入这个类型，使用 Mock 数据开发 UI。
3. 后端引入这个类型，编写 API 实现。
4. 联调时，数据结构天然一致。



### 2. Git 提交规范

文档要求提交记录清晰，我们将检查 Commit Message。
格式：`type(scope): description`

* `feat`: 新增功能 (feat: 完成酒店列表页瀑布流)
* `fix`: 修复 Bug (fix: 解决跨域登录失效问题)
* `docs`: 文档变更
* `style`: 代码格式调整（不影响逻辑）
* `refactor`: 代码重构
* `chore`: 构建过程或辅助工具变动

### 3. 分支管理

* `main`: **主分支 (保护状态)**。严禁直接 Push，必须通过 Pull Request 合并。
* `dev`: **开发主分支**。大家的日常代码合并到这里。
* `feat/xxx`: **个人特性分支**。例如 `feat/login-page`，开发完合并回 `dev`。

---

## 📝 功能清单与分工 (Tasks)

### 📱 移动端 (Client Mobile)

> 重点关注：用户体验、滑动流畅度、视觉美感

* [ ] **首页 (Home)**: 顶部 Banner、地理位置定位、搜索入口
* [ ] **酒店列表 (List)**:
* [ ] 筛选功能 (价格、星级)
* [ ] **加分项**: 虚拟列表/瀑布流加载


* [ ] **酒店详情 (Detail)**: 图片预览、房型展示、地图位 (可选)
* [ ] **下单流程**: 日历选择、提交订单
* [ ] **个人中心**: 我的订单列表 (待入住/已完成)

### 💻 PC管理端 (Client Admin)

> 重点关注：表单验证、权限控制、逻辑严密

* [ ] **鉴权系统**: 登录/注册 (区分 商户 vs 管理员)
* [ ] **酒店管理 (商户)**:
* [ ] 酒店信息录入 (多步骤表单)
* [ ] 房型与价格管理


* [ ] **审核后台 (管理员)**:
* [ ] 待审核酒店列表
* [ ] 通过/驳回操作



### 🔙 服务端 (Server)

> 重点关注：接口规范、数据库设计

* [ ] **通用模块**: 全局异常拦截、统一响应结构 (`{ code: 200, data: ..., msg: '' }`)
* [ ] **用户模块**: JWT 登录认证
* [ ] **业务模块**: 酒店 CRUD、订单状态流转逻辑

---

**Let's code! 🚀 预祝大家结营大作业满分拿下！**
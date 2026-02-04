
# 🌊 易宿平台 - 团队协作与开发流程指南

> **必读**：为了保证代码质量，避免“代码冲突”和“类型报错”，请所有成员在开发前务必阅读本指南。

---

## 🌳 一、 Git 分支管理策略

本项目采用 **简化版 Git Flow**，只有两条长期分支，其余均为临时分支。

| 分支名 | 作用 | 权限 | 说明 |
| :--- | :--- | :--- | :--- |
| **`main`** | 生产环境 | 🔒 **保护** | 随时可演示的版本。**严禁直接 Push**，仅能由队长从 dev 合并。 |
| **`dev`** | 开发主线 | 🛡️ **保护** | 大家的公共代码库。**严禁直接 Push**，必须通过 PR 合并。 |
| **`feat/xxx`** | 功能分支 | ✅ 自由 | 个人开发分支，从 dev 切出，开发完合回 dev，随后删除。 |
| **`fix/xxx`** | 修复分支 | ✅ 自由 | Bug 修复分支。 |

---

## 🏃 二、 日常开发标准流程 (SOP)

请严格按照以下 **7步走** 进行开发：

### 第一步：同步代码 (Sync)
每天开工前，或者准备开发新功能前，必须保证你的本地 `dev` 是最新的。

```bash
git checkout dev
git pull origin dev

```

### 第二步：新建分支 (Checkout)

从最新的 `dev` 切出一个新分支。
**命名规范**：`类型/功能描述` (例如 `feat/hotel-list`, `fix/login-btn`)

```bash
git checkout -b feat/my-feature-name

```

### 第三步：类型先行 (Type First) 👑

**这是我们 Monorepo 架构的核心优势，请遵守：**

1. 如果涉及数据交互，**先去 `packages/shared/types` 定义接口类型**。
2. 前端：引入该类型，使用 Mock 数据写 UI。
3. 后端：引入该类型，写 API 实现。

### 第四步：开发与提交 (Commit)

开发过程中多提交，不要攒几天才提交一次。
**Commit Message 规范**：`type(scope): description`

* `feat`: 新功能
* `fix`: 修补 bug
* `docs`: 文档修改
* `style`: 代码格式修改 (不影响代码运行的变动)
* `refactor`: 重构 (即不是新增功能，也不是修改 bug 的代码变动)

```bash
# 示例
git add .
git commit -m "feat(mobile): 完成酒店列表页的筛选栏布局"

```

### 第五步：推送到远程 (Push)

开发完成后，将你的分支推送到 GitHub。

```bash
git push --set-upstream origin feat/my-feature-name

```

### 第六步：发起合并请求 (Pull Request)

1. 打开 GitHub 仓库页面。
2. 点击 **"Compare & pull request"**。
3. **注意**：目标分支 (Base) 选 **`dev`** (❌千万别选 main)。
4. 写清楚你做了什么，点击 Create。
5. **群里喊一声**：“队长/兄弟们，我提了 PR，求 Review！”

### 第七步：合并后清理

当你的代码被合并进 `dev` 后：

```bash
git checkout dev
git pull origin dev
git branch -d feat/my-feature-name  # 删除本地的旧分支

```

---

## 💥 三、 冲突解决指南 (Panic Guide)

当你提 PR 时，或者本地 merge 时提示 **Conflict**，不要慌。

1. **切回你的分支**：
```bash
git checkout feat/my-feature-name

```


2. **把 dev 的新代码合过来** (这一步会触发冲突)：
```bash
git merge dev

```


3. **打开 VS Code**：
* 你会看到文件变红。
* 找到 `<<<<<<< HEAD` (你的代码) 和 `>>>>>>> dev` (别人的代码)。
* 决定保留哪部分（或者都保留），删除那些符号。


4. **重新提交**：
```bash
git add .
git commit -m "fix: resolve conflicts with dev"
git push

```


*此时 GitHub 上的 PR 会自动变绿。*

---

## 📝 四、 代码规范 (Coding Standards)

为了拿**代码质量分 (10分)**，请注意：

1. **TypeScript**:
* 🚫 **严禁使用 `any**`。实在不知道写什么类型，先问队长，或者用 `unknown`。
* ✅ 所有的接口返回值必须有 Interface 定义。


2. **Console.log**:
* 提交前请删除调试用的 `console.log`。


3. **命名**:
* 变量名使用 **小驼峰** (`hotelList`, `userInfo`)。
* 组件名使用 **大驼峰** (`HotelCard`, `searchBar` -> ❌ `SearchBar` -> ✅)。
* 常量使用 **全大写** (`MAX_COUNT`, `API_URL`)。


4. **文件结构**:
* 不要把所有代码写在一个文件里！超过 200 行请考虑拆分组件。



---

## 🛠 五、 常用命令速查表

| 场景 | 命令 |
| --- | --- |
| **一键启动所有项目** | `pnpm dev` |
| **只启动移动端** | `pnpm dev:mobile` |
| **只启动后端** | `pnpm dev:server` |
| **安装新依赖** | `pnpm add axios` (注意要在对应目录下运行，或者用过滤器) |
| **给移动端安依赖** | `pnpm -F client-mobile add nutui-react` |
| **检查代码规范** | `pnpm lint` |
# NapGram Packages

[![npm version](https://img.shields.io/npm/v/@napgram/plugin-kit.svg)](https://www.npmjs.com/org/napgram)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

NapGram 核心包和插件仓库 - 包含所有可复用的 kit 包和插件。

## 📦 包含内容

### 核心包（Core）
- `@napgram/infra-kit` - 基础设施核心
- `@napgram/runtime-kit` - 运行时核心
- `@napgram/plugin-kit` - 插件系统核心

### 客户端（Clients）
- `@napgram/qq-client` - QQ 客户端封装
- `@napgram/telegram-client` - Telegram 客户端封装
- `@napgram/database` - 数据库抽象层

### 工具包（Utilities）
- `@napgram/auth-kit` - 认证工具
- `@napgram/media-kit` - 媒体处理
- `@napgram/message-kit` - 消息处理
- `@napgram/web-interfaces` - Web 接口定义

### 插件（Plugins）
包含 30+ 个官方插件，分为：
- **适配器** - QQ/Telegram 平台适配器
- **管理插件** - 后台管理功能
- **功能插件** - 消息转发、命令处理等

## 🚀 快速开始

### 安装依赖
```bash
pnpm install
```

### 构建所有包
```bash
pnpm build
```

### 构建特定分类
```bash
pnpm build:core      # 只构建核心包
pnpm build:plugins   # 只构建插件
```

### 开发模式
```bash
pnpm dev
```

## 📝 开发插件

### 创建新插件
```bash
# TODO: 添加脚手架工具
npx @napgram/create-plugin my-plugin
```

### 本地开发
```bash
cd plugins/features/my-plugin
pnpm dev
```

## 🔧 发布流程

### GitHub Packages（推荐）

发布到 GitHub Packages（`npm.pkg.github.com`）并供主项目直接安装：

```bash
# 主项目或本地开发需要配置
@napgram:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<GITHUB_TOKEN or PAT>
```

CI 已包含发布流程（`Release` 工作流），推送到 `main` 后会按 Changesets 发布。

### 使用 Changesets
```bash
# 1. 标记变更
pnpm changeset

# 2. 更新版本号
pnpm changeset version

# 3. 发布到 npm
pnpm publish
```

## 📚 文档

- [开发指南](./docs/development.md)
- [插件开发](./docs/plugin-development.md)
- [发布流程](./docs/publishing.md)

## 🤝 贡献

欢迎贡献代码和插件！请查看 [贡献指南](CONTRIBUTING.md)。

## 📄 License

MIT

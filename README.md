# 收据生成器

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://receipt-generator-ten.vercel.app/)

一个由 Trae AI 完全生成的现代化收据生成器应用，支持多种模板、多语言和收据导出功能。基于React + TypeScript + Tailwind CSS构建，提供PWA支持。

## ✨ 功能特性

- 📝 多种收据模板选择
- 🌍 支持多语言（中文/英文）
- 🖨️ 一键生成收据
- 💾 下载收据为图片
- 🧾 自定义商家名称、日期、商品项等
- 📱 响应式设计，适配各种设备
- 📲 PWA支持，可安装为桌面应用并离线使用

## 🛠️ 技术栈

- **框架**: React 18
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态管理**: React Context
- **国际化**: i18next
- **构建工具**: Vite
- **PWA支持**: Service Worker + Web Manifest

## 🚀 快速开始

### 开发环境要求

- Node.js 16+
- pnpm 7+

### 安装

```bash
# 克隆项目
git clone https://github.com/FatDoge/receipt-generator.git

# 进入项目目录
cd receipt-generator

# 安装依赖
pnpm install
```

### 开发

```bash
# 启动开发服务器
pnpm run dev
```

### 构建

```bash
# 构建生产版本
pnpm run build
```

## 📁 项目结构

```
src/
├── components/     # React组件
├── context/        # React Context
├── data/          # 静态数据和模板
├── locales/       # 国际化文件
├── styles/        # 全局样式
├── utils/         # 工具函数
└── App.tsx        # 应用入口
```

## 📄 使用说明

1. 选择收据模板
2. 填写商家信息
3. 添加商品项
4. 点击"生成收据"按钮
5. 可下载收据图片

## 📜 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 🙏 致谢

- [Trae AI](https://trae.ai) - 本项目的代码生成助手
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [i18next](https://www.i18next.com/)
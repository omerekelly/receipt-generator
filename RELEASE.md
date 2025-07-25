# 发布指南

本文档提供了如何将Receipt Generator应用发布到GitHub Release的详细说明。

## 准备工作

1. 确保你有一个GitHub账号并已创建仓库
2. 确保你有适当的权限来创建releases和上传文件
3. 在本地生成一个GitHub个人访问令牌(PAT)用于自动发布

## 手动发布流程

### 1. 更新版本号

在`package.json`文件中更新版本号：

```json
{
  "name": "receipt-generator",
  "version": "x.y.z", // 更新这里的版本号
  ...
}
```

### 2. 创建Git标签

```bash
# 提交所有更改
git add .
git commit -m "准备发布 vx.y.z"

# 创建标签
git tag -a vx.y.z -m "版本 x.y.z"

# 推送标签到GitHub
git push origin vx.y.z
```

### 3. 手动构建应用

为不同平台构建应用：

```bash
# macOS
pnpm run electron:build:mac

# Windows
pnpm run electron:build:win

# Linux
pnpm run electron:build:linux
```

构建后的安装文件将位于`release`目录中。

### 4. 创建GitHub Release

1. 在GitHub仓库页面，点击"Releases"标签
2. 点击"Draft a new release"
3. 选择你刚刚创建的标签
4. 填写发布标题和描述
5. 上传`release`目录中的安装文件
6. 点击"Publish release"

## 自动发布流程

项目已配置GitHub Actions工作流，可以自动构建和发布应用。

### 1. 设置GitHub Secrets

在GitHub仓库中，需要设置以下secrets：

- `GITHUB_TOKEN`: GitHub自动提供，用于发布release

### 2. 触发自动发布

只需创建并推送一个新的版本标签，GitHub Actions将自动构建并发布应用：

```bash
# 更新package.json中的版本号并提交
git add .
git commit -m "准备发布 vx.y.z"

# 创建标签
git tag -a vx.y.z -m "版本 x.y.z"

# 推送标签到GitHub
git push origin vx.y.z
```

推送标签后，GitHub Actions将自动：

1. 检出代码
2. 设置Node.js和pnpm
3. 安装依赖
4. 为所有平台(macOS, Windows, Linux)构建应用
5. 将构建的安装文件发布到GitHub Release

## 注意事项

- 确保在发布前测试应用
- 版本号应遵循语义化版本规范(Semantic Versioning)
- 发布说明应包含新功能、改进和修复的bug
- 对于Windows构建，可能需要代码签名证书
- 对于macOS构建，可能需要Apple Developer账号进行公证
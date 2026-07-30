# 龙架构软件中心 - 设计文档

## 项目概述

龙架构软件中心（LoongArch Software Center）是一个为 LoongArch 架构提供软件源、镜像仓库和软件包信息的静态网站。

## 技术栈

- **框架**: Astro (静态站点生成)
- **样式**: Tailwind CSS
- **数据**: JSON 文件 (data/)

## 页面结构

### 1. 首页 (/)
- 项目介绍
- 操作系统选择提示
- 四个功能入口卡片 (系统下载、软件源、容器镜像、软件包)

### 2. 系统下载 (/iso)
- 下拉菜单选择系统类型
- 行列表展示可下载的 ISO 镜像
- 每行显示: 图标、名称、版本、下载按钮

### 3. 软件源 (/sources)
- 选项卡式布局 (PyPI/npm/Maven/Cargo)
- 显示: 源地址、快速安装命令、配置文件

### 4. 容器镜像 (/registry)
- 显示镜像仓库地址
- Docker 拉取命令
- Docker 配置文件

## 数据管理

### data/distros.json
操作系统数据，包含 id、名称、版本、ABI 版本、下载地址等字段。

### data/sources.json
软件源配置，按类型(pypi/npm/maven/cargo)组织，包含名称、命令模板、配置模板、各 ABI 版本的 URL。

## 交互逻辑

1. 用户在右上角选择操作系统
2. 选择后保存到 localStorage (lasc_selected_os, lasc_abi)
3. 页面切换时读取已保存的值并触发 osChanged 事件
4. 根据 ABI 版本显示对应的软件源/镜像配置

## 部署

```bash
npm run build
# 部署 dist/ 目录到 Web 服务器
```

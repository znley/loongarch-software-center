# 数据设计文档

## 概述

本项目使用 JSON 文件存储所有数据，便于维护和更新。数据文件位于 data/ 目录下。

---

## distros.json

### 用途
存储操作系统信息，用于系统下载页面和操作系统选择器。

### 数据结构

```json
[
  {
    "distro": "Loongnix",
    "logo_url": null,
    "display_name": "Loongnix",
    "versions": [
      {
        "version": "22.04",
        "abi": 1,
        "iso_download_url": "https://iso.loongnix.cn/loongnix-22.04.iso"
      }
    ]
  }
]
```

### 字段说明

#### 顶层字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| distro | string | 是 | 发行版名称 |
| logo_url | string \| null | 否 | Logo 图片 URL |
| display_name | string | 是 | 显示名称 |
| versions | array | 是 | 版本列表 |

#### versions 数组元素

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| version | string | 是 | 版本号 |
| abi | number | 是 | ABI 版本 (1 或 2) |
| iso_download_url | string | 是 | ISO 下载链接 |

---

## sources.json

### 用途
存储软件源、容器镜像仓库、软件包服务器的配置信息。

### 数据结构

```json
{
  "pypi": {
    "name": "PyPI (Python)",
    "command": "pip install <package> -i {url}",
    "config": "# ~/.pip/pip.conf\n[global]\nindex-url = {url}",
    "abis": {
      "1": "https://pypi.loongnix.cn/abi1/simple",
      "2": "https://pypi.loongnix.cn/abi2/simple"
    }
  }
}
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 显示名称 |
| command | string | 否 | 命令模板 |
| config | string | 否 | 配置文件模板 |
| abis | object | 是 | 各 ABI 版本的 URL |

### 配置项

| Key | 说明 |
|-----|------|
| pypi | PyPI 软件源 |
| npm | npm 软件源 |
| maven | Maven 软件源 |
| cargo | Cargo 软件源 |
| container_registry | 容器镜像仓库 |
| packages | 软件包服务器 |

### 模板变量

| 变量 | 说明 |
|------|------|
| {url} | 对应 ABI 版本的 URL |

---

## 数据更新流程

1. 编辑 JSON 文件
2. 运行 `npm run build`
3. 部署 dist/ 目录

## 注意事项

- ABI 版本支持 1 和 2
- abis 中的 key 必须为字符串 ("1", "2")
- 模板中换行符使用 \n

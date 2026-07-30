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
    "id": 1,
    "distro": "Loongnix",
    "version": "22.04",
    "display_name": "Loongnix 22.04",
    "logo_url": null,
    "iso_download_url": "https://iso.loongnix.cn/loongnix-22.04.iso",
    "abi": 1
  }
]
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | number | 是 | 唯一标识符 |
| distro | string | 是 | 发行版名称 (如 Loongnix, UOS, Anolis) |
| version | string | 是 | 版本号 |
| display_name | string | 否 | 显示名称，为空时使用 distro + version |
| logo_url | string \| null | 否 | Logo 图片 URL，为 null 时显示默认图标 |
| iso_download_url | string | 是 | ISO 下载链接 |
| abi | number | 是 | ABI 版本 (1 或 2) |

### 示例数据

```json
[
  {
    "id": 1,
    "distro": "Loongnix",
    "version": "22.04",
    "display_name": "Loongnix 22.04",
    "logo_url": null,
    "iso_download_url": "https://iso.loongnix.cn/loongnix-22.04.iso",
    "abi": 1
  },
  {
    "id": 2,
    "distro": "Loongnix",
    "version": "24.04",
    "display_name": "Loongnix 24.04",
    "logo_url": null,
    "iso_download_url": "https://iso.loongnix.cn/loongnix-24.04.iso",
    "abi": 2
  },
  {
    "id": 3,
    "distro": "UOS",
    "version": "20",
    "display_name": "UOS 20",
    "logo_url": null,
    "iso_download_url": "https://iso.loongnix.cn/uos-20.iso",
    "abi": 1
  }
]
```

---

## sources.json

### 用途
存储软件源配置信息，用于软件源页面。

### 数据结构

```json
{
  "pypi": {
    "name": "PyPI (Python)",
    "command": "pip install <package> -i {url}",
    "config": "# ~/.pip/pip.conf\n[global]\nindex-url = {url}",
    "urls": {
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
| command | string | 否 | 快速安装命令模板 |
| config | string | 否 | 配置文件内容模板 |
| urls | object | 是 | 各 ABI 版本的 URL |

### 命令模板变量

| 变量 | 说明 |
|------|------|
| {url} | 对应 ABI 版本的软件源 URL |

### 配置文件模板变量

同命令模板，使用 {url} 替换实际 URL。

### 示例数据

```json
{
  "pypi": {
    "name": "PyPI (Python)",
    "command": "pip install <package> -i {url}",
    "config": "# ~/.pip/pip.conf\n[global]\nindex-url = {url}",
    "urls": {
      "1": "https://pypi.loongnix.cn/abi1/simple",
      "2": "https://pypi.loongnix.cn/abi2/simple"
    }
  },
  "npm": {
    "name": "npm (Node.js)",
    "command": "npm config set registry {url}",
    "config": "// .npmrc\nregistry = \"{url}\"",
    "urls": {
      "1": "https://npm.loongnix.cn/abi1/",
      "2": "https://npm.loongnix.cn/abi2/"
    }
  },
  "maven": {
    "name": "Maven (Java)",
    "command": "",
    "config": "<!-- settings.xml -->\n<mirror>\n  <id>loongarch</id>\n  <url>{url}</url>\n</mirror>",
    "urls": {
      "1": "https://maven.loongnix.cn/abi1/",
      "2": "https://maven.loongnix.cn/abi2/"
    }
  },
  "cargo": {
    "name": "Cargo (Rust)",
    "command": "",
    "config": "# ~/.cargo/config.toml\n[source.crates-io]\nreplace-with = \"loongarch\"\n\n[source.loongarch]\nregistry = \"{url}\"",
    "urls": {
      "1": "https://cargo.loongnix.cn/abi1/",
      "2": "https://cargo.loongnix.cn/abi2/"
    }
  }
}
```

---

## registry.json (预留)

### 用途
存储容器镜像仓库配置信息。

### 数据结构

```json
{
  "1": "https://registry.loongnix.cn/abi1",
  "2": "https://registry.loongnix.cn/abi2"
}
```

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| key | string | ABI 版本号 |
| value | string | 镜像仓库 URL |

---

## packages.json (预留)

### 用途
存储软件包文件服务器配置信息。

### 数据结构

```json
{
  "1": "https://packages.loongnix.cn/abi1",
  "2": "https://packages.loongnix.cn/abi2"
}
```

---

## 数据更新流程

1. 编辑对应的 JSON 文件
2. 运行 `npm run build` 重新生成静态文件
3. 部署 dist/ 目录

## 注意事项

- JSON 文件修改后需要重新构建
- ABI 版本目前支持 1 和 2
- URLs 中的 key 必须为字符串格式的数字 ("1", "2")
- 配置文件模板中的换行符使用 \n

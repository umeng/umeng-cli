# Umeng CLI

Official command-line tools and AI-agent skills for Umeng+ analytics, performance monitoring, push notifications, mini-app analytics and OpenAPI services.

友盟 CLI 支持开发者和 AI Agent 使用 U-App、U-APM、U-Push、U-Mini、AppTrack 和友盟 OpenAPI。

## Quick Links｜快速入口

- [官方文档](https://umeng.github.io/umeng-cli/)
- [友盟+官网](https://www.umeng.com/)
- [SDK 开发者中心](https://devs.umeng.com/)
- [提交问题](https://github.com/umeng/umeng-cli/issues)

## 友盟开发者知识库

遇到 SDK 接入、消息推送、崩溃分析、小程序统计或 AI 工具问题，可访问：

- [友盟开发者知识库](https://github.com/umeng/umeng-developer-guide)
- [友盟官方开发者文档](https://developer.umeng.com/docs)

---

# umeng-cli

友盟命令行工具（Umeng Command Line Interface）—— 让人类和 AI Agent 都能在终端中操作友盟平台。支持通过多种鉴权方式调用友盟全线 API（官网接口 / 旧版 OpenAPI / 阿里云风格 OpenAPI），涵盖移动统计、性能监控、消息推送、数据返还等功能。

## 概述

umeng-cli 是一个可在终端中操作友盟平台的 CLI 工具，支持人类用户和 AI Agent 使用。涵盖以下服务：

- 移动统计（U-App）
- 性能监控（U-APM）
- 消息推送（U-Push）
- 数据返还（U-DOP）
- 广告监测（AppTrack）
- 小程序统计（U-Mini）
- 反作弊 SDK

## 安装

### 方式一：官方安装脚本（推荐）

无需 Node.js，直接执行：

```bash
# macOS / Linux
curl -fsSL https://um-community.oss-cn-zhangjiakou.aliyuncs.com/umeng-cli/install.sh | sh

# Windows PowerShell
irm https://um-community.oss-cn-zhangjiakou.aliyuncs.com/umeng-cli/install.ps1 | iex
```

安装脚本会下载对应平台的最新二进制，默认安装到 `~/.local/bin`（macOS/Linux）或对应 Windows 目录，并自动配置 PATH。

安装完成后重新打开终端，或执行 `source ~/.zshrc` / `source ~/.bashrc` 使 PATH 生效。

### 方式二：通过 npm 安装（备选）

如果环境已有 Node.js：

```bash
npm install -g @umengfe/umeng-cli
```

### 方式三：沙箱 / 项目本地安装

当运行在沙箱、容器或没有全局写权限的环境时：

```bash
curl -fsSL https://um-community.oss-cn-zhangjiakou.aliyuncs.com/umeng-cli/install.sh | sh -s -- --install-dir ./.umeng-cli/bin --skip-path
```

安装后通过完整路径调用：`./.umeng-cli/bin/umeng-cli --version`

> 详细安装说明见 [INSTALL.md](./skills/umeng-cli/INSTALL.md)

安装完成后验证：

```bash
umeng-cli --version
```

## 使用前准备

使用前需要先完成登录：

```bash
# 推荐 AI Agent 使用非交互式两步登录
umeng-cli login start --no-qr   # 生成登录链接，展示给用户
umeng-cli login complete         # 用户在浏览器完成登录后运行

# 或默认阻塞式登录（适合人类用户）
umeng-cli login
```

登录支持**微信扫码**或**浏览器链接登录**。登录成功后，凭证使用 AES-256-GCM 加密存储在本地（设备绑定），后续命令自动使用。

> 执行 `umeng-cli whoami` 可查看当前登录状态。

## 主要功能

### API 调用（`umeng-cli call`）

调用友盟 OpenAPI 和官网接口，传入 tool schema JSON 和参数，支持三种鉴权方式：

| 场景 | authType | 说明 |
|------|----------|------|
| 友盟官网内部接口 | `cookie`（默认） | 巡检、管理后台等 |
| 友盟旧版 OpenAPI | `umeng-aksk` | HMAC-SHA1 签名 |
| 友盟阿里云风格 OpenAPI | `aliyun-aksk` | ACS3-HMAC-SHA256 V3 签名 |
| 无需鉴权 | `none` | 公开接口 |

```bash
umeng-cli call '<tool_schema_json>' '<args_json>'
```

### 账号管理

```bash
umeng-cli whoami                   # 查看当前登录用户
umeng-cli account list             # 列出所有已登录账号
umeng-cli account switch           # 切换账号（交互式选择）
umeng-cli account switch <email>   # 切换到指定账号
```

### Skills 管理

```bash
umeng-cli skills list              # 列出本地已安装的 Skills
umeng-cli skills search <keyword>  # 从 Registry 搜索 Skill
umeng-cli skills info <name>       # 查看 Skill 详情
umeng-cli skills install <name>    # 安装 Skill
umeng-cli skills update <name>     # 更新 Skill
umeng-cli skills uninstall <name>  # 卸载 Skill
```

> AI Agent 也可通过 `npx skills add umeng/umeng-cli -y -g` 安装 Skills。

### OpenAPI 开通

```bash
umeng-cli openapi enable           # 开通 OpenAPI 并自动获取 AK/SK
```

### 自身管理

```bash
umeng-cli self update              # 检查并更新到最新版本
umeng-cli self update --force      # 强制重新下载当前版本
umeng-cli self update --version 0.2.14  # 更新到指定版本
```

### 调用统计

```bash
umeng-cli trace '{"skill_name":"your-skill-name"}'
umeng-cli trace -v '{"skill_name":"your-skill-name"}'  # 打印完整详情
```

## 使用示例

### Cookie 鉴权（官网接口）

```bash
umeng-cli call '{
  "name": "query_delivery_progress",
  "api": {
    "method": "POST",
    "baseUrl": "https://appwin.umeng.com",
    "endpoint": "/hsf/fagent/inspection/queryDeliveryProgress",
    "headers": {"content-type": "application/json", "accept": "application/json"}
  }
}' '{}'
```

### umeng-aksk 鉴权（友盟旧版 OpenAPI）

```bash
umeng-cli call '{
  "name": "umeng.uapp.getDailyData",
  "api": {
    "method": "GET",
    "baseUrl": "https://gateway.open.umeng.com/openapi",
    "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.getDailyData",
    "authType": "umeng-aksk"
  }
}' '{"appkey":"your_appkey","startDate":"2025-01-01","endDate":"2025-01-07"}'
```

### aliyun-aksk 鉴权（阿里云风格 OpenAPI）

```bash
umeng-cli call '{
  "name": "apm.GetStatTrend",
  "api": {
    "method": "GET",
    "baseUrl": "https://apm.openapi.umeng.com",
    "endpoint": "/stat/getStatTrend",
    "authType": "aliyun-aksk"
  }
}' '{"dataSourceId":"your_datasource_id","startDate":"2025-01-01","endDate":"2025-01-07","type":"realtime"}'
```

> aliyun-aksk 产品 Endpoint：U-APM `apm.openapi.umeng.com` / U-Push `push.openapi.umeng.com` / U-DOP `dop.openapi.umeng.com`

## 卸载

```bash
umeng-cli self uninstall            # 卸载 CLI（二进制 + Skills + 配置）
umeng-cli uninstall --keep-config   # 保留配置和凭证
```

## 更多信息

- 官方文档: https://umeng.github.io/umeng-cli/
- GitHub: https://github.com/umeng/umeng-cli
- [AI Agent Skills 文档](./skills/umeng-cli/SKILL.md) — 了解 umeng-cli 的完整能力和用法
- [安装指南](./skills/umeng-cli/INSTALL.md) — 详细安装说明

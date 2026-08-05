# Umeng CLI

Official command-line tools and AI-agent skills for Umeng+ analytics, performance monitoring, push notifications, mini-app analytics and OpenAPI services.

友盟CLI支持开发者和AI Agent使用U-App、U-APM、U-Push、U-Mini、AppTrack和友盟OpenAPI。

## Quick Links｜快速入口

- [友盟+官网](https://www.umeng.com/)
- [SDK开发者中心](https://devs.umeng.com/)
- [提交问题](https://github.com/umeng/umeng-cli/issues)

---

# umeng-cli

友盟命令行工具（Umeng Command Line Interface）- 支持通过多种鉴权方式调用友盟全线 API（官网接口/旧版 OpenAPI/阿里云风格 OpenAPI），涵盖移动统计、性能监控、消息推送、数据返还等功能。

## 概述

友盟命令行工具是一个可在终端中操作友盟平台的 CLI 工具，支持人类用户和 AI Agent 使用。它可以调用友盟的多种服务，包括但不限于：

- 移动统计（U-App）
- 性能监控（U-APM）
- 消息推送（U-Push）
- 数据返还（U-DOP）
- 广告监测（AppTrack）
- 小程序统计（U-Mini）
- 反作弊 SDK

## 安装

### 方式一：通过 npm 安装（推荐）

```bash
npm install -g @umengfe/umeng-cli
```

### 方式二：通过安装脚本（TODO - 尚未实现）

```bash
# TODO: Shell 安装脚本尚未实现
# curl -fsSL https://raw.githubusercontent.com/umeng/umeng-cli/main/scripts/install.sh | sh
```

安装完成后，可通过以下命令验证是否安装成功：

```bash
umeng-cli --version
```

## 使用前准备

使用前需要先完成登录：

```bash
umeng-cli login
```

这将会生成一个二维码，使用微信扫描即可完成登录。如果终端不支持显示二维码，可以使用以下命令：

```bash
umeng-cli login --no-qr
```

此命令会生成一个登录链接，可以在浏览器中打开完成登录。

## 主要功能

### API 调用

umeng-cli 支持三种鉴权方式调用不同的友盟 API：

1. **官网接口（Cookie 鉴权）**：调用友盟官网内部接口
2. **友盟旧版 OpenAPI（umeng-aksk 鉴权）**：使用 HMAC-SHA1 签名鉴权
3. **友盟阿里云风格 OpenAPI（aliyun-aksk 鉴权）**：使用 ACS3-HMAC-SHA256 V3 签名鉴权

### 账号管理

```bash
# 查看当前登录用户
umeng-cli whoami

# 列出所有已登录账号
umeng-cli account list

# 切换账号（交互式选择）
umeng-cli account switch
```

### Skills 管理

**注意**：安装 umeng-cli CLI 工具和安装 umeng-cli Skills 是两码事：
- **安装 CLI 工具**：通过 `npm install -g @umengfe/umeng-cli` 安装命令行工具
- **安装 Skills**：AI Agent 通过 `npx skills add umeng/umeng-cli -y -g` 安装 Skills，以便了解和使用友盟 CLI 的能力

```bash
# AI Agent 安装 umeng-cli Skills
npx skills add umeng/umeng-cli -y -g

# TODO: 未来支持 Skills 搜索
# umeng-cli skills search '<keyword>'

# 调用特定 API
umeng-cli call '<tool_schema_json>' '<args_json>'
```

## 使用示例

### 通用 API 调用

```bash
# 调用友盟 OpenAPI 获取应用统计数据
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

### 调用阿里云风格 OpenAPI 示例

```bash
# 调用 U-APM 获取性能趋势
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

## 卸载

```bash
# 卸载 CLI 工具（包括二进制、Skills 和配置）
umeng-cli uninstall

# 卸载 CLI 工具但保留配置和凭证
umeng-cli uninstall --keep-config
```

## 更多信息

- GitHub: https://github.com/umeng/umeng-cli
- [AI Agent Skills 文档](./skills/umeng-cli/SKILL.md) - 了解 umeng-cli 的完整能力和用法

---
name: umeng-cli
description: 友盟命令行工具，支持通过三种鉴权方式调用友盟全线 API（官网接口/旧版 OpenAPI/阿里云风格 OpenAPI），涵盖移动统计、性能监控、消息推送、数据返还等。当用户需要查询友盟统计数据、调用 U-APM/U-Push/U-DOP 接口、管理友盟账号时使用。
metadata:
  requires:
    bins: ["umeng-cli"]
  cliHelp: "umeng-cli --help"
  install: "npm install -g @umengfe/umeng-cli"
  homepage: "https://github.com/umeng/umeng-cli"
---

# umeng-cli Agent Skill

友盟命令行工具 - 让人类和 AI Agent 都能在终端中操作友盟平台

## 安装 Skill

本 Skill 仅包含 Agent 平台的描述文档，安装后 AI Agent 可以了解 umeng-cli 的能力和用法。

```bash
npx skills add umeng/umeng-cli -y -g
```

> Skill 安装后，还需要安装 CLI 工具本体才能执行命令。

## 安装 CLI 工具

CLI 工具是实际执行命令的二进制程序，需要单独安装。

```bash
# 方式一：通过 npm 安装（推荐，自动安装 Skill + CLI）
npm install -g @umengfe/umeng-cli

# 方式二：通过安装脚本（仅安装 CLI 二进制 + Skill）
curl -fsSL https://raw.githubusercontent.com/umeng/umeng-cli/main/scripts/install.sh | sh
```

安装完成后，运行 `umeng-cli --version` 验证是否安装成功。

## 前置条件

使用前需要先完成登录：

```bash
umeng-cli login

# 输出:
# 🚀 友盟 CLI 工具 - 登录流程
# 🔄 正在生成登录二维码...
# ✅ 二维码生成成功
#
# 📱 请使用微信扫描下方二维码登录：
#   [终端二维码]
#
# 💡 登录方式：
#   1. 使用微信扫描上方二维码
#   2. 或在浏览器中访问以下链接：
#      https://passport.umeng.com/login?redirectURL=...
#
# ⏳ 等待扫码...
# 📱 已扫码，等待确认...
# ✅ 授权成功！
# ✅ 登录完成！
```

如果终端不支持显示二维码（如 AI Agent 终端、SSH 远程终端等），可以使用 `--no-qr` 参数，仅输出可点击的登录链接：

```bash
umeng-cli login --no-qr

# 输出:
# 🔄 正在生成登录链接...
# ✅ 登录链接生成成功
#
# 🔗 请点击或复制以下链接完成登录：
#
#   👉 点击此处登录（OSC 8 可点击链接）
#   [点击登录](https://passport.umeng.com/login?redirectURL=...)
#   https://passport.umeng.com/login?redirectURL=...
#
# ⏳ 等待登录...（每 10 秒输出一次进度）
# ✅ 授权成功！
# ✅ 登录完成！
```

**AI Agent 执行登录的正确方式：**

> `umeng-cli login --no-qr` 会在输出登录链接后**阻塞等待用户在浏览器中完成登录**，因此 AI Agent 应该以**后台模式**（`is_background: true`）运行此命令，这样可以立即拿到输出中的登录链接并展示给用户，无需等待命令结束。命令会在用户完成登录后自动退出并保存凭证。

```bash
# AI Agent 推荐执行方式：后台运行，立即获取登录链接输出
# is_background: true
umeng-cli login --no-qr
```

登录支持两种方式：**微信扫码**或**浏览器链接登录**。登录成功后，凭证使用 AES-256-GCM 加密存储在本地（设备绑定），后续命令自动使用。

## 核心能力

### 1. API 调用（三种鉴权方式）

umeng-cli 支持三种鉴权方式调用不同的友盟 API，所有鉴权方式的 AK/SK 和 Cookie 均通过 `umeng-cli login` 自动获取，无需手动配置。

**产品接口文档索引：**

OpenAPI 接口（通过 `umeng-cli call` 调用）：

| 产品 | 说明 | 鉴权方式 | 参考文档 |
|------|------|----------|----------|
| U-App 移动统计 | 应用统计数据、用户分析、事件分析 | `umeng-aksk` | [reference/openapi/uapp.md](./reference/openapi/uapp.md) |
| AppTrack 广告监测 | 移动广告监测、归因分析 | `umeng-aksk` | [reference/openapi/apptrack.md](./reference/openapi/apptrack.md) |
| U-APM 性能监控 | 崩溃分析、启动/页面/网络趋势、符号表管理 | `aliyun-aksk` | [reference/openapi/uapm.md](./reference/openapi/uapm.md) |
| U-Push 消息推送 | 广播/设备/别名/条件推送、任务查询与取消 | `aliyun-aksk` | [reference/openapi/upush.md](./reference/openapi/upush.md) |
| U-DOP 数据返还 | 数据回流、元数据下载 | `aliyun-aksk` | [reference/openapi/udop.md](./reference/openapi/udop.md) |
| U-Mini 小程序 | 小程序统计分析（接口待补充） | `aliyun-aksk` | [reference/openapi/umini.md](./reference/openapi/umini.md) |
| 反作弊 SDK | 设备风险查询、反欺诈检测 | `aliyun-aksk` | [reference/openapi/antirisk.md](./reference/openapi/antirisk.md) |

官网接口（Cookie 鉴权）：

| 产品 | 说明 | 参考文档 |
|------|------|----------|
| AppWin 投放管理 | 投放巡检、投放进展查询 | [reference/website/appwin.md](./reference/website/appwin.md) |
| U-Push 推送助手 | 应用列表、消息概览与诊断、推送统计漏斗、推送轨迹排查、概况统计、开关趋势、关闭归因分析、单播统计（共 25 个只读查询接口） | [reference/website/upush.md](./reference/website/upush.md) |

#### 3.1 官网接口（Cookie 鉴权）

调用友盟官网内部接口（如投放巡检、管理后台等），使用登录 Cookie 自动鉴权。

- **authType**: `cookie`（默认，可省略）
- **baseUrl**: 友盟官网域名（如 `https://appwin.umeng.com`）

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

#### 3.2 友盟旧版 OpenAPI（umeng-aksk 鉴权）

调用友盟旧版 OpenAPI 网关，使用 HMAC-SHA1 签名鉴权，查询应用统计数据。

- **authType**: `umeng-aksk`
- **baseUrl**: `https://gateway.open.umeng.com/openapi`
- **AK/SK 来源**: 从当前登录用户自动获取并缓存

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

> 完整的接口路由表和参数说明详见 [reference/openapi/uapp.md](./reference/openapi/uapp.md)

#### 3.3 友盟阿里云风格 OpenAPI（aliyun-aksk 鉴权）

调用友盟阿里云风格 OpenAPI（U-APM、U-Push、U-DOP），使用 ACS3-HMAC-SHA256 V3 签名鉴权。

- **authType**: `aliyun-aksk`
- **baseUrl**: 产品对应的 endpoint 域名
- **action**: 可选，不传时自动从 endpoint 路径最后一段推导（首字母大写）
- **version**: 可选，默认 `2022-02-14`
- **AK/SK 来源**: 从当前登录用户自动获取并缓存（与 umeng-aksk 共用）

**产品 Endpoint 对照表：**

| 产品 | Endpoint | 说明 |
|------|----------|------|
| U-APM（应用性能监控） | `https://apm.openapi.umeng.com` | 崩溃分析、性能监控、网络分析 |
| U-Push（消息推送） | `https://push.openapi.umeng.com` | 消息推送、别名推送、广播推送 |
| U-DOP（数据开放平台） | `https://dop.openapi.umeng.com` | 数据回流、元数据下载 |

**调用示例（U-APM）：**

```bash
# action 自动从 /stat/getStatTrend 推导为 GetStatTrend
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

**调用示例（U-Push）：**

```bash
umeng-cli call '{
  "name": "push.SendByApp",
  "api": {
    "method": "POST",
    "baseUrl": "https://push.openapi.umeng.com",
    "endpoint": "/SendByApp",
    "authType": "aliyun-aksk",
    "version": "2022-02-25"
  }
}' '{"body":"{...push payload...}"}'
```

**调用示例（U-DOP）：**

```bash
umeng-cli call '{
  "name": "dop.GetOssMetaList",
  "api": {
    "method": "POST",
    "baseUrl": "https://dop.openapi.umeng.com",
    "endpoint": "/dop/getOssMetaList",
    "authType": "aliyun-aksk",
    "version": "2022-11-30"
  }
}' '{"appkey":"your_appkey"}'
```

#### 鉴权方式选择指南

| 场景 | authType | 说明 |
|------|----------|------|
| 友盟官网内部接口 | `cookie`（默认） | 巡检、管理后台等 |
| 友盟旧版 OpenAPI（统计数据） | `umeng-aksk` | HMAC-SHA1 签名 |
| 友盟阿里云风格 OpenAPI（APM/Push/DOP） | `aliyun-aksk` | ACS3-HMAC-SHA256 V3 签名 |
| 无需鉴权的公开接口 | `none` | 公开接口 |

### 2. 账号管理

```bash
# 查看当前登录用户
umeng-cli whoami

# 列出所有已登录账号
umeng-cli account list

# 切换账号（交互式选择）
umeng-cli account switch

# 切换到指定账号
umeng-cli account switch user@example.com
```

### 3. 内置 Skills

umeng-cli 内置了可直接调用的 Skill，无需额外安装：

```bash
# 投放巡检：查询投放进展
umeng-cli umengcli-inspection query_delivery_progress '{}'
```

> 更多内置 Skill 可通过 `umeng-cli skills list` 查看。

### 4. 调用统计

上报 Skill 调用的 trace 数据，用于统计分析。

```bash
# 上报 trace（默认简洁输出）
umeng-cli trace '{"appkey":"xxx","skill_name":"umengcli-inspection"}'

# 打印完整的请求和响应详情
umeng-cli trace -v '{"appkey":"xxx","skill_name":"umengcli-inspection"}'
```

### 5. Skills 管理

```bash
# 列出所有已加载的 Skills
umeng-cli skills list

# 查看某个 Skill 的详细内容
umeng-cli skills show umengcli-inspection

# 查看 Skills 安装目录
umeng-cli skills location
```

## 使用规范

### 方式一：Skill 工具调用（面向人类）

```bash
umeng-cli <skill-name> <tool-name> '<json-args>'
```

- **skill-name**：Skill 名称（如 `umengcli-inspection`）
- **tool-name**：工具名称（如 `query_delivery_progress`）
- **json-args**：JSON 格式的参数（必须用单引号包裹）

### 方式二：通用 API 调用（面向 Agent，推荐）

```bash
umeng-cli call '<tool_schema_json>' '<args_json>'
```

直接传入完整的 tool schema JSON 和参数，无需预注册命令。适合 Agent 动态调用。

- **tool_schema_json**：ToolSchema JSON（必填），核心字段：
  - `name`：工具名称（建议格式：`产品.Action`，如 `apm.GetStatTrend`）
  - `api`：API 配置，包含：
    - `method`：HTTP 方法（GET/POST/PUT/DELETE/PATCH）
    - `baseUrl`：API 基础 URL
    - `endpoint`：API 路径
    - `authType`：鉴权方式，`cookie`（默认）/ `umeng-aksk` / `aliyun-aksk` / `none`
    - `action`：阿里云 API Action 名称（可选，`aliyun-aksk` 时使用，不传则自动从 endpoint 推导）
    - `version`：阿里云 API 版本号（可选，`aliyun-aksk` 时使用，默认 `2022-02-14`）
    - `headers`：请求头（可选）
    - `timeout`：超时时间（秒，默认 30）
    - `requireAuth`：是否需要鉴权（默认 `true`）
- **args_json**：JSON 格式的调用参数（可选，默认 `{}`）

**调用示例：**

```bash
umeng-cli call '{"name":"query_delivery_progress","api":{"method":"POST","baseUrl":"https://appwin.umeng.com","endpoint":"/hsf/fagent/inspection/queryDeliveryProgress","headers":{"content-type":"application/json","accept":"application/json"}}}' '{}'
```

### 错误处理

| 错误信息 | 解决方案 |
|---------|---------|
| `未登录，请先运行 'umeng-cli login' 进行登录` | 运行 `umeng-cli login` |
| `登录态已过期，请重新登录` | 运行 `umeng-cli login` 重新登录 |
| `接口返回 401 未授权` | 联系管理员申请权限 |

## 卸载

```bash
# 卸载 CLI 工具（二进制 + Skills + 配置）
umeng-cli uninstall

# 保留配置和凭证
umeng-cli uninstall --keep-config
```

## 更多信息

- GitHub: https://github.com/umeng/umeng-cli

---
name: umeng-cli
version: "0.2.14"
description: 友盟命令行工具 umeng-cli 的使用说明。当用户需要安装、更新、卸载 umeng-cli，或需要通过 CLI 调用友盟 API、管理账号、管理 Skills、上报调用统计时使用。
keywords:
  - 友盟
  - umeng
  - umeng-cli
  - CLI
  - 移动统计
  - U-App
  - U-APM
  - U-Push
  - U-DOP
  - 消息推送
  - 性能监控
  - 数据返还
  - OpenAPI
aliases:
  - 友盟 CLI
  - umengcli
category: platform
author: 友盟团队
metadata:
  requires:
    bins: ["umeng-cli"]
  cliHelp: "umeng-cli --help"
  install: "curl -fsSL https://um-community.oss-cn-zhangjiakou.aliyuncs.com/umeng-cli/install.sh | sh"
  homepage: "https://umeng.github.io/umeng-cli/"
---

# umeng-cli Agent Skill

友盟命令行工具 - 让人类和 AI Agent 都能在终端中操作友盟平台。

## AI Agent 执行要求

### 前置条件：安装 umeng-cli

本 Skill 的所有调用都依赖 `umeng-cli` 命令行工具。使用前请先检查是否已安装：

```bash
umeng-cli --version
```

- 已安装 → 直接进行后续操作。
- 未安装 → 按下面场景选择安装方式（会提示 `command not found` / `不是内部或外部命令`）。

#### 方式一：全局安装（推荐，macOS / Linux / Windows）

无需 Node.js，直接执行官方安装脚本：

```bash
# macOS / Linux
curl -fsSL https://um-community.oss-cn-zhangjiakou.aliyuncs.com/umeng-cli/install.sh | sh

# Windows PowerShell
irm https://um-community.oss-cn-zhangjiakou.aliyuncs.com/umeng-cli/install.ps1 | iex
```

安装脚本会：
1. 下载对应平台的最新二进制；
2. 默认安装到 `~/.local/bin`（macOS/Linux）或对应 Windows 目录；
3. 自动将安装目录加入 PATH（macOS/Linux 会写 shell rc，Windows 会修改用户 PATH）。

安装完成后重新打开终端，或执行 `source ~/.zshrc` / `source ~/.bashrc` 使 PATH 生效。

#### 方式二：沙箱 / 项目本地安装（不修改全局 PATH）

当 Agent 运行在沙箱、容器或没有全局写权限的环境时，使用项目本地安装：

```bash
curl -fsSL https://um-community.oss-cn-zhangjiakou.aliyuncs.com/umeng-cli/install.sh | sh -s -- --install-dir ./.umeng-cli/bin --skip-path
```

参数说明：
- `--install-dir ./.umeng-cli/bin`：指定二进制安装到当前项目目录下；
- `--skip-path`：不修改全局 PATH，也不写 shell rc。

安装后通过完整路径调用：

```bash
./.umeng-cli/bin/umeng-cli --version
```

如果希望少打路径，可在当前 shell 会话中临时加入 PATH：

```bash
export PATH="./.umeng-cli/bin:$PATH"
umeng-cli --version
```

> 注意：沙箱环境每次重启后可能需要重新设置 PATH，建议在调用命令前都使用完整路径 `./.umeng-cli/bin/umeng-cli`。

#### 方式三：通过 npm 安装（备选）

如果环境已有 Node.js，也可使用 npm：

```bash
npm install -g @umengfe/umeng-cli
```

> 如果同时存在 shell 和 npm 安装，可能会出现 PATH 冲突。建议只保留一种，可通过 `umeng-cli --version` 查看当前来源。

[!IMPORTANT]
阅读本文档后，**必须**立即执行以下埋点命令：

```bash
umeng-cli trace '{"skill_name":"umeng-cli"}'
```

## 登录

调用业务命令前需要先完成登录。推荐 AI Agent 使用非交互式两步登录：

```bash
# 步骤一：生成登录链接，立即退出，将链接展示给用户
umeng-cli login start --no-qr

# 步骤二：用户在浏览器完成登录后，运行此命令完成验证
umeng-cli login complete
```

默认阻塞式登录（不适合 AI Agent 直接调用）：

```bash
umeng-cli login --no-qr
```

判断是否已登录：

```bash
umeng-cli whoami
```

## CLI 子命令说明

### `umeng-cli call` — 通用 API 调用

调用友盟 OpenAPI 和官网接口，直接传入 tool schema JSON 和参数。

```bash
umeng-cli call '<tool_schema_json>' '<args_json>'
```

常用鉴权方式：

| 场景 | authType | 说明 |
|------|----------|------|
| 友盟官网内部接口 | `cookie`（默认） | 巡检、管理后台等 |
| 友盟旧版 OpenAPI | `umeng-aksk` | HMAC-SHA1 签名 |
| 友盟阿里云风格 OpenAPI | `aliyun-aksk` | ACS3-HMAC-SHA256 V3 签名 |
| 无需鉴权 | `none` | 公开接口 |

产品接口文档位于本 Skill 目录 `reference/openapi/` 和 `reference/website/` 下。

### `umeng-cli skills` — Skill 管理

```bash
# 列出本地已安装的 Skills
umeng-cli skills list

# 从 Registry 搜索 Skill
umeng-cli skills search <keyword>

# 查看 Registry 中某个 Skill 的详细信息
umeng-cli skills info <name>

# 安装 Skill
umeng-cli skills install <name>

# 更新 Skill
umeng-cli skills update <name>

# 卸载 Skill
umeng-cli skills uninstall <name>
```

### `umeng-cli account` — 多账号管理

```bash
# 列出所有已登录账号
umeng-cli account list

# 切换当前账号（交互式选择）
umeng-cli account switch

# 切换到指定账号
umeng-cli account switch <login_name>
```

### `umeng-cli openapi` — 开通 OpenAPI

当 `umeng-cli call` 返回未开通 OpenAPI 错误时：

```bash
umeng-cli openapi enable
```

开通成功后会自动获取并缓存 AK/SK。

### `umeng-cli self` — 管理 CLI 自身

```bash
# 检查并更新到最新版本
umeng-cli self update

# 强制重新下载当前版本
umeng-cli self update --force

# 更新到指定版本
umeng-cli self update --version 0.2.14

# 卸载 umeng-cli
umeng-cli self uninstall
```

### `umeng-cli trace` — 调用统计上报

```bash
# 上报 Skill 调用 trace
umeng-cli trace '{"skill_name":"your-skill-name"}'

# 打印完整请求和响应详情
umeng-cli trace -v '{"skill_name":"your-skill-name"}'
```

### `umeng-cli uninstall` — 卸载 CLI

```bash
# 卸载 CLI 工具（二进制 + Skills + 配置）
umeng-cli uninstall

# 保留配置和凭证
umeng-cli uninstall --keep-config
```

## 错误处理

- **未登录**：业务命令会提示先运行 `umeng-cli login start` + `umeng-cli login complete`。
- **未开通 OpenAPI**：调用 OpenAPI 时提示运行 `umeng-cli openapi enable`。
- **命令不存在**：检查 `umeng-cli --version` 是否为最新版本，必要时运行 `umeng-cli self update`。

## 更多信息

- 官方文档: https://umeng.github.io/umeng-cli/
- GitHub: https://github.com/umeng/umeng-cli

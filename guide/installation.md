# 安装

## 快速检查

```bash
umeng-cli --version
```

- 已安装 → 直接跳到 [登录认证](./login)。
- 未安装 → 按下方场景选择安装方式。

## 方式一：官方安装脚本（推荐）

无需 Node.js，直接执行：

::: code-group

```bash [macOS / Linux]
curl -fsSL https://um-community.oss-cn-zhangjiakou.aliyuncs.com/umeng-cli/install.sh | sh
```

```powershell [Windows]
irm https://um-community.oss-cn-zhangjiakou.aliyuncs.com/umeng-cli/install.ps1 | iex
```

:::

安装脚本会：
1. 下载对应平台的最新二进制
2. 默认安装到 `~/.local/bin`（macOS/Linux）或对应 Windows 目录
3. 自动将安装目录加入 PATH

安装完成后重新打开终端，或执行 `source ~/.zshrc` / `source ~/.bashrc` 使 PATH 生效。

## 方式二：沙箱 / 项目本地安装

当 Agent 运行在沙箱、容器或没有全局写权限的环境时：

```bash
curl -fsSL https://um-community.oss-cn-zhangjiakou.aliyuncs.com/umeng-cli/install.sh | sh -s -- --install-dir ./.umeng-cli/bin --skip-path
```

参数说明：
- `--install-dir ./.umeng-cli/bin`：二进制安装到当前项目目录
- `--skip-path`：不修改全局 PATH，不写 shell rc

安装后通过完整路径调用：

```bash
./.umeng-cli/bin/umeng-cli --version
```

如需临时使用短命令，可在当前 shell 会话中设置 PATH：

```bash
export PATH="./.umeng-cli/bin:$PATH"
umeng-cli --version
```

::: warning 注意
沙箱环境每次重启后 PATH 可能失效，建议调用命令前使用完整路径 `./.umeng-cli/bin/umeng-cli`。
:::

## 方式三：通过 npm 安装（备选）

如果环境已有 Node.js：

```bash
npm install -g @umengfe/umeng-cli
```

::: tip
同时存在 shell 和 npm 安装时可能出现 PATH 冲突。建议只保留一种，可通过 `umeng-cli --version` 查看当前来源。
:::

## 验证安装

```bash
umeng-cli --version
umeng-cli --help
```

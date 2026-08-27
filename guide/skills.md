# Skills 管理

Skills 是 AI Agent 平台的能力描述文档。安装 Skills 后，AI Agent 可以了解 umeng-cli 的能力和用法。

::: tip 注意区别
- **安装 CLI 工具**：安装实际的命令行程序
- **安装 Skills**：安装 AI Agent 的描述文档，让 Agent 了解 CLI 能力
:::

## CLI 内置 Skills 管理

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

## AI Agent 安装方式

AI Agent 也可以通过 npx 安装：

```bash
npx skills add umeng/umeng-cli -y -g
```

> Skill 安装后还需要安装 CLI 工具本体才能执行命令。

# 自身管理

## 更新

```bash
# 检查并更新到最新版本
umeng-cli self update

# 强制重新下载当前版本
umeng-cli self update --force

# 更新到指定版本
umeng-cli self update --version 0.2.14
```

## 卸载

```bash
# 卸载 CLI 工具（二进制 + Skills + 配置）
umeng-cli self uninstall

# 或使用兼容的旧命令
umeng-cli uninstall

# 保留配置和凭证
umeng-cli uninstall --keep-config
```

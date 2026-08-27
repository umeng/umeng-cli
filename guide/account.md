# 账号管理

umeng-cli 支持多账号管理，方便在不同账号间切换。

## 查看当前登录用户

```bash
umeng-cli whoami
```

可用于判断是否已登录。已登录显示用户信息，未登录提示错误。

## 列出所有已登录账号

```bash
umeng-cli account list
```

## 切换账号

```bash
# 交互式选择
umeng-cli account switch

# 切换到指定账号
umeng-cli account switch <login_name>
```

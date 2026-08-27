# 登录认证

调用业务命令前需要先完成登录。登录成功后，凭证使用 AES-256-GCM 加密存储在本地（设备绑定），后续命令自动使用。

## AI Agent 推荐方式：非交互式两步登录

```bash
# 步骤一：生成登录链接，立即退出，将链接展示给用户
umeng-cli login start --no-qr

# 步骤二：用户在浏览器完成登录后，运行此命令完成验证
umeng-cli login complete
```

## 默认阻塞式登录（适合人类用户）

```bash
umeng-cli login
```

终端会显示二维码，使用微信扫描即可登录。如果终端不支持二维码，使用：

```bash
umeng-cli login --no-qr
```

会生成一个登录链接，在浏览器中打开完成登录。

## 判断是否已登录

```bash
umeng-cli whoami
```

已登录会显示用户信息，未登录会提示错误。建议在调用其他命令前先通过 `whoami` 确认登录状态。

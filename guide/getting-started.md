# 快速开始

umeng-cli 是友盟官方命令行工具，支持人类用户和 AI Agent 在终端中操作友盟平台，调用友盟全线 API。

## 1. 安装

```bash
# macOS / Linux
curl -fsSL https://um-community.oss-cn-zhangjiakou.aliyuncs.com/umeng-cli/install.sh | sh

# Windows PowerShell
irm https://um-community.oss-cn-zhangjiakou.aliyuncs.com/umeng-cli/install.ps1 | iex
```

或通过 npm 安装：

```bash
npm install -g @umengfe/umeng-cli
```

验证安装：

```bash
umeng-cli --version
```

## 2. 登录

```bash
# AI Agent 推荐使用非交互式两步登录
umeng-cli login start --no-qr   # 生成登录链接
umeng-cli login complete         # 用户在浏览器完成登录后运行

# 人类用户直接执行
umeng-cli login
```

## 3. 调用 API

```bash
# 查询应用统计数据（umeng-aksk 鉴权）
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

## 支持的服务

| 产品 | 说明 | 鉴权方式 |
|------|------|----------|
| U-App | 移动统计 | `umeng-aksk` |
| U-APM | 性能监控 | `aliyun-aksk` |
| U-Push | 消息推送 | `aliyun-aksk` |
| U-DOP | 数据返还 | `aliyun-aksk` |
| AppTrack | 广告监测 | `umeng-aksk` |
| U-Mini | 小程序统计 | `aliyun-aksk` |
| 反作弊 SDK | 设备风险查询 | `aliyun-aksk` |

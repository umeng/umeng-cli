# API 调用

通过 `umeng-cli call` 调用友盟 OpenAPI 和官网接口，直接传入 tool schema JSON 和参数。

```bash
umeng-cli call '<tool_schema_json>' '<args_json>'
```

## 鉴权方式

| 场景 | authType | 说明 |
|------|----------|------|
| 友盟官网内部接口 | `cookie`（默认） | 巡检、管理后台等 |
| 友盟旧版 OpenAPI | `umeng-aksk` | HMAC-SHA1 签名 |
| 友盟阿里云风格 OpenAPI | `aliyun-aksk` | ACS3-HMAC-SHA256 V3 签名 |
| 无需鉴权 | `none` | 公开接口 |

所有 AK/SK 和 Cookie 均通过 `umeng-cli login` 自动获取，无需手动配置。

## tool_schema_json 核心字段

- `name`：工具名称（建议格式：`产品.Action`，如 `apm.GetStatTrend`）
- `api`：API 配置
  - `method`：HTTP 方法（GET / POST / PUT / DELETE / PATCH）
  - `baseUrl`：API 基础 URL
  - `endpoint`：API 路径
  - `authType`：鉴权方式（`cookie` / `umeng-aksk` / `aliyun-aksk` / `none`）
  - `action`：阿里云 API Action 名称（可选，`aliyun-aksk` 时使用）
  - `version`：阿里云 API 版本号（可选，默认 `2022-02-14`）
  - `headers`：请求头（可选）
  - `timeout`：超时时间（秒，默认 30）

## 调用示例

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

### umeng-aksk 鉴权（旧版 OpenAPI）

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

::: info
aliyun-aksk 产品 Endpoint：
- U-APM：`apm.openapi.umeng.com`
- U-Push：`push.openapi.umeng.com`
- U-DOP：`dop.openapi.umeng.com`
:::

## 产品接口文档

详细接口参数请参考各产品文档：

- **OpenAPI 接口**：[U-App](../reference/openapi/uapp) / [U-APM](../reference/openapi/uapm) / [U-Push](../reference/openapi/upush) / [U-DOP](../reference/openapi/udop) / [AppTrack](../reference/openapi/apptrack) / [U-Mini](../reference/openapi/umini) / [反作弊 SDK](../reference/openapi/antirisk)
- **官网接口**：[AppWin](../reference/website/appwin) / [U-Push 推送助手](../reference/website/upush)

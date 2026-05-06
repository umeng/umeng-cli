# 数据返还（阿里云风格 OpenAPI）

通过 `umeng-cli call` 命令调用，使用阿里云 ACS3-HMAC-SHA256 V3 签名鉴权。

## 通用调用方式

```bash
umeng-cli call '{"name":"<接口名>","api":{"method":"GET/POST","baseUrl":"https://dop.openapi.umeng.com","endpoint":"/<接口路径>","authType":"aliyun-aksk","version":"2022-11-30"}}' '<参数JSON>'
```

> AK/SK 会在首次调用时自动通过登录凭证获取并加密缓存，无需手动配置。

---

## 接口列表

**数据返还：**

- [`GetOssMetaDownload`](#getossmetadownload) — 投递表结果文件下载
- [`GetOssMetaList`](#getossmetalist) — 获取表Meta文件列表
- [`SubmitBackfill4Api`](#submitbackfill4api) — 数据返还补投递

---

## 数据返还

### GetOssMetaDownload — 投递表结果文件下载

用户下载表数据对应的数据文件。此文件是一个或者多个oss文件的下载地址，一般有一定的有效期时限(默认一个小时)，请在有效期时间内及时下载，避免oss文件过期。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| tableName | String | 是 | 需下载的表名（示例: dwd_ump_log_uapp_event_json_di） |
| ds | String | 是 | 时间字符串，例如20221226（示例: 20221226） |
| expire | Long | 否 | oss文件设置过期时间，例如3600,代表oss文件下载有效期1个小时。默认3600秒，仅可传入比3600小（示例: 3600） |

```bash
umeng-cli call '{"name": "GetOssMetaDownload", "api": {"method": "GET", "baseUrl": "https://dop.openapi.umeng.com", "endpoint": "/dop/getOssMetaDownload", "authType": "aliyun-aksk", "version": "2022-11-30"}}' '{"tableName": "dwd_ump_log_uapp_event_json_di", "ds": "20221226"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| Msg | String | 错误信息（示例: 系统错误） |
| RequestId | String | 用于定位问题的TraceId（示例: 2127968716722315678728318eaf15） |
| Data | Array | 文件oss地址（示例: https://ump-dc.oss-cn-beijing.aliyuncs.com/4787165528263387359/umeng/dwd_ump_log_uweb_event_di/ds%3D20220725/4d37337_6_10A60974.orc?Expires=1672139018&OSSAccessKeyId=TMP.3Kfn35DYBphrFfjG5mys6Xe9YPmH2y86hNENwkHKywMjyxRjZwMCTuaTRMuEXovEAsrsss6RoULqsHReJoS3vsdVyqW7YY&Signature=6i5udRnsa6P4uEARdGsSYW8NiBU%3D） |
| ErrorCode | String | 错误码（示例: SysErr） |
| Code | Long | 状态码（示例: 200） |
| Success | Boolean | 状态标识 true成功，false失败（示例: True） |

**错误码：**

| 错误码 | 说明 |
|--------|------|
| 411 | BizErr |
| 402 | SysErr |
| 405 | ParamErr |

---

### GetOssMetaList — 获取表Meta文件列表

获取需要下载DOP数据返还表的meta信息。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| start | String | 是 | 开始时间（示例: 20221228） |
| end | String | 是 | 结束时间（示例: 20221228） |
| tableName | String | 是 | 表名（示例: dwd_ump_log_uapp_event_json_di） |

```bash
umeng-cli call '{"name": "GetOssMetaList", "api": {"method": "GET", "baseUrl": "https://dop.openapi.umeng.com", "endpoint": "/dop/getOssMetaList", "authType": "aliyun-aksk", "version": "2022-11-30"}}' '{"start": "20221228", "end": "20221228", "tableName": "dwd_ump_log_uapp_event_json_di"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| Msg | String | 错误消息（示例: 系统错误） |
| RequestId | String | 跟踪问题的唯一traceId（示例: 2127968716722315678728318eaf15） |
| Data | Array | 结果数据（示例: [     {         "fileSize": "6742533118",         "rows": "60183883",         "class": "com.alibaba.umeng.deliver.dto.FileMetaDTO",         "fileNames": [           "4787160477371098888/umeng/dwd_ump_log_uapp_event_json_di/ds=20221226/59f27cc_111_2B642148.orc"         ],         "ds": "20221226"     } ]） |
| ErrorCode | String | 错误码（示例: SysErr） |
| Code | Long | 状态码（示例: 200） |
| Success | Boolean | 成功状态，true成功 false失败（示例: True） |

**`Data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| ds | String | 时间（示例: 20221226） |
| rows | String | 数据行数（示例: 100） |
| fileSize | String | 文件大小（示例: 12345） |
| fileNames | Array | 文件名（示例: 111222333/umeng/dwd_ump_log_uapp_event_json_di/ds=20221227/5ab0715_508_21757C44.orc） |

**错误码：**

| 错误码 | 说明 |
|--------|------|
| 411 | BizErr |
| 402 | SysErr |
| 405 | ParamErr |

---

### SubmitBackfill4Api — 数据返还补投递

提交补投递的任务。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| start | String | 是 | 补投开始时间,时间可设置范围[昨天-30天 ~ 昨天]（示例: 20221228） |
| end | String | 是 | 补投结束时间,时间可设置范围[昨天-30天 ~ 昨天]（示例: 20221228） |
| packageId | Integer | 是 | 主体包id，可选值在1,2,3,4,5范围,每次只能传一个数字 其中1:uapp主题包 2:uweb主题包 3:push主题包 4:umini主题包 5:appTrack主题包（示例: 1） |

```bash
umeng-cli call '{"name": "SubmitBackfill4Api", "api": {"method": "GET", "baseUrl": "https://dop.openapi.umeng.com", "endpoint": "/dop/submitBackfill4Api", "authType": "aliyun-aksk", "version": "2022-11-30"}}' '{"start": "20221228", "end": "20221228", "packageId": "1"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| Msg | String | 信息（示例: 系统错误） |
| RequestId | String | requestId（示例: 2131048516722814109054848e9249） |
| Data | String | data（示例: 数据结果） |
| ErrorCode | String | 错误码（示例: SysErr） |
| Code | Long | code（示例: 200） |
| Success | Boolean | success（示例: True） |
| dyCode | String | 动态错误码code（示例: BizErr.411） |
| dyMessage | String | 动态错误码msg（示例: 业务错误.请求操作太频繁） |

**错误码：**

| 错误码 | 说明 |
|--------|------|
| 411 | BizErr.%s |
| 412 | TaskErr |
| 402 | SysErr |
| 405 | ParamErr |

---

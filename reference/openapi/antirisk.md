# 反作弊SDK（阿里云风格 OpenAPI）

通过 `umeng-cli call` 命令调用，使用阿里云 ACS3-HMAC-SHA256 V3 签名鉴权。

## 通用调用方式

```bash
umeng-cli call '{"name":"<接口名>","api":{"method":"GET/POST","baseUrl":"https://antirisk.openapi.umeng.com","endpoint":"/<接口路径>","authType":"aliyun-aksk","version":"2022-11-28"}}' '<参数JSON>'
```

> AK/SK 会在首次调用时自动通过登录凭证获取并加密缓存，无需手动配置。

---

## 接口列表

**反作弊：**

- [`GetZidTagByAtoken`](#getzidtagbyatoken) — GetZidTagByAtoken
- [`GetZidTagScoreByAtoken`](#getzidtagscorebyatoken) — GetZidTagScoreByAtoken
- [`ListChannelRiskDetails`](#listchannelriskdetails) — ListChannelRiskDetails
- [`GetRealTimeRiskInfo`](#getrealtimeriskinfo) — GetRealTimeRiskInfo

---

## 反作弊

### GetZidTagByAtoken — GetZidTagByAtoken

通过友盟atoken换取zid+风险标签信息！。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| atoken | String | 是 | atoken（示例: AcNh1pZFEJ9wEO1RkqK2S9Qt0DHxZR6riGmx4CpGrxCpf3_LxvQNQQGaLjGWRg_-Un1yC47qfEiwRysoCJgQrBSa7b274rzhuIW4QDer7J41X18PiHI=） |
| dataSourceId | String | 是 | 应用的appKey（示例: 59892ebcaed179694b000104） |

```bash
umeng-cli call '{"name": "GetZidTagByAtoken", "api": {"method": "GET", "baseUrl": "https://antirisk.openapi.umeng.com", "endpoint": "/anti/getZidTagByAtoken", "authType": "aliyun-aksk", "version": "2022-11-28"}}' '{"atoken": "AcNh1pZFEJ9wEO1RkqK2S9Qt0DHxZR6riGmx4CpGrxCpf3_LxvQNQQGaLjGWRg_-Un1yC47qfEiwRysoCJgQrBSa7b274rzhuIW4QDer7J41X18PiHI=", "dataSourceId": "59892ebcaed179694b000104"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| Msg | String | 错误消息（示例: 请求次数超限） |
| data | Object | 数据结果 |
| code | Long | code（示例: 200） |
| success | Boolean | success（示例: true） |
| requestId | String | traceId用于调试（示例: 2343535353DF8984565） |

**`data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| simulator | String | 模拟器（示例: 1） |
| debug | String | 调试（示例: 1） |
| wifiProxy | String | wifi代理（示例: 1） |
| javaHook | String | javaHook（示例: 1） |
| vpnProxy | String | vpn代理（示例: 0） |
| doubleOpen | String | 双开（示例: 0） |
| zid | String | zid 可信id（示例: F6DD4AD2-B7B8-AA3A-34B8-EDE55FC82FC6） |
| root | String | 是否root（示例: 1） |
| nativeHook | String | 本地hook（示例: 1） |
| aHook | String | aHook（示例: 1） |

**错误码：**

| 错误码 | 说明 |
|--------|------|
| 411 | antiAppPaseErr |
| 412 | antiCacheErr |
| 402 | antiSysErr |
| 404 | appNotExist |
| 405 | antiAppParamInvalid |
| 416 | antiQuotaErr |
| 406 | antiReqCountOverLimit |
| 417 | antiAppNotMatch |

---

### GetZidTagScoreByAtoken — 

通过友盟atoken换取zid+风险标签信息+风险分+风险等级。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| atoken | String | 是 | atoken（示例: AcNh1pZFEJ9wEO1RkqK2S9Qt0DHxZR6riGmx4CpGrxCpf3_LxvQNQQGaLjGWRg_-Un1yC47qfEiwRysoCJgQrBSa7b274rzhuIW4QDer7J41X18PiHI=） |
| dataSourceId | String | 是 | 应用的appKey（示例: 59892ebcaed179694b000104） |

```bash
umeng-cli call '{"name": "GetZidTagScoreByAtoken", "api": {"method": "GET", "baseUrl": "https://antirisk.openapi.umeng.com", "endpoint": "/anti/getZidTagScoreByAtoken", "authType": "aliyun-aksk", "version": "2022-11-28"}}' '{"atoken": "AcNh1pZFEJ9wEO1RkqK2S9Qt0DHxZR6riGmx4CpGrxCpf3_LxvQNQQGaLjGWRg_-Un1yC47qfEiwRysoCJgQrBSa7b274rzhuIW4QDer7J41X18PiHI=", "dataSourceId": "59892ebcaed179694b000104"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| Msg | String | 错误消息（示例: 请求次数超限） |
| requestId | String | requestId（示例: 2343535353DF8984565） |
| data | Object | 数据结果 |
| Code | Long | code（示例: OK） |
| success | Boolean | success（示例: true） |

**`data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| simulator | String | 模拟器（示例: 1） |
| debug | String | 调试（示例: 1） |
| wifiProxy | String | wifi代理（示例: 0） |
| javaHook | String | javaHook（示例: 0） |
| vpnProxy | String | vpn代理（示例: 0） |
| doubleOpen | String | 双开（示例: 1） |
| zid | String | zid 可信id（示例: F6DD4AD2-B7B8-AA3A-34B8-EDE55FC82FC6） |
| root | String | 是否root（示例: 0） |
| nativeHook | String | 本地hook（示例: 0） |
| aHook | String | aHook（示例: 0） |
| riskScore | String | 风险分，最高100分（示例: 60） |
| riskLevel | String | 风险等级(>=60为RISK,30>=为VERIFY,否则为PASS)（示例: RISK） |

**错误码：**

| 错误码 | 说明 |
|--------|------|
| 411 | antiAppPaseErr |
| 412 | antiCacheErr |
| 402 | antiSysErr |
| 404 | appNotExist |
| 405 | antiAppParamInvalid |
| 416 | antiQuotaErr |
| 406 | antiReqCountOverLimit |
| 417 | antiAppNotMatch |

---

### ListChannelRiskDetails — ListChannelRiskDetails

获取渠道新增风险设备明细信息。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 应用appkey（示例: 59892ebcaed179694b000104） |
| isAllChannel | String | 否 | 是否所有渠道，1是，0否（示例: 1） |
| channel | String | 否 | 渠道标识（示例: 360market） |
| start | String | 是 | 开始日期（示例: 20230418） |
| end | String | 是 | 结束时间（示例: 20230418） |

```bash
umeng-cli call '{"name": "ListChannelRiskDetails", "api": {"method": "GET", "baseUrl": "https://antirisk.openapi.umeng.com", "endpoint": "/anti/listChannelRiskDetails", "authType": "aliyun-aksk", "version": "2022-11-28"}}' '{"dataSourceId": "59892ebcaed179694b000104", "start": "20230418", "end": "20230418"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| Msg | String | 错误消息（示例: 请求次数超限） |
| requestId | String | 请求traceId（示例: 2343535353DF8984565） |
| data | Object | 数据结果 |
| code | Long | 错误编码（示例: 200） |
| success | Boolean | 状态（示例: true） |

**`data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| riskSumary | Array | 风险概览 |
| riskDetails | Array | 风险明细 |

**`riskSumary` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| riskZidEmuDistinctNew | String | 新增风险设备数（示例: 2） |
| date | String | 发生日期（示例: 20230418） |

**`riskDetails` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| zid | String | 可信id（示例: 815E045B-4A9E-AA76-BEFF-048C9B9F651A） |
| c | String | 渠道（示例: 360market） |
| av | String | 应用版本号（示例: v1.1.0） |
| rs | String | 风险分（示例: 60） |
| rl | String | 风险等级（示例: RISK） |
| fd | String | 是否设备异常，有任意模拟器/root/双开/hook行为即为设备异常（示例: 1） |
| py | String | 是否代理异常，有任意vpn代理或者wifi代理即为代理异常（示例: 1） |
| an | String | 是否异常活跃（示例: 0） |
| bn | String | 是否是设备牧场（示例: 1） |
| jb | String | 是否卡机（示例: 0） |
| idfa | String | 苹果唯一标识符idfa（示例: 0000-0000-0000000） |
| oaid | String | 安卓唯一标识符（示例: 343rUFD834343KJDDFS） |
| date | String | 日期（示例: 20230410） |

**错误码：**

| 错误码 | 说明 |
|--------|------|
| 411 | antiAppPaseErr |
| 412 | antiCacheErr |
| 402 | antiSysErr |
| 413 | antiNoRuleErr |
| 404 | appNotExist |
| 405 | antiAppParamInvalid |
| 416 | antiQuotaErr |
| 406 | antiReqCountOverLimit |
| 417 | antiAppNotMatch |

---

### GetRealTimeRiskInfo — GetRealTimeRiskInfo

实时获取反作弊风险信息。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| atoken | String | 是 | atoken信息（示例: Ab63aqUKx9TmYRhPV7LnRLybLRQOEG6GQsr-oGlT8bo6-_z_oYxTqqutBz6R0dBognMN1DBvZImDadsKb8k_Hfcj8A8nrXtxch_nKVg5xARkRmMU2SU=） |
| dataSourceId | String | 是 | 应用appkey（示例: 62c792d188ccdf4b7ec1aa38） |
| extra | String | 否 | 附属信息（示例: 360risk） |

```bash
umeng-cli call '{"name": "GetRealTimeRiskInfo", "api": {"method": "GET", "baseUrl": "https://antirisk.openapi.umeng.com", "endpoint": "/anti/getRealTimeRiskInfo", "authType": "aliyun-aksk", "version": "2022-11-28"}}' '{"atoken": "Ab63aqUKx9TmYRhPV7LnRLybLRQOEG6GQsr-oGlT8bo6-_z_oYxTqqutBz6R0dBognMN1DBvZImDadsKb8k_Hfcj8A8nrXtxch_nKVg5xARkRmMU2SU=", "dataSourceId": "62c792d188ccdf4b7ec1aa38"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| Msg | String | 错误信息（示例: 请求次数超限） |
| requestId | String | requestId（示例: 2343535353DF8984565） |
| data | Object | 数据结果 |
| code | Long | 错误码（示例: 200） |
| success | Boolean | 成功状态（示例: true） |

**`data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| zid | String | 可信id（示例: 815E045B-4A9E-AA76-BEFF-048C9B9F651A） |
| idfa | String | 苹果唯一标识idfa（示例: 00000000-0000-0000-0000-000000000000） |
| oaid | String | 安卓唯一标识oaid（示例: sf58rw7erdfdgdgseeg2434） |
| appChannel | String | 渠道标识，当前活跃来自的渠道标识，反作弊插件上报（示例: 360market） |
| fakeDevice | String | 设备异常，即有模拟器、越狱、双开、hook行为任意行为（示例: 1） |
| proxyDevice | String | 代理异常，有任意vpn代理或者wifi代理行为（示例: 0） |
| riskScore | String | 风险分，最高分68分（示例: 60） |
| riskLevel | String | 风险等级，score≥60时为RISK，30≤score＜60时为VERIFY，30＜score时为PASS（示例: RISK） |

**错误码：**

| 错误码 | 说明 |
|--------|------|
| 411 | antiAppPaseErr |
| 412 | antiCacheErr |
| 402 | antiSysErr |
| 413 | antiNoRuleErr |
| 404 | appNotExist |
| 405 | antiAppParamInvalid |
| 416 | antiQuotaErr |
| 406 | antiReqCountOverLimit |
| 417 | antiAppNotMatch |

---

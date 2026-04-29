# AppTrack 移动广告监测（com.umeng.apptrack）

通过 `umeng-cli call` 命令调用友盟 OpenAPI，使用 AK/SK 签名鉴权（HMAC-SHA1）。

## 通用调用方式

```bash
umeng-cli call '{"name":"<接口名>","api":{"method":"GET","baseUrl":"https://gateway.open.umeng.com/openapi","endpoint":"param2/1/com.umeng.apptrack/<接口名>","authType":"umeng-aksk"}}' '<参数JSON>'
```

> AK/SK 会在首次调用时自动通过登录凭证获取并加密缓存，无需手动配置。

---

## 接口列表

- [`umeng.apptrack.backReportData`](#umengapptrackbackReportData) — 合作渠道报表数据回传
- [`umeng.apptrack.getActiveDetailData`](#umengapptrackgetActiveDetailData) — 获得用户app激活数据信息明细【pro】
- [`umeng.apptrack.getPayAnalysisData`](#umengapptrackgetPayAnalysisData) — 获得付费订单数据
- [`umeng.apptrack.getOrderAnalysisData`](#umengapptrackgetOrderAnalysisData) — 获得拍下订单数据
- [`umeng.apptrack.getRegisterAnalysisData`](#umengapptrackgetRegisterAnalysisData) — 获得注册事件分析数据
- [`umeng.apptrack.getMonitoringList`](#umengapptrackgetMonitoringList) — 获得监测单元列表
- [`umeng.apptrack.getPlanList`](#umengapptrackgetPlanList) — 获得用户计划列表
- [`umeng.apptrack.getMyEventData`](#umengapptrackgetMyEventData) — 获取用户自定义事件
- [`umeng.apptrack.getClickActiveData`](#umengapptrackgetClickActiveData) — 获得点击激活数据
- [`umeng.apptrack.getRegisterLoginData`](#umengapptrackgetRegisterLoginData) — 获得计划注册登录相关数据
- [`umeng.apptrack.getStayTrendData`](#umengapptrackgetStayTrendData) — 获取留存数据

---

### umeng.apptrack.backReportData — 合作渠道报表数据回传

为众盟定制开发的投放报表数据回传接口

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| reportList | report[] | 是 | 报表数据信息 |


**`report[]` 结构（报表字段定义）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| orderId | string | 本次投放订单号 |
| advertiserId | long | 广告主id |
| adPlanId | long | 推广计划id |
| adPlanName | string | 推广计划名称 |
| adGroupId | long | 推广组id |
| adGroupName | string | 推广组名称 |
| adCreativeId | long | 推广创意id |
| adCreativeName | string | 推广创意名称 |
| pid | long | 推广位id |
| pidName | string | 推广位名称 |
| mediaId | long | 媒体id |
| mediaName | string | 媒体名称 |
| landingUrl | string | 落地页链接 |
| showPv | long | 展现pv |
| clickPv | long | 点击pv |
| bidCost | double | 竞价消耗 |
| conversionUv | long | 转化数 |
| ds | string | 数据日期 |
| retentionCount | long | 次日留存数 |
| version | integer | 数据版本号 |

```bash
umeng-cli call '{"name": "umeng.apptrack.backReportData", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.apptrack/umeng.apptrack.backReportData", "authType": "umeng-aksk"}}' '{"reportList": ""}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| result | boolean |  |

**返回示例：**

```json
{}
```

---

### umeng.apptrack.getActiveDetailData — 获得用户app激活数据信息明细【pro】

此接口限定pro用户使用，根据用户输入appKey和计划id，queryDate，返回激活设备明细数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appKey | string | 是 | 应用appkey |
| planId | long | 否 | 计划id（示例: 从用户计划列表接口获取） |
| queryDate | string | 是 | 查询日期（示例: 2018-12-19） |
| pageNum | integer | 否 | 当前页数（示例: 1） |
| pageSize | integer | 否 | 每页显示的记录数（示例: 10） |

```bash
umeng-cli call '{"name": "umeng.apptrack.getActiveDetailData", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.apptrack/umeng.apptrack.getActiveDetailData", "authType": "umeng-aksk"}}' '{"appKey": "", "queryDate": "2018-12-19"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | AppDownload[] | 激活数据明细 |
| total | integer | 总数 |


**`AppDownload[]` 结构（激活明细信息下载）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| unitId | long | 监测单元id |
| mName | string | 监测单元名称 |
| planName | string | 推广计划名称 |
| chanName | string | 渠道名称 |
| type | string | 激活类型：
iOS：IDFA、CAID、IDFV等
Android：IMEI、OAID、ANDROID_ID等 |
| deviceId | string | 激活设备id，其中IDFA、IMEI基于原值做md5加密，其他为原值 |
| clickDate | string | 点击日期：20200116 |
| activeDate | string | 激活日期：20200116 |

**返回示例：**

```json
{
  "total": 0,
  "data": [
    {
      "chanName": "xxx",
      "activeDate": "xxx",
      "unitId": 0,
      "planName": "xxx",
      "mName": "xxx",
      "type": "xxx",
      "deviceId": "xxx",
      "clickDate": "xxx"
    }
  ]
}
```

---

### umeng.apptrack.getPayAnalysisData — 获得付费订单数据

根据计划id或单元id查询出该计划id或单元id下用户拍下订单数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| planId | long | 是 | 计划id（示例: 从用户计划列表接口获取） |
| unitId | long | 否 | 单元id（默认: 0）（示例: 从监测单元列表接口获取） |
| queryDate | string | 是 | 查询日期（示例: 2018-12-19） |
| pageNum | integer | 否 | 当前页数（默认: 1） |
| pageSize | integer | 否 | 每页显示的记录数（默认: 10） |

```bash
umeng-cli call '{"name": "umeng.apptrack.getPayAnalysisData", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.apptrack/umeng.apptrack.getPayAnalysisData", "authType": "umeng-aksk"}}' '{"planId": "从用户计划列表接口获取", "queryDate": "2018-12-19"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | GetPayAnalysis[] |  |
| total | integer | 总数 |


**`GetPayAnalysis[]` 结构（获得拍下付费数据）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| payId | string | 付费(拍下)ID |
| payItem | string | 付费(拍下)商品 |
| orderId | string | 订单号 |
| amount | BigDecimal | 付费(拍下)金额 |
| activateDs | string | 激活日期 |
| eventDs | string | 事件日期 |
| clickDs | string | 点击日期 |

**返回示例：**

```json
{
  "total": 0,
  "data": [
    {
      "amount": "",
      "orderId": "xxx",
      "payItem": "xxx",
      "activateDs": "xxx",
      "payId": "xxx",
      "eventDs": "xxx",
      "clickDs": "xxx"
    }
  ]
}
```

---

### umeng.apptrack.getOrderAnalysisData — 获得拍下订单数据

根据计划id或单元id查询出该计划id或单元id下用户拍下订单数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| planId | long | 是 | 计划id（示例: 从用户计划列表接口获取） |
| unitId | long | 否 | 单元id（默认: 0）（示例: 从监测单元列表接口获取） |
| queryDate | string | 是 | 查询日期（示例: 2018-12-19） |
| pageNum | integer | 否 | 当前页数（默认: 1） |
| pageSize | integer | 否 | 每页显示的记录数（默认: 10） |

```bash
umeng-cli call '{"name": "umeng.apptrack.getOrderAnalysisData", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.apptrack/umeng.apptrack.getOrderAnalysisData", "authType": "umeng-aksk"}}' '{"planId": "从用户计划列表接口获取", "queryDate": "2018-12-19"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | GetPayAnalysis[] |  |
| total | integer | 总数 |


**`GetPayAnalysis[]` 结构（获得拍下付费数据）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| payId | string | 付费(拍下)ID |
| payItem | string | 付费(拍下)商品 |
| orderId | string | 订单号 |
| amount | BigDecimal | 付费(拍下)金额 |
| activateDs | string | 激活日期 |
| eventDs | string | 事件日期 |
| clickDs | string | 点击日期 |

**返回示例：**

```json
{
  "total": 0,
  "data": [
    {
      "amount": "",
      "orderId": "xxx",
      "payItem": "xxx",
      "activateDs": "xxx",
      "payId": "xxx",
      "eventDs": "xxx",
      "clickDs": "xxx"
    }
  ]
}
```

---

### umeng.apptrack.getRegisterAnalysisData — 获得注册事件分析数据

根据计划id或单元id查询出该计划id或单元id下用户注册事件数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| planId | long | 是 | 计划id（示例: 从用户计划列表接口获取） |
| unitId | long | 否 | 单元id（默认: 0）（示例: 从监测单元列表接口获取） |
| queryDate | string | 是 | 查询日期（示例: 2018-12-19） |
| pageNum | integer | 否 | 当前页数（默认: 1） |
| pageSize | integer | 否 | 每页显示的记录数（默认: 10） |

```bash
umeng-cli call '{"name": "umeng.apptrack.getRegisterAnalysisData", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.apptrack/umeng.apptrack.getRegisterAnalysisData", "authType": "umeng-aksk"}}' '{"planId": "从用户计划列表接口获取", "queryDate": "2018-12-19"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | GetRegisterAnalysis[] | 注册事件列表 |
| total | integer | 总数 |


**`GetRegisterAnalysis[]` 结构（注册事件分析）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| registerId | string | 注册id |
| eventDs | string | 注册日期 |
| activateDs | string | 激活日期 |
| clickDs | string | 点击日期 |

**返回示例：**

```json
{
  "total": 0,
  "data": [
    {
      "registerId": "xxx",
      "activateDs": "xxx",
      "eventDs": "xxx",
      "clickDs": "xxx"
    }
  ]
}
```

---

### umeng.apptrack.getMonitoringList — 获得监测单元列表

根据用户输入的计划id返回该计划id下的监测单元id

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| planId | integer | 是 | 推广计划id（默认: 0）（示例: 从用户计划列表接口获取） |
| pageNum | integer | 否 | 当前页数（默认: 1） |
| pageSize | integer | 否 | 每页显示的记录数（默认: 10） |

```bash
umeng-cli call '{"name": "umeng.apptrack.getMonitoringList", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.apptrack/umeng.apptrack.getMonitoringList", "authType": "umeng-aksk"}}' '{"planId": "从用户计划列表接口获取"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | AppMonitors[] |  |
| total | integer | 总记录数 |


**`AppMonitors[]` 结构（推广计划下的单元信息）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| mid | long | 单元id |
| mName | string | 单元名称 |
| chanName | string | 渠道名称 |
| downloadUrl | string | 下载地址 |
| shortUrl | string | 短链地址 |

**返回示例：**

```json
{
  "total": 0,
  "data": [
    {
      "shortUrl": "xxx",
      "chanName": "xxx",
      "downloadUrl": "xxx",
      "mid": 0,
      "mName": "xxx"
    }
  ]
}
```

---

### umeng.apptrack.getPlanList — 获得用户计划列表

根据用户id获得用户计划列表

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appKey | string | 否 | 应用appKey |
| pageNum | integer | 否 | 当前页数（默认: 1） |
| pageSize | integer | 否 | 每页显示的记录数（默认: 10） |

```bash
umeng-cli call '{"name": "umeng.apptrack.getPlanList", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.apptrack/umeng.apptrack.getPlanList", "authType": "umeng-aksk"}}' '{}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | AppRecPlan[] |  |
| total | integer | 总记录数 |


**`AppRecPlan[]` 结构（计划信息）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| planId | integer | 计划Id |
| planName | string | 计划名称 |
| startDay | string | 计划开始日期 |
| endDay | string | 计划结束日期 |

**返回示例：**

```json
{
  "total": 0,
  "data": [
    {
      "startDay": "xxx",
      "endDay": "xxx",
      "planName": "xxx",
      "planId": 0
    }
  ]
}
```

---

### umeng.apptrack.getMyEventData — 获取用户自定义事件

根据用户输入的计划id或者监测单元id返回用户自定义事件数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| planId | long | 是 | 计划id（示例: 从用户计划列表接口获取） |
| unitId | long | 否 | 单元id（默认: null）（示例: 从监测单元列表接口获取） |
| queryDate | string | 是 | 查询日期（示例: 2018-12-19） |

```bash
umeng-cli call '{"name": "umeng.apptrack.getMyEventData", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.apptrack/umeng.apptrack.getMyEventData", "authType": "umeng-aksk"}}' '{"planId": "从用户计划列表接口获取", "queryDate": "2018-12-19"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | AppEvent[] |  |


**`AppEvent[]` 结构（获取用户自定义事件）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| eventName | string | 自定义事件名称 |
| eventNumber | long | 自定义事件值 |

**返回示例：**

```json
{
  "data": [
    {
      "eventNumber": 0,
      "eventName": "xxx"
    }
  ]
}
```

---

### umeng.apptrack.getClickActiveData — 获得点击激活数据

根据计划id或单元id查询出该计划id或单元id下的点击激活数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| planId | long | 是 | 计划id（示例: 从用户计划列表接口获取） |
| unitId | long | 否 | 单元id（示例: 从监测单元列表接口获取） |
| queryDate | string | 是 | 查询日期（示例: 2018-12-19） |

```bash
umeng-cli call '{"name": "umeng.apptrack.getClickActiveData", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.apptrack/umeng.apptrack.getClickActiveData", "authType": "umeng-aksk"}}' '{"planId": "从用户计划列表接口获取", "queryDate": "2018-12-19"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| clickPv | long | 点击pv |
| clickUv | long | 点击uv |
| activateUv | long | 激活真人数 |
| activateRate | BigDecimal | 点击激活比率 |
| totalActivateUv | long | 总激活 |
| activateDevice | long | 点击激活 |

**返回示例：**

```json
{
  "clickUv": 0,
  "clickPv": 0,
  "totalActivateUv": 0,
  "activateUv": 0,
  "activateDevice": 0
}
```

---

### umeng.apptrack.getRegisterLoginData — 获得计划注册登录相关数据

根据计划id或单元id查询出该计划id或单元id下的注册登录等相关数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| planId | long | 是 | 计划id（示例: 从用户计划列表接口获取） |
| unitId | long | 否 | 单元id（示例: 从监测单元列表接口获取） |
| queryDate | string | 是 | 查询日期（示例: 2018-12-19） |

```bash
umeng-cli call '{"name": "umeng.apptrack.getRegisterLoginData", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.apptrack/umeng.apptrack.getRegisterLoginData", "authType": "umeng-aksk"}}' '{"planId": "从用户计划列表接口获取", "queryDate": "2018-12-19"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| register | long | 注册数量 |
| login | long | 登录数量 |
| roleDevice | long | 创建角色数量 |
| orderDevice | long | 拍下订单设备数量 |
| orderAmount | BigDecimal | 拍下订单金额 |
| payDevice | long | 付费设备数 |
| amount | BigDecimal | 付费金额 |

**返回示例：**

```json
{
  "orderDevice": 0,
  "roleDevice": 0,
  "payDevice": 0,
  "login": 0,
  "register": 0
}
```

---

### umeng.apptrack.getStayTrendData — 获取留存数据

根据用户输入计划id和单元id获取留存数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| planId | long | 是 | 计划id（示例: 从用户计划列表接口获取） |
| unitId | long | 否 | 单元id（默认: null）（示例: 从监测单元列表接口获取） |
| queryDate | string | 是 | 查询日期（示例: 2018-12-19） |

```bash
umeng-cli call '{"name": "umeng.apptrack.getStayTrendData", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.apptrack/umeng.apptrack.getStayTrendData", "authType": "umeng-aksk"}}' '{"planId": "从用户计划列表接口获取", "queryDate": "2018-12-19"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| stay1 | long | 次日留存数据 |
| stay2 | long | 第3日留存数据 |
| stay3 | long | 第4日留存数据 |
| stay4 | long | 第5日留存数据 |
| stay5 | long | 第6日留存数据 |
| stay6 | long | 第7日留存数据 |
| stay7 | long | 第8日留存数据 |
| stay8 | long | 第9日留存数据 |
| stay9 | long | 第10日留存数据 |
| stay10 | long | 第11日留存数据 |
| stay11 | long | 第12日留存数据 |
| stay12 | long | 第13日留存数据 |
| stay13 | long | 第14日留存数据 |
| stay14 | long | 第15日留存数据 |

**返回示例：**

```json
{
  "stay9": 0,
  "stay3": 0,
  "stay4": 0,
  "stay14": 0,
  "stay1": 0,
  "stay2": 0,
  "stay7": 0,
  "stay11": 0,
  "stay8": 0,
  "stay10": 0,
  "stay5": 0,
  "stay13": 0,
  "stay6": 0,
  "stay12": 0
}
```

---

# 友盟推送助手 - API 接口参考文档
>  `authType` 默认为 `cookie`，可省略

> 本文档梳理了 `umeng-push-helper` 技能中所有调用的友盟推送后台 API 接口，包括接口地址、请求方法、入参、出参及使用场景。
>
> **基础域名**：`https://upush.umeng.com`
>
> **通用请求头**：
> ```
> Content-Type: application/json;charset=UTF-8
> ```
---

## 目录

- [一、基础信息查询](#一基础信息查询)
  - [1.1 获取应用列表 (listAll)](#11-获取应用列表-listall)
- [二、应用数据查询](#二应用数据查询)
  - [2.1 消息概览 (messageOverview)](#21-消息概览-messageoverview)
  - [2.2 诊断摘要 (diagnosisSummery)](#22-诊断摘要-diagnosissummery)
  - [2.3 诊断报告 (diagnosisReport)](#23-诊断报告-diagnosisreport)
- [三、消息列表与统计](#三消息列表与统计)
  - [3.1 获取消息列表 (getMsgList)](#31-获取消息列表-getmsglist)
  - [3.2 API 单播统计记录 (getApi)](#32-api-单播统计记录-getapi)
- [四、单条消息详情](#四单条消息详情)
  - [4.1 消息基本信息 (getMsgInfo)](#41-消息基本信息-getmsginfo)
  - [4.2 推送统计数据 (getMsgData)](#42-推送统计数据-getmsgdata)
  - [4.3 失败分析 (getPushExpStatData)](#43-失败分析-getpushexpstatdata)
  - [4.4 厂商通道集成状态 (getChannelInfo)](#44-厂商通道集成状态-getchannelinfo)
  - [4.5 分通道送达统计 (getMsgStatChannelData)](#45-分通道送达统计-getmsgstatchanneldata)
- [五、推送轨迹查询](#五推送轨迹查询)
  - [5.1 消息生命周期 (getToolLifeCycle)](#51-消息生命周期-gettoollifecycle)
  - [5.2 设备信息 (getDeviceInfo)](#52-设备信息-getdeviceinfo)
  - [5.3 推送请求内容 (getToolRequestContent)](#53-推送请求内容-gettoolrequestcontent)
  - [5.4 设备消息列表 (deviceMessage)](#54-设备消息列表-devicemessage)
- [六、概况统计查询](#六概况统计查询)
  - [6.1 应用概况统计 (getAppCnt)](#61-应用概况统计-getappcnt)
  - [6.2 推送转换数据 (getTransformData)](#62-推送转换数据-gettransformdata)
  - [6.3 厂商通道额度 (queryThirdQuota)](#63-厂商通道额度-querythirdquota)
- [七、开关统计查询](#七开关统计查询)
  - [7.1 开关趋势数据 (getCloseTrend)](#71-开关趋势数据-getclosetrend)
- [八、关闭归因分析](#八关闭归因分析)
  - [8.1 用户偏好分析 (userPreferenceAnalyzer)](#81-用户偏好分析-userpreferenceanalyzer)
  - [8.2 推送频次分析 (pushFrequencyAnalyzer)](#82-推送频次分析-pushfrequencyanalyzer)
  - [8.3 通知内容分析 (pushMessageAnalyzer)](#83-通知内容分析-pushmessageanalyzer)
  - [8.4 设备维度分析 (deviceDimensionAnalyzer)](#84-设备维度分析-devicedimensionanalyzer)
- [九、单日 API 单播统计详情](#九单日-api-单播统计详情)
  - [9.1 消息发送漏斗 (getUnicastPushMsgStat)](#91-消息发送漏斗-getunicastpushmsgstat)
  - [9.2 通道统计 (getUnicastQuotaPushMsgStat)](#92-通道统计-getunicastquotapushmsgstat)
  - [9.3 失败原因分析 (getPushExpStatData - 单播模式)](#93-失败原因分析-getpushexpstatdata---单播模式)
- [十、禁止调用的接口](#十禁止调用的接口)
---

## 一、基础信息查询

### 1.1 获取应用列表 (listAll)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/home/listAll` |
| **Method** | POST |
| **功能** | 获取当前账号下所有应用的列表，支持分页 |

#### 请求参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| appkey | string | 否 | `""` | 应用 key，空字符串表示不筛选 |
| platform | string | 否 | `"all"` | 平台筛选：`all` / `android` / `ios` / `harmony` |
| page | int | 否 | `1` | 页码 |
| perPage | int | 否 | `15` | 每页条数，固定 15 |
| hasPush | int | 是 | - | 推送开通状态：`0` 全部、`-1` 未开通、`1` 已开通 |
| appName | string | 否 | `""` | 应用名称筛选 |
| yearQuotaSts | int | 是 | - | 免费额度用量：`0` 全部、`1` 正常、`2` 即将超量、`-1` 已超量 |

#### 返回值

```json
{
  "status": true,
  "data": {
    "appList": [
      {
        "appkey": "应用唯一标识",
        "appName": "应用名称",
        "platform": "android/ios/harmony",
        "dau": "日活跃用户数"
      }
    ],
    "total": 739,
    "totalPage": 50,
    "currPage": 1
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| status | bool | 请求是否成功 |
| data.appList | array | 应用列表数组 |
| data.appList[].appkey | string | 应用唯一标识 |
| data.appList[].appName | string | 应用名称 |
| data.appList[].platform | string | 平台类型 |
| data.appList[].dau | string/int | 日活跃用户数 |
| data.total | int | 应用总数 |
| data.totalPage | int | 总页数 |
| data.currPage | int | 当前页码 |

---

## 二、应用数据查询

### 2.1 消息概览 (messageOverview)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/push/messageOverview` |
| **Method** | POST |
| **功能** | 查询应用的消息概览统计数据 |

#### 请求参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| appkey | string | 是 | - | 应用唯一标识 |
| dateType | string | 否 | `"7d"` | 日期范围：`7d`（最近7天） |

#### 返回值

```json
{
  "status": true,
  "data": {
    "list": [
      { "name": "指标名称", "value": "指标值" }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.list | array | 概览指标列表 |
| data.list[].name | string | 指标名称（如：发送量、送达量等） |
| data.list[].value | string/int | 指标数值 |

---

### 2.2 诊断摘要 (diagnosisSummery)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/push/diagnosisSummery` |
| **Method** | POST |
| **功能** | 查询应用推送的诊断摘要 |

#### 请求参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| appkey | string | 是 | - | 应用唯一标识 |
| dateType | string | 否 | `"7d"` | 日期范围 |

#### 返回值

```json
{
  "status": true,
  "data": { ... }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data | object | 诊断摘要数据，包含推送健康度相关信息 |

---

### 2.3 诊断报告 (diagnosisReport)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/push/diagnosisReport` |
| **Method** | POST |
| **功能** | 查询应用推送的诊断报告，包含健康评分和问题分析 |

#### 请求参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| appkey | string | 是 | - | 应用唯一标识 |
| dateType | string | 否 | `"7d"` | 日期范围 |

#### 返回值

```json
{
  "status": true,
  "data": {
    "score": 85,
    "issues": ["问题1", "问题2"],
    "suggestions": ["建议1", "建议2"]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.score | int | 推送健康得分 |
| data.issues | array | 发现的问题列表 |
| data.suggestions | array | 优化建议列表 |

---

## 三、消息列表与统计

### 3.1 获取消息列表 (getMsgList)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/push/getMsgList` |
| **Method** | POST |
| **功能** | 查询指定应用的任务粒度消息列表，支持分页和时间范围筛选 |

#### 请求参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| appkey | string | 是 | - | 应用唯一标识 |
| productionMode | bool | 否 | `true` | 是否生产模式 |
| displayType | int | 否 | `0` | 展示类型 |
| description | string | 否 | `""` | 任务描述筛选关键词 |
| timeSelectorType | int | 否 | `1` | 时间选择器类型 |
| startTime | string | 否 | 当前时间-15天 | 开始时间，格式 `yyyy-MM-dd` |
| endTime | string | 否 | 当天 | 结束时间，格式 `yyyy-MM-dd` |
| appGroup | bool | 否 | `false` | 是否应用组 |
| pageIndex | int | 否 | `1` | 页码 |
| pageSize | int | 否 | `15` | 每页条数（固定 15） |

#### 返回值

```json
{
  "status": true,
  "data": {
    "total": 100,
    "pageIndex": 1,
    "msgSketchVOList": [
      {
        "msgId": "消息ID",
        "description": "任务描述",
        "target": "目标人群",
        "createTime": "创建时间",
        "pushTime": "发送时间",
        "status": "状态",
        "type": "推送类型",
        "totalCount": 18300244,
        "acceptCount": 10275738,
        "sentCount": 10275738,
        "arriveCount": 7523500,
        "arriveRate": "73.22%",
        "showCount": 5222299,
        "showRate": "69.41%",
        "clickCount": 6614,
        "clickRate": "0.13%",
        "clickRateOnShow": "0.06%",
        "ignoreCount": 4649,
        "ignoreRate": "0.06%"
      }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.total | int | 消息总条数 |
| data.pageIndex | int | 当前页码 |
| data.msgSketchVOList | array | 消息列表 |
| [].msgId | string | 消息唯一标识 |
| [].description | string | 任务描述 |
| [].target | string | 目标人群 |
| [].createTime | string | 创建时间 |
| [].pushTime | string | 发送时间 |
| [].status | string | 消息状态 |
| [].type | string | 推送类型 |
| [].totalCount | int | 计划发送数 |
| [].acceptCount | int | 有效设备数 |
| [].sentCount | int | 实际发送数 |
| [].arriveCount | int | 消息送达数 |
| [].arriveRate | string | 送达率 |
| [].showCount | int | 消息展示数 |
| [].showRate | string | 展示率 |
| [].clickCount | int | 消息点击数 |
| [].clickRate | string | 送达点击率（点击数/送达数） |
| [].clickRateOnShow | string | 展示点击率（点击数/展示数） |
| [].ignoreCount | int | 消息忽略数 |
| [].ignoreRate | string | 忽略率 |

---

### 3.2 API 单播统计记录 (getApi)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/dataStatistic/getApi` |
| **Method** | POST |
| **功能** | 获取 API 单播统计记录，按天聚合展示 |

#### 请求参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| appkey | string | 是 | - | 应用唯一标识 |
| pageIndex | int | 否 | `1` | 页码 |
| pageSize | int | 否 | `15` | 每页条数（固定 15） |

#### 返回值

```json
{
  "status": true,
  "data": {
    "total": 30,
    "pageIndex": 1,
    "list": [
      {
        "date": "2026-04-07",
        "acceptCount": 15418704,
        "sentCount": 12699523,
        "arriveCount": 10462983,
        "arriveRate": "82.39%",
        "showCount": 10204965,
        "showRate": "97.53%",
        "clickCount": 16223,
        "clickRate": "0.16%",
        "clickRateOnShow": "0.16%",
        "ignoreCount": 0,
        "ignoreRate": "0.00%"
      }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.total | int | 记录总数 |
| data.list | array | 统计记录列表 |
| [].date | string | 日期 |
| [].acceptCount | int | 有效设备数 |
| [].sentCount | int | 实际发送数 |
| [].arriveCount | int | 消息送达数 |
| [].arriveRate | string | 送达率 |
| [].showCount | int | 消息展示数 |
| [].showRate | string | 展示率 |
| [].clickCount | int | 消息点击数 |
| [].clickRate | string | 送达点击率 |
| [].clickRateOnShow | string | 展示点击率 |
| [].ignoreCount | int | 消息忽略数 |
| [].ignoreRate | string | 忽略率 |

---

## 四、单条消息详情

### 4.1 消息基本信息 (getMsgInfo)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/push/getMsgInfo` |
| **Method** | POST |
| **功能** | 查询单条消息的基本信息和配置参数 |

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| appkey | string | 是 | 应用唯一标识 |
| taskId | string | 是 | 消息 ID（msg_id） |

#### 返回值

```json
{
  "status": true,
  "data": {
    "description": "任务描述",
    "title": "消息标题",
    "type": "推送类型（广播等）",
    "pushType": "推送类型",
    "target": "目标人群",
    "productionMode": true,
    "pushTime": "发送时间",
    "sendTime": "发送时间（备选）",
    "createTime": "创建时间",
    "status": "状态（发送完成等）",
    "platform": "平台类型",
    "channelActivity": {
      "huawei": { ... },
      "xiaomi": { ... }
    }
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.description | string | 任务描述 |
| data.title | string | 消息标题 |
| data.type / data.pushType | string | 推送类型 |
| data.target | string | 目标人群 |
| data.productionMode | bool | 是否生产模式 |
| data.pushTime / data.sendTime | string | 发送时间 |
| data.createTime | string | 创建时间 |
| data.status | string | 消息状态 |
| data.platform | string | 应用平台 |
| data.channelActivity | object/null | 厂商通道活动配置（为空表示未配置厂商通道） |

---

### 4.2 推送统计数据 (getMsgData)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/push/getMsgData` |
| **Method** | POST |
| **功能** | 查询单条消息的推送统计漏斗数据 |

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| appkey | string | 是 | 应用唯一标识 |
| taskId | string | 是 | 消息 ID |

#### 返回值

```json
{
  "status": true,
  "data": {
    "totalCount": 7847893,
    "sentCount": 5188950,
    "arriveCount": 4338336,
    "showCount": 3171839,
    "clickCount": 6863,
    "ignoreCount": 28945
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.totalCount | int | 计划发送数 |
| data.sentCount | int | 实际发送数 |
| data.arriveCount | int | 消息送达数 |
| data.showCount | int | 消息展示数 |
| data.clickCount | int | 消息点击数 |
| data.ignoreCount | int | 消息忽略数 |

---

### 4.3 失败分析 (getPushExpStatData)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/push/getPushExpStatData` |
| **Method** | POST |
| **功能** | 查询推送失败原因分析数据（支持任务粒度和单播模式） |

#### 请求参数（任务粒度模式）

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| appkey | string | 是 | - | 应用唯一标识 |
| isTask | bool | 是 | `true` | 是否任务粒度查询 |
| msgId | string | 是 | - | 消息 ID |
| isFree | bool | 否 | `false` | 是否免费消息 |
| stage | string | 否 | `"all"` | 失败阶段筛选 |
| channel | string | 否 | `"all"` | 通道筛选 |

#### 请求参数（单播模式）

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| appkey | string | 是 | - | 应用唯一标识 |
| isTask | bool | 是 | `false` | 单播模式 |
| ds | string | 是 | - | 日期，格式 `yyyyMMdd` |
| isFree | bool | 否 | `false` | 是否免费消息 |
| stage | string | 否 | `"all"` | 失败阶段筛选 |
| channel | string | 否 | `"all"` | 通道筛选 |

#### 返回值

```json
{
  "status": true,
  "data": {
    "errorTotal": 50000,
    "errorData": [
      {
        "name": "失败分类名称",
        "num": 30000,
        "rate": 0.6,
        "children": [
          {
            "name": "具体失败原因",
            "num": 20000,
            "rate": 0.4
          }
        ]
      }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.errorTotal | int | 总失败数 |
| data.errorData | array | 失败原因列表（一级分类） |
| [].name | string | 失败分类名称 |
| [].num | int | 失败数量 |
| [].rate | float | 失败占比（0~1） |
| [].children | array | 子级失败原因列表 |
| [].children[].name | string | 具体失败原因 |
| [].children[].num | int | 失败数量 |
| [].children[].rate | float | 失败占比 |

---

### 4.4 厂商通道集成状态 (getChannelInfo)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/setting/getChannelInfo` |
| **Method** | POST |
| **功能** | 查询应用的厂商通道集成配置状态（**仅 Android 应用**） |

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| appkey | string | 是 | 应用唯一标识 |

#### 返回值

```json
{
  "status": true,
  "data": {
    "huaweiId": "华为 AppID",
    "huaweiSecret": "华为 AppSecret",
    "miSecret": "小米 AppSecret",
    "oppoAppId": "OPPO AppID",
    "oppoSecret": "OPPO AppSecret",
    "vivoAppId": "VIVO AppID",
    "vivoCallbackId": "VIVO CallbackID",
    "meizuId": "魅族 AppID",
    "meizuSecret": "魅族 AppSecret",
    "meizuCallbackUrlConfirmed": false,
    "honorAppId": "荣耀 AppID",
    "honorClientId": "荣耀 ClientID",
    "honorClientSecret": "荣耀 ClientSecret"
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.huaweiId | string | 华为 AppID |
| data.huaweiSecret | string | 华为 AppSecret |
| data.miSecret | string | 小米 AppSecret |
| data.oppoAppId | string | OPPO AppID |
| data.oppoSecret | string | OPPO AppSecret |
| data.vivoAppId | string | VIVO AppID |
| data.vivoCallbackId | string | VIVO CallbackID |
| data.meizuId | string | 魅族 AppID |
| data.meizuSecret | string | 魅族 AppSecret |
| data.meizuCallbackUrlConfirmed | bool | 魅族回执确认状态 |
| data.honorAppId | string | 荣耀 AppID |
| data.honorClientId | string | 荣耀 ClientID |
| data.honorClientSecret | string | 荣耀 ClientSecret |

> **判断逻辑**：字段有值表示已集成，为空表示未集成。

---

### 4.5 分通道送达统计 (getMsgStatChannelData)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/push/getMsgStatChannelData` |
| **Method** | POST |
| **功能** | 查询单条消息在各通道的送达统计（**仅 Android 应用**） |

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| appkey | string | 是 | 应用唯一标识 |
| taskId | string | 是 | 消息 ID |

#### 返回值

```json
{
  "status": true,
  "data": {
    "list": [
      {
        "channel": "accs",
        "channelName": "友盟通道",
        "sentCount": 1000000,
        "arriveCount": 800000,
        "arriveRate": "80.00%",
        "showCount": 600000,
        "showRate": "75.00%",
        "clickCount": 1000,
        "clickRate": "0.13%"
      }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.list | array | 各通道统计列表 |
| [].channel | string | 通道标识（`accs` / `huawei` / `xiaomi` / `oppo` / `vivo` / `honor` / `meizu`） |
| [].channelName | string | 通道显示名称 |
| [].sentCount | int | 发送数 |
| [].arriveCount | int | 送达数 |
| [].arriveRate | string | 送达率 |
| [].showCount | int | 展示数 |
| [].showRate | string | 展示率 |
| [].clickCount | int | 点击数 |
| [].clickRate | string | 送达点击率 |

> **通道标识映射**：`accs` = 友盟通道（自有通道）

---

## 五、推送轨迹查询

### 5.1 消息生命周期 (getToolLifeCycle)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/push/getToolLifeCycle` |
| **Method** | POST |
| **功能** | 查询某条消息在指定设备上的完整生命周期（发送→送达→点击） |

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| appkey | string | 是 | 应用唯一标识 |
| deviceToken | string | 是 | 设备推送 token |
| msgId | string | 是 | 消息 ID |

#### 返回值

```json
{
  "status": true,
  "data": {
    "sendTime": "发送时间",
    "arriveTime": "到达时间",
    "clickTime": "点击时间",
    "lifeCycle": {
      "stageFailWithoutResend": {
        "extra": "失败原因描述"
      }
    }
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.sendTime | string | 消息发送时间 |
| data.arriveTime | string | 消息到达设备时间 |
| data.clickTime | string | 用户点击时间 |
| data.lifeCycle.stageFailWithoutResend | object | 失败阶段信息 |
| data.lifeCycle.stageFailWithoutResend.extra | string | 失败原因（如"单应用单设备限量"） |

---

### 5.2 设备信息 (getDeviceInfo)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/setting/getDeviceInfo` |
| **Method** | POST |
| **功能** | 查询指定设备的详细信息，包括设备型号、厂商 token 注册状态等 |

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| appkey | string | 是 | 应用唯一标识 |
| deviceToken | string | 是 | 设备推送 token |

#### 返回值

```json
{
  "status": true,
  "data": {
    "deviceModel": "设备型号",
    "osVersion": "系统版本",
    "appVersion": "应用版本",
    "pushChannel": "推送通道",
    "brand": "设备品牌",
    "online": true,
    "valid": true,
    "thirdTokens": {
      "huawei": "华为token值",
      "xiaomi": "小米token值"
    }
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.deviceModel | string | 设备型号 |
| data.osVersion | string | 系统版本 |
| data.appVersion | string | 应用版本 |
| data.pushChannel | string | 推送通道 |
| data.brand | string | 设备品牌 |
| data.online | bool | 设备是否在线 |
| data.valid | bool | 设备标识是否有效（主要用于 iOS） |
| data.thirdTokens | object | 各厂商 token 注册情况（key 为厂商标识，value 为 token） |

---

### 5.3 推送请求内容 (getToolRequestContent)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/push/getToolRequestContent` |
| **Method** | POST |
| **功能** | 查询推送消息的原始请求内容（标题、正文、目标类型等） |

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| appkey | string | 是 | 应用唯一标识 |
| msgId | string | 是 | 消息 ID |

#### 返回值

```json
{
  "status": true,
  "data": {
    "title": "推送标题",
    "text": "推送正文内容",
    "target": "目标类型",
    "startTime": "发送时间"
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.title | string | 推送标题 |
| data.text | string | 推送正文 |
| data.target | string | 目标类型 |
| data.startTime | string | 发送时间 |

---

### 5.4 设备消息列表 (deviceMessage)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/setting/deviceMessage` |
| **Method** | POST |
| **功能** | 查询指定设备在指定日期范围内接收到的所有推送消息列表 |

#### 请求参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| appkey | string | 是 | - | 应用唯一标识 |
| deviceToken | string | 是 | - | 设备推送 token |
| startDate | string | 是 | - | 开始日期，格式 `yyyy-MM-dd` |
| endDate | string | 是 | - | 结束日期，格式 `yyyy-MM-dd` |
| page | int | 否 | `1` | 页码 |
| pageSize | int | 否 | `50` | 每页数量（最大 100） |

#### 返回值

```json
{
  "status": true,
  "data": {
    "total": 20,
    "currPage": 1,
    "list": [
      {
        "msgId": "消息ID",
        "digest": "{\"body\":{\"title\":\"推送标题\"}}",
        "startTime": "发送时间",
        "status": "送达成功",
        "channel": "huawei"
      }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.total | int | 消息总数 |
| data.currPage | int | 当前页码 |
| data.list | array | 消息列表 |
| [].msgId | string | 消息 ID |
| [].digest | string | 消息摘要（JSON 字符串，需解析获取 title） |
| [].startTime | string | 发送时间 |
| [].status | string | 消息状态（如"送达成功"） |
| [].channel | string | 下发通道 |

---

## 六、概况统计查询

### 6.1 应用概况统计 (getAppCnt)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/overview/getAppCnt` |
| **Method** | POST |
| **功能** | 查询应用的基础概况指标（活跃用户、送达用户等） |

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| appkey | string | 是 | 应用唯一标识 |

#### 返回值

```json
{
  "status": true,
  "data": {
    "list": [
      { "name": "活跃用户", "value": "1234567" },
      { "name": "送达用户", "value": "987654" },
      { "name": "卸载用户", "value": "12345" },
      { "name": "关闭通知用户", "value": "56789" }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.list | array | 概况指标列表 |
| [].name | string | 指标名称：`活跃用户` / `送达用户` / `卸载用户` / `关闭通知用户` |
| [].value | string/int | 指标数值（可能带逗号分隔符） |

---

### 6.2 推送转换数据 (getTransformData)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/overview/getTransformData` |
| **Method** | POST |
| **功能** | 查询推送消息的转化漏斗数据 |

#### 请求参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| appkey | string | 是 | - | 应用唯一标识 |
| msgType | string | 否 | `"notification"` | 消息类型：`notification`（通知栏消息）/ `message`（消息） |
| dateType | string | 否 | `"1d"` | 日期范围：`1d`（昨日）/ `3d`（近3日）/ `7d`（近7日） |

#### 返回值

```json
{
  "status": true,
  "data": {
    "list": [
      { "name": "有效设备", "value": 5000000, "type": "accept" },
      { "name": "实际发送", "value": 4500000, "type": "sent" },
      { "name": "消息送达", "value": 3500000, "type": "arrive" },
      { "name": "消息展示", "value": 3000000, "type": "show" },
      { "name": "消息点击", "value": 50000, "type": "click" }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.list | array | 漏斗阶段列表 |
| [].name | string | 阶段名称 |
| [].value | int | 数量 |
| [].type | string | 阶段标识：`accept` / `sent` / `arrive` / `show` / `click` |

---

### 6.3 厂商通道额度 (queryThirdQuota)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/overview/queryThirdQuota` |
| **Method** | POST |
| **功能** | 查询各厂商通道的推送额度使用情况（**仅 Android 应用有效**） |

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| appkey | string | 是 | 应用唯一标识 |

#### 返回值

```json
{
  "status": true,
  "data": {
    "oppoTotalCount": 1000000,
    "oppoRemainCount": 800000,
    "xmQuotaCount": 5000000,
    "xmAckedCount": 1000000,
    "vivoSysMsgCount": 500000,
    "vivoMarketMsgCount": 200000
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.oppoTotalCount | int | OPPO 推送总额度 |
| data.oppoRemainCount | int | OPPO 剩余额度 |
| data.xmQuotaCount | int | 小米推送总额度 |
| data.xmAckedCount | int | 小米已使用额度 |
| data.vivoSysMsgCount | int | VIVO 系统消息总量 |
| data.vivoMarketMsgCount | int | VIVO 运营消息总量 |

---

## 七、开关统计查询

### 7.1 开关趋势数据 (getCloseTrend)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/dataStatistic/getCloseTrend` |
| **Method** | POST |
| **功能** | 查询应用推送开关的趋势数据，需分 5 次调用获取不同维度 |

#### 请求参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| appkey | string | 是 | - | 应用唯一标识 |
| startDate | string | 否 | 7天前 | 开始日期，格式 `yyyy-MM-dd` |
| endDate | string | 否 | 昨天 | 结束日期，格式 `yyyy-MM-dd` |
| type | string | 是 | - | 统计类型（见下表） |

**统计类型（type）取值**：

| type 值 | 说明 |
|---------|------|
| `addClose` | 新增关闭设备数 |
| `addOpen` | 新增打开设备数 |
| `dau` | DAU（日活跃设备数） |
| `cnt` | 累计关闭设备数 |
| `ratio` | 日关闭率（百分比） |

#### 返回值

```json
{
  "status": true,
  "data": {
    "list": [
      { "name": "2026-04-01", "value": 12345 },
      { "name": "2026-04-02", "value": 12500 }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.list | array | 趋势数据列表 |
| [].name | string | 日期 |
| [].value | int/float | 数值（`ratio` 类型时为百分比浮点数） |

---

## 八、关闭归因分析

### 8.1 用户偏好分析 (userPreferenceAnalyzer)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/dataStatistic/userPreferenceAnalyzer` |
| **Method** | POST |
| **功能** | 分析关闭推送用户的偏好特征，包括关闭敏感度和关闭时长分布 |

#### 请求参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| appkey | string | 是 | - | 应用唯一标识 |
| datetype | string | 否 | `"7d"` | 日期类型：`1d`（昨日）/ `7d`（近7日） |

#### 返回值

```json
{
  "status": true,
  "data": {
    "closeSensitivity": {
      "open_duration": [
        { "name": "分类名", "value": 12345, "ratioData": 0.45 }
      ],
      "close_new": [
        { "name": "分类名", "value": 6789, "ratioData": 0.30 }
      ],
      "suggestion": "优化建议文本"
    },
    "toCloseDuration": {
      "total": 50000,
      "data": [
        { "name": "时间段", "value": 10000, "ratioData": 0.20 }
      ]
    }
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.closeSensitivity.open_duration | array | 持续打开通知栏权限用户的敏感度分布 |
| data.closeSensitivity.close_new | array | 新增关闭设备用户的敏感度分布 |
| data.closeSensitivity.suggestion | string | 系统优化建议 |
| data.toCloseDuration.total | int | 关闭总数 |
| data.toCloseDuration.data | array | 关闭时间段分布 |
| [].name | string | 分类/时间段名称 |
| [].value | int/null | 数值（可能为 null） |
| [].ratioData | float | 占比（0~1） |

---

### 8.2 推送频次分析 (pushFrequencyAnalyzer)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/dataStatistic/pushFrequencyAnalyzer` |
| **Method** | POST |
| **功能** | 分析推送频次与用户关闭行为的关系 |

#### 请求参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| appkey | string | 是 | - | 应用唯一标识 |
| datetype | string | 否 | `"7d"` | 日期类型：`1d` / `7d` |

#### 返回值

```json
{
  "status": true,
  "data": {
    "reqDistribution": {
      "total": 100000,
      "data": [
        { "name": "频次区间", "value": 30000, "ratioData": 0.30 }
      ],
      "suggestion": "建议文本"
    }
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.reqDistribution.total | int | 总数 |
| data.reqDistribution.data | array | 频次分布数据 |
| data.reqDistribution.suggestion | string | 系统建议 |

---

### 8.3 通知内容分析 (pushMessageAnalyzer)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/dataStatistic/pushMessageAnalyzer` |
| **Method** | POST |
| **功能** | 分析不同推送内容对用户关闭行为的影响 |

#### 请求参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| appkey | string | 是 | - | 应用唯一标识 |
| datetype | string | 否 | `"7d"` | 日期类型：`1d` / `7d` |

#### 返回值

```json
{
  "status": true,
  "data": [
    {
      "description": "任务描述",
      "target": "目标人群",
      "pushTime": "发送时间",
      "title": "通知标题",
      "text": "通知内容",
      "clickNum": 5000,
      "closeNum": 200,
      "effectRatio": 25.0,
      "msgId": "消息ID"
    }
  ]
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data | array | 通知内容列表 |
| [].description | string | 任务描述 |
| [].target | string | 目标人群 |
| [].pushTime | string | 发送时间 |
| [].title | string | 通知标题 |
| [].text | string | 通知正文 |
| [].clickNum | int | 点击数 |
| [].closeNum | int | 关闭数 |
| [].effectRatio | float | 效果比（百分比） |
| [].msgId | string | 消息 ID |

---

### 8.4 设备维度分析 (deviceDimensionAnalyzer)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/dataStatistic/deviceDimensionAnalyzer` |
| **Method** | POST |
| **功能** | 从设备维度分析关闭推送的分布（品牌、OS 版本、应用版本、设备型号） |

#### 请求参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| appkey | string | 是 | - | 应用唯一标识 |
| datetype | string | 否 | `"7d"` | 日期类型：`1d` / `7d` |

#### 返回值

```json
{
  "status": true,
  "data": {
    "brandVersion": [
      { "name": "华为", "value": 5000, "type": "addClose", "ratioData": 0.25 }
    ],
    "osVersion": [
      { "name": "Android 14", "value": 3000, "type": "addClose", "ratioData": 0.15 }
    ],
    "appVersion": [
      { "name": "v3.2.1", "value": 2000, "type": "addClose", "ratioData": 0.10 }
    ],
    "deviceModel": [
      { "name": "Mate 60 Pro", "value": 1000, "type": "addClose", "ratioData": 0.05 }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.brandVersion | array | 手机品牌分布 |
| data.osVersion | array | OS 版本分布 |
| data.appVersion | array | 应用版本分布 |
| data.deviceModel | array | 设备型号分布 |
| [].name | string | 维度名称 |
| [].value | int | 关闭设备数 |
| [].type | string | 数据类型（`addClose` = 新增关闭） |
| [].ratioData | float | 占比（0~1） |

---

## 九、单日 API 单播统计详情

### 9.1 消息发送漏斗 (getUnicastPushMsgStat)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/dataStatistic/getUnicastPushMsgStat` |
| **Method** | POST |
| **功能** | 查询指定日期的 API 单播消息发送漏斗数据 |

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| appkey | string | 是 | 应用唯一标识 |
| startTime | string | 是 | 查询日期，格式 `yyyy-MM-dd` |

#### 返回值

```json
{
  "status": true,
  "data": {
    "list": [
      { "name": "有效设备", "value": 5000000 },
      { "name": "实际发送", "value": 4500000 },
      { "name": "消息送达", "value": 3500000 },
      { "name": "消息展示", "value": 3000000 },
      { "name": "消息点击", "value": 50000 }
    ]
  }
}
```

---

### 9.2 通道统计 (getUnicastQuotaPushMsgStat)

| 项目 | 说明 |
|------|------|
| **URL** | `https://upush.umeng.com/hsf/dataStatistic/getUnicastQuotaPushMsgStat` |
| **Method** | POST |
| **功能** | 查询指定日期各通道的 API 单播统计数据 |

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| appkey | string | 是 | 应用唯一标识 |
| startTime | string | 是 | 查询日期，格式 `yyyy-MM-dd` |

#### 返回值

```json
{
  "status":  "status": true,
  "data": {
    "list": [
      {
        "channelName": "友盟通道",
        "sentCount": 1000000,
        "arriveCount": 800000,
        "arriveRate": "80.00%",
        "showCount": 600000,
        "showRate": "75.00%",
        "clickCount": 5000,
        "clickRate": "0.63%",
        "clickRateOnShow": "0.83%",
        "msg": "主要失败原因描述"
      }
    ]
  }
}
```

| 返回字段 | 类型 | 说明 |
|----------|------|------|
| data.list | array | 各通道统计列表 |
| [].channelName | string | 通道名称 |
| [].sentCount | int | 实际发送数 |
| [].arriveCount | int | 消息送达数 |
| [].arriveRate | string | 送达率 |
| [].showCount | int | 消息展示数 |
| [].showRate | string | 展示率 |
| [].clickCount | int | 消息点击数 |
| [].clickRate | string | 送达点击率 |
| [].clickRateOnShow | string | 展示点击率 |
| [].msg | string | 主要失败原因 |

---

### 9.3 失败原因分析 (getPushExpStatData - 单播模式)

> 与 [4.3 节](#43-失败分析-getpushexpstatdata) 为同一接口，但参数不同（`isTask=false`，使用 `ds` 参数代替 `msgId`）。详见 4.3 节。

---

## 十、禁止调用的接口

以下接口出于安全考虑被**严格禁止调用**：

| 序号 | 接口地址 | 用途 | 风险等级 | Method |
|------|---------|------|---------|--------|
| 1 | `https://upush.umeng.com/hsf/push/sendMsg` | 发送推送消息 | 高危 | POST |
| 2 | `https://upush.umeng.com/hsf/setting/updateApp` | 修改应用配置 | 高危 | POST |
| 3 | `https://upush.umeng.com/hsf/setting/updateChannelInfo` | 修改渠道信息 | 高危 | POST |
| 4 | `https://upush.umeng.com/hsf/setting/saveReceipt` | 保存回执配置 | 中危 | POST |

> 这些操作需要通过友盟官方后台 `https://upush.umeng.com` 手动执行。

---

## 附录：接口汇总一览表

| 序号 | 接口名称 | URL 路径 | Method | 所属分类 |
|------|---------|---------|--------|---------|
| 1 | listAll | `/hsf/home/listAll` | POST | 基础信息 |
| 2 | messageOverview | `/hsf/push/messageOverview` | POST | 应用数据 |
| 3 | diagnosisSummery | `/hsf/push/diagnosisSummery` | POST | 应用数据 |
| 4 | diagnosisReport | `/hsf/push/diagnosisReport` | POST | 应用数据 |
| 5 | getMsgList | `/hsf/push/getMsgList` | POST | 消息列表 |
| 6 | getApi | `/hsf/dataStatistic/getApi` | POST | 消息列表 |
| 7 | getMsgInfo | `/hsf/push/getMsgInfo` | POST | 消息详情 |
| 8 | getMsgData | `/hsf/push/getMsgData` | POST | 消息详情 |
| 9 | getPushExpStatData | `/hsf/push/getPushExpStatData` | POST | 失败分析 |
| 10 | getChannelInfo | `/hsf/setting/getChannelInfo` | POST | 厂商通道 |
| 11 | getMsgStatChannelData | `/hsf/push/getMsgStatChannelData` | POST | 分通道统计 |
| 12 | getToolLifeCycle | `/hsf/push/getToolLifeCycle` | POST | 推送轨迹 |
| 13 | getDeviceInfo | `/hsf/setting/getDeviceInfo` | POST | 设备信息 |
| 14 | getToolRequestContent | `/hsf/push/getToolRequestContent` | POST | 推送内容 |
| 15 | deviceMessage | `/hsf/setting/deviceMessage` | POST | 设备消息 |
| 16 | getAppCnt | `/hsf/overview/getAppCnt` | POST | 概况统计 |
| 17 | getTransformData | `/hsf/overview/getTransformData` | POST | 概况统计 |
| 18 | queryThirdQuota | `/hsf/overview/queryThirdQuota` | POST | 厂商额度 |
| 19 | getCloseTrend | `/hsf/dataStatistic/getCloseTrend` | POST | 开关统计 |
| 20 | userPreferenceAnalyzer | `/hsf/dataStatistic/userPreferenceAnalyzer` | POST | 关闭归因 |
| 21 | pushFrequencyAnalyzer | `/hsf/dataStatistic/pushFrequencyAnalyzer` | POST | 关闭归因 |
| 22 | pushMessageAnalyzer | `/hsf/dataStatistic/pushMessageAnalyzer` | POST | 关闭归因 |
| 23 | deviceDimensionAnalyzer | `/hsf/dataStatistic/deviceDimensionAnalyzer` | POST | 关闭归因 |
| 24 | getUnicastPushMsgStat | `/hsf/dataStatistic/getUnicastPushMsgStat` | POST | 单播统计 |
| 25 | getUnicastQuotaPushMsgStat | `/hsf/dataStatistic/getUnicastQuotaPushMsgStat` | POST | 单播通道 |

> **说明**：所有接口均为 **POST** 方法，请求体为 JSON 格式。本技能仅支持只读查询操作，不包含任何写入/修改类接口。
# U-App 移动统计（com.umeng.uapp）

通过 `umeng-cli call` 命令调用友盟 OpenAPI，使用 AK/SK 签名鉴权（HMAC-SHA1）。

## 通用调用方式

```bash
umeng-cli call '{"name":"<接口名>","api":{"method":"GET","baseUrl":"https://gateway.open.umeng.com/openapi","endpoint":"param2/1/com.umeng.uapp/<接口名>","authType":"umeng-aksk"}}' '<参数JSON>'
```

> AK/SK 会在首次调用时自动通过登录凭证获取并加密缓存，无需手动配置。

---

## 接口列表

- [`umeng.uapp.createApp`](#umenguappcreateApp) — U-App新建数据源
- [`umeng.uapp.getNewAccounts`](#umenguappgetNewAccounts) — 获取新增账号
- [`umeng.uapp.getActiveAccounts`](#umenguappgetActiveAccounts) — 获取活跃账号
- [`umeng.uapp.event.create`](#umenguappeventcreate) — 创建自定义事件
- [`umeng.uapp.getLaunchesByChannelOrVersion`](#umenguappgetLaunchesByChannelOrVersion) — 根据渠道或版本条件，获取App启动次数
- [`umeng.uapp.getActiveUsersByChannelOrVersion`](#umenguappgetActiveUsersByChannelOrVersion) — 根据渠道或版本条件，获取App活跃用户数
- [`umeng.uapp.getNewUsersByChannelOrVersion`](#umenguappgetNewUsersByChannelOrVersion) — 根据渠道或版本条件，获取App新增用户数
- [`umeng.uapp.event.param.getValueDurationList`](#umenguappeventparamgetValueDurationList) — 获取事件参数值时长列表
- [`umeng.uapp.getTodayYesterdayData`](#umenguappgetTodayYesterdayData) — 获取App今天与昨天的统计数据
- [`umeng.uapp.getYesterdayData`](#umenguappgetYesterdayData) — 获取App昨天统计数据
- [`umeng.uapp.getTodayData`](#umenguappgetTodayData) — 获取App今天统计数据
- [`umeng.uapp.event.getUniqueUsers`](#umenguappeventgetUniqueUsers) — 获取自定义事件的独立用户数
- [`umeng.uapp.getAllAppData`](#umenguappgetAllAppData) — 获取所有App统计数据
- [`umeng.uapp.getAppCount`](#umenguappgetAppCount) — 获取App数量
- [`umeng.uapp.getChannelData`](#umenguappgetChannelData) — 获取渠道维度统计数据
- [`umeng.uapp.getVersionData`](#umenguappgetVersionData) — 获取版本维度统计数据
- [`umeng.uapp.event.param.getData`](#umenguappeventparamgetData) — 获取事件参数值统计数据
- [`umeng.uapp.event.param.getValueList`](#umenguappeventparamgetValueList) — 获取事件参数值列表
- [`umeng.uapp.event.getData`](#umenguappeventgetData) — 获取事件统计数据
- [`umeng.uapp.event.param.list`](#umenguappeventparamlist) — 获取事件参数列表
- [`umeng.uapp.event.list`](#umenguappeventlist) — 获取事件列表
- [`umeng.uapp.getRetentions`](#umenguappgetRetentions) — 获取App新增用户留存率
- [`umeng.uapp.getDurations`](#umenguappgetDurations) — 获取App使用时长
- [`umeng.uapp.getLaunches`](#umenguappgetLaunches) — 获取App启动次数
- [`umeng.uapp.getActiveUsers`](#umenguappgetActiveUsers) — 获取App活跃用户数
- [`umeng.uapp.getNewUsers`](#umenguappgetNewUsers) — 获取App新增用户数
- [`umeng.uapp.getDailyData`](#umenguappgetDailyData) — 获取App统计数据
- [`umeng.uapp.getAppList`](#umenguappgetAppList) — 获取App列表

---

### umeng.uapp.createApp — U-App新建数据源

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | String | 是 | 名称 |
| type | String | 是 | 类型（示例: app:应用;） |
| platform | String | 是 | 平台（示例: iphone:iPhone; ipad:iPad; android:Android; wphone:WinPhone; h5app:HTML5;） |
| language | String | 是 | 语言（示例: CN:中文; OTHER:其他） |
| firstLevel | String | 是 | 一级分类，帮助文档：https://developer.umeng.com/docs/119267/detail/183761 |
| secondLevel | String | 是 | 二级分类，帮助文档同上 |
| description | String | 否 | 描述 |

```bash
umeng-cli call '{"name": "umeng.uapp.createApp", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.createApp", "authType": "umeng-aksk"}}' '{"name": "", "type": "app:应用;", "platform": "iphone:iPhone; ipad:iPad; android:Android; wphone:WinPhone; h5app:HTML5;", "language": "CN:中文; OTHER:其他", "firstLevel": "", "secondLevel": ""}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| code | long | 状态码 |
| success | boolean | 状态 |
| data | string | 成功时返回新建应用key |
| msg | string | 返回消息 |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": "xxx"
}
```

---

### umeng.uapp.getNewAccounts — 获取新增账号

获取新增账号（仅游戏类型app）

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |
| startDate | string | 是 | 查询起始日期（例如:2018-01-01）（示例: 2018-01-01） |
| endDate | string | 是 | 查询截止日期（例如:2018-01-01） |
| periodType | string | 否 | 查询类型（按日daily,按周weekly,按月monthly 查询）（默认: daily） |
| channel | string | 否 | 渠道名称（仅限一个例如:App%20Store） |

```bash
umeng-cli call '{"name": "umeng.uapp.getNewAccounts", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.getNewAccounts", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey", "startDate": "2018-01-01", "endDate": "2025-04-01"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| newAccountInfo | AccountInfo[] | UmengUappAccountInfo[] |


**`AccountInfo[]` 结构（新增账号统计数据）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| date | string | 统计日期 |
| newUser | integer | 新增用户 |
| newAccount | integer | 新增账号 |
| hourNewUser | integer[] | 小时新增用户（按小时查询时） |
| hourNewAccount | integer[] | 小时新增账号（按小时查询时） |

**返回示例：**

```json
{
  "newAccountInfo": [
    {
      "date": "2018-01-01",
      "hourNewUser": "[11,65,49,4,4,8,25,29,31,29,32,29,38,63,39,33,34,41,40,53,12,77,86,50]",
      "newUser": 0,
      "newAccount": 0,
      "hourNewAccount": "[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]"
    }
  ]
}
```

---

### umeng.uapp.getActiveAccounts — 获取活跃账号

获取活跃账号（仅游戏类型app）

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |
| startDate | string | 是 | 查询起始日期（例如:2018-01-01） |
| endDate | string | 是 | 查询截止日期（例如:2018-01-01） |
| periodType | string | 否 | 查询类型（按日daily,按周weekly,按月monthly 查询）（默认: daily） |
| channel | string | 否 | 渠道名称（仅限一个例如:App%20Store） |

```bash
umeng-cli call '{"name": "umeng.uapp.getActiveAccounts", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.getActiveAccounts", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey", "startDate": "2025-04-01", "endDate": "2025-04-01"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| activeAccountInfo | ActiveAccountInfo[] |  |


**`ActiveAccountInfo[]` 结构（活跃账号统计数据）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| date | string | 统计日期 |
| activeUser | integer | 活跃用户 |
| activeAccount | integer | 活跃账号 |

**返回示例：**

```json
{
  "activeAccountInfo": [
    {
      "date": "2018-01-01",
      "activeAccount": 0,
      "activeUser": 0
    }
  ]
}
```

---

### umeng.uapp.event.create — 创建自定义事件

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |
| eventName | string | 是 | 自定义事件名（英文和数字，不允许特殊符号?/.\<>） |
| eventDisplayName | string | 是 | 自定义事件显示名（中文（需要urlEncode），英文和数字，不允许特殊符号?/.\<>） |
| eventType | boolean | 否 | true  计算事件（数值型），用于统计数值型变量的累计值、均值及分布。false  计数事件（字符串型），用于统计字符串型变量的消息数及触发设备数。（默认: false） |

```bash
umeng-cli call '{"name": "umeng.uapp.event.create", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.event.create", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey", "eventName": "", "eventDisplayName": ""}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| status | integer | 响应码 |
| msg | string | 响应信息 |

**返回示例：**

```json
{
  "msg": "xxx",
  "status": 0
}
```

---

### umeng.uapp.getLaunchesByChannelOrVersion — 根据渠道或版本条件，获取App启动次数

根据渠道或版本条件，获取指定App某个时间范围内的启动次数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |
| startDate | string | 是 | 查询起始日期（示例: 2018-01-01） |
| endDate | string | 是 | 查询截止日期（示例: 2018-01-01） |
| periodType | string | 是 | 查询类型（按日daily,按周weekly,按月monthly 查询）（默认: daily） |
| channels | string | 否 | 渠道名称（App%20Store）（示例: App%20Store） |
| versions | string | 否 | 版本名称（1.0.0）（示例: 1.0.0） |

```bash
umeng-cli call '{"name": "umeng.uapp.getLaunchesByChannelOrVersion", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.getLaunchesByChannelOrVersion", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey", "startDate": "2018-01-01", "endDate": "2018-01-01", "periodType": "daily"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| launchInfo | Data[] |  |


**`Data[]` 结构（新增活跃等带版本或渠道查询结果）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| date | string | 统计日期 |
| dailyValue | NameValue[] | 按版本或渠道的统计信息 |
| hourValue | integer[] | 按小时查询返回数组 |
| value | integer | 其它情况返回整型，按天无版本无渠道，按周，按月查询。 |

**`NameValue[]` 结构（新增活跃等查询结果的子集）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| name | string | 版本或渠道名 |
| value | integer | 统计数 |

**返回示例：**

```json
{
  "launchInfo": [
    {
      "date": "2018-01-01",
      "dailyValue": [
        {
          "name": "xxx",
          "value": 0
        }
      ],
      "hourValue": "",
      "value": 0
    }
  ]
}
```

---

### umeng.uapp.getActiveUsersByChannelOrVersion — 根据渠道或版本条件，获取App活跃用户数

根据渠道或版本条件，获取指定App某个时间范围内的活跃用户数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |
| startDate | string | 是 | 查询起始日期（例如:2018-01-01） |
| endDate | string | 是 | 查询截止日期（例如:2018-01-01） |
| periodType | string | 是 | 查询类型（按日daily,按周weekly,按月monthly 查询）（默认: daily） |
| channels | string | 否 | 渠道名称（需要urlEncode转义，例如：App%20Store） |
| versions | string | 否 | 版本名称（需要urlEncode转义，例如:1.0.0） |

```bash
umeng-cli call '{"name": "umeng.uapp.getActiveUsersByChannelOrVersion", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.getActiveUsersByChannelOrVersion", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey", "startDate": "2025-04-01", "endDate": "2025-04-01", "periodType": "daily"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| activeUserInfo | Data[] |  |


**`Data[]` 结构（新增活跃等带版本或渠道查询结果）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| date | string | 统计日期 |
| dailyValue | NameValue[] | 按版本或渠道的统计信息 |
| hourValue | integer[] | 按小时查询返回数组 |
| value | integer | 其它情况返回整型，按天无版本无渠道，按周，按月查询。 |

**`NameValue[]` 结构（新增活跃等查询结果的子集）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| name | string | 版本或渠道名 |
| value | integer | 统计数 |

**返回示例：**

```json
{
  "activeUserInfo": [
    {
      "date": "2018-01-01",
      "dailyValue": [
        {
          "name": "xxx",
          "value": 0
        }
      ],
      "hourValue": "",
      "value": 0
    }
  ]
}
```

---

### umeng.uapp.getNewUsersByChannelOrVersion — 根据渠道或版本条件，获取App新增用户数

根据渠道或版本条件，获取指定App某个时间范围内的新增用户数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |
| startDate | string | 是 | 查询起始日期（示例: 2018-01-01） |
| endDate | string | 是 | 查询截止日期（示例: 2018-01-01） |
| periodType | string | 是 | 查询类型（按日daily,按周weekly,按月monthly 查询）（默认: daily） |
| channels | string | 否 | 渠道名称（App%20Store）（示例: App%20Store） |
| versions | string | 否 | 版本名称（1.0.0）（示例: 1.0.0） |

```bash
umeng-cli call '{"name": "umeng.uapp.getNewUsersByChannelOrVersion", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.getNewUsersByChannelOrVersion", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey", "startDate": "2018-01-01", "endDate": "2018-01-01", "periodType": "daily"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| newUserInfo | Data[] |  |


**`Data[]` 结构（新增活跃等带版本或渠道查询结果）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| date | string | 统计日期 |
| dailyValue | NameValue[] | 按版本或渠道的统计信息 |
| hourValue | integer[] | 按小时查询返回数组 |
| value | integer | 其它情况返回整型，按天无版本无渠道，按周，按月查询。 |

**`NameValue[]` 结构（新增活跃等查询结果的子集）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| name | string | 版本或渠道名 |
| value | integer | 统计数 |

**返回示例：**

```json
{
  "newUserInfo": [
    {
      "date": "2018-01-01",
      "dailyValue": [
        {
          "name": "xxx",
          "value": 0
        }
      ],
      "hourValue": "",
      "value": 0
    }
  ]
}
```

---

### umeng.uapp.event.param.getValueDurationList — 获取事件参数值时长列表

根据自定义事件参数值，获取使用时长

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |
| startDate | string | 是 | 查询起始日期（默认: 2018-01-01） |
| endDate | string | 是 | 查询截止日期（默认: 2018-01-01） |
| eventName | string | 是 | 自定义事件名称（通过umeng.uapp.event.list获取） |
| eventParamName | string | 是 | 自定义事件参数名称（通过umeng.uapp.event.param.list获取） |

```bash
umeng-cli call '{"name": "umeng.uapp.event.param.getValueDurationList", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.event.param.getValueDurationList", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey", "startDate": "2018-01-01", "endDate": "2018-01-01", "eventName": "", "eventParamName": ""}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| paramInfos | ParamValueInfo[] |  |


**`ParamValueInfo[]` 结构（参数值信息）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| name | string | 参数值名称 |
| count | integer | 统计的消息数 |
| percent | double | 当前事件下此参数值消息数的占比 |

**返回示例：**

```json
{
  "paramInfos": [
    {
      "name": "%e7%a4%ba%e4%be%8b（示例）",
      "count": 0,
      "percent": ""
    }
  ]
}
```

---

### umeng.uapp.getTodayYesterdayData — 获取App今天与昨天的统计数据

获取指定App今天与昨天的统计数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |

```bash
umeng-cli call '{"name": "umeng.uapp.getTodayYesterdayData", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.getTodayYesterdayData", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| todayData | DailyDataInfo |  |
| yesterdayData | DailyDataInfo |  |


**`DailyDataInfo` 结构（应用日期的统计数据）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| date | string | 统计日期 |
| activityUsers | integer | 活跃用户数 |
| totalUsers | integer | 总用户数 |
| launches | integer | 启动数 |
| newUsers | integer | 新增用户数 |
| payUsers | integer | 游戏付费用户数（仅游戏sdk） |


**`DailyDataInfo` 结构（应用日期的统计数据）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| date | string | 统计日期 |
| activityUsers | integer | 活跃用户数 |
| totalUsers | integer | 总用户数 |
| launches | integer | 启动数 |
| newUsers | integer | 新增用户数 |
| payUsers | integer | 游戏付费用户数（仅游戏sdk） |

**返回示例：**

```json
{
  "yesterdayData": {
    "date": "xxx",
    "newUsers": 0,
    "totalUsers": 0,
    "activityUsers": 0,
    "launches": 0,
    "payUsers": 0
  },
  "todayData": {
    "date": "xxx",
    "newUsers": 0,
    "totalUsers": 0,
    "activityUsers": 0,
    "launches": 0,
    "payUsers": 0
  }
}
```

---

### umeng.uapp.getYesterdayData — 获取App昨天统计数据

获取指定App昨日的统计数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |

```bash
umeng-cli call '{"name": "umeng.uapp.getYesterdayData", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.getYesterdayData", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| yesterdayData | DailyDataInfo |  |


**`DailyDataInfo` 结构（应用日期的统计数据）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| date | string | 统计日期 |
| activityUsers | integer | 活跃用户数 |
| totalUsers | integer | 总用户数 |
| launches | integer | 启动数 |
| newUsers | integer | 新增用户数 |
| payUsers | integer | 游戏付费用户数（仅游戏sdk） |

**返回示例：**

```json
{
  "yesterdayData": {
    "date": "xxx",
    "newUsers": 0,
    "totalUsers": 0,
    "activityUsers": 0,
    "launches": 0,
    "payUsers": 0
  }
}
```

---

### umeng.uapp.getTodayData — 获取App今天统计数据

获取指定App今日的统计数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |

```bash
umeng-cli call '{"name": "umeng.uapp.getTodayData", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.getTodayData", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| todayData | DailyDataInfo |  |


**`DailyDataInfo` 结构（应用日期的统计数据）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| date | string | 统计日期 |
| activityUsers | integer | 活跃用户数 |
| totalUsers | integer | 总用户数 |
| launches | integer | 启动数 |
| newUsers | integer | 新增用户数 |
| payUsers | integer | 游戏付费用户数（仅游戏sdk） |

**返回示例：**

```json
{
  "todayData": {
    "date": "xxx",
    "newUsers": 0,
    "totalUsers": 0,
    "activityUsers": 0,
    "launches": 0,
    "payUsers": 0
  }
}
```

---

### umeng.uapp.event.getUniqueUsers — 获取自定义事件的独立用户数

获取自定义事件的独立用户数统计数据（按设备device统计 "data":[{"data":[123],"dates":["2018-01-01"]}）

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |
| startDate | string | 是 | 查询起始日期（示例: 2018-01-01） |
| endDate | string | 是 | 查询截止日期（示例: 2018-01-01） |
| eventName | string | 是 | 自定义事件名称（通过umeng.uapp.event.list获取） |

```bash
umeng-cli call '{"name": "umeng.uapp.event.getUniqueUsers", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.event.getUniqueUsers", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey", "startDate": "2018-01-01", "endDate": "2018-01-01", "eventName": ""}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| uniqueUsers | DateCountInfo[] |  |


**`DateCountInfo[]` 结构（日期统计数据）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| dates | string[] | 统计日期数组 |
| data | integer[] | 统计数据数组 |

**返回示例：**

```json
{
  "uniqueUsers": [
    {
      "data": "1234,5678",
      "dates": ""
    }
  ]
}
```

---

### umeng.uapp.getAllAppData — 获取所有App统计数据

获取当前用户所有App昨日和今日的基础统计数据（活跃用户数，新增用户数，启动次数，总用户数）

无需参数。

```bash
umeng-cli call '{"name": "umeng.uapp.getAllAppData", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.getAllAppData", "authType": "umeng-aksk"}}' '{}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| allAppData | AllAppData[] |  |


**`AllAppData[]` 结构（所有App合计的今日和昨日统计数据）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| todayActivityUsers | integer | 今日活跃用户 |
| todayNewUsers | integer | 今日新增用户 |
| todayLaunches | integer | 今日启动次数 |
| yesterdayActivityUsers | integer | 昨日活跃用户 |
| yesterdayNewUsers | integer | 昨日新增用户 |
| yesterdayLaunches | integer | 昨日启动次数 |
| yesterdayUniqNewUsers | integer | 昨日独立新增用户数 |
| yesterdayUniqActiveUsers | integer | 昨日独立活跃用户数 |
| totalUsers | integer | 总用户数 |

**返回示例：**

```json
{
  "allAppData": [
    {
      "yesterdayNewUsers": 0,
      "yesterdayUniqNewUsers": 0,
      "todayLaunches": 0,
      "totalUsers": 0,
      "todayNewUsers": 0,
      "yesterdayUniqActiveUsers": 0,
      "todayActivityUsers": 0,
      "yesterdayLaunches": 0,
      "yesterdayActivityUsers": 0
    }
  ]
}
```

---

### umeng.uapp.getAppCount — 获取App数量

获取当前用户所有App的数量

无需参数。

```bash
umeng-cli call '{"name": "umeng.uapp.getAppCount", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.getAppCount", "authType": "umeng-aksk"}}' '{}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| count | integer | 应用数量 |

**返回示例：**

```json
{
  "count": 0
}
```

---

### umeng.uapp.getChannelData — 获取渠道维度统计数据

获取指定App按照分发渠道维度的统计数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |
| date | string | 是 | 查询日期（示例: 2018-01-01） |
| perPage | integer | 否 | 每页显示数量（最大100）（默认: 10） |
| page | integer | 否 | 页数（默认: 1） |

```bash
umeng-cli call '{"name": "umeng.uapp.getChannelData", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.getChannelData", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey", "date": "2018-01-01"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| channelInfos | ChannelInfo[] |  |
| page | integer | 页数 |
| totalPage | integer | 总页数 |


**`ChannelInfo[]` 结构（渠道维度统计数据模型）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| launch | integer | 启动数（昨日及以前可查询） |
| duration | string | 使用时长（昨日及以前可查询） |
| date | string | 日期 |
| totalUserRate | double | 当前渠道总用户数在总用户数中的比例 |
| activeUser | integer | 活跃用户 |
| newUser | integer | 新增用户 |
| totalUser | integer | 总用户数 |
| channel | string | 渠道名称 |
| id | string | 渠道ID |

**返回示例：**

```json
{
  "channelInfos": [
    {
      "duration": "xxx",
      "date": "xxx",
      "activeUser": 0,
      "newUser": 0,
      "totalUser": 0,
      "channel": "xxx",
      "launch": 0,
      "id": "xxx",
      "totalUserRate": ""
    }
  ],
  "totalPage": 0,
  "page": 0
}
```

---

### umeng.uapp.getVersionData — 获取版本维度统计数据

获取指定App按照版本维度的统计数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |
| date | string | 是 | 查询日期（示例: 2018-01-01） |

```bash
umeng-cli call '{"name": "umeng.uapp.getVersionData", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.getVersionData", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey", "date": "2018-01-01"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| versionInfos | VersionInfo[] |  |


**`VersionInfo[]` 结构（版本维度统计数据模型）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| date | string | 统计日期 |
| totalUserRate | double | 当前版本总用户数在总用户数中的比例 |
| activeUser | integer | 活跃用户 |
| newUser | integer | 新增用户 |
| totalUser | integer | 当前版本总用户数 |
| version | string | 版本号 |

**返回示例：**

```json
{
  "versionInfos": [
    {
      "date": "xxx",
      "activeUser": 0,
      "newUser": 0,
      "totalUser": 0,
      "version": "xxx",
      "totalUserRate": ""
    }
  ]
}
```

---

### umeng.uapp.event.param.getData — 获取事件参数值统计数据

获取自定义事件某个参数按照值维度的统计数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |
| startDate | string | 是 | 查询起始日期（示例: 2018-01-01） |
| endDate | string | 是 | 查询截止日期（示例: 2018-01-01） |
| eventName | string | 是 | 自定义事件名称（通过umeng.uapp.event.list获取） |
| eventParamName | string | 是 | 自定义事件参数名称（通过umeng.uapp.event.param.list获取） |
| paramValueName | string | 是 | 自定义参数值名称（通过umeng.uapp.event.param.getValueList获取） |

```bash
umeng-cli call '{"name": "umeng.uapp.event.param.getData", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.event.param.getData", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey", "startDate": "2018-01-01", "endDate": "2018-01-01", "eventName": "", "eventParamName": "", "paramValueName": ""}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| paramValueData | DateCountInfo[] |  |


**`DateCountInfo[]` 结构（日期统计数据）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| dates | string[] | 统计日期数组 |
| data | integer[] | 统计数据数组 |

**返回示例：**

```json
{
  "paramValueData": [
    {
      "data": "1234,5678",
      "dates": ""
    }
  ]
}
```

---

### umeng.uapp.event.param.getValueList — 获取事件参数值列表

获取自定义事件某个参数的取值范围列表

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |
| startDate | string | 是 | 查询起始日期（示例: 2018-01-01） |
| endDate | string | 是 | 查询截止日期（示例: 2018-01-01） |
| eventName | string | 是 | 自定义事件名称（通过umeng.uapp.event.list获取） |
| eventParamName | string | 是 | 自定义事件参数名称（通过umeng.uapp.event.param.list获取） |

```bash
umeng-cli call '{"name": "umeng.uapp.event.param.getValueList", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.event.param.getValueList", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey", "startDate": "2018-01-01", "endDate": "2018-01-01", "eventName": "", "eventParamName": ""}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| paramInfos | ParamValueInfo[] |  |


**`ParamValueInfo[]` 结构（参数值信息）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| name | string | 参数值名称 |
| count | integer | 统计的消息数 |
| percent | double | 当前事件下此参数值消息数的占比 |

**返回示例：**

```json
{
  "paramInfos": [
    {
      "name": "%e7%a4%ba%e4%be%8b（示例）",
      "count": 0,
      "percent": ""
    }
  ]
}
```

---

### umeng.uapp.event.getData — 获取事件统计数据

获取自定义事件事件的统计数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |
| startDate | string | 是 | 查询起始日期（示例: 2018-01-01） |
| endDate | string | 是 | 查询截止日期（示例: 2018-01-01） |
| eventName | string | 是 | 自定义事件名称（通过umeng.uapp.event.list获取） |

```bash
umeng-cli call '{"name": "umeng.uapp.event.getData", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.event.getData", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey", "startDate": "2018-01-01", "endDate": "2018-01-01", "eventName": ""}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| eventData | DateCountInfo[] |  |


**`DateCountInfo[]` 结构（日期统计数据）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| dates | string[] | 统计日期数组 |
| data | integer[] | 统计数据数组 |

**返回示例：**

```json
{
  "eventData": [
    {
      "data": "1234,5678",
      "dates": ""
    }
  ]
}
```

---

### umeng.uapp.event.param.list — 获取事件参数列表

获取自定义事件的参数列表

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| startDate | string | 是 | 查询起始日期（示例: 2018-01-01） |
| endDate | string | 是 | 查询截止日期（示例: 2018-01-01） |
| eventId | string | 是 | 事件ID（通过umeng.uapp.event.list接口查询得到的ID） |
| appkey | string | 是 | 应用ID |

```bash
umeng-cli call '{"name": "umeng.uapp.event.param.list", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.event.param.list", "authType": "umeng-aksk"}}' '{"startDate": "2018-01-01", "endDate": "2018-01-01", "eventId": "", "appkey": "你的appkey"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| paramInfos | ParamInfo[] |  |


**`ParamInfo[]` 结构（自定义事件的参数信息）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| paramId | string | 参数ID |
| name | string | 参数名称 |
| displayName | string | 参数显示名称 |

**返回示例：**

```json
{
  "paramInfos": [
    {
      "displayName": "xxx",
      "name": "xxx",
      "paramId": "xxx"
    }
  ]
}
```

---

### umeng.uapp.event.list — 获取事件列表

获取自定义事件列表

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |
| startDate | string | 是 | 查询起始日期（示例: 2018-01-01） |
| endDate | string | 是 | 查询截止日期（示例: 2018-01-01） |
| perPage | integer | 否 | 每页显示数量（最大100）（默认: 10） |
| page | integer | 否 | 页数（默认: 1） |
| version | string | 否 | 应用版本号 |

```bash
umeng-cli call '{"name": "umeng.uapp.event.list", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.event.list", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey", "startDate": "2018-01-01", "endDate": "2018-01-01"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| eventInfo | EventInfo[] |  |
| page | integer | 页数 |
| totalPage | integer | 总页数 |


**`EventInfo[]` 结构（自定义事件）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| name | string | 事件名称 |
| count | integer | 统计次数 |
| id | string | ID |
| displayName | string | 显示名称 |

**返回示例：**

```json
{
  "eventInfo": [
    {
      "displayName": "xxx",
      "name": "xxx",
      "count": 0,
      "id": "xxx"
    }
  ],
  "totalPage": 0,
  "page": 0
}
```

---

### umeng.uapp.getRetentions — 获取App新增用户留存率

获取指定App某个时间范围内的新增用户留存率

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |
| startDate | string | 是 | 查询起始日期（2019-01-01）（示例: 2019-01-01） |
| endDate | string | 是 | 查询截止日期（2019-01-01）（示例: 2019-01-01） |
| periodType | string | 否 | 查询类型（按日daily,按周weekly,按月monthly 查询）（默认: daily） |
| channel | string | 否 | 渠道名称（仅限一个App%20Store） |
| version | string | 否 | 版本名称（仅限一个1.0.0） |
| type | string | 否 | newUser(默认):新增用户留存率；activeUser:活跃用户留存率 |

```bash
umeng-cli call '{"name": "umeng.uapp.getRetentions", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.getRetentions", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey", "startDate": "2019-01-01", "endDate": "2019-01-01"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| retentionInfo | RetentionInfo[] |  |


**`RetentionInfo[]` 结构（留存用户统计数据）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| date | string | 统计日期 |
| totalInstallUser | integer | 当日安装用户数 |
| retentionRate | double[] | 相对之后几日的留存用户数，安装日期到今日之间7天（每天），14天后，30天后留存用户占比（不包含今日） |

**返回示例：**

```json
{
  "retentionInfo": [
    {
      "date": "xxx",
      "totalInstallUser": 0,
      "retentionRate": ""
    }
  ]
}
```

---

### umeng.uapp.getDurations — 获取App使用时长

获取指定App某个时间范围内的使用时长统计数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |
| date | string | 是 | 查询日期（示例: 2018-01-01） |
| statType | string | 否 | 查询时长统计类型（按天daily，按次daily_per_launch）（默认: daily） |
| channel | string | 否 | 渠道名称（仅限一个App%20Store）（示例: App%20Store） |
| version | string | 否 | 版本名称（仅限一个1.0.0）（示例: 1.0.0） |

```bash
umeng-cli call '{"name": "umeng.uapp.getDurations", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.getDurations", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey", "date": "2018-01-01"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| durationInfos | DurationInfo[] |  |
| average | double | 每次启动的平均使用时长 |


**`DurationInfo[]` 结构（时长统计数据展示）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| name | string | 时间区间单位秒 |
| value | integer | 启动次数/用户数 |
| percent | double | 此区间的时长占 |

**返回示例：**

```json
{
  "durationInfos": [
    {
      "name": "1-3,4-10,11-30",
      "value": 0,
      "percent": ""
    }
  ]
}
```

---

### umeng.uapp.getLaunches — 获取App启动次数

获取指定App某个时间范围内的启动次数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |
| startDate | string | 是 | 查询起始日期（示例: 2018-01-01） |
| endDate | string | 是 | 查询截止日期（示例: 2018-01-01） |
| periodType | string | 否 | 查询类型（按日daily,按周weekly,按月monthly 查询）（默认: daily） |

```bash
umeng-cli call '{"name": "umeng.uapp.getLaunches", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.getLaunches", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey", "startDate": "2018-01-01", "endDate": "2018-01-01"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| launchInfo | Data[] | umeng.uapp.count.Data[] |


**`Data[]` 结构（新增活跃等带版本或渠道查询结果）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| date | string | 统计日期 |
| dailyValue | NameValue[] | 按版本或渠道的统计信息 |
| hourValue | integer[] | 按小时查询返回数组 |
| value | integer | 其它情况返回整型，按天无版本无渠道，按周，按月查询。 |

**`NameValue[]` 结构（新增活跃等查询结果的子集）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| name | string | 版本或渠道名 |
| value | integer | 统计数 |

**返回示例：**

```json
{
  "launchInfo": [
    {
      "date": "2018-01-01",
      "dailyValue": [
        {
          "name": "xxx",
          "value": 0
        }
      ],
      "hourValue": "",
      "value": 0
    }
  ]
}
```

---

### umeng.uapp.getActiveUsers — 获取App活跃用户数

获取指定App某个时间范围内的活跃用户数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |
| startDate | string | 是 | 查询起始日期（示例: 2018-01-01） |
| endDate | string | 是 | 查询截止日期（示例: 2018-01-02） |
| periodType | string | 否 | 查询类型（按日daily,按周weekly,按月monthly,近7日7day,近30日30day 查询，接口限制：periodType=daily/7day/30day时，返回结果数量限制为60条；periodType=weekly时，返回结果数量限制为8条；periodType=monthly时，返回结果数量限制为3条。实际返回结果数量以接口为准。）（默认: daily） |

```bash
umeng-cli call '{"name": "umeng.uapp.getActiveUsers", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.getActiveUsers", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey", "startDate": "2018-01-01", "endDate": "2018-01-02"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| activeUserInfo | Data[] | umeng.uapp.count.Data[] |


**`Data[]` 结构（新增活跃等带版本或渠道查询结果）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| date | string | 统计日期 |
| dailyValue | NameValue[] | 按版本或渠道的统计信息 |
| hourValue | integer[] | 按小时查询返回数组 |
| value | integer | 其它情况返回整型，按天无版本无渠道，按周，按月查询。 |

**`NameValue[]` 结构（新增活跃等查询结果的子集）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| name | string | 版本或渠道名 |
| value | integer | 统计数 |

**返回示例：**

```json
{
  "activeUserInfo": [
    {
      "date": "2018-01-01",
      "dailyValue": [
        {
          "name": "xxx",
          "value": 0
        }
      ],
      "hourValue": "",
      "value": 0
    }
  ]
}
```

---

### umeng.uapp.getNewUsers — 获取App新增用户数

获取指定App某个时间范围内的新增用户数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |
| startDate | string | 是 | 查询起始日期（示例: 2018-01-01） |
| endDate | string | 是 | 查询截止日期（示例: 2018-01-02） |
| periodType | string | 否 | 查询类型（按日daily,按周weekly,按月monthly 查询）（默认: daily） |

```bash
umeng-cli call '{"name": "umeng.uapp.getNewUsers", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.getNewUsers", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey", "startDate": "2018-01-01", "endDate": "2018-01-02"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| newUserInfo | Data[] | umeng.uapp.count.Data[] |


**`Data[]` 结构（新增活跃等带版本或渠道查询结果）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| date | string | 统计日期 |
| dailyValue | NameValue[] | 按版本或渠道的统计信息 |
| hourValue | integer[] | 按小时查询返回数组 |
| value | integer | 其它情况返回整型，按天无版本无渠道，按周，按月查询。 |

**`NameValue[]` 结构（新增活跃等查询结果的子集）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| name | string | 版本或渠道名 |
| value | integer | 统计数 |

**返回示例：**

```json
{
  "newUserInfo": [
    {
      "date": "2018-01-01",
      "dailyValue": [
        {
          "name": "xxx",
          "value": 0
        }
      ],
      "hourValue": "",
      "value": 0
    }
  ]
}
```

---

### umeng.uapp.getDailyData — 获取App统计数据

获取指定App特定日期的统计数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| appkey | string | 是 | 应用ID |
| date | string | 是 | 查询日期（示例: 2018-01-01） |
| version | string | 否 | 版本名称（选填，仅一次一个） |
| channel | string | 否 | 渠道名称（选填，仅一次一个） |

```bash
umeng-cli call '{"name": "umeng.uapp.getDailyData", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.getDailyData", "authType": "umeng-aksk"}}' '{"appkey": "你的appkey", "date": "2018-01-01"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| dailyData | DailyDataInfo | UmengUappDailyDataInfo |


**`DailyDataInfo` 结构（应用日期的统计数据）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| date | string | 统计日期 |
| activityUsers | integer | 活跃用户数 |
| totalUsers | integer | 总用户数 |
| launches | integer | 启动数 |
| newUsers | integer | 新增用户数 |
| payUsers | integer | 游戏付费用户数（仅游戏sdk） |

**返回示例：**

```json
{
  "dailyData": {
    "date": "xxx",
    "newUsers": 0,
    "totalUsers": 0,
    "activityUsers": 0,
    "launches": 0,
    "payUsers": 0
  }
}
```

---

### umeng.uapp.getAppList — 获取App列表

获取当前用户的所有App列表

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | integer | 否 | 页号，从1开始（示例: 1） |
| perPage | integer | 否 | 每页显示数量（最大100）（示例: 10） |
| accessToken | string | 否 |  |

```bash
umeng-cli call '{"name": "umeng.uapp.getAppList", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.uapp/umeng.uapp.getAppList", "authType": "umeng-aksk"}}' '{}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| appInfos | AppInfoData[] |  |
| totalPage | integer | 总页数 |
| page | integer | 页数 |


**`AppInfoData[]` 结构（应用列表查询到的应用信息）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| updatedAt | string | 更新时间 |
| useGameSdk | boolean | 是否为游戏 |
| name | string | App名称 |
| createdAt | string | 创建时间 |
| appkey | string | 应用ID |
| category | string | 类别 |
| popular | integer | 是否关注 |
| platform | string | 平台(iphone,android) |

**返回示例：**

```json
{
  "appInfos": [
    {
      "createdAt": "xxx",
      "useGameSdk": "",
      "name": "xxx",
      "appkey": "xxx",
      "category": "xxx",
      "popular": 0,
      "platform": "iphone",
      "updatedAt": "xxx"
    }
  ],
  "totalPage": 0,
  "page": 0
}
```

---

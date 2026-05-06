# U-MiniProgram 小程序统计（com.umeng.umini）

通过 `umeng-cli call` 命令调用友盟 OpenAPI，使用 AK/SK 签名鉴权（HMAC-SHA1）。

## 通用调用方式

```bash
umeng-cli call '{"name":"<接口名>","api":{"method":"GET","baseUrl":"https://gateway.open.umeng.com/openapi","endpoint":"param2/1/com.umeng.umini/<接口名>","authType":"umeng-aksk"}}' '<参数JSON>'
```

> AK/SK 会在首次调用时自动通过登录凭证获取并加密缓存，无需手动配置。

---

## 接口列表

- [`umeng.umini.h5.getElementValueList`](#umenguminih5getElementValueList) — 获取H5曝光元素的属性的统计数据
- [`umeng.umini.h5.getElementList`](#umenguminih5getElementList) — 获取H5曝光元素统计数据
- [`umeng.umini.h5.getSceneOverview`](#umenguminih5getSceneOverview) — 获取H5场景来源统计数据
- [`umeng.umini.createCampaign`](#umenguminicreateCampaign) — 添加推广链接
- [`umeng.umini.getSceneInfoList`](#umenguminigetSceneInfoList) — 获取渠道或活动信息列表
- [`umeng.umini.getRetentionByDataSourceId`](#umenguminigetRetentionByDataSourceId) — 获取应用的留存数据
- [`umeng.umini.getCustomerSourceOverview`](#umenguminigetCustomerSourceOverview) — 获取获客来源的指标数据
- [`umeng.umini.getMultiIndiceList`](#umenguminigetMultiIndiceList) — 获取分组指标列表
- [`umeng.umini.getMultiOverview`](#umenguminigetMultiOverview) — 获取分组指标数据
- [`umeng.umini.initMultiLevelTree`](#umenguminiinitMultiLevelTree) — 上传层级分组结构
- [`umeng.umini.getMultiLevelTree`](#umenguminigetMultiLevelTree) — 获取层级分组结构
- [`umeng.umini.getLandingPageList`](#umenguminigetLandingPageList) — 获取页面分析-入口页面列表
- [`umeng.umini.getShareUserList`](#umenguminigetShareUserList) — 获取分享用户列表
- [`umeng.umini.getVisitPageList`](#umenguminigetVisitPageList) — 获取页面分析-受访页面列表
- [`umeng.umini.editPathDisplayName`](#umenguminieditPathDisplayName) — 编辑页面路径显示名称
- [`umeng.umini.batchCreateEvent`](#umenguminibatchCreateEvent) — 批量创建事件
- [`umeng.umini.editMiniApp`](#umenguminieditMiniApp) — 编辑小程序数据源
- [`umeng.umini.getShareOverview`](#umenguminigetShareOverview) — 获取小程序某天的分享数据
- [`umeng.umini.getSharePageOverview`](#umenguminigetSharePageOverview) — 获取页面分享概况数据
- [`umeng.umini.getAllPropertyValueCount`](#umenguminigetAllPropertyValueCount) — 获取某事件属性下全部属性值数据
- [`umeng.umini.getEventOverview`](#umenguminigetEventOverview) — 获取某自定义事件统计数据
- [`umeng.umini.getEventProvertyList`](#umenguminigetEventProvertyList) — 获取某自定义事件的属性列表
- [`umeng.umini.getEventList`](#umenguminigetEventList) — 获取自定义事件列表
- [`umeng.umini.getChannelOverview`](#umenguminigetChannelOverview) — 获取某推广渠道的统计数据
- [`umeng.umini.getCampaignOverview`](#umenguminigetCampaignOverview) — 获取某推广活动的统计数据
- [`umeng.umini.getSceneOverview`](#umenguminigetSceneOverview) — 获取某场景值的统计数据
- [`umeng.umini.getAppList`](#umenguminigetAppList) — 获取用户的小程序列表及数量
- [`umeng.umini.createMiniApp`](#umenguminicreateMiniApp) — 新建小程序数据源
- [`umeng.umini.getOverview`](#umenguminigetOverview) — 获取应用概况数据
- [`umeng.umini.getTotalUser`](#umenguminigetTotalUser) — 获取应用的累计用户数

---

### umeng.umini.h5.getElementValueList — 获取H5曝光元素的属性的统计数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（AppKey） |
| elementId | String | 是 | 元素id |
| timeUnit | String | 是 | 时间颗粒度（枚举范围day,7day,30day）（示例: day） |
| fromDate | String | 是 | 开始时间（示例: 2020-09-10） |
| toDate | String | 是 | 结束时间（示例: 2020-09-10） |
| orderBy | String | 否 | 排序指标（count,device）（示例: count） |
| direction | String | 否 | 排序方向（desc：降序,asc：正序）（示例: desc） |
| pageIndex | Integer | 否 | 页码（示例: 1） |
| pageSize | Integer | 否 | 每页条数（示例: 30） |

```bash
umeng-cli call '{"name": "umeng.umini.h5.getElementValueList", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.h5.getElementValueList", "authType": "umeng-aksk"}}' '{"dataSourceId": "", "elementId": "", "timeUnit": "day", "fromDate": "2020-09-10", "toDate": "2020-09-10"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | getElementValueListDTO |  |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |


**`getElementValueListDTO` 结构（获取H5曝光元素的属性的统计数据）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| totalCount | Integer | 当前页 |
| currentPage | Integer | 总记录数 |
| data | elementValueDTO[] |  |

**`elementValueDTO[]` 结构（获取H5曝光元素的属性的DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| displayName | String | 元素属性值 |
| elementValue | String | 元素属性值备注 |
| count | Long | 曝光次数 |
| device | Long | 曝光人数 |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": {
    "data": [
      {
        "displayName": "xxx",
        "count": 0,
        "elementValue": "xxx",
        "device": 0
      }
    ],
    "totalCount": 0,
    "currentPage": 0
  }
}
```

---

### umeng.umini.h5.getElementList — 获取H5曝光元素统计数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（AppKey） |
| timeUnit | String | 是 | 时间颗粒度（枚举范围day,7day,30day）（示例: day） |
| fromDate | String | 是 | 开始时间（示例: 2020-09-10） |
| toDate | String | 是 | 结束时间（示例: 2020-09-10） |
| orderBy | String | 否 | 排序指标（count,device） |
| direction | String | 否 | 排序方向（desc：降序,asc：正序） |
| pageIndex | Integer | 否 | 页码 |
| pageSize | Integer | 否 | 每页条数 |

```bash
umeng-cli call '{"name": "umeng.umini.h5.getElementList", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.h5.getElementList", "authType": "umeng-aksk"}}' '{"dataSourceId": "", "timeUnit": "day", "fromDate": "2020-09-10", "toDate": "2020-09-10"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | getElementListDTO |  |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |


**`getElementListDTO` 结构（获取H5曝光元素统计数据）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| currentPage | Integer | 当前页 |
| totalCount | Integer | 总记录数 |
| data | elementDTO[] |  |

**`elementDTO[]` 结构（获取H5曝光元素的DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| elementId | String | 元素ID |
| displayName | String | 元素ID备注 |
| count | Long | 曝光次数 |
| device | Long | 曝光人数 |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": {
    "data": [
      {
        "elementId": "xxx",
        "displayName": "xxx",
        "count": 0,
        "device": 0
      }
    ],
    "currentPage": 0,
    "totalCount": 0
  }
}
```

---

### umeng.umini.h5.getSceneOverview — 获取H5场景来源统计数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（AppKey） |
| fromDate | String | 是 | 开始时间（示例: 2020-09-10） |
| toDate | String | 是 | 结束时间（示例: 2020-09-10） |
| timeUnit | String | 是 | 时间颗粒度（枚举范围day,7day,30day）（示例: day） |
| orderBy | String | 否 | 排序指标（newUser：新增用户；activeUser：活跃用户；visitTimes：页面访问次数） |
| direction | String | 否 | 排序方向（desc：降序,asc：正序） |

```bash
umeng-cli call '{"name": "umeng.umini.h5.getSceneOverview", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.h5.getSceneOverview", "authType": "umeng-aksk"}}' '{"dataSourceId": "", "fromDate": "2020-09-10", "toDate": "2020-09-10", "timeUnit": "day"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | getSceneOverviewDTO |  |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |


**`getSceneOverviewDTO` 结构（获取H5域名来源统计数据）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | domainOrSceneDTO[] |  |
| currentPage | Integer | 当前页 |
| totalCount | Integer | 总记录数 |

**`domainOrSceneDTO[]` 结构（获取H5域名或场景DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | id |
| name | String | 域名或场景名称 |
| activeUser | Long | 活跃用户 |
| newUser | Long | 新增用户 |
| visitTimes | Long | 页面访问次数 |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": {
    "data": [
      {
        "activeUser": 0,
        "newUser": 0,
        "name": "xxx",
        "id": "xxx",
        "visitTimes": 0
      }
    ],
    "currentPage": 0,
    "totalCount": 0
  }
}
```

---

### umeng.umini.createCampaign — 添加推广链接

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（AppKey） |
| campaignName | String | 是 | 推广活动 |
| channelName | String | 是 | 推广渠道 |
| path | String | 否 | 落地页路径 |

```bash
umeng-cli call '{"name": "umeng.umini.createCampaign", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.createCampaign", "authType": "umeng-aksk"}}' '{"dataSourceId": "", "campaignName": "", "channelName": ""}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | String |  |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": "xxx"
}
```

---

### umeng.umini.getSceneInfoList — 获取渠道或活动信息列表

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（AppKey） |
| sourceType | String | 是 | 场景值类型,活动campaign 渠道channel（示例: campaign） |

```bash
umeng-cli call '{"name": "umeng.umini.getSceneInfoList", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getSceneInfoList", "authType": "umeng-aksk"}}' '{"dataSourceId": "", "sourceType": "campaign"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | getSceneInfoDTO[] | 数据结果 |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |


**`getSceneInfoDTO[]` 结构（获取渠道或活动信息DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| code | String | 推广活动值/渠道值 |
| name | String | 推广活动/渠道中文名称 |
| url | String | 推广活动连接 |
| createDateTime | String | 推广活动创建时间 |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": [
    {
      "code": "xxx",
      "name": "xxx",
      "url": "xxx",
      "createDateTime": "xxx"
    }
  ]
}
```

---

### umeng.umini.getRetentionByDataSourceId — 获取应用的留存数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源ID(appkey) |
| fromDate | String | 是 | 开始时间 yyyy-MM-dd（示例: 2021-01-19） |
| toDate | String | 是 | 结束时间 yyyy-MM-dd（示例: 2021-01-01） |
| timeUnit | String | 是 | 时间颗粒度 day,week（示例: day） |
| pageIndex | Integer | 否 | 页码（示例: 1） |
| pageSize | Integer | 否 | 每页条数（示例: 10） |
| indicator | String | 否 | 指标：新增用户（newuser） 活跃用户 activeUser（示例: activeUser） |
| valueType | String | 是 | 数据类型：留存率（rate) 留存数（num)（示例: rate） |

```bash
umeng-cli call '{"name": "umeng.umini.getRetentionByDataSourceId", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getRetentionByDataSourceId", "authType": "umeng-aksk"}}' '{"dataSourceId": "", "fromDate": "2021-01-19", "toDate": "2021-01-01", "timeUnit": "day", "valueType": "rate"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | getRetentionByDataSourceIdListDTO | 返回留存数据 |
| code | Long | 状态码 |
| success | Boolean | 状态 |
| msg | String | 返回消息 |


**`getRetentionByDataSourceIdListDTO` 结构（应用级-留存数据列表DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| totalCount | Integer | 当前页码 |
| currentPage | Integer | 总条数 |
| data | getRetentionByDataSourceIdDTO[] | 结果列表 |

**`getRetentionByDataSourceIdDTO[]` 结构（获取应用级留存数据DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| dateTime | String | 日期 |
| value | Long | 新增/活跃用户数据 |
| v1 | String | 次1日/周 |
| v2 | String | 次2日/周 |
| v3 | String | 次3日/周 |
| v4 | String | 次4日/周 |
| v5 | String | 次5日/周 |
| v6 | String | 次6日/周 |
| v7 | String | 次7日/周 |
| v14 | String | 次14日/周 |
| v30 | String | 次30日/周 |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": {
    "data": [
      {
        "dateTime": "xxx",
        "v6": "xxx",
        "v7": "xxx",
        "v30": "xxx",
        "v14": "xxx",
        "v1": "xxx",
        "v2": "xxx",
        "value": 0,
        "v3": "xxx",
        "v4": "xxx",
        "v5": "xxx"
      }
    ],
    "totalCount": 0,
    "currentPage": 0
  }
}
```

---

### umeng.umini.getCustomerSourceOverview — 获取获客来源的指标数据

获取-获客来源的指标数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（AppKey） |
| sourceType | String | 是 | 获客来源类型（活动：campaign；H5场景：platform; 其他场景：scene；渠道：channel ） |
| fromDate | String | 是 | 开始时间（yyyy-MM-dd) |
| toDate | String | 是 | 结束时间（yyyy-MM-dd) |
| timeUnit | String | 是 | 时间颗粒度（day,7day,30day） |
| orderBy | String | 否 | 排序指标，默认新增用户（新增用户：newUser；打开次数：launch；活跃用户：activeUser；页面访问次数：visitTimes；次均停留时长：onceDuration；创建时间：createDateTime） |
| direction | String | 否 | 排序方向，默认倒序（正序：asc；倒序：desc） |

```bash
umeng-cli call '{"name": "umeng.umini.getCustomerSourceOverview", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getCustomerSourceOverview", "authType": "umeng-aksk"}}' '{"dataSourceId": "", "sourceType": "", "fromDate": "2025-04-01", "toDate": "2025-04-01", "timeUnit": ""}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | customerSourceDTO[] |  |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |


**`customerSourceDTO[]` 结构（获客来源的指标数据DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | id |
| name | String | 名称 |
| url | String | URL(仅推广活动可用) |
| onceDuration | String | 次均停留时长（H5暂不支持） |
| activeUser | Long | 活跃用户 |
| newUser | Long | 新增用户 |
| launch | Long | 打开次数（H5暂不支持） |
| visitTimes | Long | 页面访问次数 |
| createDateTime | String | 创建时间(仅推广活动可用) |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": [
    {
      "onceDuration": "xxx",
      "activeUser": 0,
      "newUser": 0,
      "name": "xxx",
      "launch": 0,
      "id": "xxx",
      "url": "xxx",
      "visitTimes": 0,
      "createDateTime": "xxx"
    }
  ]
}
```

---

### umeng.umini.getMultiIndiceList — 获取分组指标列表

获取分组指标列表（H5暂不支持）

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（AppKey）（示例: 1dfe1b2f3597245664499a91） |

```bash
umeng-cli call '{"name": "umeng.umini.getMultiIndiceList", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getMultiIndiceList", "authType": "umeng-aksk"}}' '{"dataSourceId": "1dfe1b2f3597245664499a91"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | multiIndiceDTO[] |  |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |


**`multiIndiceDTO[]` 结构（分组指标DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| gmtModified | String | 修改时间 |
| indicesId | String | 指标ID |
| code | String | 指标类型（触发用户数：event_device，触发次数：event_count，累计值：property_num_sum） |
| propertyName | String | 属性名 |
| displayName | String | 指标名 |
| eventName | String | 事件名称 |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": [
    {
      "gmtModified": "xxx",
      "indicesId": "xxx",
      "code": "xxx",
      "propertyName": "xxx",
      "displayName": "xxx",
      "eventName": "xxx"
    }
  ]
}
```

---

### umeng.umini.getMultiOverview — 获取分组指标数据

获取分组指标数据（H5暂不支持）

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（AppKey）（示例: 1dfe1b2f3597245664499a91） |
| isv | String | 是 | 分组名称（示例: isv8） |
| fromDate | String | 是 | 开始时间（示例: 2020-10-10） |
| toDate | String | 是 | 结束时间（示例: 2020-10-31） |
| timeUnit | String | 是 | 时间颗粒度，枚举范围day,7day,30day,week,month（逗号分隔）（默认: day） |
| groupName | String | 是 | 分组层级(仅支持最低层级)（示例: 门店） |

```bash
umeng-cli call '{"name": "umeng.umini.getMultiOverview", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getMultiOverview", "authType": "umeng-aksk"}}' '{"dataSourceId": "1dfe1b2f3597245664499a91", "isv": "isv8", "fromDate": "2020-10-10", "toDate": "2020-10-31", "timeUnit": "day", "groupName": "门店"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | String |  |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": "xxx"
}
```

---

### umeng.umini.initMultiLevelTree — 上传层级分组结构

上传层级分组结构（H5暂不支持）

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（AppKey） |
| treeJson | String | 是 | JSON层级分组结构（最多五级）；（示例: {"head":["国家","省","城市","门店"],"rows":[["中国","北京","朝阳区","金辉大厦店"],["中国","北京","朝阳区","绿地中心店"]]}） |

```bash
umeng-cli call '{"name": "umeng.umini.initMultiLevelTree", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.initMultiLevelTree", "authType": "umeng-aksk"}}' '{"dataSourceId": "", "treeJson": "{\"head\":[\"国家\",\"省\",\"城市\",\"门店\"],\"rows\":[[\"中国\",\"北京\",\"朝阳区\",\"金辉大厦店\"],[\"中国\",\"北京\",\"朝阳区\",\"绿地中心店\"]]}"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| msg | String |  |
| code | Long |  |
| success | Boolean |  |
| data | String |  |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": "xxx"
}
```

---

### umeng.umini.getMultiLevelTree — 获取层级分组结构

获取层级分组结构（H5暂不支持）

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（AppKey） |

```bash
umeng-cli call '{"name": "umeng.umini.getMultiLevelTree", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getMultiLevelTree", "authType": "umeng-aksk"}}' '{"dataSourceId": ""}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| msg | String |  |
| code | Long |  |
| success | Boolean |  |
| data | String |  |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": "xxx"
}
```

---

### umeng.umini.getLandingPageList — 获取页面分析-入口页面列表

获取页面分析-入口页面列表（H5暂不支持）

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（AppKey） |
| timeUnit | String | 是 | 时间颗粒度（可选参数：day,7day,30day）（示例: day） |
| fromDate | String | 是 | 开始时间（示例: 2020-08-10） |
| toDate | String | 是 | 结束时间（示例: 2020-08-10） |
| orderBy | String | 否 | visitTimes,visitUser,jumpRatio（示例: visitTimes） |
| direction | String | 否 | 排序方向（desc：降序,asc：正序）（示例: desc） |
| pageIndex | Integer | 否 | 页码（示例: 1） |
| pageSize | Integer | 否 | 每页条数（示例: 30） |

```bash
umeng-cli call '{"name": "umeng.umini.getLandingPageList", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getLandingPageList", "authType": "umeng-aksk"}}' '{"dataSourceId": "", "timeUnit": "day", "fromDate": "2020-08-10", "toDate": "2020-08-10"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | landingPageListDTO | 结果数据 |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |


**`landingPageListDTO` 结构（页面分析-入口页面列表DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| currentPage | Integer | 当前页码 |
| totalCount | Integer | 总条数 |
| data | landingPageDTO[] | 结果列表 |

**`landingPageDTO[]` 结构（页面分析-入口页面DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| page | String | 页面URL |
| displayName | String | 页面备注 |
| visitTimes | Long | 入口页次数 |
| visitUser | Long | 入口页人数 |
| jumpRatio | String | 跳出率 |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": {
    "data": [
      {
        "displayName": "xxx",
        "page": "xxx",
        "jumpRatio": "xxx",
        "visitUser": 0,
        "visitTimes": 0
      }
    ],
    "currentPage": 0,
    "totalCount": 0
  }
}
```

---

### umeng.umini.getShareUserList — 获取分享用户列表

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（AppKey） |
| timeUnit | String | 是 | 时间颗粒度（可选参数：day,7day,30day）（示例: day） |
| fromDate | String | 是 | 开始时间（示例: 2020-08-10） |
| toDate | String | 是 | 结束时间（示例: 2020-08-10） |
| orderBy | String | 否 | 排序指标(count：分享次数；reflow：分享回流量；newUser：分享新增)（默认: count） |
| direction | String | 否 | 排序方向（desc：降序,asc：正序）（默认: desc） |
| pageIndex | Integer | 否 | 页码（默认: 1） |
| pageSize | Integer | 否 | 每页记录数（默认: 30） |

```bash
umeng-cli call '{"name": "umeng.umini.getShareUserList", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getShareUserList", "authType": "umeng-aksk"}}' '{"dataSourceId": "", "timeUnit": "day", "fromDate": "2020-08-10", "toDate": "2020-08-10"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | shareUserListDTO | 数据返回结果 |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |


**`shareUserListDTO` 结构（分享用户数据结果列表DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| currentPage | Integer | 当前页码 |
| totalCount | Integer | 总记录数 |
| data | shareUserDTO[] |  |

**`shareUserDTO[]` 结构（分享用户数据结果DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| reflowRatio | Double | 分享回流比 |
| avatarUrl | String | 头像URL |
| reflow | Long | 用户回流量 |
| nickName | String | 用户名 |
| newUser | Long | 分享新增 |
| count | Long | 分享回流量 |
| userId | String | 用户ID |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": {
    "data": [
      {
        "reflowRatio": "",
        "avatarUrl": "xxx",
        "reflow": 0,
        "nickName": "xxx",
        "newUser": 0,
        "count": 0,
        "userId": "xxx"
      }
    ],
    "currentPage": 0,
    "totalCount": 0
  }
}
```

---

### umeng.umini.getVisitPageList — 获取页面分析-受访页面列表

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（AppKey） |
| timeUnit | String | 是 | 时间颗粒度（可选参数：day,7day,30day）（示例: day） |
| fromDate | String | 是 | 开始时间（示例: 2020-08-10） |
| toDate | String | 是 | 结束时间（示例: 2020-08-10） |
| orderBy | String | 否 | 排序指标（可选：visitTimes：页面访问次数；visitUser：页面访问用户数；pageDuration：平均页面访问时长）（示例: visitTimes） |
| direction | String | 否 | 排序方向（desc：降序,asc：正序）（示例: desc） |
| pageIndex | Integer | 否 | 页码（示例: 1） |
| pageSize | Integer | 否 | 每页记录数（示例: 30） |

```bash
umeng-cli call '{"name": "umeng.umini.getVisitPageList", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getVisitPageList", "authType": "umeng-aksk"}}' '{"dataSourceId": "", "timeUnit": "day", "fromDate": "2020-08-10", "toDate": "2020-08-10"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | visitPageListDTO |  |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |


**`visitPageListDTO` 结构（页面分析-受访页面列表DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| currentPage | Integer | 当前页码 |
| data | visitPageDTO[] |  |
| totalCount | Integer | 总条数 |

**`visitPageDTO[]` 结构（获取页面分析-受访页面结果DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| displayName | String | 页面备注 |
| pageDuration | String | 平均页面访问时长（H5暂不支持） |
| page | String | 页面URL |
| visitUser | Long | 页面访问用户数 |
| visitTimes | Long | 页面访问次数 |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": {
    "data": [
      {
        "displayName": "xxx",
        "pageDuration": "xxx",
        "page": "xxx",
        "visitUser": 0,
        "visitTimes": 0
      }
    ],
    "currentPage": 0,
    "totalCount": 0
  }
}
```

---

### umeng.umini.editPathDisplayName — 编辑页面路径显示名称

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源ID（AppKey） |
| displayName | String | 是 | 页面别名 |
| path | String | 是 | 页面URL地址 |

```bash
umeng-cli call '{"name": "umeng.umini.editPathDisplayName", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.editPathDisplayName", "authType": "umeng-aksk"}}' '{"dataSourceId": "", "displayName": "", "path": ""}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| msg | String |  |
| code | Long |  |
| success | Boolean |  |
| data | String |  |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": "xxx"
}
```

---

### umeng.umini.batchCreateEvent — 批量创建事件

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（AppKey） |
| eventList | eventDTO[] | 是 | 事件列表 |


**`eventDTO[]` 结构（自定义事件DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| eventName | String | 事件名 |
| displayName | String | 事件显示名 |

```bash
umeng-cli call '{"name": "umeng.umini.batchCreateEvent", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.batchCreateEvent", "authType": "umeng-aksk"}}' '{"dataSourceId": "", "eventList": ""}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | String | 数据返回结果 |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": "xxx"
}
```

---

### umeng.umini.editMiniApp — 编辑小程序数据源

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（AppKey）（示例: 5e8c6dea978eea071c37c682） |
| platform | String | 否 | 平台(不可编辑)（示例: mini_wechat） |
| name | String | 否 | 应用名称（示例: 应用名称） |
| language | String | 否 | 语言(CN:中文; OTHER:其他)（示例: CN） |
| firstLevel | String | 否 | 一级分类（行业帮助文档：https://developer.umeng.com/docs/147615/detail/169442 ）（示例: 公共交通与出行） |
| secondLevel | String | 否 | 二级分类（示例: 公共交通） |
| description | String | 否 | 描述（示例: 描述……） |
| miniAppId | String | 否 | 微信/支付宝AppId（不可单独出现，需要和下面参数组队出现） |
| miniAppSecret | String | 否 | 微信AppSecret（miniAppId和miniAppSecret必须成对出现） |
| miniPublicKey | String | 否 | 支付宝PublicKey（miniAppId、miniPublicKey和miniPrivateKey必须同时出现） |
| miniPrivateKey | String | 否 | 支付宝PrivateKey（miniAppId、miniPublicKey和miniPrivateKey必须同时出现） |
| integrationType | String | 否 | 集成类型；单应用小程序集成：single、小程序模版类应用集成 ：template（默认: single） |

```bash
umeng-cli call '{"name": "umeng.umini.editMiniApp", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.editMiniApp", "authType": "umeng-aksk"}}' '{"dataSourceId": "5e8c6dea978eea071c37c682"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| code | Long | 状态码 |
| success | Boolean | 状态 |
| data | Boolean | 成功true；失败false |
| msg | String | 返回消息 |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0
}
```

---

### umeng.umini.getShareOverview — 获取小程序某天的分享数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（AppKey） |
| fromDate | String | 是 | 开始时间（示例: 2020-03-10） |
| toDate | String | 是 | 结束时间（示例: 2020-03-31） |
| timeUnit | String | 是 | 时间颗粒度(可选：day,7day,30day）（示例: day） |
| pageIndex | Integer | 否 | 页码（默认: 1） |
| pageSize | Integer | 否 | 每页记录数（默认: 30） |

```bash
umeng-cli call '{"name": "umeng.umini.getShareOverview", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getShareOverview", "authType": "umeng-aksk"}}' '{"dataSourceId": "", "fromDate": "2020-03-10", "toDate": "2020-03-31", "timeUnit": "day"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | shareOverviewDTO |  |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |


**`shareOverviewDTO` 结构（分享数据DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| currentPage | Integer | 当前页码 |
| totalCount | Integer | 总记录数 |
| data | shareIndicatorDTO[] |  |

**`shareIndicatorDTO[]` 结构（分享趋势指标DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| dateTime | String | 时间 |
| reflowRatio | String | 回流比（H5暂不支持） |
| reflow | Long | 分享回流量 |
| newUser | Long | 分享新增 |
| count | Long | 分享次数 |
| user | Long | 分享人数 |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": {
    "data": [
      {
        "dateTime": "xxx",
        "reflowRatio": "xxx",
        "reflow": 0,
        "newUser": 0,
        "count": 0,
        "user": 0
      }
    ],
    "currentPage": 0,
    "totalCount": 0
  }
}
```

---

### umeng.umini.getSharePageOverview — 获取页面分享概况数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（AppKey） |
| fromDate | String | 是 | 开始时间（示例: 2020-03-10） |
| toDate | String | 是 | 结束时间（示例: 2020-03-31） |
| timeUnit | String | 是 | 时间颗粒度(day,7day,30day)（示例: day） |
| pageIndex | Integer | 否 | 页码（默认: 1） |
| pageSize | Integer | 否 | 每页记录数（默认: 30） |
| orderBy | String | 否 | 排序指标(可选count,reflow,newUser,user)（默认: user） |
| direction | String | 否 | 排序方向(可选desc,asc)（默认: desc） |

```bash
umeng-cli call '{"name": "umeng.umini.getSharePageOverview", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getSharePageOverview", "authType": "umeng-aksk"}}' '{"dataSourceId": "", "fromDate": "2020-03-10", "toDate": "2020-03-31", "timeUnit": "day"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | sharePageOverviewDTO |  |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |


**`sharePageOverviewDTO` 结构（分享页面概况DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| currentPage | Integer | 当前页码 |
| totalCount | Integer | 总记录数 |
| data | sharePageIndicatorDTO[] |  |

**`sharePageIndicatorDTO[]` 结构（页面分享指标DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| reflowRatio | Double | 分享回流比（H5暂不支持） |
| path | String | 页面url |
| reflow | Long | 分享回流 |
| newUser | Long | 分享新增 |
| count | Long | 分享次数 |
| user | Long | 分享人数 |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": {
    "data": [
      {
        "reflowRatio": "",
        "path": "xxx",
        "reflow": 0,
        "newUser": 0,
        "count": 0,
        "user": 0
      }
    ],
    "currentPage": 0,
    "totalCount": 0
  }
}
```

---

### umeng.umini.getAllPropertyValueCount — 获取某事件属性下全部属性值数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| timeUnit | String | 是 | 时间颗粒度(可选day)（默认: day） |
| fromDate | String | 是 | 开始时间（示例: 2020-03-10） |
| toDate | String | 是 | 结束时间（示例: 2020-03-31） |
| propertyName | String | 是 | 属性名 |
| pageIndex | Integer | 否 | 页码（默认: 1） |
| pageSize | Integer | 否 | 每页记录数（默认: 30） |
| eventName | String | 是 | 事件名 |
| dataSourceId | String | 是 | 数据源id（AppKey） |

```bash
umeng-cli call '{"name": "umeng.umini.getAllPropertyValueCount", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getAllPropertyValueCount", "authType": "umeng-aksk"}}' '{"timeUnit": "day", "fromDate": "2020-03-10", "toDate": "2020-03-31", "propertyName": "", "eventName": "", "dataSourceId": ""}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | allPropertyValueCountDTO |  |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |


**`allPropertyValueCountDTO` 结构（某事件属性下全部属性值数据）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| currentPage | Integer |  |
| totalCount | Integer |  |
| data | propertyValueCountDTO[] |  |

**`propertyValueCountDTO[]` 结构（属性值的触发次数）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| count | Long |  |
| propertyValue | String |  |
| countRatio | Double |  |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": {
    "data": [
      {
        "countRatio": "",
        "count": 0,
        "propertyValue": "xxx"
      }
    ],
    "currentPage": 0,
    "totalCount": 0
  }
}
```

---

### umeng.umini.getEventOverview — 获取某自定义事件统计数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| timeUnit | String | 是 | 时间颗粒度（默认: day） |
| fromDate | String | 是 | 开始时间（示例: 2020-03-10） |
| toDate | String | 是 | 结束时间（示例: 2020-03-31） |
| eventName | String | 是 | 事件名 |
| dataSourceId | String | 是 | 数据源id（AppKey） |

```bash
umeng-cli call '{"name": "umeng.umini.getEventOverview", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getEventOverview", "authType": "umeng-aksk"}}' '{"timeUnit": "day", "fromDate": "2020-03-10", "toDate": "2020-03-31", "eventName": "", "dataSourceId": ""}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | eventOverviewDTO |  |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |


**`eventOverviewDTO` 结构（自定义事件统计数据DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| totalCount | Integer | 总记录数 |
| currentPage | Integer | 当前页 |
| data | eventIndicatorDTO[] |  |

**`eventIndicatorDTO[]` 结构（事件指标数据DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| dateTime | String | 时间 |
| count | Long | 触发次数 |
| device | Long | 触发用户数 |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": {
    "data": [
      {
        "dateTime": "xxx",
        "count": 0,
        "device": 0
      }
    ],
    "totalCount": 0,
    "currentPage": 0
  }
}
```

---

### umeng.umini.getEventProvertyList — 获取某自定义事件的属性列表

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| eventName | String | 是 | 事件 |
| dataSourceId | String | 是 | 数据源id（AppKey） |

```bash
umeng-cli call '{"name": "umeng.umini.getEventProvertyList", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getEventProvertyList", "authType": "umeng-aksk"}}' '{"eventName": "", "dataSourceId": ""}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | eventProvertyDTO[] |  |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |


**`eventProvertyDTO[]` 结构（自定义事件属性DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| propertyName | String |  |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": [
    {
      "propertyName": "xxx"
    }
  ]
}
```

---

### umeng.umini.getEventList — 获取自定义事件列表

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源Id（AppKey） |

```bash
umeng-cli call '{"name": "umeng.umini.getEventList", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getEventList", "authType": "umeng-aksk"}}' '{"dataSourceId": ""}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | eventDTO[] |  |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |


**`eventDTO[]` 结构（自定义事件DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| eventName | String | 事件名 |
| displayName | String | 事件显示名 |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": [
    {
      "displayName": "xxx",
      "eventName": "xxx"
    }
  ]
}
```

---

### umeng.umini.getChannelOverview — 获取某推广渠道的统计数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| fromDate | String | 是 | 开始时间（示例: 2020-03-10） |
| toDate | String | 是 | 结束时间（示例: 2020-03-31） |
| channel | String | 是 | 渠道 |
| timeUnit | String | 是 | 时间颗粒度(可选时间颗粒度：5min,hour,day,7day,30day)（默认: day） |
| dataSourceId | String | 是 | 数据源id（AppKey） |
| indicators | String | 是 | 多个指标时，以逗号分隔（newUser,activeUser,launch,visitTimes,onceDuration）（示例: activeUser） |
| pageIndex | Integer | 否 | 页码（默认: 1） |
| pageSize | Integer | 否 | 每页记录数（默认: 30） |

```bash
umeng-cli call '{"name": "umeng.umini.getChannelOverview", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getChannelOverview", "authType": "umeng-aksk"}}' '{"fromDate": "2020-03-10", "toDate": "2020-03-31", "channel": "", "timeUnit": "day", "dataSourceId": "", "indicators": "activeUser"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | refererOverviewDTO |  |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |


**`refererOverviewDTO` 结构（获取场景渠道活动等来源指标数据DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| currentPage | Integer | 当前页 |
| totalCount | Integer | 总记录数 |
| data | refererIndicatorDTO[] |  |

**`refererIndicatorDTO[]` 结构（推广来源指标信息DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| dateTime | String | 时间 |
| newUser | Long | 新增用户 |
| activeUser | Long | 活跃用户 |
| launch | Long | 打开次数（H5暂不支持） |
| visitTimes | Long | 页面访问次数 |
| onceDuration | String | 次均停留时长（H5暂不支持） |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": {
    "data": [
      {
        "dateTime": "xxx",
        "activeUser": 0,
        "onceDuration": "xxx",
        "newUser": 0,
        "launch": 0,
        "visitTimes": 0
      }
    ],
    "currentPage": 0,
    "totalCount": 0
  }
}
```

---

### umeng.umini.getCampaignOverview — 获取某推广活动的统计数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| timeUnit | String | 是 | 时间颗粒度（枚举范围5min,hour,day,7day,30day）（示例: day） |
| fromDate | String | 是 | 开始时间（示例: 2020-03-10） |
| toDate | String | 是 | 结束时间（示例: 2020-03-31） |
| campaign | String | 是 | 活动 |
| pageSize | Integer | 否 | 每页记录条数（默认: 1）（示例: 30） |
| pageIndex | Integer | 否 | 页码（默认: 30）（示例: 1） |
| dataSourceId | String | 是 | 数据源id（AppKey） |
| indicators | String | 是 | 指标名称(以逗号分隔，可选择一个或多个）,newUser,activeUser,launch,visitTimes,onceDuration（示例: newUser） |

```bash
umeng-cli call '{"name": "umeng.umini.getCampaignOverview", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getCampaignOverview", "authType": "umeng-aksk"}}' '{"timeUnit": "day", "fromDate": "2020-03-10", "toDate": "2020-03-31", "campaign": "", "dataSourceId": "", "indicators": "newUser"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | refererOverviewDTO |  |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |


**`refererOverviewDTO` 结构（获取场景渠道活动等来源指标数据DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| currentPage | Integer | 当前页 |
| totalCount | Integer | 总记录数 |
| data | refererIndicatorDTO[] |  |

**`refererIndicatorDTO[]` 结构（推广来源指标信息DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| dateTime | String | 时间 |
| newUser | Long | 新增用户 |
| activeUser | Long | 活跃用户 |
| launch | Long | 打开次数（H5暂不支持） |
| visitTimes | Long | 页面访问次数 |
| onceDuration | String | 次均停留时长（H5暂不支持） |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": {
    "data": [
      {
        "dateTime": "xxx",
        "activeUser": 0,
        "onceDuration": "xxx",
        "newUser": 0,
        "launch": 0,
        "visitTimes": 0
      }
    ],
    "currentPage": 0,
    "totalCount": 0
  }
}
```

---

### umeng.umini.getSceneOverview — 获取某场景值的统计数据

获取某场景值的统计数据（H5暂不支持）

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| timeUnit | String | 是 | 时间颗粒度（可选参数：5min,hour,day,7day,30day）（示例: day） |
| fromDate | String | 是 | 开始时间（示例: 2020-03-10） |
| toDate | String | 是 | 结束时间（示例: 2020-03-31） |
| scene | String | 是 | 场景值( 帮助文档：https://developer.umeng.com/docs/147615/detail/175369 )（示例: alipay_1090） |
| pageIndex | Integer | 否 | 页码（默认: 1） |
| pageSize | Integer | 否 | 每页记录数（默认: 30） |
| dataSourceId | String | 是 | 数据源id（AppKey） |
| indicators | String | 是 | 指标值（默认: activeUser）（示例: 多个指标时，以逗号分隔（newUser,activeUser,launch,visitTimes,onceDuration）） |

```bash
umeng-cli call '{"name": "umeng.umini.getSceneOverview", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getSceneOverview", "authType": "umeng-aksk"}}' '{"timeUnit": "day", "fromDate": "2020-03-10", "toDate": "2020-03-31", "scene": "alipay_1090", "dataSourceId": "", "indicators": "多个指标时，以逗号分隔（newUser,activeUser,launch,visitTimes,onceDuration）"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | refererOverviewDTO |  |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |


**`refererOverviewDTO` 结构（获取场景渠道活动等来源指标数据DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| currentPage | Integer | 当前页 |
| totalCount | Integer | 总记录数 |
| data | refererIndicatorDTO[] |  |

**`refererIndicatorDTO[]` 结构（推广来源指标信息DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| dateTime | String |  |
| newUser | Long |  |
| activeUser | Long |  |
| launch | Long |  |
| visitTimes | Long |  |
| onceDuration | String |  |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": {
    "data": [
      {
        "dateTime": "xxx",
        "activeUser": 0,
        "onceDuration": "xxx",
        "newUser": 0,
        "launch": 0,
        "visitTimes": 0
      }
    ],
    "currentPage": 0,
    "totalCount": 0
  }
}
```

---

### umeng.umini.getAppList — 获取用户的小程序列表及数量

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| pageIndex | Integer | 否 | 页码（默认: 1） |
| pageSize | Integer | 否 | 每页记录数（默认: 30） |

```bash
umeng-cli call '{"name": "umeng.umini.getAppList", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getAppList", "authType": "umeng-aksk"}}' '{}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | appListDTO |  |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |


**`appListDTO` 结构（小程序列表DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| totalCount | Integer | 总条数 |
| currentPage | Integer | 当前页 |
| data | appInfoDTO[] | app信息 |

**`appInfoDTO[]` 结构（应用详细信息DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| secondLevel | String | 二级分类 |
| dataSourceId | String | 数据源id |
| appName | String | 数据源名称 |
| gmtCreate | String | 创建时间 |
| firstLevel | String | 一级分类 |
| userName | String | 用户名 |
| platform | String | 小程序平台 |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": {
    "data": [
      {
        "secondLevel": "xxx",
        "dataSourceId": "xxx",
        "appName": "xxx",
        "gmtCreate": "xxx",
        "firstLevel": "xxx",
        "userName": "xxx",
        "platform": "xxx"
      }
    ],
    "totalCount": 0,
    "currentPage": 0
  }
}
```

---

### umeng.umini.createMiniApp — 新建小程序数据源

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | String | 是 | 名称（示例: 应用名称） |
| type | String | 是 | 类型（小程序：mini,小游戏：mini_game；H5: html_5）（默认: mini） |
| platform | String | 是 | 平台( 支付宝小程序：mini_alipay；微信小程序：mini_wechat；天猫精灵：mini_tmall_genie；微信小游戏：mini_game_wechat；字节跳动小程序：mini_bytedance；百度小程序：mini_baidu；QQ小程序：mini_qq；H5: html_5 )（示例: mini_wechat） |
| language | String | 是 | 语言(CN:中文; OTHER:其他)（示例: CN） |
| firstLevel | String | 是 | 一级分类（行业帮助文档：https://developer.umeng.com/docs/147615/detail/169442 ）（示例: 公共交通与出行） |
| secondLevel | String | 是 | 二级分类（示例: 公共交通） |
| description | String | 否 | 描述（示例: 描述……） |
| miniAppId | String | 否 | 微信/支付宝AppId（不可单独出现，需要和下面参数组队出现） |
| miniAppSecret | String | 否 | 微信AppSecret（miniAppId和miniAppSecret必须成对出现） |
| miniPublicKey | String | 否 | 支付宝PublicKey（miniAppId、miniPublicKey和miniPrivateKey必须同时出现） |
| miniPrivateKey | String | 否 | 支付宝PrivateKey（miniAppId、miniPublicKey和miniPrivateKey必须同时出现） |
| integrationType | String | 否 | 集成类型；单应用小程序集成：single、小程序模版类应用集成 ：template（默认: single） |

```bash
umeng-cli call '{"name": "umeng.umini.createMiniApp", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.createMiniApp", "authType": "umeng-aksk"}}' '{"name": "应用名称", "type": "mini", "platform": "mini_wechat", "language": "CN", "firstLevel": "公共交通与出行", "secondLevel": "公共交通"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| code | long | 状态码 |
| success | boolean | 状态 |
| data | string | 成功时返回新建小程序key |
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

### umeng.umini.getOverview — 获取应用概况数据

获取应用概况数据：启动、活跃、新增、访次、次均停留时长、人均停留时长

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（AppKey）（示例: 1dfe1b2f3597245664499a9c） |
| fromDate | String | 是 | 开始时间（示例: 2020-03-10） |
| toDate | String | 是 | 结束时间（示例: 2020-03-31） |
| timeUnit | String | 是 | 时间颗粒度，枚举范围5min,hour,day,7day,30day（示例: day） |
| indicators | String | 是 | 指标名称(以逗号分隔，可选择一个或多个）,newUser,activeUser,launch,visitTimes,onceDuration,dailyDuration（示例: newUser） |
| pageIndex | Integer | 否 | 页码（默认: 1） |
| pageSize | Integer | 否 | 每页记录条数（默认: 30） |

```bash
umeng-cli call '{"name": "umeng.umini.getOverview", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getOverview", "authType": "umeng-aksk"}}' '{"dataSourceId": "1dfe1b2f3597245664499a9c", "fromDate": "2020-03-10", "toDate": "2020-03-31", "timeUnit": "day", "indicators": "newUser"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | overviewDTO |  |
| msg | String |  |
| code | Long |  |
| success | Boolean |  |


**`overviewDTO` 结构（获取小程序应用概况数据DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| currentPage | Integer | 当前页码 |
| totalCount | Integer | 总条数 |
| data | appIndicatorDTO[] |  |

**`appIndicatorDTO[]` 结构（应用指标DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| dateTime | String | 时间 |
| newUser | Long | 新增用户 |
| activeUser | Long | 活跃用户 |
| launch | Long | 打开次数（H5暂不支持） |
| visitTimes | Long | 页面访问次数 |
| onceDuration | String | 次均停留时长（H5暂不支持） |
| dailyDuration | String | 人均停留时长（H5暂不支持） |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": {
    "data": [
      {
        "dateTime": "xxx",
        "dailyDuration": "xxx",
        "activeUser": 0,
        "onceDuration": "xxx",
        "newUser": 0,
        "launch": 0,
        "visitTimes": 0
      }
    ],
    "currentPage": 0,
    "totalCount": 0
  }
}
```

---

### umeng.umini.getTotalUser — 获取应用的累计用户数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（AppKey）（示例: 5dfe1b2f3597245664499a9c） |
| fromDate | String | 是 | 开始时间（示例: 2020-03-01） |
| toDate | String | 是 | 结束时间（示例: 2020-03-01） |
| pageIndex | Integer | 否 | 页码（默认: 1） |
| pageSize | Integer | 否 | 每页记录条数（默认: 30） |

```bash
umeng-cli call '{"name": "umeng.umini.getTotalUser", "api": {"method": "GET", "baseUrl": "https://gateway.open.umeng.com/openapi", "endpoint": "param2/1/com.umeng.umini/umeng.umini.getTotalUser", "authType": "umeng-aksk"}}' '{"dataSourceId": "5dfe1b2f3597245664499a9c", "fromDate": "2020-03-01", "toDate": "2020-03-01"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| data | totalUserDTO[] |  |
| code | long | 状态码 |
| msg | String | 消息 |
| success | Boolean | 执行状态 |


**`totalUserDTO[]` 结构（获取小程序应用累计用户数DTO）：**

| 字段 | 类型 | 说明 |
|------|------|------|
| dateTime | String |  |
| totalUser | Long |  |

**返回示例：**

```json
{
  "msg": "xxx",
  "code": 0,
  "data": [
    {
      "dateTime": "xxx",
      "totalUser": 0
    }
  ]
}
```

---

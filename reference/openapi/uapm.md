# U-APM 应用性能监控（阿里云风格 OpenAPI）

通过 `umeng-cli call` 命令调用，使用阿里云 ACS3-HMAC-SHA256 V3 签名鉴权。

## 通用调用方式

```bash
umeng-cli call '{"name":"<接口名>","api":{"method":"GET/POST","baseUrl":"https://apm.openapi.umeng.com","endpoint":"/<接口路径>","authType":"aliyun-aksk","version":"2022-02-14"}}' '<参数JSON>'
```

> AK/SK 会在首次调用时自动通过登录凭证获取并加密缓存，无需手动配置。

---

## 接口列表

**监控告警：**

- [`UpdateAlertPlan`](#updatealertplan) — 修改告警计划

**符号表：**

- [`GetSymUploadParam`](#getsymuploadparam) — 获取符号表文件上传参数
- [`UploadSymbolFile`](#uploadsymbolfile) — 上传符号表文件
- [`DeleteSymRecords`](#deletesymrecords) — 删除符号表记录

**统计指标：**

- [`GetTodayStatTrend`](#gettodaystattrend) — 获取今日稳定性统计数据
- [`GetStatTrend`](#getstattrend) — 获取历史稳定性统计数据
- [`GetLaunchTrend`](#getlaunchtrend) — 获取启动性能统计数据
- [`GetNetworkTrend`](#getnetworktrend) — 获取网络性能统计数据
- [`GetNativePageTrend`](#getnativepagetrend) — 获取原生页面性能统计数据
- [`GetH5PageTrend`](#geth5pagetrend) — 获取H5页面性能统计数据
- [`GetNetworkMinuteTrend`](#getnetworkminutetrend) — 获取分钟粒度网络统计数据
- [`GetErrorMinuteStatTrend`](#geterrorminutestattrend) — 获取分钟粒度稳定性统计数据

---

## 监控告警

### UpdateAlertPlan — 修改告警计划

OpenAPI修改监控告警

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（appKey)（示例: 5fb6001a73749c24fd9cb356） |
| planId | Long | 是 | 监控告警计划id。（示例: 18288） |
| versions | String | 是 | 监控告警计划中生效的应用版本。（示例: "1.1.0,1.2.0,1.3.0"） |

```bash
umeng-cli call '{"name": "UpdateAlertPlan", "api": {"method": "POST", "baseUrl": "https://apm.openapi.umeng.com", "endpoint": "/updateAlertPlan", "authType": "aliyun-aksk", "version": "2022-02-14"}}' '{"dataSourceId": "5fb6001a73749c24fd9cb356", "planId": "18288", "versions": "\"1.1.0,1.2.0,1.3.0\""}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| success | Boolean | 请求是否成功。（示例: true） |
| code | Long | 返回码。（示例: 200） |
| msg | String | 请求 code 对应的详细描述信息。（示例: Success） |

**错误码：**

| 错误码 | 说明 |
|--------|------|
| 500 | ServerError |
| 403 | Forbiddon |

---

## 符号表

### GetSymUploadParam — 获取符号表文件上传参数

通过该接口获取文件上传的地址、签名等必要参数，有效期30分钟。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（appKey)（示例: 5fb6001a73749c24fd9cb356） |
| appVersion | String | 是 | App版本号（示例: 1.0.3） |
| fileName | String | 是 | 文件名称，后缀只允许为txt,so,sym,zip,gz（示例: symbol.zip） |
| fileType | Integer | 是 | 文件类型(1 mapping文件；2 so文件；3 dSYM文件压缩包；4 flutter dart符号表；5 鸿蒙so文件；6 鸿蒙SourceMap文件；7 鸿蒙NameCache文件)（示例: 1） |
| flutterName | String | 否 | flutter应用/模块名称，仅当 fileType 为flutter dart符号表时需要填写（示例: my-flutter-app） |

```bash
umeng-cli call '{"name": "GetSymUploadParam", "api": {"method": "GET", "baseUrl": "https://apm.openapi.umeng.com", "endpoint": "/getSymUploadParam", "authType": "aliyun-aksk", "version": "2022-02-14"}}' '{"dataSourceId": "5fb6001a73749c24fd9cb356", "appVersion": "1.0.3", "fileName": "symbol.zip", "fileType": "1"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| msg | String | 异常描述（示例: succeed in handling request） |
| traceId | String | traceId（示例: 210f07c516457690916816858d94ea） |
| data | Object | data |
| code | Long | 状态码（示例: 200） |
| success | Boolean | 是否成功（示例: true） |

**`data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| accessKeyId | String | 文件上传表单必要参数（示例: LTAI5tM4ZXXXXX） |
| uploadAddress | String | 文件上传地址（示例: https://quickbird.oss-cn-shanghai.aliyuncs.com） |
| signature | String | 文件上传表单必要参数（示例: 3f67c435e08d164f41f6e522a2b5d1d7feb93000） |
| callback | String | 文件上传表单必要参数（示例: eyJjYWxsYmFja1VybCI6Imh0dHBzOi8vYXBtLnVtZW5nLmNvbS9oc2Yvc3ltL29zcy9ub3RpZnlNc2ciLCJjYqc29uIn0=） |
| key | String | 文件上传表单必要参数（示例: tmp/20220428/5fb6001a73749c24fd9cb356_f49a08dc1225438188c109fcf92eb9f3/symbol.zip） |
| policy | String | 文件上传表单必要参数（示例: eyJleHBpcmF0aW9uIjoiMjAyMi0wNC0yOFQwNDoxMzo0MS43OTJaIiwiY29uZGl0aW9ucyI6W1siZXEiLCIka2V5IiwidG1WpveGZTSXNJbU5oYkd4aVlXTnJRbTlrZVZSNWNHVWlPaUpoY0hCc2FXTmhkR2x2Ymk5cWMyOXVJbjA9In1dfQ==） |

**错误码：**

| 错误码 | 说明 |
|--------|------|
| 500 | ServerError |
| 403 | Forbiddon |

---

### UploadSymbolFile — 上传符号表文件

该接口支持通过sdk直传符号表文件，无需先获取上传参数再自行上传oss，sdk调用示例参考： 
 https://developer.umeng.com/docs/193624/detail/194577#ce8581403br0e

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（appKey)（示例: 5fb6001a73749c24fd9cb356） |
| appVersion | String | 是 | App版本号（示例: 1.0.3） |
| fileName | String | 是 | 文件名称，后缀只允许为txt,so,sym,zip,gz（示例: symbol.zip） |
| fileType | Integer | 是 | 文件类型(1 mapping文件；2 so文件；3 dSYM文件压缩包；4 flutter dart符号表；5 鸿蒙so文件；6 鸿蒙SourceMap文件；7 鸿蒙NameCache文件)（示例: 1） |
| flutterName | String | 否 | flutter应用/模块名称，仅当 fileType 为flutter dart符号表时需要填写（示例: my-flutter-app） |
| ossUrl | String | 否 | 文件上传到OSS的地址，使用SDK时会自动填充该参数，无需用户设置（示例: -） |

```bash
umeng-cli call '{"name": "UploadSymbolFile", "api": {"method": "POST", "baseUrl": "https://apm.openapi.umeng.com", "endpoint": "/uploadSymbolFile", "authType": "aliyun-aksk", "version": "2022-02-14"}}' '{"dataSourceId": "5fb6001a73749c24fd9cb356", "appVersion": "1.0.3", "fileName": "symbol.zip", "fileType": "1"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| msg | String | 异常描述（示例: succeed in handling request） |
| traceId | String | traceId（示例: 210f07c516457690916816858d94ea） |
| requestId | String | 请求ID（示例: 8B99488B-2B73-502E-A5F2-00B4746F4325） |
| code | Long | code（示例: 200） |
| success | Boolean | 是否成功（示例: true） |

**错误码：**

| 错误码 | 说明 |
|--------|------|
| 500 | ServerError |
| 403 | Forbiddon |

---

### DeleteSymRecords — 删除符号表记录

按照文件类型和应用版本号批量删除符号表记录，释放符号表上传额度。
频控限制：每分钟限制调用5次，每次支持最多100个版本号。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（appKey)（示例: 5fb6001a73749c24fd9cb356） |
| fileType | Integer | 是 | 文件类型(1 mapping文件；2 so文件；3 dSYM文件压缩包; 4 flutter dart符号表)（示例: 1） |
| appVersions | Array | 是 | 应用版本号列表，最多支持100个版本（示例: 1.1.0,1.2.0,1.3.0） |

```bash
umeng-cli call '{"name": "DeleteSymRecords", "api": {"method": "POST", "baseUrl": "https://apm.openapi.umeng.com", "endpoint": "/deleteSymRecords", "authType": "aliyun-aksk", "version": "2022-02-14"}}' '{"dataSourceId": "5fb6001a73749c24fd9cb356", "fileType": "1", "appVersions": "1.1.0,1.2.0,1.3.0"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| msg | String | 异常描述（示例: succeed in handling request） |
| traceId | String | traceId（示例: 210f07c516457690916816858d94ea） |
| code | Long | code（示例: 200） |
| success | Boolean | 是否成功（示例: true） |
| num | Integer | 成功删除的符号表记录数量（示例: 1） |

**错误码：**

| 错误码 | 说明 |
|--------|------|
| 500 | ServerError |
| 403 | Forbiddon |

---

## 统计指标

### GetTodayStatTrend — 获取今日稳定性统计数据

获取今日小时粒度的实时统计数据。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（appKey)（示例: 5fb6001a73749c24fd9cb356） |
| type | Integer | 是 | 异常类型（0. 全部崩溃 1. java/ios崩溃 2. native崩溃  3.ANR  4.自定义异常 5.卡顿 6.全部oom异常 7.java oom异常 8.native oom异常 9.全部启动崩溃 10.java启动崩溃 11.native启动崩溃 12.网络错误）（示例: 1） |
| appVersion | String | 否 | 指定App版本（示例: 1.0） |

```bash
umeng-cli call '{"name": "GetTodayStatTrend", "api": {"method": "GET", "baseUrl": "https://apm.openapi.umeng.com", "endpoint": "/stat/getTodayStatTrend", "authType": "aliyun-aksk", "version": "2022-02-14"}}' '{"dataSourceId": "5fb6001a73749c24fd9cb356", "type": "1"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| success | Boolean | 调用是否成功（示例: true） |
| code | Long | 状态码（示例: 200） |
| msg | String | 异常描述（示例: succeed in handling request） |
| data | Array | 返回结果 |

**`data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| affectedUserCount | Long | 影响用户数（示例: 56） |
| affectedUserRate | Double | 影响用户占比（示例: 10.21） |
| errorCount | Long | 错误数（示例: 120） |
| errorRate | Double | 错误率（示例: 17.24） |
| timePoint | String | 统计时间段（示例: 13:00） |

---

### GetStatTrend — 获取历史稳定性统计数据

获取离线按天统计数据。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（appKey)（示例: 5fb6001a73749c24fd9cb356） |
| type | Integer | 是 | 异常类型（0. 全部崩溃 1. java/ios崩溃 2. native崩溃  3.ANR  4.自定义异常 5.卡顿 6.全部oom异常 7.java oom异常 8.native oom异常 9.全部启动崩溃 10.java启动崩溃 11.native启动崩溃 12.网络错误）（示例: 1） |
| startDate | String | 否 | 起始日期（yyyy-MM-dd格式，和当前日期间隔不能超过90天）（示例: 2021-06-01） |
| endDate | String | 否 | 结束日期（yyyy-MM-dd格式，和起始日期间隔不能超过90天）（示例: 2021-06-03） |
| appVersion | String | 否 | 指定App版本（示例: 1.0） |

```bash
umeng-cli call '{"name": "GetStatTrend", "api": {"method": "GET", "baseUrl": "https://apm.openapi.umeng.com", "endpoint": "/stat/getStatTrend", "authType": "aliyun-aksk", "version": "2022-02-14"}}' '{"dataSourceId": "5fb6001a73749c24fd9cb356", "type": "1"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| success | Boolean | 调用是否成功（示例: true） |
| code | Long | 状态码（示例: 200） |
| msg | String | 异常描述（示例: succeed in handling request） |
| data | Array | 返回数据 |

**`data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| affectedUserCount | Long | 影响用户数（示例: 52） |
| affectedUserRate | Double | 影响用户占比（示例: 10.3） |
| errorCount | Long | 错误数（示例: 120） |
| errorRate | Double | 错误率（示例: 25.6） |
| timePoint | String | 统计日期（示例: 2021-06-01） |

---

### GetLaunchTrend — 获取启动性能统计数据

获取按天或者按小时粒度的启动性能统计指标数据。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（appKey)（示例: 5fb6001a73749c24fd9cb356） |
| timeUnit | String | 是 | 时间粒度 hour：返回以小时为粒度的统计数据，只能查一天范围内的 day：返回以天为粒度的统计数据（示例: day） |
| startDate | String | 是 | 起始日期（yyyy-MM-dd格式，和当前日期间隔不能超过90天）（示例: 2023-05-01） |
| endDate | String | 是 | 结束日期（yyyy-MM-dd格式，和起始日期间隔不能超过90天）（示例: 2023-05-03） |
| appVersion | String | 否 | 指定App版本（示例: 1.0.2） |

```bash
umeng-cli call '{"name": "GetLaunchTrend", "api": {"method": "GET", "baseUrl": "https://apm.openapi.umeng.com", "endpoint": "/stat/getLaunchTrend", "authType": "aliyun-aksk", "version": "2022-02-14"}}' '{"dataSourceId": "5fb6001a73749c24fd9cb356", "timeUnit": "day", "startDate": "2023-05-01", "endDate": "2023-05-03"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| success | Boolean | 请求是否成功。（示例: true） |
| code | Long | 请求返回 code，Success 代表请求成功，其他情况代表请求不成功，具体错误原因描述可通过 msg 查看。（示例: 200） |
| msg | String | 请求 code 对应的详细描述信息。（示例: succeed in handling request） |
| data | Array | 返回数据 |

**`data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| timePoint | String | 时间段，小时或者日期，取决于timeUnit参数（示例: 2023-05-20） |
| firstLaunchCount | Long | 首次启动次数（示例: 2495） |
| firstLaunchDuration | Double | 首次启动平均耗时，单位ms（示例: 3740.5） |
| coldLaunchCount | Long | 冷启动次数（示例: 2495） |
| coldLaunchDuration | Double | 冷启动平均耗时，单位ms（示例: 3784.5） |
| hotLaunchCount | Long | 热启动次数（示例: 2495） |
| hotLaunchDuration | Double | 热启动平均耗时，单位ms（示例: 1400.5） |

---

### GetNetworkTrend — 获取网络性能统计数据

获取按天或者按小时粒度的网络性能统计指标数据。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（appKey)（示例: 5fb6001a73749c24fd9cb356） |
| timeUnit | String | 是 | 时间粒度 hour：返回以小时为粒度的统计数据，只能查一天范围内的 day：返回以天为粒度的统计数据（示例: day） |
| startDate | String | 是 | 起始日期（yyyy-MM-dd格式，和当前日期间隔不能超过90天）（示例: 2023-05-01） |
| endDate | String | 是 | 结束日期（yyyy-MM-dd格式，和起始日期间隔不能超过90天）（示例: 2023-05-03） |
| appVersion | String | 否 | 指定App版本（示例: 1.0.2） |

```bash
umeng-cli call '{"name": "GetNetworkTrend", "api": {"method": "GET", "baseUrl": "https://apm.openapi.umeng.com", "endpoint": "/stat/getNetworkTrend", "authType": "aliyun-aksk", "version": "2022-02-14"}}' '{"dataSourceId": "5fb6001a73749c24fd9cb356", "timeUnit": "day", "startDate": "2023-05-01", "endDate": "2023-05-03"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| success | Boolean | 请求是否成功。（示例: true） |
| code | Long | 请求返回 code，Success 代表请求成功，其他情况代表请求不成功，具体错误原因描述可通过 msg 查看。（示例: 200） |
| msg | String | 请求 code 对应的详细描述信息。（示例: succeed in handling request） |
| data | Array | 返回数据 |

**`data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| timePoint | String | 时间段，小时或者日期，取决于timeUnit参数（示例: 2023-05-20） |
| avgResponseTime | Double | 全部域名平均响应时间，单位ms（示例: 1654.51） |
| avgCost | Double | 全部域名平均总耗时，单位ms（示例: 4402.8） |
| avgTransformBytes | Double | 全部域名平均传输字节数（示例: 3299.43） |
| requestPerMinute | Double | 全部域名平均吞吐量（示例: 1.61） |

---

### GetNativePageTrend — 获取原生页面性能统计数据

获取按天或者按小时粒度的原生页面性能统计指标数据。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（appKey)（示例: 5fb6001a73749c24fd9cb356） |
| timeUnit | String | 是 | 时间粒度 hour：返回以小时为粒度的统计数据，只能查一天范围内的 day：返回以天为粒度的统计数据（示例: day） |
| startDate | String | 是 | 起始日期（yyyy-MM-dd格式，和当前日期间隔不能超过90天）（示例: 2023-05-01） |
| endDate | String | 是 | 结束日期（yyyy-MM-dd格式，和起始日期间隔不能超过90天）（示例: 2023-05-03） |
| appVersion | String | 否 | 指定App版本（示例: 1.0.2） |

```bash
umeng-cli call '{"name": "GetNativePageTrend", "api": {"method": "GET", "baseUrl": "https://apm.openapi.umeng.com", "endpoint": "/stat/getNativePageTrend", "authType": "aliyun-aksk", "version": "2022-02-14"}}' '{"dataSourceId": "5fb6001a73749c24fd9cb356", "timeUnit": "day", "startDate": "2023-05-01", "endDate": "2023-05-03"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| success | Boolean | 请求是否成功。（示例: true） |
| code | Long | 请求返回 code，Success 代表请求成功，其他情况代表请求不成功，具体错误原因描述可通过 msg 查看（示例: 200） |
| msg | String | 请求 code 对应的详细描述信息。（示例: succeed in handling request） |
| data | Array | 返回数据 |

**`data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| timePoint | String | 时间段，小时或者日期，取决于timeUnit参数（示例: 2023-05-20） |
| avgLoadDuration | Double | 页面平均加载时长，单位ms（示例: 75.9） |
| loadCnt | Long | 页面加载样本量（示例: 2460） |
| slowLoadRate | Double | 页面慢加载率（示例: 99.837） |
| crashRate | Double | 页面崩溃率（示例: 37.317） |

---

### GetH5PageTrend — 获取H5页面性能统计数据

获取按天或者按小时粒度的H5页面性能统计指标数据。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（appKey)（示例: 5fb6001a73749c24fd9cb356） |
| timeUnit | String | 是 | 时间粒度 hour：返回以小时为粒度的统计数据，只能查一天范围内的 day：返回以天为粒度的统计数据（示例: day） |
| startDate | String | 是 | 起始日期（yyyy-MM-dd格式，和当前日期间隔不能超过90天）（示例: 2023-05-01） |
| endDate | String | 是 | 结束日期（yyyy-MM-dd格式，和起始日期间隔不能超过90天）（示例: 2023-05-03） |
| appVersion | String | 否 | 指定App版本（示例: 1.0.2） |

```bash
umeng-cli call '{"name": "GetH5PageTrend", "api": {"method": "GET", "baseUrl": "https://apm.openapi.umeng.com", "endpoint": "/stat/getH5PageTrend", "authType": "aliyun-aksk", "version": "2022-02-14"}}' '{"dataSourceId": "5fb6001a73749c24fd9cb356", "timeUnit": "day", "startDate": "2023-05-01", "endDate": "2023-05-03"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| success | Boolean | 请求是否成功。（示例: true） |
| code | Long | 请求返回 code，Success 代表请求成功，其他情况代表请求不成功，具体错误原因描述可通过 msg 查看。（示例: 200） |
| msg | String | 请求 code 对应的详细描述信息。（示例: succeed in handling request） |
| data | Array | 数据结果 |

**`data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| timePoint | String | 时间段，小时或者日期，取决于timeUnit参数（示例: 2023-05-20） |
| logCnt | Long | 样本量（示例: 2062） |
| appCache | Double | 平均检查缓存时间，单位ms（示例: 49.48） |
| dns | Double | 平均DNS查询时间，单位ms（示例: 50.16） |
| tcp | Double | 平均TCP连接时间，单位ms（示例: 150.18） |
| ssl | Double | 平均SSL建连时间，单位ms（示例: 71.02） |
| ttfb | Double | 平均首字节响应时间，单位ms（示例: 249.55） |
| contentTrans | Double | 平均内容传输时间，单位ms（示例: 979.83） |
| analyzeDOM | Double | 平均DOM解析时间，单位ms（示例: 504.89） |
| loadResource | Double | 平均资源加载时间，单位ms（示例: 2549.46） |
| loadEvent | Double | 平均事件加载时间，单位ms（示例: 492.86） |
| loadFinish | Double | 平均页面完全加载时间，单位ms（示例: 4741.44） |
| firstByte | Double | 平均首字节时间，单位ms（示例: 472.57） |
| unload | Double | 平均卸载页面时间，单位ms（示例: 98.26） |
| redirect | Double | 平均重定向时间，单位ms（示例: 100.93） |
| domReady | Double | 平均DOM Ready时间，单位ms（示例: 1881.96） |
| fp | Double | 平均首次绘制时间，单位ms（示例: 50.25） |
| fcp | Double | 平均首次内容绘制时间，单位ms（示例: 190.69） |
| tti | Double | 平均页面可交互时间，单位ms（示例: 2126.61） |
| oneSecondRate | Double | 1秒快开比（示例: 0.19） |
| twoSecondRate | Double | 2秒快开比（示例: 4.9） |
| fiveSecondRate | Double | 5秒慢开比（示例: 44.67） |

---

### GetNetworkMinuteTrend — 获取分钟粒度网络统计数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（appKey)（示例: 5fb6001a73749c24fd9cb356） |
| startTime | String | 是 | 开始时间，精确到分钟粒度，最多返回startTime后10分钟的数据（示例: 2024-09-27 09:07） |

```bash
umeng-cli call '{"name": "GetNetworkMinuteTrend", "api": {"method": "GET", "baseUrl": "https://apm.openapi.umeng.com", "endpoint": "/stat/getNetworkMinuteTrend", "authType": "aliyun-aksk", "version": "2022-02-14"}}' '{"dataSourceId": "5fb6001a73749c24fd9cb356", "startTime": "2024-09-27 09:07"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| success | Boolean | 请求是否成功。（示例: true） |
| code | Long | 状态码（示例: 200） |
| msg | String | 异常描述（示例: succeed in handling request） |
| data | Array | 返回数据 |

**`data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| timePoint | String | 时间段，分钟粒度（示例: 2023-05-20 09:08） |
| errorCount | Long | 错误数（示例: 120） |
| requestCount | Long | 请求数量（示例: 1200） |

---

### GetErrorMinuteStatTrend — 获取分钟粒度稳定性统计数据

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| dataSourceId | String | 是 | 数据源id（appKey)（示例: 5fb6001a73749c24fd9cb356） |
| type | Integer | 是 | 异常类型（0. 全部崩溃 1. java/ios崩溃 2. native崩溃  3.ANR  4.自定义异常 5.卡顿 ）（示例: 1） |
| startTime | String | 是 | 开始时间，精确到分钟粒度，最多返回startTime后10分钟的数据 当天01点前，可支持昨天查询 当天01点后，仅支持当天时间查询（示例: 2024-09-27 09:07） |

```bash
umeng-cli call '{"name": "GetErrorMinuteStatTrend", "api": {"method": "GET", "baseUrl": "https://apm.openapi.umeng.com", "endpoint": "/stat/GetErrorMinuteStatTrend", "authType": "aliyun-aksk", "version": "2022-02-14"}}' '{"dataSourceId": "5fb6001a73749c24fd9cb356", "type": "1", "startTime": "2024-09-27 09:07"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| success | Boolean | 调用是否成功（示例: true） |
| code | Long | 状态码（示例: 200） |
| msg | String | 异常描述（示例: succeed in handling request） |
| data | Array | 返回数据 |

**`data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| timePoint | String | 统计日期（示例: 2023-05-20 13:01） |
| errorCount | Long | 错误数（示例: 120） |
| launchCount | Long | 启动次数（示例: 1200） |

---

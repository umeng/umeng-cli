# AppWin 官网接口

> 鉴权方式：`cookie`（默认）
> BaseUrl：`https://appwin.umeng.com`

## 调用格式

```bash
umeng-cli call '{
  "name": "appwin.<接口名>",
  "api": {
    "method": "POST",
    "baseUrl": "https://appwin.umeng.com",
    "endpoint": "<接口路径>",
    "headers": {"content-type": "application/json", "accept": "application/json"}
  }
}' '<参数JSON>'
```

- `authType` 默认为 `cookie`，可省略
- 所有接口通过登录 Cookie 自动鉴权

---

## 接口路由表

| 接口名 | 说明 | Method | Endpoint |
|--------|------|--------|----------|
| `query_delivery_progress` | 查询投放进展 | POST | `/hsf/fagent/inspection/queryDeliveryProgress` |

---

## 接口详情

### query_delivery_progress — 查询投放进展

查询当前账户的投放进展信息，无需额外参数。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| 无 | — | — | 自动使用当前登录账户 |

**调用示例：**

```bash
umeng-cli call '{
  "name": "appwin.query_delivery_progress",
  "api": {
    "method": "POST",
    "baseUrl": "https://appwin.umeng.com",
    "endpoint": "/hsf/fagent/inspection/queryDeliveryProgress",
    "headers": {"content-type": "application/json", "accept": "application/json"}
  }
}' '{}'
```

也可以通过 Skill 方式直接调用：

```bash
umeng-cli umengcli-inspection query_delivery_progress
```

**返回示例：**

```json
{
  "code": 200,
  "msg": "success",
  "status": true,
  "data": {
    "currentConsumption": "5000.00",
    "totalBudget": "10000",
    "targetAchievementRate": "50.00%",
    "estimatedMinDailyConsumption": "8550",
    "estimatedMaxDailyConsumption": "10450",
    "todayConversionPrice": "25.50",
    "yesterdayConversionPrice": "28.00",
    "updateTime": 1710806400
  }
}
```

**返回字段说明：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `code` | integer | 状态码，200 表示成功 |
| `msg` | string | 返回信息 |
| `status` | boolean | 操作状态 |
| `data.currentConsumption` | string | 当前消耗金额 |
| `data.totalBudget` | string | 总预算 |
| `data.targetAchievementRate` | string | 目标达成率 |
| `data.estimatedMinDailyConsumption` | string | 预估最小日消耗 |
| `data.estimatedMaxDailyConsumption` | string | 预估最大日消耗 |
| `data.todayConversionPrice` | string | 今日转化单价 |
| `data.yesterdayConversionPrice` | string | 昨日转化单价 |
| `data.updateTime` | integer | 更新时间戳（Unix 秒） |

---

## 注意事项

- 金额字段为字符串类型，需转换后计算
- `updateTime` 是 Unix 时间戳（秒）
- 后续官网接口将持续补充到本文档

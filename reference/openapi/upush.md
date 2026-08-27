# U-PUSH 消息推送（阿里云风格 OpenAPI）

通过 `umeng-cli call` 命令调用，使用阿里云 ACS3-HMAC-SHA256 V3 签名鉴权。

## 通用调用方式

```bash
umeng-cli call '{"name":"<接口名>","api":{"method":"GET/POST","baseUrl":"https://push.openapi.umeng.com","endpoint":"/<接口路径>","authType":"aliyun-aksk","version":"2022-02-25"}}' '<参数JSON>'
```

> AK/SK 会在首次调用时自动通过登录凭证获取并加密缓存，无需手动配置。

---

## 接口列表

**消息发送接口：**

- [`SendByDevice`](#sendbydevice) — 指定设备发送
- [`SendByAlias`](#sendbyalias) — 指定别名发送
- [`SendByApp`](#sendbyapp) — 广播
- [`SendByFilter`](#sendbyfilter) — 指定筛选条件发送
- [`SendByAliasFileId`](#sendbyaliasfileid) — 指定别名文件发送
- [`SendByDeviceFileId`](#sendbydevicefileid) — 指定设备文件发送

**消息状态查询接口：**

- [`QueryMsgStat`](#querymsgstat) — 消息状态查询

**消息撤销接口：**

- [`CancelByMsgId`](#cancelbymsgid) — 消息撤销接口

**文件上传接口：**

- [`UploadDevice`](#uploaddevice) — 文件内容上传

---

## 消息发送接口

### SendByDevice — 指定设备发送

对1个或多个（最大500）deviceToken发送消息。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| DeviceTokens | String | 是 | 目标应用的deviceToken，由客户集成友盟消息推送SDK后通过SDK生成。（示例: ArdNyIzFCH2K3szXA8arpu0Y7ywOdA67mCSumtpnMnmf） |
| AndroidPayload | Object | 否 | Android消息载荷 |
| IosPayload | Object | 否 | iOS消息载荷 |
| Policy | Object | 否 | 发送策略 |
| ProductionMode | Boolean | 否 | 区分生产模式和沙盒模式（示例: true） |
| ChannelProperties | Object | 否 | 通道参数 |
| Description | String | 否 | 消息描述（示例: 消息描述） |
| ReceiptUrl | String | 否 | 消息回执地址，开启消息回执的客户使用（示例: https://msg.umeng.com/upush/receipt） |
| ReceiptType | Integer | 否 | 消息回执类型，开启消息回执的客户使用（示例: 1：送达回执；2：点击回执；3：送达和点击/忽略回执。默认为3） |
| ThirdPartyId | String | 否 |  |
| HarmonyPayload | Object | 否 | Harmony消息载荷 |
| callbackParams | String | 否 |  |
| AndroidShortPayload | Object | 否 | 在payload超长，超过厂商限制时，用户可上传短的payload内容，下发到厂商 |

**`AndroidPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| displayType | String | 否 | 消息类型: notification(通知)、message(消息) |
| body | Object | 否 | Android消息体 |
| extra | Map | 否 | 用户自定义key-value,可以配合消息到达后，打开App/URL/Activity使用 |
| message2ThirdChannel | Object | 否 | 自定义转厂商通知栏 |

**`body` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 通知标题 |
| text | String | 否 | 通知文字描述 |
| icon | String | 否 | 状态栏图标ID |
| img | String | 否 | 通知栏大图标的URL链接 |
| expandImage | String | 否 | 消息下方展示大图 |
| sound | String | 否 | 通知声音文件 |
| builderId | Long | 否 | 用于标识该通知采用的样式 |
| badge | Integer | 否 | 角标设置数字(老样式) |
| setBadge | Integer | 否 | 角标设置数字(新样式)，范围为1~99,需配合main_activity使用。 |
| addBadge | Integer | 否 | 角标增加数字，范围为1~99,需配合main_activity使用。 |
| rePop | Integer | 否 | 推送专业版（Pro）高级能力,0：不重弹；1：重弹。默认值是0 |
| playVibrate | Boolean | 否 | 收到通知是否震动 |
| playLights | Boolean | 否 | 收到通知是否闪灯 |
| playSound | Boolean | 否 | 收到通知是否发出声音 |
| afterOpen | String | 否 | 点击通知的后续行为go_app:打开应用,go_url:跳转到URL,go_activity:打开特定的activity,go_custom:用户自定义内容 |
| url | String | 否 | 当after_open=go_url时，必填,通知栏点击后跳转的URL，要求以http或者https开头 |
| activity | String | 否 | 当after_open=go_activity时，必填。通知栏点击后打开的Activity |
| custom | String | 否 | 当display_type=message时,或当display_type=notification且after_open=go_custom时，必填。用户自定义内容，可以为字符串或者JSON格式 |

**`message2ThirdChannel` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 通知标题 |
| text | String | 否 | 通知内容 |
| SetBadge | Long | 否 | 设置角标,范围为1~99 |
| addBadge | Long | 否 | 加减角标,范围为1~99 |
| expandImage | String | 否 | 消息下方展示大图,目前只支持小米 |
| bigBody | String | 否 | 大文本 |
| bigTitle | String | 否 | 大标题 |
| img | String | 否 | 通知栏大图标的URL链接 |
| sound | String | 否 | 自定义声音，仅支持华为通道 |

**`IosPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| aps | Object | 否 | iOS消息体 |
| extra | Map | 否 | 附加参数 |

**`aps` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| alert | Object | 否 | iOS消息内容 |
| badge | String | 否 | 角标数字（示例: +1(自增)，-1(自减)，4(设置数字)） |
| sound | String | 否 | 声音文件 |
| contentAvailable | Integer | 否 | 静默推送 |
| category | String | 否 | 自定义类型 |
| interruptionLevel | String | 否 | 消息的打扰级别，iOS15起支持，四个选项passive, active, time-sensitive, critical |
| threadID | String | 否 | 分组折叠，设置UNNotificationContent的threadIdentifier属性 |

**`alert` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 消息标题 |
| subtitle | String | 否 | subtitle |
| body | String | 否 | 消息体 |

**`Policy` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| startTime | String | 否 | 定时发送时间（示例: yyyy-MM-dd HH:mm:ss） |
| expireTime | String | 否 | 消息过期时间（示例: yyyy-MM-dd HH:mm:ss） |
| speed | Integer | 否 | 设置发送速率单位xx条每秒（示例: 5000） |
| outerBizNo | String | 否 | 防重放标识 |
| channelStrategy | Map | 否 | 通道策略 |

**`ChannelProperties` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| channelActivity | String | 否 | 系统弹窗，只有display_type=notification时有效，表示华为、小米、oppo、vivo、魅族的设备离线时走系统通道下发时打开指定页面acitivity的完整包路径。 |
| useHuaweiPlainMessage | String | 否 | 华为透传消息不加密，端上获取到的是payload的内容。注意，使用该参数友盟的点击打点会失效，需要用户自行进行点击打点（示例: true） |
| xiaomiChannelId | String | 否 | 小米channelId，具体使用及限制请参考小米推送文档 https://dev.mi.com/console/doc/detail?pId=2086 |
| vivoClassification | String | 否 | vivo消息分类：0运营消息，1系统消息，需要到vivo申请，具体使用及限制参考[vivo消息推送分类功能说明]https://dev.vivo.com.cn/documentCenter/doc/359 |
| vivoCategory | String | 否 | vivo消息二级分类参数：友盟侧只进行参数透传，不做合法性校验，具体使用及限制参考[vivo消息推送分类功能说明]https://dev.vivo.com.cn/documentCenter/doc/359 |
| vivoAddBadge | String | 否 | vivo角标功能，需要先去vivo后台申请，不然调用vivo发消息会报错（示例: "true",默认"false"） |
| oppoChannelId | String | 否 | 参考[oppo通知通道适配] https://open.oppomobile.com/wiki/doc#id=10289 |
| mainActivity | String | 否 | 应用入口Activity类全路径,主要用于华为通道角标展示。具体使用可参考[华为角标使用说明]https://developer.umeng.com/docs/67966/detail/272597 |
| huaweiChannelImportance | String | 否 | 华为&荣耀消息分类 LOW：资讯营销类消息，NORMAL：服务与通讯类消息 |
| huaweiChannelCategory | String | 否 | 华为自分类消息类型 [华为消息分类]https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/message-priority-0000001181716924 |
| channelFcm | String | 否 | fcm通道开关，0不使用，1使用 |
| useHuaweiMessage | String | 否 | 自定义消息转为厂商消息，是否支持华为透传（示例: "true" ,默认为"false"，可不填） |
| huaweiMessageUrgency | String | 否 | 华为透传消息投递优先级，设置为HIGH时需要申请权限，参考文档https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides/faq-0000001050042183#section037425218509（示例: 取值为"NORMAL"和"HIGH",默认为”NORMAL”） |
| vivoPushMode | String | 否 | vivo测试模式，1表示测试模式，需要先将regid填到vivo后台，否则发送会报错 |
| oppoCategory | String | 否 | oppo通道类别名 |
| oppoNotifyLevel | String | 否 | oppo 通知栏消息提醒等级取值定义 1-通知栏 2-通知栏+锁屏 16-通知栏+锁屏+横幅+震动+铃声 使用notify_level参数时，category参数必传 |
| harmonyChannelCategory | String | 否 | 鸿蒙消息分类类型 |

**`HarmonyPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| displayType | String | 是 | 消息类型: notification(通知)、message(消息) |
| harmonyBody | Object | 否 | 鸿蒙消息载荷 |
| extra | Map | 否 | 用户自定义key-value |

**`harmonyBody` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 通知标题 |
| text | String | 否 | 通知文字描述 |
| bigBody | String | 否 | 大文本 |
| largeIcon | String | 否 | 通知栏大图标的本地文件 |
| addBadge | Integer | 否 | 角标设置数字 |
| afterOpen | String | 否 | 点击通知的后续行为 |
| uri | String | 否 | 点击跳转后的uri |
| action | String | 否 | 点击跳转后的action |
| custom | String | 否 | 当display_type=message时,或当display_type=notification且after_open=go_custom时，必填。用户自定义内容，可以为字符串或者JSON格式 |
| img | String | 否 | 通知栏大图标的URL链接 |

**`AndroidShortPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| extra | Object | 否 | 用户自定义key-value,主要用于厂商送达点击后获取的参数 |
| body | Object | 否 | 用户自定义body |

**`body` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| custom | String | 否 | 自定义字段内容，通过厂商送达点击后需要获取到的参数 |

```bash
umeng-cli call '{"name": "SendByDevice", "api": {"method": "POST", "baseUrl": "https://push.openapi.umeng.com", "endpoint": "/SendByDevice", "authType": "aliyun-aksk", "version": "2022-02-25"}}' '{"DeviceTokens": "ArdNyIzFCH2K3szXA8arpu0Y7ywOdA67mCSumtpnMnmf"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| RequestId | String | 请求追踪ID，标识唯一请求。（示例: 74808AA4-A044-102F-8F5F-AFE4D97A0F26） |
| Code | String | 请求响应码，标识业务响应类型。（示例: 0） |
| Message | String | 提示信息，对消息发送的异常情况给出更多提示。（示例: 内部错误） |
| Success | Boolean | 消息发送状态。（示例: true） |
| Data | Object | 查询结果。 |
| HttpStatusCode | Integer | http状态码（示例: 200） |

**`Data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| MsgId | String | 消息id，消息发送成功后返回（示例: ula4wbu166876119986400） |

**错误码：**

| 错误码 | 说明 |
|--------|------|
| 6005 | InnerErr |

---

### SendByAlias — 指定别名发送

对1个指定别名类型下，1个或多个（最大500）别名发送消息。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| AliasType | String | 是 | alias的类型, 当type=customizedcast时,必填。（示例: alias_type可由开发者自定义） |
| Alias | String | 是 | 别名，一次仅支持查询一个。（示例: test） |
| AndroidPayload | Object | 否 | Android消息载荷 |
| IosPayload | Object | 否 | iOS消息载荷 |
| Policy | Object | 否 | 发送策略 |
| ProductionMode | Boolean | 否 | 区分生产模式和沙盒模式，true为生产模式，false为沙盒模式（示例: true） |
| ChannelProperties | Object | 否 | 通道参数 |
| Description | String | 否 | 消息描述（示例: 这是一条消息的描述） |
| ReceiptUrl | String | 否 | 消息回执地址，开启消息回执的客户使用（示例: https://msg.umeng.com/upush/receipt） |
| ReceiptType | Integer | 否 | 消息回执类型，开启消息回执的客户使用（示例: 1：送达回执；2：点击回执；3：送达和点击/忽略回执。默认为3） |
| ThirdPartyId | String | 否 |  |
| HarmonyPayload | Object | 否 | Harmony消息载荷 |
| callbackParams | String | 否 |  |
| AndroidShortPayload | Object | 否 | 在payload超长，超过厂商限制时，用户可上传短的payload内容，下发到厂商 |

**`AndroidPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| displayType | String | 否 | 消息类型: notification(通知)、message(消息) |
| body | Object | 否 | Android消息体 |
| extra | Map | 否 | 用户自定义key-value,可以配合消息到达后，打开App/URL/Activity使用 |
| message2ThirdChannel | Object | 否 | 自定义转厂商通知栏 |

**`body` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 通知标题 |
| text | String | 否 | 通知文字描述 |
| icon | String | 否 | 状态栏图标ID |
| img | String | 否 | 通知栏大图标的URL链接 |
| expandImage | String | 否 | 消息下方展示大图 |
| sound | String | 否 | 通知声音文件 |
| builderId | Long | 否 | 用于标识该通知采用的样式 |
| badge | Integer | 否 | 角标设置数字(老样式) |
| setBadge | Integer | 否 | 角标设置数字(新样式)，范围为1~99,需配合main_activity使用。 |
| addBadge | Integer | 否 | 角标增加数字，范围为1~99,需配合main_activity使用。 |
| rePop | Integer | 否 | 推送专业版（Pro）高级能力,0：不重弹；1：重弹。默认值是0 |
| playVibrate | Boolean | 否 | 收到通知是否震动 |
| playLights | Boolean | 否 | 收到通知是否闪灯 |
| playSound | Boolean | 否 | 收到通知是否发出声音 |
| afterOpen | String | 否 | 点击通知的后续行为go_app:打开应用,go_url:跳转到URL,go_activity:打开特定的activity,go_custom:用户自定义内容 |
| url | String | 否 | 当after_open=go_url时，必填,通知栏点击后跳转的URL，要求以http或者https开头 |
| activity | String | 否 | 当after_open=go_activity时，必填。通知栏点击后打开的Activity |
| custom | String | 否 | 当display_type=message时,或当display_type=notification且after_open=go_custom时，必填。用户自定义内容，可以为字符串或者JSON格式 |

**`message2ThirdChannel` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 通知标题 |
| text | String | 否 | 通知内容 |
| SetBadge | Long | 否 | 设置角标,范围为1~99 |
| addBadge | Long | 否 | 加减角标,范围为1~99 |
| expandImage | String | 否 | 消息下方展示大图,目前只支持小米 |
| bigBody | String | 否 | 大文本 |
| bigTitle | String | 否 | 大标题 |
| img | String | 否 | 通知栏大图标的URL链接 |
| sound | String | 否 | 自定义声音，仅支持华为通道 |

**`IosPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| aps | Object | 否 | iOS消息体 |
| extra | Map | 否 | 附加参数 |

**`aps` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| alert | Object | 否 | iOS消息内容 |
| badge | String | 否 | 角标数字（示例: +1(自增)，-1(自减)，4(设置数字)） |
| sound | String | 否 | 声音文件 |
| contentAvailable | Integer | 否 | 静默推送 |
| category | String | 否 | 自定义类型 |
| interruptionLevel | String | 否 | 消息的打扰级别，iOS15起支持，四个选项passive, active, time-sensitive, critical |
| threadID | String | 否 | 分组折叠，设置UNNotificationContent的threadIdentifier属性 |

**`alert` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 消息标题 |
| subtitle | String | 否 | subtitle |
| body | String | 否 | 消息体 |

**`Policy` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| startTime | String | 否 | 定时发送时间（示例: yyyy-MM-dd HH:mm:ss） |
| expireTime | String | 否 | 消息过期时间（示例: yyyy-MM-dd HH:mm:ss） |
| speed | Integer | 否 | 设置发送速率单位xx条每秒（示例: 5000） |
| outerBizNo | String | 否 | 防重放标识 |
| channelStrategy | Map | 否 | 通道策略 |

**`ChannelProperties` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| channelActivity | String | 否 | 系统弹窗，只有display_type=notification时有效，表示华为、小米、oppo、vivo、魅族的设备离线时走系统通道下发时打开指定页面acitivity的完整包路径。 |
| useHuaweiPlainMessage | String | 否 | 华为透传消息不加密，端上获取到的是payload的内容。注意，使用该参数友盟的点击打点会失效，需要用户自行进行点击打点（示例: true） |
| xiaomiChannelId | String | 否 | 小米channelId，具体使用及限制请参考小米推送文档 https://dev.mi.com/console/doc/detail?pId=2086 |
| vivoClassification | String | 否 | vivo消息分类：0运营消息，1系统消息，需要到vivo申请，具体使用及限制参考[vivo消息推送分类功能说明]https://dev.vivo.com.cn/documentCenter/doc/359 |
| vivoCategory | String | 否 | vivo消息二级分类参数：友盟侧只进行参数透传，不做合法性校验，具体使用及限制参考[vivo消息推送分类功能说明]https://dev.vivo.com.cn/documentCenter/doc/359 |
| vivoAddBadge | String | 否 | vivo角标功能，需要先去vivo后台申请，不然调用vivo发消息会报错（示例: "true",默认"false"） |
| oppoChannelId | String | 否 | 参考[oppo通知通道适配] https://open.oppomobile.com/wiki/doc#id=10289 |
| mainActivity | String | 否 | 应用入口Activity类全路径,主要用于华为通道角标展示。具体使用可参考[华为角标使用说明]https://developer.umeng.com/docs/67966/detail/272597 |
| huaweiChannelImportance | String | 否 | 华为&荣耀消息分类 LOW：资讯营销类消息，NORMAL：服务与通讯类消息 |
| huaweiChannelCategory | String | 否 | 华为自分类消息类型 [华为消息分类]https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/message-priority-0000001181716924 |
| channelFcm | String | 否 | fcm通道开关，0不使用，1使用 |
| useHuaweiMessage | String | 否 | 自定义消息转为厂商消息，是否支持华为透传（示例: "true" ,默认为"false"，可不填） |
| huaweiMessageUrgency | String | 否 | 华为透传消息投递优先级，设置为HIGH时需要申请权限，参考文档https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides/faq-0000001050042183#section037425218509（示例: 取值为"NORMAL"和"HIGH",默认为”NORMAL”） |
| vivoPushMode | String | 否 | vivo测试模式，1表示测试模式，需要先将regid填到vivo后台，否则发送会报错 |
| oppoCategory | String | 否 | oppo通道类别名 |
| oppoNotifyLevel | String | 否 | oppo 通知栏消息提醒等级取值定义 1-通知栏 2-通知栏+锁屏 16-通知栏+锁屏+横幅+震动+铃声 使用notify_level参数时，category参数必传 |
| harmonyChannelCategory | String | 否 | 鸿蒙消息分类类型 |

**`HarmonyPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| displayType | String | 是 | 消息类型: notification(通知)、message(消息) |
| harmonyBody | Object | 否 | 鸿蒙消息载荷 |
| extra | Map | 否 | 用户自定义key-value |

**`harmonyBody` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 通知标题 |
| text | String | 否 | 通知文字描述 |
| bigBody | String | 否 | 大文本 |
| largeIcon | String | 否 | 通知栏大图标的本地文件 |
| addBadge | Integer | 否 | 角标设置数字 |
| afterOpen | String | 否 | 点击通知的后续行为 |
| uri | String | 否 | 点击跳转后的uri |
| action | String | 否 | 点击跳转后的action |
| custom | String | 否 | 当display_type=message时,或当display_type=notification且after_open=go_custom时，必填。用户自定义内容，可以为字符串或者JSON格式 |
| img | String | 否 | 通知栏大图标的URL链接 |

**`AndroidShortPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| extra | Object | 否 | 用户自定义key-value,主要用于厂商送达点击后获取的参数 |
| body | Object | 否 | 用户自定义body |

**`body` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| custom | String | 否 | 自定义字段内容，通过厂商送达点击后需要获取到的参数 |

```bash
umeng-cli call '{"name": "SendByAlias", "api": {"method": "POST", "baseUrl": "https://push.openapi.umeng.com", "endpoint": "/SendByAlias", "authType": "aliyun-aksk", "version": "2022-02-25"}}' '{"AliasType": "alias_type可由开发者自定义", "Alias": "test"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| RequestId | String | 请求追踪ID，标识唯一请求。（示例: 86C4236B-D6C2-1E31-8370-2FAEC5CFE012） |
| Code | String | 请求响应码，标识业务响应类型。（示例: 0） |
| Message | String | 提示信息，对消息发送的异常情况给出更多提示。（示例: null） |
| Success | Boolean | 消息发送状态。（示例: true） |
| Data | Object | 返回数据。 |
| HttpStatusCode | Integer | http状态码（示例: 200） |

**`Data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| MsgId | String | 消息id，消息发送成功后返回（示例: uacxo27167041814609201） |

**错误码：**

| 错误码 | 说明 |
|--------|------|
| 6005 | INNERERR |

---

### SendByApp — 广播

对指定应用下的所有设备发送。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| AndroidPayload | Object | 否 | Android消息载荷 |
| IosPayload | Object | 否 | iOS消息载荷 |
| Policy | Object | 否 | 发送策略 |
| ProductionMode | Boolean | 否 | 区分生产模式和沙盒模式，true为生产模式，false为沙盒模式（示例: true） |
| ChannelProperties | Object | 否 | 通道参数 |
| Description | String | 否 | 消息描述（示例: 这是一条消息的描述） |
| ReceiptUrl | String | 否 | 消息回执地址，开启消息回执的客户使用（示例: https://msg.umeng.com/upush/receipt） |
| ReceiptType | Integer | 否 | 消息回执类型，开启消息回执的客户使用（示例: 1：送达回执；2：点击回执；3：送达和点击/忽略回执。默认为3） |
| ThirdPartyId | String | 否 | 自定义三方参数 |
| HarmonyPayload | Object | 否 | Harmony消息载荷 |
| callbackParams | String | 否 |  |
| AndroidShortPayload | Object | 否 | 在payload超长，超过厂商限制时，用户可上传短的payload内容，下发到厂商 |

**`AndroidPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| displayType | String | 否 | 消息类型: notification(通知)、message(消息) |
| body | Object | 否 | Android消息体 |
| extra | Map | 否 | 用户自定义key-value,可以配合消息到达后，打开App/URL/Activity使用 |
| message2ThirdChannel | Object | 否 | 自定义转厂商通知栏 |

**`body` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 通知标题 |
| text | String | 否 | 通知文字描述 |
| icon | String | 否 | 状态栏图标ID |
| img | String | 否 | 通知栏大图标的URL链接 |
| expandImage | String | 否 | 消息下方展示大图 |
| sound | String | 否 | 通知声音文件 |
| builderId | Long | 否 | 用于标识该通知采用的样式 |
| badge | Integer | 否 | 角标设置数字(老样式) |
| setBadge | Integer | 否 | 角标设置数字(新样式)，范围为1~99,需配合main_activity使用。 |
| addBadge | Integer | 否 | 角标增加数字，范围为1~99,需配合main_activity使用。 |
| rePop | Integer | 否 | 推送专业版（Pro）高级能力,0：不重弹；1：重弹。默认值是0 |
| playVibrate | Boolean | 否 | 收到通知是否震动 |
| playLights | Boolean | 否 | 收到通知是否闪灯 |
| playSound | Boolean | 否 | 收到通知是否发出声音 |
| afterOpen | String | 否 | 点击通知的后续行为go_app:打开应用,go_url:跳转到URL,go_activity:打开特定的activity,go_custom:用户自定义内容 |
| url | String | 否 | 当after_open=go_url时，必填,通知栏点击后跳转的URL，要求以http或者https开头 |
| activity | String | 否 | 当after_open=go_activity时，必填。通知栏点击后打开的Activity |
| custom | String | 否 | 当display_type=message时,或当display_type=notification且after_open=go_custom时，必填。用户自定义内容，可以为字符串或者JSON格式 |

**`message2ThirdChannel` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 通知标题 |
| text | String | 否 | 通知内容 |
| SetBadge | Long | 否 | 设置角标,范围为1~99 |
| addBadge | Long | 否 | 加减角标,范围为1~99 |
| expandImage | String | 否 | 消息下方展示大图,目前只支持小米 |
| bigBody | String | 否 | 大文本 |
| bigTitle | String | 否 | 大标题 |
| img | String | 否 | 通知栏大图标的URL链接 |
| sound | String | 否 | 自定义声音，仅支持华为通道 |

**`IosPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| aps | Object | 否 | iOS消息体 |
| extra | Map | 否 | 附加参数 |

**`aps` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| alert | Object | 否 | iOS消息内容 |
| badge | String | 否 | 角标数字（示例: +1(自增)，-1(自减)，4(设置数字)） |
| sound | String | 否 | 声音文件 |
| contentAvailable | Integer | 否 | 静默推送 |
| category | String | 否 | 自定义类型 |
| interruptionLevel | String | 否 | 消息的打扰级别，iOS15起支持，四个选项passive, active, time-sensitive, critical |
| threadID | String | 否 | 分组折叠，设置UNNotificationContent的threadIdentifier属性 |

**`alert` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 消息标题 |
| subtitle | String | 否 | subtitle |
| body | String | 否 | 消息体 |

**`Policy` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| startTime | String | 否 | 定时发送时间（示例: yyyy-MM-dd HH:mm:ss） |
| expireTime | String | 否 | 消息过期时间（示例: yyyy-MM-dd HH:mm:ss） |
| speed | Integer | 否 | 设置发送速率单位xx条每秒（示例: 5000） |
| outerBizNo | String | 否 | 防重放标识 |
| channelStrategy | Map | 否 | 通道策略 |

**`ChannelProperties` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| channelActivity | String | 否 | 系统弹窗，只有display_type=notification时有效，表示华为、小米、oppo、vivo、魅族的设备离线时走系统通道下发时打开指定页面acitivity的完整包路径。 |
| useHuaweiPlainMessage | String | 否 | 华为透传消息不加密，端上获取到的是payload的内容。注意，使用该参数友盟的点击打点会失效，需要用户自行进行点击打点（示例: true） |
| xiaomiChannelId | String | 否 | 小米channelId，具体使用及限制请参考小米推送文档 https://dev.mi.com/console/doc/detail?pId=2086 |
| vivoClassification | String | 否 | vivo消息分类：0运营消息，1系统消息，需要到vivo申请，具体使用及限制参考[vivo消息推送分类功能说明]https://dev.vivo.com.cn/documentCenter/doc/359 |
| vivoCategory | String | 否 | vivo消息二级分类参数：友盟侧只进行参数透传，不做合法性校验，具体使用及限制参考[vivo消息推送分类功能说明]https://dev.vivo.com.cn/documentCenter/doc/359 |
| vivoAddBadge | String | 否 | vivo角标功能，需要先去vivo后台申请，不然调用vivo发消息会报错（示例: "true",默认"false"） |
| oppoChannelId | String | 否 | 参考[oppo通知通道适配] https://open.oppomobile.com/wiki/doc#id=10289 |
| mainActivity | String | 否 | 应用入口Activity类全路径,主要用于华为通道角标展示。具体使用可参考[华为角标使用说明]https://developer.umeng.com/docs/67966/detail/272597 |
| huaweiChannelImportance | String | 否 | 华为&荣耀消息分类 LOW：资讯营销类消息，NORMAL：服务与通讯类消息 |
| huaweiChannelCategory | String | 否 | 华为自分类消息类型 [华为消息分类]https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/message-priority-0000001181716924 |
| channelFcm | String | 否 | fcm通道开关，0不使用，1使用 |
| useHuaweiMessage | String | 否 | 自定义消息转为厂商消息，是否支持华为透传（示例: "true" ,默认为"false"，可不填） |
| huaweiMessageUrgency | String | 否 | 华为透传消息投递优先级，设置为HIGH时需要申请权限，参考文档https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides/faq-0000001050042183#section037425218509（示例: 取值为"NORMAL"和"HIGH",默认为”NORMAL”） |
| vivoPushMode | String | 否 | vivo测试模式，1表示测试模式，需要先将regid填到vivo后台，否则发送会报错 |
| oppoCategory | String | 否 | oppo通道类别名 |
| oppoNotifyLevel | String | 否 | oppo 通知栏消息提醒等级取值定义 1-通知栏 2-通知栏+锁屏 16-通知栏+锁屏+横幅+震动+铃声 使用notify_level参数时，category参数必传 |
| harmonyChannelCategory | String | 否 | 鸿蒙消息分类类型 |

**`HarmonyPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| displayType | String | 是 | 消息类型: notification(通知)、message(消息) |
| harmonyBody | Object | 否 | 鸿蒙消息载荷 |
| extra | Map | 否 | 用户自定义key-value |

**`harmonyBody` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 通知标题 |
| text | String | 否 | 通知文字描述 |
| bigBody | String | 否 | 大文本 |
| largeIcon | String | 否 | 通知栏大图标的本地文件 |
| addBadge | Integer | 否 | 角标设置数字 |
| afterOpen | String | 否 | 点击通知的后续行为 |
| uri | String | 否 | 点击跳转后的uri |
| action | String | 否 | 点击跳转后的action |
| custom | String | 否 | 当display_type=message时,或当display_type=notification且after_open=go_custom时，必填。用户自定义内容，可以为字符串或者JSON格式 |
| img | String | 否 | 通知栏大图标的URL链接 |

**`AndroidShortPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| extra | Object | 否 | 用户自定义key-value,主要用于厂商送达点击后获取的参数 |
| body | Object | 否 | 用户自定义body |

**`body` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| custom | String | 否 | 自定义字段内容，通过厂商送达点击后需要获取到的参数 |

```bash
umeng-cli call '{"name": "SendByApp", "api": {"method": "POST", "baseUrl": "https://push.openapi.umeng.com", "endpoint": "/SendByApp", "authType": "aliyun-aksk", "version": "2022-02-25"}}' '{}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| RequestId | String | 请求追踪ID，标识唯一请求。（示例: 86C4236B-D6C2-1E31-8370-2FAEC5CFE012） |
| Code | String | 请求响应码，标识业务响应类型。（示例: 0） |
| Message | String | 提示信息，对消息发送的异常情况给出更多提示。（示例: success） |
| Success | Boolean | 消息发送状态。（示例: true） |
| Data | Object | 返回数据。 |
| HttpStatusCode | Integer | http状态码（示例: 200） |

**`Data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| MsgId | String | 消息id，消息发送成功后返回（示例: um3zlgb166876370784300） |

**错误码：**

| 错误码 | 说明 |
|--------|------|
| 6005 | InnerErr |

---

### SendByFilter — 指定筛选条件发送

根据自定义筛选条件圈选设备发送，圈选规则https://developer.umeng.com/docs/67966/detail/149296#h1--g-7。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| Filter | String | 是 | 过滤条件，更加详细的过滤条件请参考https://developer.umeng.com/docs/67966/detail/149296#h1--g-7（示例: {"where": {"and": [{"province": "北京"} ] } }） |
| AndroidPayload | Object | 否 | Android消息载荷 |
| IosPayload | Object | 否 | iOS消息载荷 |
| Policy | Object | 否 | 发送策略 |
| ProductionMode | Boolean | 否 | 区分生产模式和沙盒模式，true为生产模式，false为沙盒模式（示例: true） |
| ChannelProperties | Object | 否 | 通道参数 |
| Description | String | 否 | 消息描述（示例: 这是一条消息的描述） |
| ReceiptUrl | String | 否 | 消息回执地址，开启消息回执的客户使用（示例: https://msg.umeng.com/upush/receipt） |
| ReceiptType | Integer | 否 | 消息回执类型，开启消息回执的客户使用（示例: 1：送达回执；2：点击回执；3：送达和点击/忽略回执。默认为3） |
| ThirdPartyId | String | 否 | 自定义三方参数 |
| HarmonyPayload | Object | 否 | Harmony消息载荷 |
| callbackParams | String | 否 |  |
| AndroidShortPayload | Object | 否 | 在payload超长，超过厂商限制时，用户可上传短的payload内容，下发到厂商 |

**`AndroidPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| displayType | String | 否 | 消息类型: notification(通知)、message(消息) |
| body | Object | 否 | Android消息体 |
| extra | Map | 否 | 用户自定义key-value,可以配合消息到达后，打开App/URL/Activity使用 |
| message2ThirdChannel | Object | 否 | 自定义转厂商通知栏 |

**`body` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 通知标题 |
| text | String | 否 | 通知文字描述 |
| icon | String | 否 | 状态栏图标ID |
| img | String | 否 | 通知栏大图标的URL链接 |
| expandImage | String | 否 | 消息下方展示大图 |
| sound | String | 否 | 通知声音文件 |
| builderId | Long | 否 | 用于标识该通知采用的样式 |
| badge | Integer | 否 | 角标设置数字(老样式) |
| setBadge | Integer | 否 | 角标设置数字(新样式)，范围为1~99,需配合main_activity使用。 |
| addBadge | Integer | 否 | 角标增加数字，范围为1~99,需配合main_activity使用。 |
| rePop | Integer | 否 | 推送专业版（Pro）高级能力,0：不重弹；1：重弹。默认值是0 |
| playVibrate | Boolean | 否 | 收到通知是否震动 |
| playLights | Boolean | 否 | 收到通知是否闪灯 |
| playSound | Boolean | 否 | 收到通知是否发出声音 |
| afterOpen | String | 否 | 点击通知的后续行为go_app:打开应用,go_url:跳转到URL,go_activity:打开特定的activity,go_custom:用户自定义内容 |
| url | String | 否 | 当after_open=go_url时，必填,通知栏点击后跳转的URL，要求以http或者https开头 |
| activity | String | 否 | 当after_open=go_activity时，必填。通知栏点击后打开的Activity |
| custom | String | 否 | 当display_type=message时,或当display_type=notification且after_open=go_custom时，必填。用户自定义内容，可以为字符串或者JSON格式 |

**`message2ThirdChannel` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 通知标题 |
| text | String | 否 | 通知内容 |
| SetBadge | Long | 否 | 设置角标,范围为1~99 |
| addBadge | Long | 否 | 加减角标,范围为1~99 |
| expandImage | String | 否 | 消息下方展示大图,目前只支持小米 |
| bigBody | String | 否 | 大文本 |
| bigTitle | String | 否 | 大标题 |
| img | String | 否 | 通知栏大图标的URL链接 |
| sound | String | 否 | 自定义声音，仅支持华为通道 |

**`IosPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| aps | Object | 否 | iOS消息体 |
| extra | Map | 否 | 附加参数 |

**`aps` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| alert | Object | 否 | iOS消息内容 |
| badge | String | 否 | 角标数字（示例: +1(自增)，-1(自减)，4(设置数字)） |
| sound | String | 否 | 声音文件 |
| contentAvailable | Integer | 否 | 静默推送 |
| category | String | 否 | 自定义类型 |
| interruptionLevel | String | 否 | 消息的打扰级别，iOS15起支持，四个选项passive, active, time-sensitive, critical |
| threadID | String | 否 | 分组折叠，设置UNNotificationContent的threadIdentifier属性 |

**`alert` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 消息标题 |
| subtitle | String | 否 | subtitle |
| body | String | 否 | 消息体 |

**`Policy` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| startTime | String | 否 | 定时发送时间（示例: yyyy-MM-dd HH:mm:ss） |
| expireTime | String | 否 | 消息过期时间（示例: yyyy-MM-dd HH:mm:ss） |
| speed | Integer | 否 | 设置发送速率单位xx条每秒（示例: 5000） |
| outerBizNo | String | 否 | 防重放标识 |
| channelStrategy | Map | 否 | 通道策略 |

**`ChannelProperties` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| channelActivity | String | 否 | 系统弹窗，只有display_type=notification时有效，表示华为、小米、oppo、vivo、魅族的设备离线时走系统通道下发时打开指定页面acitivity的完整包路径。 |
| useHuaweiPlainMessage | String | 否 | 华为透传消息不加密，端上获取到的是payload的内容。注意，使用该参数友盟的点击打点会失效，需要用户自行进行点击打点（示例: true） |
| xiaomiChannelId | String | 否 | 小米channelId，具体使用及限制请参考小米推送文档 https://dev.mi.com/console/doc/detail?pId=2086 |
| vivoClassification | String | 否 | vivo消息分类：0运营消息，1系统消息，需要到vivo申请，具体使用及限制参考[vivo消息推送分类功能说明]https://dev.vivo.com.cn/documentCenter/doc/359 |
| vivoCategory | String | 否 | vivo消息二级分类参数：友盟侧只进行参数透传，不做合法性校验，具体使用及限制参考[vivo消息推送分类功能说明]https://dev.vivo.com.cn/documentCenter/doc/359 |
| vivoAddBadge | String | 否 | vivo角标功能，需要先去vivo后台申请，不然调用vivo发消息会报错（示例: "true",默认"false"） |
| oppoChannelId | String | 否 | 参考[oppo通知通道适配] https://open.oppomobile.com/wiki/doc#id=10289 |
| mainActivity | String | 否 | 应用入口Activity类全路径,主要用于华为通道角标展示。具体使用可参考[华为角标使用说明]https://developer.umeng.com/docs/67966/detail/272597 |
| huaweiChannelImportance | String | 否 | 华为&荣耀消息分类 LOW：资讯营销类消息，NORMAL：服务与通讯类消息 |
| huaweiChannelCategory | String | 否 | 华为自分类消息类型 [华为消息分类]https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/message-priority-0000001181716924 |
| channelFcm | String | 否 | fcm通道开关，0不使用，1使用 |
| useHuaweiMessage | String | 否 | 自定义消息转为厂商消息，是否支持华为透传（示例: "true" ,默认为"false"，可不填） |
| huaweiMessageUrgency | String | 否 | 华为透传消息投递优先级，设置为HIGH时需要申请权限，参考文档https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides/faq-0000001050042183#section037425218509（示例: 取值为"NORMAL"和"HIGH",默认为”NORMAL”） |
| vivoPushMode | String | 否 | vivo测试模式，1表示测试模式，需要先将regid填到vivo后台，否则发送会报错 |
| oppoCategory | String | 否 | oppo通道类别名 |
| oppoNotifyLevel | String | 否 | oppo 通知栏消息提醒等级取值定义 1-通知栏 2-通知栏+锁屏 16-通知栏+锁屏+横幅+震动+铃声 使用notify_level参数时，category参数必传 |
| harmonyChannelCategory | String | 否 | 鸿蒙消息分类类型 |

**`HarmonyPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| displayType | String | 是 | 消息类型: notification(通知)、message(消息) |
| harmonyBody | Object | 否 | 鸿蒙消息载荷 |
| extra | Map | 否 | 用户自定义key-value |

**`harmonyBody` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 通知标题 |
| text | String | 否 | 通知文字描述 |
| bigBody | String | 否 | 大文本 |
| largeIcon | String | 否 | 通知栏大图标的本地文件 |
| addBadge | Integer | 否 | 角标设置数字 |
| afterOpen | String | 否 | 点击通知的后续行为 |
| uri | String | 否 | 点击跳转后的uri |
| action | String | 否 | 点击跳转后的action |
| custom | String | 否 | 当display_type=message时,或当display_type=notification且after_open=go_custom时，必填。用户自定义内容，可以为字符串或者JSON格式 |
| img | String | 否 | 通知栏大图标的URL链接 |

**`AndroidShortPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| extra | Object | 否 | 用户自定义key-value,主要用于厂商送达点击后获取的参数 |
| body | Object | 否 | 用户自定义body |

**`body` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| custom | String | 否 | 自定义字段内容，通过厂商送达点击后需要获取到的参数 |

```bash
umeng-cli call '{"name": "SendByFilter", "api": {"method": "POST", "baseUrl": "https://push.openapi.umeng.com", "endpoint": "/SendByFilter", "authType": "aliyun-aksk", "version": "2022-02-25"}}' '{"Filter": "{\"where\": {\"and\": [{\"province\": \"北京\"} ] } }"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| RequestId | String | 请求追踪ID，标识唯一请求。（示例: 86C4236B-D6C2-1E31-8370-2FAEC5CFE012） |
| Code | String | 请求响应码，标识业务响应类型。（示例: 0） |
| Message | String | 提示信息，对消息发送的异常情况给出更多提示。（示例: null） |
| Success | Boolean | 消息发送状态。（示例: true） |
| Data | Object | 返回数据。 |
| HttpStatusCode | Integer | http状态码（示例: 200） |

**`Data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| MsgId | String | 消息id，消息发送成功后返回（示例: usouag1167056659161101） |

**错误码：**

| 错误码 | 说明 |
|--------|------|
| 6005 | INNERERR |

---

### SendByAliasFileId — 指定别名文件发送

对1个指定别名类型下，1个或多个文件目标发送，文件通过文件内容上传（UploadDevice）接口生成，文件内容是每行1个别名（alias）。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| FileId | String | 是 | 通过文件上传接口获得的file_id（示例: PF835431668603208261） |
| AliasType | String | 否 | alias的类型, 当type=customizedcast时,必填。（示例: alias_type可由开发者自定义） |
| AndroidPayload | Object | 否 | Android消息载荷 |
| IosPayload | Object | 否 | iOS消息载荷 |
| Policy | Object | 否 | 发送策略 |
| ProductionMode | Boolean | 否 | 区分生产模式和沙盒模式，true为生产模式，false为沙盒模式（示例: true） |
| ChannelProperties | Object | 否 | 通道参数 |
| Description | String | 否 | 消息描述（示例: 这是一条消息的描述） |
| ReceiptUrl | String | 否 | 消息回执地址，开启消息回执的客户使用（示例: https://msg.umeng.com/upush/receipt） |
| ReceiptType | Integer | 否 | 消息回执类型，开启消息回执的客户使用（示例: 1：送达回执；2：点击回执；3：送达和点击/忽略回执。默认为3） |
| ThirdPartyId | String | 否 | 自定义三方参数 |
| HarmonyPayload | Object | 否 | Harmony消息载荷 |
| callbackParams | String | 否 |  |
| AndroidShortPayload | Object | 否 | 在payload超长，超过厂商限制时，用户可上传短的payload内容，下发到厂商 |

**`AndroidPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| displayType | String | 否 | 消息类型: notification(通知)、message(消息) |
| body | Object | 否 | Android消息体 |
| extra | Map | 否 | 用户自定义key-value,可以配合消息到达后，打开App/URL/Activity使用 |
| message2ThirdChannel | Object | 否 | 自定义转厂商通知栏 |

**`body` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 通知标题 |
| text | String | 否 | 通知文字描述 |
| icon | String | 否 | 状态栏图标ID |
| img | String | 否 | 通知栏大图标的URL链接 |
| expandImage | String | 否 | 消息下方展示大图 |
| sound | String | 否 | 通知声音文件 |
| builderId | Long | 否 | 用于标识该通知采用的样式 |
| badge | Integer | 否 | 角标设置数字(老样式) |
| setBadge | Integer | 否 | 角标设置数字(新样式)，范围为1~99,需配合main_activity使用。 |
| addBadge | Integer | 否 | 角标增加数字，范围为1~99,需配合main_activity使用。 |
| rePop | Integer | 否 | 推送专业版（Pro）高级能力,0：不重弹；1：重弹。默认值是0 |
| playVibrate | Boolean | 否 | 收到通知是否震动 |
| playLights | Boolean | 否 | 收到通知是否闪灯 |
| playSound | Boolean | 否 | 收到通知是否发出声音 |
| afterOpen | String | 否 | 点击通知的后续行为go_app:打开应用,go_url:跳转到URL,go_activity:打开特定的activity,go_custom:用户自定义内容 |
| url | String | 否 | 当after_open=go_url时，必填,通知栏点击后跳转的URL，要求以http或者https开头 |
| activity | String | 否 | 当after_open=go_activity时，必填。通知栏点击后打开的Activity |
| custom | String | 否 | 当display_type=message时,或当display_type=notification且after_open=go_custom时，必填。用户自定义内容，可以为字符串或者JSON格式 |

**`message2ThirdChannel` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 通知标题 |
| text | String | 否 | 通知内容 |
| SetBadge | Long | 否 | 设置角标,范围为1~99 |
| addBadge | Long | 否 | 加减角标,范围为1~99 |
| expandImage | String | 否 | 消息下方展示大图,目前只支持小米 |
| bigBody | String | 否 | 大文本 |
| bigTitle | String | 否 | 大标题 |
| img | String | 否 | 通知栏大图标的URL链接 |
| sound | String | 否 | 自定义声音，仅支持华为通道 |

**`IosPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| aps | Object | 否 | iOS消息体 |
| extra | Map | 否 | 附加参数 |

**`aps` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| alert | Object | 否 | iOS消息内容 |
| badge | String | 否 | 角标数字（示例: +1(自增)，-1(自减)，4(设置数字)） |
| sound | String | 否 | 声音文件 |
| contentAvailable | Integer | 否 | 静默推送 |
| category | String | 否 | 自定义类型 |
| interruptionLevel | String | 否 | 消息的打扰级别，iOS15起支持，四个选项passive, active, time-sensitive, critical |
| threadID | String | 否 | 分组折叠，设置UNNotificationContent的threadIdentifier属性 |

**`alert` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 消息标题 |
| subtitle | String | 否 | subtitle |
| body | String | 否 | 消息体 |

**`Policy` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| startTime | String | 否 | 定时发送时间（示例: yyyy-MM-dd HH:mm:ss） |
| expireTime | String | 否 | 消息过期时间（示例: yyyy-MM-dd HH:mm:ss） |
| speed | Integer | 否 | 设置发送速率单位xx条每秒（示例: 5000） |
| outerBizNo | String | 否 | 防重放标识 |
| channelStrategy | Map | 否 | 通道策略 |

**`ChannelProperties` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| channelActivity | String | 否 | 系统弹窗，只有display_type=notification时有效，表示华为、小米、oppo、vivo、魅族的设备离线时走系统通道下发时打开指定页面acitivity的完整包路径。 |
| useHuaweiPlainMessage | String | 否 | 华为透传消息不加密，端上获取到的是payload的内容。注意，使用该参数友盟的点击打点会失效，需要用户自行进行点击打点（示例: true） |
| xiaomiChannelId | String | 否 | 小米channelId，具体使用及限制请参考小米推送文档 https://dev.mi.com/console/doc/detail?pId=2086 |
| vivoClassification | String | 否 | vivo消息分类：0运营消息，1系统消息，需要到vivo申请，具体使用及限制参考[vivo消息推送分类功能说明]https://dev.vivo.com.cn/documentCenter/doc/359 |
| vivoCategory | String | 否 | vivo消息二级分类参数：友盟侧只进行参数透传，不做合法性校验，具体使用及限制参考[vivo消息推送分类功能说明]https://dev.vivo.com.cn/documentCenter/doc/359 |
| vivoAddBadge | String | 否 | vivo角标功能，需要先去vivo后台申请，不然调用vivo发消息会报错（示例: "true",默认"false"） |
| oppoChannelId | String | 否 | 参考[oppo通知通道适配] https://open.oppomobile.com/wiki/doc#id=10289 |
| mainActivity | String | 否 | 应用入口Activity类全路径,主要用于华为通道角标展示。具体使用可参考[华为角标使用说明]https://developer.umeng.com/docs/67966/detail/272597 |
| huaweiChannelImportance | String | 否 | 华为&荣耀消息分类 LOW：资讯营销类消息，NORMAL：服务与通讯类消息 |
| huaweiChannelCategory | String | 否 | 华为自分类消息类型 [华为消息分类]https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/message-priority-0000001181716924 |
| channelFcm | String | 否 | fcm通道开关，0不使用，1使用 |
| useHuaweiMessage | String | 否 | 自定义消息转为厂商消息，是否支持华为透传（示例: "true" ,默认为"false"，可不填） |
| huaweiMessageUrgency | String | 否 | 华为透传消息投递优先级，设置为HIGH时需要申请权限，参考文档https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides/faq-0000001050042183#section037425218509（示例: 取值为"NORMAL"和"HIGH",默认为”NORMAL”） |
| vivoPushMode | String | 否 | vivo测试模式，1表示测试模式，需要先将regid填到vivo后台，否则发送会报错 |
| oppoCategory | String | 否 | oppo通道类别名 |
| oppoNotifyLevel | String | 否 | oppo 通知栏消息提醒等级取值定义 1-通知栏 2-通知栏+锁屏 16-通知栏+锁屏+横幅+震动+铃声 使用notify_level参数时，category参数必传 |
| harmonyChannelCategory | String | 否 | 鸿蒙消息分类类型 |

**`HarmonyPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| displayType | String | 是 | 消息类型: notification(通知)、message(消息) |
| harmonyBody | Object | 否 | 鸿蒙消息载荷 |
| extra | Map | 否 | 用户自定义key-value |

**`harmonyBody` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 通知标题 |
| text | String | 否 | 通知文字描述 |
| bigBody | String | 否 | 大文本 |
| largeIcon | String | 否 | 通知栏大图标的本地文件 |
| addBadge | Integer | 否 | 角标设置数字 |
| afterOpen | String | 否 | 点击通知的后续行为 |
| uri | String | 否 | 点击跳转后的uri |
| action | String | 否 | 点击跳转后的action |
| custom | String | 否 | 当display_type=message时,或当display_type=notification且after_open=go_custom时，必填。用户自定义内容，可以为字符串或者JSON格式 |
| img | String | 否 | 通知栏大图标的URL链接 |

**`AndroidShortPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| extra | Object | 否 | 用户自定义key-value,主要用于厂商送达点击后获取的参数 |
| body | Object | 否 | 用户自定义body |

**`body` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| custom | String | 否 | 自定义字段内容，通过厂商送达点击后需要获取到的参数 |

```bash
umeng-cli call '{"name": "SendByAliasFileId", "api": {"method": "POST", "baseUrl": "https://push.openapi.umeng.com", "endpoint": "/SendByAliasFileId", "authType": "aliyun-aksk", "version": "2022-02-25"}}' '{"FileId": "PF835431668603208261"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| RequestId | String | 请求追踪ID，标识唯一请求。（示例: 86C4236B-D6C2-1E31-8370-2FAEC5CFE012） |
| Code | String | 请求响应码，标识业务响应类型。（示例: 0） |
| Message | String | 提示信息，对消息发送的异常情况给出更多提示。（示例: null） |
| Success | Boolean | 消息发送状态。（示例: true） |
| Data | Object | 返回数据。 |
| HttpStatusCode | Integer | http状态码。（示例: 200） |

**`Data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| MsgId | String | 消息id，消息发送成功后返回（示例: ucj0242167047014687101） |

**错误码：**

| 错误码 | 说明 |
|--------|------|
| 6005 | INNERERR |

---

### SendByDeviceFileId — 指定设备文件发送

对1个或多个文件目标发送，文件通过文件内容上传（UploadDevice）接口生成，文件内容是每行1个设备标识（deviceToken）。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| FileId | String | 是 | 通过文件上传接口获得的file_id（示例: PF835431668603208261） |
| AndroidPayload | Object | 否 | Android消息载荷 |
| IosPayload | Object | 否 | iOS消息载荷 |
| Policy | Object | 否 | 发送策略 |
| ProductionMode | Boolean | 否 | 区分生产模式和沙盒模式，true为生产模式，false为沙盒模式（示例: true） |
| ChannelProperties | Object | 否 | 通道参数 |
| Description | String | 否 | 消息描述（示例: 这是一条消息的描述） |
| ReceiptUrl | String | 否 | 消息回执地址，开启消息回执的客户使用（示例: https://msg.umeng.com/upush/receipt） |
| ReceiptType | Integer | 否 | 消息回执类型，开启消息回执的客户使用（示例: 1：送达回执；2：点击回执；3：送达和点击/忽略回执。默认为3） |
| ThirdPartyId | String | 否 | 自定义三方参数 |
| HarmonyPayload | Object | 否 | Harmony消息载荷 |
| callbackParams | String | 否 |  |
| AndroidShortPayload | Object | 否 | 在payload超长，超过厂商限制时，用户可上传短的payload内容，下发到厂商 |

**`AndroidPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| displayType | String | 否 | 消息类型: notification(通知)、message(消息) |
| body | Object | 否 | Android消息体 |
| extra | Map | 否 | 用户自定义key-value,可以配合消息到达后，打开App/URL/Activity使用 |
| message2ThirdChannel | Object | 否 | 自定义转厂商通知栏 |

**`body` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 通知标题 |
| text | String | 否 | 通知文字描述 |
| icon | String | 否 | 状态栏图标ID |
| img | String | 否 | 通知栏大图标的URL链接 |
| expandImage | String | 否 | 消息下方展示大图 |
| sound | String | 否 | 通知声音文件 |
| builderId | Long | 否 | 用于标识该通知采用的样式 |
| badge | Integer | 否 | 角标设置数字(老样式) |
| setBadge | Integer | 否 | 角标设置数字(新样式)，范围为1~99,需配合main_activity使用。 |
| addBadge | Integer | 否 | 角标增加数字，范围为1~99,需配合main_activity使用。 |
| rePop | Integer | 否 | 推送专业版（Pro）高级能力,0：不重弹；1：重弹。默认值是0 |
| playVibrate | Boolean | 否 | 收到通知是否震动 |
| playLights | Boolean | 否 | 收到通知是否闪灯 |
| playSound | Boolean | 否 | 收到通知是否发出声音 |
| afterOpen | String | 否 | 点击通知的后续行为go_app:打开应用,go_url:跳转到URL,go_activity:打开特定的activity,go_custom:用户自定义内容 |
| url | String | 否 | 当after_open=go_url时，必填,通知栏点击后跳转的URL，要求以http或者https开头 |
| activity | String | 否 | 当after_open=go_activity时，必填。通知栏点击后打开的Activity |
| custom | String | 否 | 当display_type=message时,或当display_type=notification且after_open=go_custom时，必填。用户自定义内容，可以为字符串或者JSON格式 |

**`message2ThirdChannel` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 通知标题 |
| text | String | 否 | 通知内容 |
| SetBadge | Long | 否 | 设置角标,范围为1~99 |
| addBadge | Long | 否 | 加减角标,范围为1~99 |
| expandImage | String | 否 | 消息下方展示大图,目前只支持小米 |
| bigBody | String | 否 | 大文本 |
| bigTitle | String | 否 | 大标题 |
| img | String | 否 | 通知栏大图标的URL链接 |
| sound | String | 否 | 自定义声音，仅支持华为通道 |

**`IosPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| aps | Object | 否 | iOS消息体 |
| extra | Map | 否 | 附加参数 |

**`aps` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| alert | Object | 否 | iOS消息内容 |
| badge | String | 否 | 角标数字（示例: +1(自增)，-1(自减)，4(设置数字)） |
| sound | String | 否 | 声音文件 |
| contentAvailable | Integer | 否 | 静默推送 |
| category | String | 否 | 自定义类型 |
| interruptionLevel | String | 否 | 消息的打扰级别，iOS15起支持，四个选项passive, active, time-sensitive, critical |
| threadID | String | 否 | 分组折叠，设置UNNotificationContent的threadIdentifier属性 |

**`alert` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 消息标题 |
| subtitle | String | 否 | subtitle |
| body | String | 否 | 消息体 |

**`Policy` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| startTime | String | 否 | 定时发送时间（示例: yyyy-MM-dd HH:mm:ss） |
| expireTime | String | 否 | 消息过期时间（示例: yyyy-MM-dd HH:mm:ss） |
| speed | Integer | 否 | 设置发送速率单位xx条每秒（示例: 5000） |
| outerBizNo | String | 否 | 防重放标识 |
| channelStrategy | Map | 否 | 通道策略 |

**`ChannelProperties` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| channelActivity | String | 否 | 系统弹窗，只有display_type=notification时有效，表示华为、小米、oppo、vivo、魅族的设备离线时走系统通道下发时打开指定页面acitivity的完整包路径。 |
| useHuaweiPlainMessage | String | 否 | 华为透传消息不加密，端上获取到的是payload的内容。注意，使用该参数友盟的点击打点会失效，需要用户自行进行点击打点（示例: true） |
| xiaomiChannelId | String | 否 | 小米channelId，具体使用及限制请参考小米推送文档 https://dev.mi.com/console/doc/detail?pId=2086 |
| vivoClassification | String | 否 | vivo消息分类：0运营消息，1系统消息，需要到vivo申请，具体使用及限制参考[vivo消息推送分类功能说明]https://dev.vivo.com.cn/documentCenter/doc/359 |
| vivoCategory | String | 否 | vivo消息二级分类参数：友盟侧只进行参数透传，不做合法性校验，具体使用及限制参考[vivo消息推送分类功能说明]https://dev.vivo.com.cn/documentCenter/doc/359 |
| vivoAddBadge | String | 否 | vivo角标功能，需要先去vivo后台申请，不然调用vivo发消息会报错（示例: "true",默认"false"） |
| oppoChannelId | String | 否 | 参考[oppo通知通道适配] https://open.oppomobile.com/wiki/doc#id=10289 |
| mainActivity | String | 否 | 应用入口Activity类全路径,主要用于华为通道角标展示。具体使用可参考[华为角标使用说明]https://developer.umeng.com/docs/67966/detail/272597 |
| huaweiChannelImportance | String | 否 | 华为&荣耀消息分类 LOW：资讯营销类消息，NORMAL：服务与通讯类消息 |
| huaweiChannelCategory | String | 否 | 华为自分类消息类型 [华为消息分类]https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/message-priority-0000001181716924 |
| channelFcm | String | 否 | fcm通道开关，0不使用，1使用 |
| useHuaweiMessage | String | 否 | 自定义消息转为厂商消息，是否支持华为透传（示例: "true" ,默认为"false"，可不填） |
| huaweiMessageUrgency | String | 否 | 华为透传消息投递优先级，设置为HIGH时需要申请权限，参考文档https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides/faq-0000001050042183#section037425218509（示例: 取值为"NORMAL"和"HIGH",默认为”NORMAL”） |
| vivoPushMode | String | 否 | vivo测试模式，1表示测试模式，需要先将regid填到vivo后台，否则发送会报错 |
| oppoCategory | String | 否 | oppo通道类别名 |
| oppoNotifyLevel | String | 否 | oppo 通知栏消息提醒等级取值定义 1-通知栏 2-通知栏+锁屏 16-通知栏+锁屏+横幅+震动+铃声 使用notify_level参数时，category参数必传 |
| harmonyChannelCategory | String | 否 | 鸿蒙消息分类类型 |

**`HarmonyPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| displayType | String | 是 | 消息类型: notification(通知)、message(消息) |
| harmonyBody | Object | 否 | 鸿蒙消息载荷 |
| extra | Map | 否 | 用户自定义key-value |

**`harmonyBody` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | String | 否 | 通知标题 |
| text | String | 否 | 通知文字描述 |
| bigBody | String | 否 | 大文本 |
| largeIcon | String | 否 | 通知栏大图标的本地文件 |
| addBadge | Integer | 否 | 角标设置数字 |
| afterOpen | String | 否 | 点击通知的后续行为 |
| uri | String | 否 | 点击跳转后的uri |
| action | String | 否 | 点击跳转后的action |
| custom | String | 否 | 当display_type=message时,或当display_type=notification且after_open=go_custom时，必填。用户自定义内容，可以为字符串或者JSON格式 |
| img | String | 否 | 通知栏大图标的URL链接 |

**`AndroidShortPayload` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| extra | Object | 否 | 用户自定义key-value,主要用于厂商送达点击后获取的参数 |
| body | Object | 否 | 用户自定义body |

**`body` 子参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| custom | String | 否 | 自定义字段内容，通过厂商送达点击后需要获取到的参数 |

```bash
umeng-cli call '{"name": "SendByDeviceFileId", "api": {"method": "POST", "baseUrl": "https://push.openapi.umeng.com", "endpoint": "/SendByDeviceFileId", "authType": "aliyun-aksk", "version": "2022-02-25"}}' '{"FileId": "PF835431668603208261"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| RequestId | String | 请求追踪ID，标识唯一请求。（示例: 86C4236B-D6C2-1E31-8370-2FAEC5CFE012） |
| Code | String | 状态码。（示例: 0） |
| Message | String | 提示信息，对消息发送的异常情况给出更多提示。（示例: null） |
| Success | Boolean | 请求是否成功。（示例: true） |
| Data | Object | 返回的数据内容。 |
| HttpStatusCode | Integer | http状态码。（示例: 200） |

**`Data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| MsgId | String | 发送成功的消息id。（示例: ufe29y2167046828041801） |

**错误码：**

| 错误码 | 说明 |
|--------|------|
| 6005 | INNERERR |

---

## 消息状态查询接口

### QueryMsgStat — 消息状态查询

消息状态查询。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| MsgId | String | 是 | 消息发送时, 从返回消息中获取的task_id。仅针对任务类消息(type为broadcast、groupcast、filecast、customizedcast且file_id不为空)。（示例: ufe29y2167046828041801） |

```bash
umeng-cli call '{"name": "QueryMsgStat", "api": {"method": "POST", "baseUrl": "https://push.openapi.umeng.com", "endpoint": "/QueryMsgStat", "authType": "aliyun-aksk", "version": "2022-02-25"}}' '{"MsgId": "ufe29y2167046828041801"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| RequestId | String | 请求追踪ID，标识唯一请求。（示例: 86C4236B-D6C2-1E31-8370-2FAEC5CFE012） |
| Code | String | 请求响应码，标识业务响应类型。（示例: 0） |
| Message | String | 提示信息，对消息发送的异常情况给出更多提示。（示例: null） |
| Success | Boolean | 消息发送状态。（示例: true） |
| Data | Object | 返回数据。 |
| HttpStatusCode | Integer | http状态码（示例: 200） |

**`Data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| MsgId | String | 请求时的msgID（示例: ufe29y2167046828041801） |
| Status | Integer | 消息状态: 0-排队中, 1-发送中，2-发送完成，3-发送失败，4-消息被撤销，5-消息过期, 6-筛选结果为空，7-定时任务尚未开始处理（示例: 2） |
| Sent | Long | 消息发送数（示例: 1） |
| Accept | Long | 消息受理数，仅限于安卓应用,iOS应用为0（示例: 1） |
| Arrive | Long | 消息送达数，仅限于安卓应用和开通送达功能的iOS应用，其他应用为0。（示例: 1） |
| Open | Long | 消息点击数。（示例: 1） |
| Dismiss | Long | 消息忽略数。（示例: 0） |
| ClosePush | Long | 关闭通知数（示例: 0） |

**错误码：**

| 错误码 | 说明 |
|--------|------|
| 6005 | INNERERR |

---

## 消息撤销接口

### CancelByMsgId — 消息撤销接口

撤销任务类消息。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| MsgId | String | 是 | 消息发送时, 从返回消息中获取的task_id。仅针对任务类消息(type为broadcast、groupcast、filecast、customizedcast且file_id不为空)。（示例: ucj0242167047014687101） |

```bash
umeng-cli call '{"name": "CancelByMsgId", "api": {"method": "POST", "baseUrl": "https://push.openapi.umeng.com", "endpoint": "/CancelByMsgId", "authType": "aliyun-aksk", "version": "2022-02-25"}}' '{"MsgId": "ucj0242167047014687101"}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| RequestId | String | 请求追踪ID，标识唯一请求。（示例: 86C4236B-D6C2-1E31-8370-2FAEC5CFE012） |
| Code | String | 请求响应码，标识业务响应类型。（示例: 0） |
| Message | String | 提示信息，对消息发送的异常情况给出更多提示。（示例: null） |
| Success | Boolean | 消息发送状态。（示例: true） |
| Data | Object | 返回数据。 |
| HttpStatusCode | Integer | http状态码（示例: 200） |

**`Data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| MsgId | String | 若删除成功，则会返回请求时的msgID（示例: ucj0242167047014687101） |

**错误码：**

| 错误码 | 说明 |
|--------|------|
| 6005 | INNERERR |

---

## 文件上传接口

### UploadDevice — 文件内容上传

上传一批设备（或别名）生成临时文件，后续可以复用该文件执行发送，文件默认大小<10MB，有效期3个月。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| DeviceTokens | String | 是 | 目标应用的deviceToken或者Alias，多个已\n分隔，一次请求的设备id必需全是deviceToken或全是Alias不能混用。（示例: device_token_1\ndevice_token_2\ndevice_token_3\n...
alias1\nalias2\nalias3\n...） |

```bash
umeng-cli call '{"name": "UploadDevice", "api": {"method": "POST", "baseUrl": "https://push.openapi.umeng.com", "endpoint": "/UploadDevice", "authType": "aliyun-aksk", "version": "2022-02-25"}}' '{"DeviceTokens": "device_token_1\\ndevice_token_2\\ndevice_token_3\\n...\nalias1\\nalias2\\nalias3\\n..."}'
```

**返回字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| RequestId | String | 请求追踪ID，标识唯一请求。（示例: 86C4236B-D6C2-1E31-8370-2FAEC5CFE012） |
| Code | String | 请求响应码，标识业务响应类型。（示例: 0） |
| Message | String | 提示信息，对消息发送的异常情况给出更多提示。（示例: null） |
| Success | Boolean | 消息发送状态。（示例: true） |
| Data | Object | 返回数据。 |
| HttpStatusCode | Integer | HTTP状态码。（示例: 200） |

**`Data` 子字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| FileId | String | 文件表示符，后续用于调用指定文件发送接口。（示例: PF835431668603208261） |

**错误码：**

| 错误码 | 说明 |
|--------|------|
| 6005 | INNERERR |

---

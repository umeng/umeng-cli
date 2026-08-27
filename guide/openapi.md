# OpenAPI 开通

当 `umeng-cli call` 返回未开通 OpenAPI 错误时，需要先开通 OpenAPI 服务。

## 开通命令

```bash
umeng-cli openapi enable
```

开通成功后会自动获取并缓存 AK/SK，后续调用 OpenAPI 时无需额外配置。

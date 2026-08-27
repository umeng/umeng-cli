# 调用统计

上报 Skill 调用的 trace 数据，用于统计分析。

## 基本用法

```bash
# 上报 trace（默认简洁输出）
umeng-cli trace '{"skill_name":"your-skill-name"}'

# 打印完整的请求和响应详情
umeng-cli trace -v '{"skill_name":"your-skill-name"}'
```

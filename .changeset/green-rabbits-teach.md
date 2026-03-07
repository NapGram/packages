---
"@napgram/qq-client": patch
"@napgram/infra-kit": patch
---

feat: support standalone NapCat websocket token configuration

- add `NAPCAT_WS_TOKEN` env parsing in infra-kit
- add optional `token` to NapCat QQ client create params
- pass token into NapLink connection config

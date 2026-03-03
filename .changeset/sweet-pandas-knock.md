---
'@napgram/telegram-client': patch
'@napgram/feature-kit': patch
'@napgram/gateway-kit': patch
'@napgram/message-kit': patch
---

Upgrade mtcute dependencies to `^0.28.1` across Telegram-related packages to eliminate mixed `0.27.x`/`0.28.x` type trees.

Also improve Telegram proxy configuration support (`PROXY_URL` / `PROXY_TYPE`) in `@napgram/telegram-client` to align with runtime usage.

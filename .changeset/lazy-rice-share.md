---
'@napgram/feature-kit': patch
'@napgram/gateway-kit': patch
'@napgram/plugin-kit': patch
---

Fix Telegram forum topic routing across forwarding, plugin message sends, and gateway sends by using `replyTo` topic IDs that `@mtcute/core` actually supports instead of ignored `messageThreadId`-style parameters.

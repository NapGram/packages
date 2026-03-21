---
'@napgram/feature-kit': patch
---

Fix QQ to Telegram topic forwarding by keeping `tgThreadId` in `messageThreadId` instead of incorrectly sending it as `replyTo`.

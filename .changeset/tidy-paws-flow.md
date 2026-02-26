---
"@napgram/feature-kit": patch
---

Improve QQ->Telegram forwarding stability after network/proxy interruptions.

- Add serialized Telegram send queue for QQ->TG forwarding.
- Add minimum send interval to smooth burst traffic.
- Handle `FLOOD_WAIT` with buffered wait-and-retry.
- Align thread ID assertions/types in related command and reply resolver tests.

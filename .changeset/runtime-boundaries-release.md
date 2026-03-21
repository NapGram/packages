---
"@napgram/env-kit": minor
"@napgram/logger-kit": minor
"@napgram/db-kit": minor
"@napgram/infra-kit": minor
"@napgram/plugin-kit": minor
"@napgram/runtime-kit": minor
"@napgram/core": minor
"@napgram/utils": minor
"@napgram/sdk": minor
"@napgram/telegram-client": minor
"@napgram/feature-kit": minor
"@napgram/message-kit": minor
"@napgram/gateway-kit": minor
"@napgram/request-kit": minor
"@napgram/web-interfaces": minor
"@napgram/database": patch
"@napgram/qq-client": patch
"@napgram/auth-kit": patch
"@napgram/media-kit": patch
"@napgram/marketplace-kit": patch
"@napgram/plugin-adapter-qq-napcat": patch
"@napgram/plugin-adapter-telegram-mtcute": patch
"@napgram/plugin-permission-management": patch
"@napgram/plugin-admin-auth": patch
"@napgram/plugin-admin-database": patch
"@napgram/plugin-admin-instances": patch
"@napgram/plugin-admin-logs": patch
"@napgram/plugin-admin-messages": patch
"@napgram/plugin-admin-pairs": patch
"@napgram/plugin-admin-plugins": patch
"@napgram/plugin-admin-settings": patch
"@napgram/plugin-admin-suite": patch
"@napgram/plugin-commands": patch
"@napgram/plugin-flags": patch
"@napgram/plugin-forward": patch
"@napgram/plugin-gateway": patch
"@napgram/plugin-group-management": patch
"@napgram/plugin-media": patch
"@napgram/plugin-mode-filter": patch
"@napgram/plugin-monitoring": patch
"@napgram/plugin-notifications": patch
"@napgram/plugin-ping-pong": patch
"@napgram/plugin-qq-interaction": patch
"@napgram/plugin-recall": patch
"@napgram/plugin-refresh": patch
"@napgram/plugin-request-handler": patch
"@napgram/plugin-request-management": patch
"@napgram/plugin-statistics": patch
"@napgram/plugin-web-assets": patch
"@napgram/plugin-web-console": patch
---

Refactor runtime boundaries across NapGram packages.

- add `@napgram/env-kit`, `@napgram/logger-kit`, and `@napgram/db-kit`
- turn `@napgram/infra-kit` into a compatibility facade over smaller kits
- extend plugin instance metadata and migrate request automation to `RequestActionGateway`
- fix runtime dependency declarations for official plugins and unify publish boundaries on `dist/`
- align `@mtcute/*` versions used by Telegram-facing packages to `^0.29.1`

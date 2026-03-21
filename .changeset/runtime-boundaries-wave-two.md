---
"@napgram/runtime-kit": minor
"@napgram/plugin-kit": minor
"@napgram/request-kit": minor
"@napgram/feature-kit": patch
"@napgram/message-kit": patch
"@napgram/media-kit": patch
"@napgram/web-interfaces": patch
"@napgram/auth-kit": patch
"@napgram/marketplace-kit": patch
"@napgram/gateway-kit": patch
"@napgram/plugin-permission-management": patch
---

Refine runtime boundaries across the package workspace and prepare the next publish wave.

- move runtime-facing utilities away from scattered `@napgram/infra-kit` usage into package-local compatibility facades backed by `db-kit`, `env-kit`, `logger-kit`, and `runtime-kit`
- strengthen `web-interfaces` compatibility shims so monitoring routes continue to build and run with the split infrastructure packages
- update `auth-kit`, `marketplace-kit`, and `plugin-permission-management` to depend on the smaller infrastructure packages they actually use at runtime
- keep host/runtime compatibility in place while reducing direct coupling inside feature, message, media, request, and web utility packages
- remove the unused `@napgram/infra-kit` runtime dependency from `gateway-kit`

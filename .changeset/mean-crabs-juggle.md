---
'@napgram/runtime-kit': minor
---

Remove the deprecated `@napgram/runtime-kit/legacy` subpath export. Internal packages now use the direct `@napgram/infra-kit` and `@napgram/runtime-kit` entrypoints instead, while the root `@napgram/runtime-kit` export still keeps the deprecated `Instance` compatibility value for one more cycle.

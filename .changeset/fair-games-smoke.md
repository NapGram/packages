---
"@napgram/runtime-kit": patch
"@napgram/plugin-kit": patch
---

fix: support builtin plugin overrides without forcing local module paths

- allow `PluginsConfigFile.plugins[].module` to be optional for builtin override records
- stop `patchPluginConfig` from auto-creating `./local/<id>/index.mjs` when only toggling builtin plugin state
- treat id-only and legacy missing `./local/<id>/index.(mjs|js)` records for builtins as runtime overrides
- apply builtin overrides while keeping existing plugin priority rules unchanged

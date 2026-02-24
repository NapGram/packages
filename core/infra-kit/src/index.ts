export { configureInfraKit } from './deps.js'
export type { InfraLogger, LoggerFactory } from './deps.js'
import flags from './flags.js'
import qface from './qface.js'
export { default as ForwardMap } from './models/ForwardMap.js'
export type { ForwardPairRecord } from './models/ForwardMap.js'
export { Pair } from './models/Pair.js'

import { CacheManager, configCache, groupInfoCache, mediaCache, userInfoCache } from './CacheManager.js'
export type { CacheConfig } from './CacheManager.js'
import { MessageQueue } from './MessageQueue.js'
export type { MessageHandler, QueueConfig } from './MessageQueue.js'
import { performanceMonitor, PerformanceMonitor, startMonitoring } from './PerformanceMonitor.js'
export type { PerformanceMetrics, PerformanceStats } from './PerformanceMonitor.js'
import env from './env.js'
import getLogger, { setConsoleLogLevel } from './logger.js'
import type { AppLogger } from './logger.js'
import db from './db.js'
import { drizzleDb, schema, eq, and, or, lt, lte, gt, gte, like, inArray, isNull, isNotNull, desc, sql, count } from '@napgram/database'
import * as temp from './temp.js'
import { DurationParser } from './utils/duration-parser.js'
import * as hashing from './utils/hashing.js'
import random from './utils/random.js'
import { getMimeType } from './utils/mime.js'
import { ApiResponse } from './utils/api-response.js'
import * as urls from './utils/urls.js'
import * as flagControl from './utils/flagControl.js'
import sentry from './sentry.js'
import * as arrays from './utils/arrays.js'
import * as cache from './utils/cache.js'
import * as date from './utils/date.js'
import * as pastebin from './utils/pastebin.js'
import { stringifyBigInts } from './utils/json.js'
import * as highLevel from './utils/highLevel.js'

// Individual named exports from modules
export { TTLCache } from './utils/cache.js'
export { formatDate } from './utils/date.js'
export { registerDualRoute, ErrorResponses } from './utils/fastify.js'
export const { TEMP_PATH } = temp

// Named exports
export {
  CacheManager, configCache, groupInfoCache, mediaCache, userInfoCache,
  MessageQueue,
  performanceMonitor, PerformanceMonitor, startMonitoring,
  env,
  getLogger, setConsoleLogLevel,
  db,
  drizzleDb,
  schema,
  eq,
  and,
  or,
  lt,
  lte,
  gt,
  desc,
  gte,
  like,
  inArray,
  isNull,
  isNotNull,
  sql,
  count,
  temp,
  qface,
  DurationParser,
  hashing,
  random,
  getMimeType,
  flags,
  ApiResponse,
  urls,
  flagControl,
  sentry,
  arrays,
  cache,
  date,
  pastebin,
  stringifyBigInts,
  highLevel
}
export type { AppLogger }

// Default export for compatibility with tests
const kit = {
  env,
  getLogger,
  db,
  drizzleDb,
  temp,
  performanceMonitor,
  CacheManager,
  MessageQueue,
  qface,
}

Object.assign(kit, env)

export default kit

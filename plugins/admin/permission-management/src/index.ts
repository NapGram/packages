import { definePlugin } from '@napgram/sdk'
import { getLogger } from '@napgram/infra-kit'
import { InstanceRegistry } from '@napgram/runtime-kit'
import { PermissionService } from './services/PermissionService.js'
import { PermissionCommands } from './commands/PermissionCommands.js'
import { PermissionLevel } from './types/index.js'
import { commandPermissions, permissionAuditLogs, userPermissions } from './database/schema.js'

const logger = getLogger('PermissionManagementPlugin')

/**
 * 权限管理插件
 * 提供完整的多级权限控制系统
 */
const plugin = definePlugin({
    id: 'permission-management',
    name: '权限管理',
    version: '0.1.0',
    author: 'NapGram Team',
    description: '提供完整的多级权限控制系统，支持权限授予/撤销与审计日志',
    permissions: {
        instances: [],
    },
    drizzleSchema: {
        userPermissions,
        commandPermissions,
        permissionAuditLogs,
    },
    async install(ctx) {
        logger.info('Initializing Permission Management Plugin')

        // 创建权限服务实例
        const permissionService = new PermissionService(InstanceRegistry.getById, {
            cacheEnabled: ctx.config?.cacheEnabled,
            cacheExpireMinutes: ctx.config?.cacheExpireMinutes,
            defaultLevel: typeof ctx.config?.defaultLevel === 'number'
                ? (ctx.config.defaultLevel as PermissionLevel)
                : undefined,
            enableAuditLog: ctx.config?.enableAuditLog,
        })

        // 创建并注册命令
        const permissionCommands = new PermissionCommands(ctx, permissionService)
        permissionCommands.register()

        // 暴露给命令系统/其他插件使用
        ;(ctx as any).exports = {
            permissionService,
            PermissionLevel,
        }

        ctx.onUnload(() => {
            permissionService.clearCache()
            logger.info('Permission Management Plugin unloaded')
        })

        logger.info('Permission Management Plugin initialized successfully')
    },
})

export default plugin

// 导出类型供其他插件使用
export { PermissionLevel } from './types/index.js'
export type {
    UserPermission,
    PermissionCheckResult,
    CommandPermissionConfig,
    AuditEventType,
    AuditLogEntry,
} from './types/index.js'
export { PermissionService } from './services/PermissionService.js'

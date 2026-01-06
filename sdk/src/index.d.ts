import type { CommandConfig, MessageEvent, NapGramPlugin, PluginContext, PluginLogger, PluginPermissions } from '@napgram/core';
export * from '@napgram/core';
export * from '@napgram/utils';
export type PluginWithConfig<TConfig = unknown> = Omit<NapGramPlugin, 'install'> & {
    install(ctx: PluginContext, config?: TConfig): void | Promise<void>;
};
export type PluginConfigResolver<TConfig> = (config: unknown) => TConfig;
export declare function definePlugin<TConfig = unknown, T extends PluginWithConfig<TConfig> = PluginWithConfig<TConfig>>(plugin: T): T;
export declare function defineCommand<T extends CommandConfig>(command: T): T;
export declare function definePermissions<T extends PluginPermissions>(permissions: T): T;
export type ReplyInfo = {
    id?: string;
    text?: string;
    userId?: string;
    raw?: unknown;
};
export type CommandGuardMessages = {
    wrongPlatform?: string;
    adminOnly?: string;
    ownerOnly?: string;
    missingReply?: string;
    cooldown?: (retryInMs: number) => string;
    error?: string;
};
export type CommandGuardOptions = {
    platform?: 'qq' | 'tg';
    requireAdmin?: boolean;
    requireOwner?: boolean;
    requireReply?: boolean;
    silent?: boolean;
    messages?: CommandGuardMessages;
    onError?: (error: unknown, event: MessageEvent, args: string[]) => void | Promise<void>;
};
export type ErrorBoundaryOptions = {
    silent?: boolean;
    errorMessage?: string;
    logger?: PluginLogger;
    onError?: (error: unknown, event: MessageEvent, args: string[]) => void | Promise<void>;
};
export declare function withCommandGuards(handler: CommandConfig['handler'], options?: CommandGuardOptions): CommandConfig['handler'];
export declare function createCommand<T extends CommandConfig>(config: T, options?: CommandGuardOptions): T;
export declare function withErrorBoundary(handler: CommandConfig['handler'], options?: ErrorBoundaryOptions): CommandConfig['handler'];
export type CooldownResult = {
    allowed: boolean;
    retryInMs: number;
};
export type CooldownOptions = {
    durationMs: number;
    key?: (event: MessageEvent, args: string[]) => string;
    onCooldown?: (event: MessageEvent, retryInMs: number) => void | Promise<void>;
    messages?: Pick<CommandGuardMessages, 'cooldown'>;
};
export declare function createCooldown(durationMs: number): (key: string) => CooldownResult;
export declare function withCooldown(handler: CommandConfig['handler'], options: CooldownOptions): CommandConfig['handler'];
export declare function resolveConfig<T extends Record<string, unknown>>(config: unknown, defaults: T): T;
export declare function resolveConfigWith<T extends Record<string, unknown>>(config: unknown, defaults: T, resolver: PluginConfigResolver<T>): T;
export declare function parseBoolean(value: string | undefined, fallback?: boolean): boolean | undefined;
export declare function parseNumber(value: string | number | undefined, fallback?: number): number | undefined;
export type ParsedArgs = {
    args: string[];
    flags: Record<string, string | boolean>;
};
export declare function parseArgs(rawArgs: string[]): ParsedArgs;
export declare function ensureArgs(event: MessageEvent, args: string[], min: number, message?: string): Promise<boolean>;
export declare function getChannelRef(event: MessageEvent): string | undefined;
export declare function getMessageRef(event: MessageEvent): string | undefined;
export declare function getReplyMessage(event: MessageEvent): ReplyInfo | null;
export declare function formatError(error: unknown): string;
export declare function withLoggerPrefix(logger: PluginLogger, prefix: string): PluginLogger;
export declare function createPluginLogger(ctx: PluginContext, prefix?: string): PluginLogger;
//# sourceMappingURL=index.d.ts.map
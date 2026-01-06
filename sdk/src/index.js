export * from '@napgram/core';
export * from '@napgram/utils';
export function definePlugin(plugin) {
    return plugin;
}
export function defineCommand(command) {
    return command;
}
export function definePermissions(permissions) {
    return permissions;
}
const defaultGuardMessages = {
    wrongPlatform: 'This command is not available on this platform.',
    adminOnly: 'Admin permission required.',
    ownerOnly: 'Owner permission required.',
    missingReply: 'Please reply to a message first.',
    cooldown: (retryInMs) => `Please wait ${Math.ceil(retryInMs / 1000)}s before using this command again.`,
    error: 'Command failed. Please check logs.',
};
export function withCommandGuards(handler, options = {}) {
    const messages = { ...defaultGuardMessages, ...(options.messages || {}) };
    return async (event, args) => {
        if (options.platform && event.platform !== options.platform) {
            if (!options.silent)
                await event.reply(messages.wrongPlatform);
            return;
        }
        if (options.requireOwner && !event.sender.isOwner) {
            if (!options.silent)
                await event.reply(messages.ownerOnly);
            return;
        }
        if (options.requireAdmin && !(event.sender.isAdmin || event.sender.isOwner)) {
            if (!options.silent)
                await event.reply(messages.adminOnly);
            return;
        }
        if (options.requireReply && !getReplyMessage(event)) {
            if (!options.silent)
                await event.reply(messages.missingReply);
            return;
        }
        try {
            await handler(event, args);
        }
        catch (error) {
            if (options.onError) {
                await options.onError(error, event, args);
                return;
            }
            if (!options.silent)
                await event.reply(messages.error);
        }
    };
}
export function createCommand(config, options) {
    if (!options)
        return config;
    return { ...config, handler: withCommandGuards(config.handler, options) };
}
export function withErrorBoundary(handler, options = {}) {
    const message = options.errorMessage || defaultGuardMessages.error;
    return async (event, args) => {
        try {
            await handler(event, args);
        }
        catch (error) {
            if (options.onError) {
                await options.onError(error, event, args);
                return;
            }
            if (options.logger) {
                options.logger.error('Command failed', error);
            }
            if (!options.silent) {
                await event.reply(message);
            }
        }
    };
}
export function createCooldown(durationMs) {
    const buckets = new Map();
    return (key) => {
        const now = Date.now();
        const until = buckets.get(key) || 0;
        if (now < until) {
            return { allowed: false, retryInMs: until - now };
        }
        buckets.set(key, now + durationMs);
        return { allowed: true, retryInMs: 0 };
    };
}
export function withCooldown(handler, options) {
    const cooldown = createCooldown(options.durationMs);
    const messageFactory = options.messages?.cooldown || defaultGuardMessages.cooldown;
    return async (event, args) => {
        const key = options.key
            ? options.key(event, args)
            : `${event.platform}:${event.channelId}:${event.sender.userId}`;
        const result = cooldown(key);
        if (!result.allowed) {
            if (options.onCooldown) {
                await options.onCooldown(event, result.retryInMs);
            }
            else {
                await event.reply(messageFactory(result.retryInMs));
            }
            return;
        }
        await handler(event, args);
    };
}
export function resolveConfig(config, defaults) {
    if (!config || typeof config !== 'object')
        return { ...defaults };
    return { ...defaults, ...config };
}
export function resolveConfigWith(config, defaults, resolver) {
    return resolver(resolveConfig(config, defaults));
}
export function parseBoolean(value, fallback) {
    if (value === undefined)
        return fallback;
    const normalized = value.trim().toLowerCase();
    if (['1', 'true', 'yes', 'y', 'on'].includes(normalized))
        return true;
    if (['0', 'false', 'no', 'n', 'off'].includes(normalized))
        return false;
    return fallback;
}
export function parseNumber(value, fallback) {
    if (value === undefined)
        return fallback;
    const num = typeof value === 'number' ? value : Number(value);
    if (Number.isNaN(num))
        return fallback;
    return num;
}
export function parseArgs(rawArgs) {
    const args = [];
    const flags = {};
    for (let i = 0; i < rawArgs.length; i += 1) {
        const token = rawArgs[i];
        if (token.startsWith('--')) {
            const trimmed = token.slice(2);
            if (!trimmed)
                continue;
            if (trimmed.includes('=')) {
                const [key, ...rest] = trimmed.split('=');
                flags[key] = rest.join('=') || '';
                continue;
            }
            const next = rawArgs[i + 1];
            if (next && !next.startsWith('-')) {
                flags[trimmed] = next;
                i += 1;
            }
            else {
                flags[trimmed] = true;
            }
            continue;
        }
        if (token.startsWith('-') && token.length > 1) {
            const key = token.slice(1);
            const next = rawArgs[i + 1];
            if (next && !next.startsWith('-')) {
                flags[key] = next;
                i += 1;
            }
            else {
                flags[key] = true;
            }
            continue;
        }
        args.push(token);
    }
    return { args, flags };
}
export async function ensureArgs(event, args, min, message = 'Missing arguments.') {
    if (args.length >= min)
        return true;
    await event.reply(message);
    return false;
}
export function getChannelRef(event) {
    if (event.channelRef)
        return event.channelRef;
    if (event.platform === 'tg')
        return `tg:${event.channelId}`;
    const kind = event.channelType === 'group' ? 'group' : 'private';
    return `qq:${kind}:${event.channelId}`;
}
export function getMessageRef(event) {
    if (event.message.ref)
        return event.message.ref;
    if (event.platform === 'tg')
        return `tg:${event.channelId}:${event.message.id}`;
    return `qq:${event.message.id}`;
}
export function getReplyMessage(event) {
    if (event.message.quote) {
        return {
            id: String(event.message.quote.id),
            text: event.message.quote.text,
            userId: event.message.quote.userId,
            raw: event.message.quote,
        };
    }
    const raw = event.raw;
    const rawReply = raw?.rawReply || raw?.replyToMessage || raw?.replyTo;
    if (!rawReply)
        return null;
    if (typeof rawReply === 'string' || typeof rawReply === 'number') {
        return { id: String(rawReply), raw: rawReply };
    }
    const id = rawReply?.id ??
        rawReply?.messageId ??
        rawReply?.replyToMsgId ??
        rawReply?.replyTo?.replyToMsgId;
    const text = rawReply?.text ?? rawReply?.message ?? rawReply?.caption;
    const userId = rawReply?.sender?.id ?? rawReply?.senderId ?? rawReply?.from?.id;
    if (!id && !text && !userId)
        return null;
    return {
        id: id !== undefined ? String(id) : undefined,
        text: text !== undefined ? String(text) : undefined,
        userId: userId !== undefined ? String(userId) : undefined,
        raw: rawReply,
    };
}
export function formatError(error) {
    if (error instanceof Error)
        return error.message;
    return String(error);
}
export function withLoggerPrefix(logger, prefix) {
    const format = (message) => `[${prefix}] ${message}`;
    return {
        debug: (message, ...args) => logger.debug(format(message), ...args),
        info: (message, ...args) => logger.info(format(message), ...args),
        warn: (message, ...args) => logger.warn(format(message), ...args),
        error: (message, ...args) => logger.error(format(message), ...args),
    };
}
export function createPluginLogger(ctx, prefix) {
    if (!prefix)
        return ctx.logger;
    return withLoggerPrefix(ctx.logger, prefix);
}

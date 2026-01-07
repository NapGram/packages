import type { Message } from '@mtcute/core';
import type { UnifiedMessage } from '@napgram/message-kit';
import type { IQQClient } from '../../../shared-types.js';
import type { ReplyResolver } from '../services/ReplyResolver.js';
import type { MediaGroupHandler } from './MediaGroupHandler.js';
/**
 * Handles Telegram->QQ message forwarding
 */
export declare class TelegramMessageHandler {
    private readonly qqClient;
    private readonly mediaGroupHandler;
    private readonly replyResolver;
    private readonly prepareMediaForQQ;
    private readonly renderContent;
    private readonly getNicknameMode;
    constructor(qqClient: IQQClient, mediaGroupHandler: MediaGroupHandler, replyResolver: ReplyResolver, prepareMediaForQQ: (msg: UnifiedMessage) => Promise<void>, renderContent: (content: any) => string, getNicknameMode: (pair: any) => string);
    handleTGMessage(tgMsg: Message, pair: any, preUnified?: UnifiedMessage): Promise<void>;
}

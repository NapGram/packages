import type { MessageContent } from '../../types.js';
/**
 * JSON卡片消息转换器
 */
export declare class JsonCardConverter {
    convertJsonCard(data: any): MessageContent[] | null;
    private parseJsonData;
    private normalizeUrl;
    private truncateText;
}

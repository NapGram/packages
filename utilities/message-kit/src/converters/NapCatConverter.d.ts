import type { UnifiedMessage } from '../types.js';
import { BaseConverter } from './BaseConverter.js';
export declare class NapCatConverter extends BaseConverter {
    private textConverter;
    private mediaConverter;
    private interactionConverter;
    private jsonCardConverter;
    /**
     * 从 NapCat 消息转换为统一格式
     */
    fromNapCat(napCatMsg: any): UnifiedMessage;
    private convertNapCatSegment;
    private truncateText;
}

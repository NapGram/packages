import type { ForwardMessage } from './types/index.js';
import type { WSSendReturn } from './types/onebot-types.js';
export declare function napCatForwardMultiple(messages: WSSendReturn['get_forward_msg']['messages']): ForwardMessage[];

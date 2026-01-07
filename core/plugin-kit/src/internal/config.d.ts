import type { PluginSpec } from '../core/interfaces.js';
export declare function resolvePluginsEnabled(): boolean;
export declare function resolveGatewayEndpoint(): string;
export declare function resolvePluginsInstances(defaultInstances?: number[]): number[];
export declare function resolveAllowTsPlugins(): boolean;
export declare function resolveDebugSessions(): boolean;
export declare function loadPluginSpecs(builtins?: PluginSpec[]): Promise<PluginSpec[]>;

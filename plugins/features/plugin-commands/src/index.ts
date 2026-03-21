import type { NapGramPlugin, PluginContext, InstanceStatusEvent } from '@napgram/sdk';
import { CommandsFeature } from '@napgram/feature-kit';
import { InstanceRegistry } from '@napgram/runtime-kit';

const createdInstances = new Set<number>();

/**
 * @deprecated Prefer the host-managed FeatureManager wiring in NapGram.
 */
const plugin: NapGramPlugin = {
    id: 'commands',
    name: 'Commands Feature',
    version: '1.0.0',
    author: 'NapGram Team',
    description: 'Command processing feature for NapGram',

    permissions: {
        instances: [],
    },

    install: async (ctx: PluginContext) => {
        ctx.logger.warn('Commands feature plugin is deprecated; prefer host-managed FeatureManager wiring.');

        const attach = (instance: any) => {
            if (!instance || !instance.qqClient || !instance.tgBot) return;
            if (instance.commandsFeature) return;
            instance.commandsFeature = new CommandsFeature(instance, instance.tgBot, instance.qqClient);
            createdInstances.add(instance.id);
        };

        const handleStatus = async (event: InstanceStatusEvent) => {
            if (event.status !== 'starting' && event.status !== 'running') return;
            const instance = InstanceRegistry.getById(event.instanceId);
            if (!instance) return;
            attach(instance);
        };

        InstanceRegistry.getAll().forEach(attach);
        ctx.on('instance-status', handleStatus);
    },

    uninstall: async () => {
        for (const instance of InstanceRegistry.getAll() as any[]) {
            if (!createdInstances.has(instance.id)) continue;
            if (instance.commandsFeature) {
                instance.commandsFeature.destroy?.();
                instance.commandsFeature = undefined;
            }
        }
        createdInstances.clear();
    },
};

export default plugin;

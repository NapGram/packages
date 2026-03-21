import type { NapGramPlugin, PluginContext, InstanceStatusEvent } from '@napgram/sdk';
import { RecallFeature } from '@napgram/feature-kit';
import { InstanceRegistry } from '@napgram/runtime-kit';

/**
 * @deprecated Prefer the host-managed FeatureManager wiring in NapGram.
 */
const plugin: NapGramPlugin = {
    id: 'recall',
    name: 'Recall Feature',
    version: '1.0.0',
    author: 'NapGram Team',
    description: 'Message recall synchronization feature',

    permissions: {
        instances: [],
    },

    install: async (ctx: PluginContext) => {
        ctx.logger.warn('Recall feature plugin is deprecated; prefer host-managed FeatureManager wiring.');

        const attach = (instance: any) => {
            if (!instance || !instance.qqClient || !instance.tgBot) return;
            if (instance.recallFeature) return;
            instance.recallFeature = new RecallFeature(instance, instance.tgBot, instance.qqClient);
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
};

export default plugin;

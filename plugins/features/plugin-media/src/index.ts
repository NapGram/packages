import type { NapGramPlugin, PluginContext, InstanceStatusEvent } from '@napgram/sdk';
import { MediaFeature } from '@napgram/feature-kit';
import { InstanceRegistry } from '@napgram/runtime-kit';

/**
 * @deprecated Prefer the host-managed FeatureManager wiring in NapGram.
 */
const plugin: NapGramPlugin = {
    id: 'media',
    name: 'Media Feature',
    version: '1.0.0',
    author: 'NapGram Team',
    description: 'Media processing feature for NapGram',

    permissions: {
        instances: [],
    },

    install: async (ctx: PluginContext) => {
        ctx.logger.warn('Media feature plugin is deprecated; prefer host-managed FeatureManager wiring.');

        const attach = (instance: any) => {
            if (!instance || !instance.qqClient || !instance.tgBot) return;
            if (instance.mediaFeature) return;
            instance.mediaFeature = new MediaFeature(instance, instance.tgBot, instance.qqClient);
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

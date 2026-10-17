import { resyncAllSearchVectors } from '@/features/cookbook'
import { inngest } from '../client'

export const resyncSearchVectorsJob = inngest.createFunction(
    {
        id: 'resync-search-vectors',
        triggers: { event: 'cookbook/search-vectors.resync' },
        name: 'Cookbook - Resync Search Vectors',
    },
    async ({ step }) => {
        await step.run('resync-all', () => resyncAllSearchVectors())
        return { status: 'done' }
    }
)

import { computeHotScores } from '@/features/recipes/db/mutations'
import { inngest } from '../client'
import { rotateEditorsChoice } from '@/features/dashboard/db/mutations'
export const computeHotScoresCron = inngest.createFunction(
    {
        id: 'compute-hot-scores-cron',
        triggers: { cron: '11 */6 * * *' }, // every 6 hrs at 11th minutes
    },
    async () => {
        const count = await computeHotScores()
        console.log(
            `[compute-hot-scores] updated ${count} recipes at ${new Date().toISOString()}`
        )
        return { updatedHotScores: count }
    }
)

export const rotateEditorsChoiceCron = inngest.createFunction(
    {
        id: 'rotate-editors-choice-cron',
        triggers: {
            cron: '0 0 * * 1',
        },
    },
    // every Monday at midnight UTC
    async ({ step }) => {
        const output = await step.run('rotate-editors-choice', () =>
            rotateEditorsChoice()
        )
        console.log(
            `[rotateEditorchoice] updated ${output} recipes at ${new Date().toISOString()}`
        )
    }
)

import { RECOMMENDATION_WEIGHTS } from '@/data/constantVariables'
import { RecSignalSource, RecWeightEntry } from './types'

export function addWeights(
    tagWeights: Map<string, RecWeightEntry>,
    cuisineWeights: Map<string, RecWeightEntry>,
    tags: { tagId: string; isPrimary: boolean; tag: { label: string } }[],
    cuisines: {
        cuisineId: string
        isPrimary: boolean
        cuisine: { label: string }
    }[],
    signal: number,
    source: RecSignalSource
) {
    for (const t of tags) {
        const mult = t.isPrimary
            ? RECOMMENDATION_WEIGHTS.primaryTag
            : RECOMMENDATION_WEIGHTS.secondaryTag
        const contribution = signal * mult
        const existing = tagWeights.get(t.tagId)
        if (existing) {
            existing.weight += contribution
            existing.sources.add(source)
        } else {
            tagWeights.set(t.tagId, {
                weight: contribution,
                label: t.tag.label,
                sources: new Set([source]),
            })
        }
    }
    for (const c of cuisines) {
        const mult = c.isPrimary
            ? RECOMMENDATION_WEIGHTS.primaryTag
            : RECOMMENDATION_WEIGHTS.secondaryTag
        const contribution = signal * mult
        const existing = cuisineWeights.get(c.cuisineId)
        if (existing) {
            existing.weight += contribution
            existing.sources.add(source)
        } else {
            cuisineWeights.set(c.cuisineId, {
                weight: contribution,
                label: c.cuisine.label,
                sources: new Set([source]),
            })
        }
    }
}

export function formatReason(match: ReturnType<typeof getTopMatch>): string {
    if (!match) return 'Popular right now'
    const sourceLabel = match.sources.has('favourite')
        ? 'liked'
        : match.sources.has('rating')
          ? 'rated'
          : 'viewed'
    const attrLabel =
        match.type === 'tag'
            ? `with ${match.label} tag`
            : `in ${match.label} cuisine`
    return `Because you ${sourceLabel} recipe ${attrLabel}`
}

export function getTopMatch(
    tags: { tagId: string }[],
    cuisines: { cuisineId: string }[],
    tagWeights: Map<string, RecWeightEntry>,
    cuisineWeights: Map<string, RecWeightEntry>
) {
    let best: {
        type: 'tag' | 'cuisine'
        label: string
        weight: number
        sources: Set<RecSignalSource>
    } | null = null

    for (const t of tags) {
        const entry = tagWeights.get(t.tagId)
        if (entry && (!best || entry.weight > best.weight)) {
            best = {
                type: 'tag',
                label: entry.label,
                weight: entry.weight,
                sources: entry.sources,
            }
        }
    }
    for (const c of cuisines) {
        const entry = cuisineWeights.get(c.cuisineId)
        if (entry && (!best || entry.weight > best.weight)) {
            best = {
                type: 'cuisine',
                label: entry.label,
                weight: entry.weight,
                sources: entry.sources,
            }
        }
    }
    return best
}

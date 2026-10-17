export type RecSignalSource = 'favourite' | 'rating' | 'view'

export interface RecWeightEntry {
    weight: number
    label: string
    sources: Set<RecSignalSource>
}

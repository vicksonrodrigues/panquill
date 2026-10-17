//new view count recount time
export const RECOUNT_TIME = 24 * 60 * 60 * 1000
// For dekay in favourite button use
export const MIN_SAVE_DURATION = 800

//For computeHotScore mutation
export const GRAVITY = 1.8
export const WINDOW_TIME = 48 * 60 * 60 * 1000

//For dashboard recommendation's weights

export const RECOMMENDATION_WEIGHTS = {
    favorite: 3,
    rating: 2,
    view: 1,
    primaryTag: 2,
    secondaryTag: 1,
    hotScoreTiebreak: 0.1,
} as const

export const CANDIDATE_POOL = 200

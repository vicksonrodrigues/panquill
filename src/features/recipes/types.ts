interface SelectOptionType {
    id: string
    label: string
    value: string
}

interface SingleIngredientType {
    ingredient: null | SelectOptionType
    quantity: string
}

interface SingleStepType {
    stepNo: number
    step: string
}

interface SingleTipType {
    tipNo: number
    tip: string
}

interface RecipeFormType {
    title: string
    description: string
    imgUrl: string
    course: null | SelectOptionType
    cuisine: SelectOptionType[]
    tags: SelectOptionType[]
    prepTime: number
    cookTime: number
    passiveTime: number
    serving: number
    tools: SelectOptionType[]
    ingredients: SingleIngredientType[]
    steps: SingleStepType[]
    tips: SingleTipType[]
    isAdminRecipe: boolean
    isPublished: boolean
}

export interface RecipeCardData {
    id: string
    slug: string
    title: string
    description: string
    imageUrl: string
    course: string
    cuisines: string[]
    tags: string[]
    prepTime: number | null // schema fields — compute total in the component
    cookTime: number | null
    passiveTime: number | null
    viewCount: number
    favouriteCount: number
    isAdminRecipe: boolean
    author: { name: string }
}

//used to match field type with schema
export type KeysMatching<T, V> = {
    [K in keyof T]: T[K] extends V ? K : never
}[keyof T]

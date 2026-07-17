import {
    findCourses,
    findCuisines,
    findIngredients,
    findTags,
    findTools,
} from '../db/queries'

export async function getCourses(keyword: string) {
    return findCourses(keyword)
}

export async function getCuisines(keyword: string) {
    return findCuisines(keyword)
}

export async function getIngredients(keyword: string) {
    return findIngredients(keyword)
}

export async function getTags(keyword: string) {
    return findTags(keyword)
}

export async function getTools(keyword: string) {
    return findTools(keyword)
}

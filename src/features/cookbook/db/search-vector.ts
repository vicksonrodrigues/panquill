import { prisma } from '@/prisma/db'

export async function recomputeRecipeSearchVector(recipeId: string) {
    const recipe = await prisma.recipe.findUniqueOrThrow({
        where: { id: recipeId },
        select: {
            title: true,
            course: { select: { label: true } },
            recipeCuisines: {
                select: { cuisine: { select: { label: true } } },
            },
            recipeTags: { select: { tag: { select: { label: true } } } },
            recipeIngredients: {
                select: { ingredient: { select: { label: true } } },
            },
            recipeTools: { select: { tool: { select: { label: true } } } },
        },
    })

    const metadataText = [
        recipe.course.label,
        ...recipe.recipeCuisines.map((c) => c.cuisine.label),
        ...recipe.recipeTags.map((t) => t.tag.label),
    ].join(' ')

    const lowPriorityText = [
        ...recipe.recipeIngredients.map((i) => i.ingredient.label),
        ...recipe.recipeTools.map((t) => t.tool.label),
    ].join(' ')

    await prisma.$executeRaw`
    UPDATE recipes
    SET search_vector =
      setweight(to_tsvector('english', ${recipe.title}), 'A') ||
      setweight(to_tsvector('english', ${metadataText}), 'B') ||
      setweight(to_tsvector('english', ${lowPriorityText}), 'C')
    WHERE id = ${recipeId}
  `
}

export async function resyncAllSearchVectors() {
    await prisma.$executeRaw`
    UPDATE recipes r
    SET search_vector = x.vector
    FROM (
      SELECT
        rec.id,
        setweight(to_tsvector('english', coalesce(rec.title, '')), 'A') ||
        setweight(to_tsvector('english',
          coalesce(c.label, '') || ' ' || coalesce(cu.labels, '') || ' ' || coalesce(tg.labels, '')
        ), 'B') ||
        setweight(to_tsvector('english',
          coalesce(ing.labels, '') || ' ' || coalesce(tl.labels, '')
        ), 'C') AS vector
      FROM recipes rec
      LEFT JOIN courses c ON c.id = rec.course_id
      LEFT JOIN LATERAL (
        SELECT string_agg(cu2.label, ' ') AS labels
        FROM recipe_cuisines rc JOIN cuisines cu2 ON cu2.id = rc.cuisine_id
        WHERE rc.recipe_id = rec.id
      ) cu ON true
      LEFT JOIN LATERAL (
        SELECT string_agg(t2.label, ' ') AS labels
        FROM recipe_tags rt JOIN tags t2 ON t2.id = rt.tag_id
        WHERE rt.recipe_id = rec.id
      ) tg ON true
      LEFT JOIN LATERAL (
        SELECT string_agg(i2.label, ' ') AS labels
        FROM recipe_ingredients ri JOIN ingredients i2 ON i2.id = ri.ingredient_id
        WHERE ri.recipe_id = rec.id
      ) ing ON true
      LEFT JOIN LATERAL (
        SELECT string_agg(tl2.label, ' ') AS labels
        FROM recipe_tools rtl JOIN tools tl2 ON tl2.id = rtl.tool_id
        WHERE rtl.recipe_id = rec.id
      ) tl ON true
    ) x
    WHERE r.id = x.id
  `
}

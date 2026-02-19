import z from "zod";

export const recipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  imgUrl: z.string(),
  course: z.object({
    id: z.string(),
    name: z.string(),
  }),
  cuisine: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
  prepTime: z.int(),
  cookTime: z.int(),
  serving: z.int(),
  tags: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
  ingredients: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      quantity: z.string(),
    }),
  ),
  tools: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
  steps: z.array(z.string()),
  tips: z.array(z.string()),
  isAdminRecipe: z.boolean(),
  isPublished: z.boolean(),
});

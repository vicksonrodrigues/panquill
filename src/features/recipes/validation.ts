import z from 'zod'

// .refine((val) => val === null, { message: "Course is required" }),
// .refine((val) => val === null, { message: "Ingredient is required" }),

export const recipeSchema = z.object({
    title: z.string().min(1, 'Title is Required*'),
    description: z.string().min(1, 'Description is Required*'),
    imgPreviewUrl: z
        .object({
            name: z.string(),
            base64String: z.string(),
        })
        .nullable(),
    imgUrl: z.string(),
    course: z
        .object({
            id: z.string(),
            label: z.string(),
            value: z.string(),
        })
        .nullable()
        .superRefine((val, ctx) => {
            if (!val) {
                ctx.addIssue({
                    code: 'custom',
                    message: `Course is required`,
                    input: val,
                })
            }
        }),
    cuisine: z
        .array(
            z.object({
                id: z.string(),
                label: z.string(),
                value: z.string(),
            })
        )
        .min(1, { message: 'Select at least one cuisine' }),
    tags: z
        .array(
            z.object({
                id: z.string(),
                label: z.string(),
                value: z.string(),
            })
        )
        .min(1, { message: 'Select at least one tag' }),
    prepTime: z
        .number('Should be a valid number')
        .nonnegative('Time cannot be negative')
        .min(1, { message: 'Prep time is required' })
        .max(1440, { message: 'Cannot exceed 24 hours' }),

    cookTime: z
        .number('Should be a valid number')
        .nonnegative('Time cannot be negative')
        .min(1, { message: 'Cook time is required' })
        .max(1440, { message: 'Cannot exceed 24 hours' }),

    passiveTime: z
        .number('Should be a valid number')
        .nonnegative('Time cannot be negative')
        .min(0)
        .max(10080, { message: 'Cannot exceed 7 days' }),
    serving: z
        .number('Should be a valid number')
        .nonnegative('Serving cannot be negative')
        .min(1, { message: 'Serving size is required' }),
    tools: z.array(
        z.object({
            id: z.string(),
            label: z.string(),
            value: z.string(),
        })
    ),
    ingredients: z
        .array(
            z.object({
                ingredient: z
                    .object({
                        id: z.string(),
                        label: z.string(),
                        value: z.string(),
                    })
                    .nullable()
                    .superRefine((val, ctx) => {
                        if (val === null) {
                            ctx.addIssue({
                                code: 'custom',
                                message: `Name is required`,
                                input: val,
                            })
                        }
                    }),
                quantity: z
                    .string()
                    .min(1, { message: 'Quantity is required' }),
            })
        )
        .min(1, { message: 'Add at least one ingredient' }),
    steps: z
        .array(
            z.object({
                stepNo: z.int(),
                step: z
                    .string()
                    .min(1, { message: 'Step Details cannot be empty' }),
            })
        )
        .min(1, { message: 'Add at least one step' }),
    tips: z.array(
        z.object({
            tipNo: z.int(),
            tip: z.string(),
        })
    ),
    isAdminRecipe: z.boolean(),
    isPublished: z.boolean(),
})

export type RecipeFormValues = z.infer<typeof recipeSchema>

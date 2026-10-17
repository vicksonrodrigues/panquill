/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { ChefHat } from 'lucide-react'
import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { RecipeFormValues } from '../../validation'
import { Typography } from '@/components/shared/typography'
import RecipeTitle from './ui/RecipeTitle'
import MetaRow from './ui/MetaRow'
import SectionWrapper from './ui/SectionWrapper'
import RecipeDescription from './ui/RecipeDescription'
import StatCard from './ui/StatCard'
import { Separator } from '@/components/ui/separator'
import IngredientList from './ui/IngredientList'
import { RecipeImage } from './ui/RecipeImage'
import StepsList from './ui/StepsList'
import TipsList from './ui/TipsList'
import ToolsList from './ui/ToolsList'

export default function RecipePreviewTab() {
    const {
        control,
        formState: { isDirty, dirtyFields },
    } = useFormContext<RecipeFormValues>()

    const values = useWatch({ control }) as RecipeFormValues

    const {
        title,
        description,
        imgPreviewUrl,
        imgUrl,
        course,
        cuisine,
        tags,
        prepTime,
        cookTime,
        passiveTime,
        serving,
        ingredients,
        steps,
        tips,
        tools,
    } = values

    console.log('Watch', values)

    const hasMeaningfulContent = isDirty && !!title?.trim()

    if (!hasMeaningfulContent) {
        return (
            <Card className="w-full">
                <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                    <ChefHat
                        className="text-muted-foreground"
                        size={40}
                        strokeWidth={1.2}
                    />
                    <Typography variant={'emptyTitle'}>
                        Your recipe preview will appear here
                    </Typography>
                    <Typography variant={'emptyDescription'}>
                        Start filling in the form — add a title, ingredients,
                        and steps to see your recipe take shape.
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="border-border w-full border shadow-2xl">
            <CardContent className="flex flex-col gap-3">
                <div className="space-y-2 p-4">
                    <RecipeTitle title={title} />
                    <div className="flex flex-col gap-2 pt-1">
                        <MetaRow type="Course" value={course?.label} />
                        <MetaRow
                            type="Cuisine"
                            values={cuisine?.map((c: any) => c.label)}
                        />
                        <MetaRow
                            type="Tag"
                            values={tags?.map((t: any) => t.label)}
                        />
                    </div>
                </div>

                <Separator />

                <RecipeImage src={imgPreviewUrl?.base64String} />

                <div className="space-y-4 p-4">
                    <SectionWrapper title="Description">
                        <RecipeDescription desc={description} />
                    </SectionWrapper>

                    <Separator />

                    <SectionWrapper title="Time & Serving">
                        <div className="grid grid-cols-4 gap-2">
                            <StatCard
                                label="Prep time"
                                value={prepTime ? `${prepTime} min` : null}
                            />
                            <StatCard
                                label="Cook time"
                                value={cookTime ? `${cookTime} min` : null}
                            />
                            <StatCard
                                label="Waiting time"
                                value={
                                    passiveTime ? `${passiveTime} min` : null
                                }
                            />
                            <StatCard
                                label="Serving"
                                value={serving ? `${serving} person` : null}
                            />
                        </div>
                    </SectionWrapper>

                    <Separator />
                    <SectionWrapper title="Ingredients">
                        <IngredientList ingredients={ingredients} />
                    </SectionWrapper>
                    <Separator />
                    <SectionWrapper title="Tools & equipment">
                        <ToolsList tools={tools} />
                    </SectionWrapper>
                    <Separator />
                    <SectionWrapper title="Step-by-Step Instructions">
                        <StepsList steps={steps} />
                    </SectionWrapper>
                    <Separator />
                    <SectionWrapper title="Tips & tricks">
                        <TipsList tips={tips} />
                    </SectionWrapper>
                </div>
            </CardContent>
        </Card>
    )
}

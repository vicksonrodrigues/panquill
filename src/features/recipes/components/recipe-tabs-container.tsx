'use client'

import React, { Suspense, useRef } from 'react'
import { EyeIcon, Form } from 'lucide-react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RecipeFormValues, recipeSchema } from '../validation'
import { RecipeEditorTab } from './editor/recipe-editor-tab'
import RecipePreviewTab from './preview/recipe-preview-tab'

export function RecipeTabsContainer() {
    const form = useForm<RecipeFormValues>({
        resolver: zodResolver(recipeSchema),
        defaultValues: {
            title: '',
            description: '',
            imgPreviewUrl: null,
            imgUrl: '',
            course: null,
            cuisine: [],
            tags: [],
            prepTime: 0,
            cookTime: 0,
            passiveTime: 0,
            serving: 1,
            tools: [],
            ingredients: [{ ingredient: null, quantity: '' }],
            steps: [{ stepNo: 1, step: '' }],
            tips: [{ tipNo: 1, tip: '' }],
            isPublished: false,
            isAdminRecipe: false,
        } as RecipeFormValues,
    })

    const onSubmit: SubmitHandler<RecipeFormValues> = (data) => {
        console.log('Submit Data', data)
    }

    return (
        <div className="flex w-full flex-col space-y-2">
            <FormProvider {...form}>
                <Tabs defaultValue="Form">
                    <TabsList>
                        <TabsTrigger value="Form" aria-label="Toggle Form">
                            <Form />
                            Form
                        </TabsTrigger>
                        <TabsTrigger
                            value="Preview"
                            aria-label="Toggle Preview"
                        >
                            <EyeIcon />
                            Preview
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="Form">
                        <Suspense fallback={<div>Loading...</div>}>
                            <RecipeEditorTab onSubmit={onSubmit} />
                        </Suspense>
                    </TabsContent>
                    <TabsContent value="Preview">
                        <RecipePreviewTab />
                    </TabsContent>
                </Tabs>
            </FormProvider>
        </div>
    )
}

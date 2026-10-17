'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { FullRecipeView } from '../../types'
import RecipeTitle from './ui/RecipeTitle'
import RecipeDescription from './ui/RecipeDescription'
import StatCard from './ui/StatCard'
import MetaRow from './ui/MetaRow'

import { RecipeImage } from './ui/RecipeImage'
import IngredientList from './ui/IngredientList'
import { Clock, Flame, Heart, RotateCwFadingClock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import RatingComponent from './ui/RatingComponent'
import ViewCountComponent from './ui/ViewCountComponent'
import ToolsList from './ui/ToolsList'
import StepsList from './ui/StepsList'
import TipsList from './ui/TipsList'
import {
    registerRecipeView,
    registerRecipeVisit,
    toggleFavouriteRecipe,
} from '../../actions'
import { MIN_SAVE_DURATION, RECOUNT_TIME } from '@/data/constantVariables'
import { useAuth } from '@clerk/nextjs'

export default function RecipeFullView({
    fullRecipeData,
}: {
    fullRecipeData: FullRecipeView
}) {
    const {
        title,
        description,
        prepTime,
        cookTime,
        servings,
        passiveTime,
        course,
        recipeCuisines,
        recipeTags,
        imageUrl,
        averageRating,
        ratingCount,
        viewCount,
        isFavouritedByCurrentUser,
        recipeIngredients,
        recipeTools,
        steps,
        tips,
        id,
        favouriteCount,
        currentUserRating,
    } = fullRecipeData!
    const [checkedIngredients, setCheckedIngredients] = useState<
        Record<string, boolean>
    >({})
    const [checkedTools, setCheckedTools] = useState<Record<string, boolean>>(
        {}
    )
    const [doneSteps, setDoneSteps] = useState<Record<number, boolean>>({})
    const [isFavourited, setIsFavourited] = useState(isFavouritedByCurrentUser)
    const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>(
        'idle'
    )

    const [currentViewCount, setViewCount] = useState(viewCount)
    const [currentFavouriteCount, setCurrentFavouriteCount] =
        useState(favouriteCount)

    const { userId } = useAuth()
    const userType = userId ?? 'guest'
    const progressKey = `recipe-progress:${userType}:${id}`
    const viewKey = `recipe-view-counted:${userType}:${id}`
    const [isPending, startTransition] = useTransition()

    const handleSaveProgress = async () => {
        try {
            sessionStorage.setItem(
                progressKey,
                JSON.stringify({
                    checkedIngredients,
                    checkedTools,
                    doneSteps,
                })
            )
            setSaveState('saved')
            setTimeout(() => setSaveState('idle'), 2000)
        } catch (err) {
            console.error('Failed to save progress', err)
            setSaveState('idle')
        }
    }

    const handleFavourite = () => {
        startTransition(async () => {
            const [result] = await Promise.all([
                toggleFavouriteRecipe(id),
                new Promise((resolve) =>
                    setTimeout(resolve, MIN_SAVE_DURATION)
                ),
            ])
            if (result.success) {
                setIsFavourited(result.isFavourited)
                setCurrentFavouriteCount(result.favouriteCount)
            }
        })
    }

    useEffect(() => {
        try {
            const savedProgress = sessionStorage.getItem(progressKey)
            if (savedProgress) {
                const { checkedIngredients, checkedTools, doneSteps } =
                    JSON.parse(savedProgress)

                // eslint-disable-next-line react-hooks/set-state-in-effect
                setCheckedIngredients(checkedIngredients ?? {})
                setCheckedTools(checkedTools ?? {})
                setDoneSteps(doneSteps ?? {})
            }
        } catch (error) {
            console.error('Failed to restore recipe progress', error)
        }
    }, [progressKey])

    useEffect(() => {
        registerRecipeVisit(id)
            .then((recipe) => {
                console.log('RecipeView', recipe)
            })
            .catch(console.error)
    }, [id])

    useEffect(() => {
        const lastCounted = sessionStorage.getItem(viewKey)
        const isStale =
            !lastCounted || Date.now() - Number(lastCounted) > RECOUNT_TIME

        if (!isStale) {
            console.log('View already counted')
            return
        }

        const timer = setTimeout(() => {
            registerRecipeView(id)
                .then(({ viewCount }) => {
                    setViewCount(viewCount)
                    sessionStorage.setItem(viewKey, Date.now().toString())
                })
                .catch(console.error)
        }, 15000)

        return () => clearTimeout(timer)
    }, [userType, id, viewKey])

    return (
        <section className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
            <div>
                <RecipeTitle title={title} />

                <RecipeDescription desc={description} />

                <div className="text-muted-foreground mt-4 flex items-center gap-4 text-sm">
                    <RatingComponent
                        recipeId={id}
                        averageRating={averageRating}
                        ratingCount={ratingCount}
                        userRating={currentUserRating}
                    />
                    <ViewCountComponent viewCount={currentViewCount} />
                    <span className="flex items-center gap-1.5">
                        <Heart className="size-4 text-red-500" />
                        {currentFavouriteCount ?? 0}
                    </span>
                    <Button
                        disabled={isPending}
                        variant={isFavourited ? 'destructive' : 'outline'}
                        size="sm"
                        className={`ml-auto gap-1.5 ${isFavourited && 'text-destructive-foreground'}`}
                        onClick={handleFavourite}
                    >
                        <Heart
                            className={`size-4 ${isFavourited && 'fill-destructive'}`}
                        />
                        {isPending
                            ? 'Saving…'
                            : isFavourited
                              ? 'Saved'
                              : 'Save'}
                    </Button>
                </div>
            </div>
            <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[2fr_1fr]">
                <RecipeImage src={imageUrl} className="mb-6 aspect-square" />
                <div className="flex flex-col gap-10">
                    <div className="flex flex-wrap items-center gap-2">
                        <MetaRow type="Course" value={course?.label} />
                        <MetaRow
                            type="Cuisine"
                            values={recipeCuisines?.map(
                                ({ cuisine }) => cuisine.label
                            )}
                        />
                        <MetaRow
                            type="Tag"
                            values={recipeTags?.map(({ tag }) => tag.label)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-1">
                        <StatCard
                            label="Prep time"
                            value={prepTime ? `${prepTime} min` : null}
                            Icon={Clock}
                        />
                        <StatCard
                            label="Cook time"
                            value={cookTime ? `${cookTime} min` : null}
                            Icon={Flame}
                        />
                        <StatCard
                            label="Waiting time"
                            value={passiveTime ? `${passiveTime} min` : null}
                            Icon={RotateCwFadingClock}
                        />
                        <StatCard
                            label="Serving"
                            value={servings ? `${servings} person` : null}
                            Icon={User}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
                <aside className="lg:col-span-1">
                    <div className="flex flex-col gap-6 lg:sticky lg:top-6">
                        <IngredientList
                            ingredients={recipeIngredients}
                            saveState={saveState}
                            handleSaveProgress={handleSaveProgress}
                            checkedIngredients={checkedIngredients}
                            setCheckedIngredients={setCheckedIngredients}
                        />
                        <ToolsList
                            tools={recipeTools}
                            saveState={saveState}
                            handleSaveProgress={handleSaveProgress}
                            checkedTools={checkedTools}
                            setCheckedTools={setCheckedTools}
                        />
                    </div>
                </aside>
                <main className="lg:col-span-2">
                    <StepsList
                        steps={steps}
                        saveState={saveState}
                        handleSaveProgress={handleSaveProgress}
                        doneSteps={doneSteps}
                        setDoneSteps={setDoneSteps}
                    />
                </main>
            </div>
            <TipsList tips={tips} />
        </section>
    )
}

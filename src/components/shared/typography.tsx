'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const typographyVariants = cva('', {
    variants: {
        variant: {
            // DISPLAY & HEADINGS
            // Largest text for hero sections, landing pages
            // Uses: Hero titles, main page headers
            display:
                'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',

            // Page and section headings in descending size
            // h1: Page titles (Recipe Collection, My Profile)
            h1: 'scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl',

            // h2: Major sections (Popular Recipes, Recent Activity)
            h2: 'scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl',

            // h3: Subsections (Ingredients, Instructions, Recipe card titles)
            h3: 'scroll-m-20 text-xl font-semibold tracking-tight lg:text-2xl',

            // h4: Minor headings (Nutrition Facts, Equipment)
            h4: 'scroll-m-20 text-lg font-semibold tracking-tight',

            // BODY TEXT VARIANTS
            // body: Default paragraph text (Recipe descriptions, instructions)
            // Inherits text-foreground from body tag (auto dark mode)
            body: 'text-base leading-7',

            // bodyLarge: Intro paragraphs, highlighted content
            bodyLarge: 'text-lg leading-7',

            // bodySmall: Dense content, helper text, notes
            bodySmall: 'text-sm leading-6',

            // LEAD TEXT
            // lead: Hero descriptions, page intros
            lead: 'text-xl text-muted-foreground leading-7',

            // SECTION LABELS
            // label: Small uppercase labels ("RECIPE TITLE", "INGREDIENTS")
            label: 'text-xs font-medium tracking-wider',

            // labelLarge: Slightly larger labels
            labelLarge: 'text-sm font-medium tracking-wide',

            // MUTED/SECONDARY TEXT
            // muted: Help text, placeholders ("No ingredients added")
            muted: 'text-xs text-muted-foreground ',

            // mutedLarge: Larger secondary text
            mutedLarge: 'text-base text-muted-foreground leading-7',

            // FINE PRINT
            // caption: Image captions, timestamps, metadata
            caption: 'text-xs text-muted-foreground',

            // small: Emphasized small text (badges, tags)
            small: 'text-xs font-medium leading-none',

            // INTERACTIVE ELEMENTS
            // link: Clickable links with hover underline
            link: 'text-sm font-medium text-primary underline-offset-4 hover:underline',

            // STATUS MESSAGES
            // error: Form errors, validation messages
            error: 'text-sm font-medium text-destructive',

            // success: Success messages, confirmations
            success: 'text-sm font-medium text-secondary',

            // warning: Warning messages, cautions
            warning: 'text-sm font-medium text-primary',

            // CODE VARIANTS
            // code: Inline code snippets
            code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',

            // pre: Code blocks
            pre: 'overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-sm',

            // CONTENT ELEMENTS
            // list: Unordered/ordered lists with spacing
            list: 'text-base leading-7 [&>li]:mt-2',

            // blockquote: Quoted text
            blockquote: 'mt-6 border-l-2 pl-6 italic text-muted-foreground',

            // BADGES & PILLS
            // badge: Text inside badges/pills (Course, Cuisine tags)
            badge: 'text-xs font-medium',

            // STATS & NUMBERS
            // stat: Large numbers (ratings, counts, times)
            stat: 'text-lg font-bold tracking-tight lg:text-xl',

            // statLabel: Labels under stats ("Total Time", "Servings")
            statLabel: 'text-xs text-muted-foreground uppercase tracking-wider',

            // CARD COMPONENTS
            // cardTitle: Card header titles
            cardTitle: 'text-lg font-semibold leading-none tracking-tight',

            // cardDescription: Card subtitles/descriptions
            cardDescription: 'text-sm text-muted-foreground',

            // EMPTY STATES
            // emptyTitle: Empty state headings ("No recipes found")
            emptyTitle: 'text-base font-medium',

            // emptyDescription: Empty state descriptions
            emptyDescription: 'text-sm text-muted-foreground',
        },
    },
    defaultVariants: {
        variant: 'body',
    },
})

// Maps each variant to its semantic HTML element
// Override with 'as' prop when needed: <Typography variant="lead" as="div" />
const elementMap = {
    display: 'h1',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    body: 'p',
    bodyLarge: 'p',
    bodySmall: 'p',
    lead: 'p',
    label: 'span',
    labelLarge: 'span',
    muted: 'p',
    mutedLarge: 'p',
    caption: 'span',
    small: 'span',
    link: 'a',
    error: 'p',
    success: 'p',
    warning: 'p',
    code: 'code',
    pre: 'pre',
    list: 'ul',
    blockquote: 'blockquote',
    badge: 'span',
    stat: 'p',
    statLabel: 'p',
    cardTitle: 'h3',
    cardDescription: 'p',
    emptyTitle: 'p',
    emptyDescription: 'p',
} as const

type Variant = keyof typeof elementMap

export interface TypographyProps
    extends
        React.HTMLAttributes<HTMLElement>,
        VariantProps<typeof typographyVariants> {
    as?: React.ElementType
}

/**
 * Typography Component
 *
 * Provides consistent text styling using only colors from globals.css.
 * All color variants automatically support dark mode via CSS variables.
 *
 * Usage:
 * <Typography variant="h1">Page Title</Typography>
 * <Typography variant="label" className="uppercase">Section Label</Typography>
 * <Typography variant="muted">Helper text</Typography>
 *
 * Colors used (all from globals.css):
 * - text-foreground (default, inherits from body)
 * - text-muted-foreground (secondary text)
 * - text-primary (links, warnings - orange/amber)
 * - text-secondary (success messages - green)
 * - text-destructive (errors - red)
 * - bg-muted (code backgrounds)
 * - border (code blocks)
 */
export function Typography({
    variant = 'body',
    className,
    as,
    ...props
}: TypographyProps) {
    const Component = as || elementMap[variant as Variant] || 'p'

    return (
        <Component
            className={cn(typographyVariants({ variant }), className)}
            {...props}
        />
    )
}

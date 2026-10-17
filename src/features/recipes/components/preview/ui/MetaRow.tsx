import { Typography } from '@/components/shared/typography'
import { Badge } from '@/components/ui/badge'
import { ChefHat, Globe, LucideIcon, TagIcon } from 'lucide-react'
import React from 'react'

type MetaType = 'Course' | 'Cuisine' | 'Tag'

const BadgeIcons: Record<MetaType, LucideIcon> = {
    Course: ChefHat,
    Cuisine: Globe,
    Tag: TagIcon,
}
type MetaRowProps = {
    type: MetaType
    value?: string
    values?: string[]
}

export default function MetaRow({ type, value, values }: MetaRowProps) {
    const items = values ?? (value ? [value] : [])
    const MetaIcon = BadgeIcons[type]
    return (
        <>
            {items.map((item, i) => (
                <Badge
                    key={`${type}-badge-${i}`}
                    className="bg-muted text-muted-foreground gap-2 p-3 text-sm"
                >
                    <MetaIcon className="size-3 shrink-0" />
                    {item}
                </Badge>
            ))}
        </>
    )
}

// {/* <Typography variant={'muted'}>
//                             No course selected
//                         </Typography> */}

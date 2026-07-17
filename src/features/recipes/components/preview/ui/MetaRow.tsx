import { Typography } from '@/components/shared/typography'
import { Badge } from '@/components/ui/badge'
import React from 'react'

type MetaRowProps = {
    label: string
    value?: string
    values?: string[]
    emptyText: string
}

export default function MetaRow({
    label,
    value,
    values,
    emptyText,
}: MetaRowProps) {
    const items = values ?? (value ? [value] : [])
    return (
        <div className="flex items-center gap-2">
            <Typography
                variant={'label'}
                className="w-14 shrink-0 pt-0.5 uppercase"
            >
                {label}
            </Typography>
            {items.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                    {items.map((item, i) => (
                        <Badge
                            key={`${label}-badge-${i}`}
                            className="bg-muted text-muted-foreground"
                        >
                            {item}
                        </Badge>
                    ))}
                </div>
            ) : (
                <span className="text-muted-foreground/50 text-xs">
                    {emptyText}
                </span>
            )}
        </div>
    )
}

// {/* <Typography variant={'muted'}>
//                             No course selected
//                         </Typography> */}

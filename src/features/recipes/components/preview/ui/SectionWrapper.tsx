import { Typography } from '@/components/shared/typography'
import React from 'react'

type SectionWrapperProps = {
    title: string
    children: React.ReactNode
}

export default function SectionWrapper({
    title,
    children,
}: SectionWrapperProps) {
    return (
        <div className="space-y-2">
            <Typography as={'p'} variant={'labelLarge'} className="uppercase">
                {title}
            </Typography>
            {children}
        </div>
    )
}

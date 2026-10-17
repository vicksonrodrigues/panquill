import { Typography } from '@/components/shared/typography'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { LucideIcon } from 'lucide-react'
import React from 'react'

type StatCardProps = {
    label: string
    value: string | null
    Icon?: LucideIcon
}

export default function StatCard({ label, value, Icon }: StatCardProps) {
    return (
        <Card className="justify-around rounded-lg py-2.5 text-center">
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center justify-center gap-1">
                        {Icon && <Icon size={16} />}
                        <Typography variant={'statLabel'}>{label}</Typography>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardDescription>
                {value ? (
                    <Typography variant={'stat'}>{value}</Typography>
                ) : (
                    <Skeleton className="mx-auto h-4 w-1/2" />
                )}
            </CardDescription>
        </Card>
    )
}

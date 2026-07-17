import { Typography } from '@/components/shared/typography'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type StatCardProps = {
    label: string
    value?: string | null
}

export default function StatCard({ label, value }: StatCardProps) {
    return (
        <Card className="justify-between rounded-lg p-2.5 text-center">
            <CardHeader>
                <CardTitle>
                    <Typography variant={'statLabel'}>{label}</Typography>
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import React from 'react'
import { CookbookSort } from '../../../types'
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { SlidersHorizontal, Star, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { FilterGroup } from './components/FilterGroup'
import { GroupSearch } from './components/GroupSearch'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

const SORT_LABELS: Record<CookbookSort, string> = {
    popular: 'Most popular',
    newest: 'Newest',
    quickest: 'Quickest',
}

const RATING_BUCKETS = [
    { label: '4+ stars', value: 4 },
    { label: '3+ stars', value: 3 },
    { label: '2+ stars', value: 3 },
]

export default function CookbookFilters() {
    const [ratingSearch, setRatingSearch] = React.useState(0)
    const activeCount = 2

    const showCourseGroup = 'course'
    const showCuisineGroup = 'cuisine'
    const showTagsGroup = 'tag'
    return (
        <div className="flex flex-wrap items-center gap-3">
            <Select>
                <SelectTrigger className="w-[160px] rounded-full">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(SORT_LABELS).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                            {label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Sheet>
                <SheetTrigger
                    render={
                        <Button
                            variant={'outline'}
                            className={'gap-2 rounded-full'}
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                            Filter
                            {activeCount > 0 && (
                                <Badge className="rounded-full px-1.5">
                                    {activeCount}
                                </Badge>
                            )}
                        </Button>
                    }
                />
                <SheetContent side="right" className="w-full max-w-sm">
                    <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="space-y-6 overflow-y-auto p-4">
                        {showCourseGroup && (
                            <FilterGroup title="Course">
                                <GroupSearch placeholder="Search courses..." />
                            </FilterGroup>
                        )}
                        {showCuisineGroup && (
                            <FilterGroup title="Cuisine">
                                <GroupSearch placeholder="Search cuisine..." />
                            </FilterGroup>
                        )}
                        {showTagsGroup && (
                            <FilterGroup title="Tags">
                                <GroupSearch placeholder="Search tags..." />
                            </FilterGroup>
                        )}
                        <FilterGroup title="Total Time">
                            <Slider
                                value={ratingSearch}
                                onValueChange={(value) =>
                                    setRatingSearch(value as number)
                                }
                                min={0}
                                max={90}
                                step={30}
                            />
                            {ratingSearch > 0 && (
                                <span>Under {ratingSearch} mins</span>
                            )}
                        </FilterGroup>
                        <FilterGroup title="Rating">
                            {RATING_BUCKETS.map((bucket) => (
                                <Label
                                    key={bucket.value}
                                    className="text-foreground flex items-center gap-2 text-sm font-normal"
                                >
                                    <Checkbox />
                                    <span className="flex items-center gap-1">
                                        <Star className="text-primary h-3.5 w-3.5 fill-current" />
                                        {bucket.label}
                                    </span>
                                </Label>
                            ))}
                        </FilterGroup>
                    </div>
                    <SheetFooter className="flex-row gap-2">
                        <Button variant="ghost" className="gap-1">
                            <X data-icon="inline-start" /> Clear All
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
            {activeCount > 0 && (
                <Button
                    variant="ghost"
                    size="sm"

                    className="text-muted-foreground"
                >
                    Clear filters
                </Button>
            )}
        </div>
    )
}

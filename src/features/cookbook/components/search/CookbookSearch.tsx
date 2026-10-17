import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import React from 'react'
import { CookbookSearchField } from '../../types'
import { Search } from 'lucide-react'

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group'
import CookbookFilters from './filter/CookbookFilters'

const SEARCH_FIELD_LABELS: Record<CookbookSearchField, string> = {
    all: 'All',
    course: 'Course',
    cuisine: 'Cuisine',
    tag: 'Tag',
}

const SEARCH_FIELD_PLACEHOLDERS: Record<CookbookSearchField, string> = {
    all: 'Search by name, course, cuisine, tag...',
    course: 'Search by course, e.g. Breakfast...',
    cuisine: 'Search by cuisine, e.g. French...',
    tag: 'Search by tag, e.g. Vegetarian...',
}

export default function CookbookSearch() {
    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <Select value={'All'}>
                    <SelectTrigger className={'rounded-full'}>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(SEARCH_FIELD_LABELS).map(
                            ([value, label]) => (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            )
                        )}
                    </SelectContent>
                </Select>
                <div className="flex-1">
                    <InputGroup>
                        <InputGroupInput
                            placeholder={SEARCH_FIELD_PLACEHOLDERS['all']}
                        />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </div>
            <CookbookFilters />
        </div>
    )
}

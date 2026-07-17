# Dropdown Data Server Actions

This module provides server actions for fetching dropdown data for the recipe management system.

## Available Actions

### Individual Dropdown Actions

#### `getCourses(keyword?: string): Promise<SelectOptionType[]>`
Fetches courses dropdown data with optional search.

```typescript
import { getCourses } from '@/features/recipes/actions'

// Get all courses
const courses = await getCourses()

// Search courses
const filteredCourses = await getCourses('breakfast')
```

#### `getCuisines(keyword?: string): Promise<SelectOptionType[]>`
Fetches cuisines dropdown data with optional search.

```typescript
import { getCuisines } from '@/features/recipes/actions'

const cuisines = await getCuisines('italian')
```

#### `getIngredients(keyword?: string): Promise<SelectOptionType[]>`
Fetches ingredients dropdown data with optional search.

```typescript
import { getIngredients } from '@/features/recipes/actions'

const ingredients = await getIngredients('tomato')
```

#### `getTags(keyword?: string): Promise<SelectOptionType[]>`
Fetches tags dropdown data with optional search.

```typescript
import { getTags } from '@/features/recipes/actions'

const tags = await getTags('vegan')
```

#### `getTools(keyword?: string): Promise<SelectOptionType[]>`
Fetches tools dropdown data with optional search.

```typescript
import { getTools } from '@/features/recipes/actions'

const tools = await getTools('blender')
```

### Combined Action

#### `getAllDropdownData(keyword?: string): Promise<DropdownData>`
Fetches all dropdown data in a single call.

```typescript
import { getAllDropdownData } from '@/features/recipes/actions'

// Get all dropdown data at once
const dropdownData = await getAllDropdownData()

// Access individual dropdowns
dropdownData.courses
dropdownData.cuisines
dropdownData.ingredients
dropdownData.tags
dropdownData.tools

// Search across all dropdowns
const filteredData = await getAllDropdownData('italian')
```

## Return Type Format

All actions return data in the standard dropdown format:

```typescript
interface SelectOptionType {
  id: string;           // UUID from database
  label: string;        // Display name (e.g., "Italian Cuisine")
  value: string;        // Normalized name for matching (e.g., "italian-cuisine")
}
```

## React Component Example

```typescript
'use client'

import { getCourses } from '@/features/recipes/actions'
import { useEffect, useState } from 'react'

export function CourseDropdown() {
  const [courses, setCourses] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await getCourses()
        setCourses(data)
      } catch (error) {
        console.error('Failed to load courses:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCourses()
  }, [])

  if (loading) return <div>Loading courses...</div>

  return (
    <select>
      {courses.map((course) => (
        <option key={course.id} value={course.value}>
          {course.label}
        </option>
      ))}
    </select>
  )
}
```

## Search Functionality

All actions support optional keyword search:

```typescript
// Search for courses containing "breakfast"
const breakfastCourses = await getCourses('breakfast')

// Search for ingredients containing "chicken"
const chickenIngredients = await getIngredients('chicken')

// Case-insensitive partial matching
const results = await getCuisines('mex') // matches "Mexican"
```

## Performance Notes

- Individual actions: Use when you only need specific dropdown data
- `getAllDropdownData`: Use when you need multiple dropdowns (uses parallel queries)
- Search is performed at database level for optimal performance
- Results are returned in the format ready for most UI component libraries

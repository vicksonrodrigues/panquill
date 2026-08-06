# Prisma ORM Cheatsheet (TypeScript + PostgreSQL)

## Setup & Client
```ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Cleanup
await prisma.$disconnect()
```

---

## SIGNATURES

### Create
```ts
prisma.user.create(args: {
  data: UserCreateInput
  select?: UserSelect
  include?: UserInclude
}): Promise<User>
```

### FindUnique
```ts
prisma.user.findUnique(args: {
  where: UserWhereUniqueInput
  select?: UserSelect
  include?: UserInclude
}): Promise<User | null>
```

### FindMany
```ts
prisma.user.findMany(args?: {
  where?: UserWhereInput
  orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: UserScalarFieldEnum[]
  select?: UserSelect
  include?: UserInclude
}): Promise<User[]>
```

### Update
```ts
prisma.user.update(args: {
  data: UserUpdateInput
  where: UserWhereUniqueInput
  select?: UserSelect
  include?: UserInclude
}): Promise<User>
```

### UpdateMany
```ts
prisma.user.updateMany(args: {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}): Promise<{ count: number }>
```

### Delete
```ts
prisma.user.delete(args: {
  where: UserWhereUniqueInput
  select?: UserSelect
  include?: UserInclude
}): Promise<User>
```

### DeleteMany
```ts
prisma.user.deleteMany(args?: {
  where?: UserWhereInput
}): Promise<{ count: number }>
```

### Upsert
```ts
prisma.user.upsert(args: {
  where: UserWhereUniqueInput
  update: UserUpdateInput
  create: UserCreateInput
  select?: UserSelect
  include?: UserInclude
}): Promise<User>
```

### FindFirst
```ts
prisma.user.findFirst(args?: {
  where?: UserWhereInput
  orderBy?: UserOrderByWithRelationInput[]
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: UserScalarFieldEnum[]
  select?: UserSelect
  include?: UserInclude
}): Promise<User | null>
```

### Count
```ts
prisma.user.count(args?: {
  where?: UserWhereInput
  orderBy?: UserOrderByWithRelationInput[]
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  select?: CountUserArgs
}): Promise<number>
```

### Aggregate
```ts
prisma.user.aggregate(args: {
  where?: UserWhereInput
  orderBy?: UserOrderByWithRelationInput[]
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  _count?: true | UserCountAggregateInputType
  _avg?: UserAvgAggregateInputType
  _sum?: UserSumAggregateInputType
  _min?: UserMinAggregateInputType
  _max?: UserMaxAggregateInputType
}): Promise<AggregateUser>
```

### GroupBy
```ts
prisma.user.groupBy(args: {
  by: (keyof User)[]
  where?: UserWhereInput
  orderBy?: UserOrderByWithAggregationInput[]
  having?: UserScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: CountUserArgs | true
  _avg?: UserAvgAggregateInputType
  _sum?: UserSumAggregateInputType
  _min?: UserMinAggregateInputType
  _max?: UserMaxAggregateInputType
}): Promise<GroupByUserOutputType[]>
```

---

## CREATE

### Single Record
```ts
const user = await prisma.user.create({
  data: {
    email: 'test@example.com',
    name: 'John',
    age: 30,
  },
})
```

### Multiple Records
```ts
const users = await prisma.user.createMany({
  data: [
    { email: 'a@ex.com', name: 'Alice' },
    { email: 'b@ex.com', name: 'Bob' },
  ],
  skipDuplicates: true, // ignore duplicate unique constraints
})
```

### Create with Relations (Nested)
```ts
const user = await prisma.user.create({
  data: {
    email: 'test@example.com',
    posts: {
      create: [
        { title: 'Post 1', content: 'Content 1' },
        { title: 'Post 2', content: 'Content 2' },
      ],
    },
  },
  include: { posts: true },
})
```

### Create or Connect Relations
```ts
const post = await prisma.post.create({
  data: {
    title: 'New Post',
    author: {
      connect: { id: 5 }, // connect to existing
      // OR create: { email: 'new@ex.com' }
    },
  },
})
```

---

## READ

### Find Unique (by primary key or unique field)
```ts
const user = await prisma.user.findUnique({
  where: { id: 1 },
  // OR: where: { email: 'test@ex.com' }
})

// findUniqueOrThrow() - throws if not found
const user = await prisma.user.findUniqueOrThrow({
  where: { id: 1 },
})
```

### Find First (first matching record)
```ts
const user = await prisma.user.findFirst({
  where: { age: { gt: 18 } },
  orderBy: { createdAt: 'desc' },
})

// findFirstOrThrow()
const user = await prisma.user.findFirstOrThrow({
  where: { name: 'John' },
})
```

### Find Many (all matching)
```ts
const users = await prisma.user.findMany({
  where: {
    age: { gte: 18 },
    email: { contains: '@gmail.com' },
  },
  select: { id: true, name: true, email: true }, // pick fields
  orderBy: { createdAt: 'desc' },
  skip: 0,
  take: 10, // limit
})
```

### Count
```ts
const count = await prisma.user.count({
  where: { age: { gte: 18 } },
})
```

### Aggregation
```ts
const stats = await prisma.user.aggregate({
  where: { active: true },
  _count: true,
  _avg: { age: true },
  _sum: { points: true },
  _min: { createdAt: true },
  _max: { salary: true },
})
```

### Group By
```ts
const groups = await prisma.user.groupBy({
  by: ['department'],
  _count: { id: true },
  _avg: { salary: true },
  where: { active: true },
  orderBy: { _count: { id: 'desc' } },
})
```

### With Relations
```ts
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: true,
    profile: true,
  },
})

// Select specific relation fields
const user = await prisma.user.findUnique({
  where: { id: 1 },
  select: {
    id: true,
    name: true,
    posts: {
      select: { id: true, title: true },
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    },
  },
})
```

---

## UPDATE

### Single Record
```ts
const user = await prisma.user.update({
  where: { id: 1 },
  data: {
    name: 'Jane',
    age: 31,
  },
})
```

### Upsert (create if not exists)
```ts
const user = await prisma.user.upsert({
  where: { email: 'test@ex.com' },
  update: { name: 'Updated' },
  create: { email: 'test@ex.com', name: 'New User' },
})
```

### Multiple Records
```ts
const updated = await prisma.user.updateMany({
  where: { active: false },
  data: { status: 'inactive' },
})
// Returns: { count: number }
```

### Increment/Decrement
```ts
await prisma.user.update({
  where: { id: 1 },
  data: {
    points: { increment: 10 },
    // OR: { decrement: 5 }
    // OR: { multiply: 2 }
    // OR: { divide: 2 }
  },
})
```

### Update with Relations
```ts
const user = await prisma.user.update({
  where: { id: 1 },
  data: {
    posts: {
      create: { title: 'New Post' },
      // OR: connect: { id: 2 }
      // OR: disconnect: { id: 3 }
      // OR: delete: { id: 4 }
      // OR: update: { where: { id: 5 }, data: { title: 'Updated' } }
    },
  },
  include: { posts: true },
})
```

---

## DELETE

### Single Record
```ts
const user = await prisma.user.delete({
  where: { id: 1 },
})
```

### Multiple Records
```ts
const deleted = await prisma.user.deleteMany({
  where: { inactive: true },
})
// Returns: { count: number }
```

---

## WHERE Conditions

### Operators
```ts
where: {
  age: { equals: 30 },       // = 30
  age: { not: 30 },          // != 30
  age: { in: [25, 30, 35] }, // IN (25, 30, 35)
  age: { notIn: [25, 30] },  // NOT IN (25, 30)
  
  age: { lt: 30 },           // < 30
  age: { lte: 30 },          // <= 30
  age: { gt: 30 },           // > 30
  age: { gte: 30 },          // >= 30
  
  name: { contains: 'john' },    // LIKE %john%
  name: { startsWith: 'jo' },    // LIKE jo%
  name: { endsWith: 'hn' },      // LIKE %hn
  name: { mode: 'insensitive' }, // case-insensitive
  
  createdAt: { gte: new Date('2024-01-01') },
  
  // Logical
  AND: [{ age: { gte: 18 } }, { active: true }],
  OR: [{ admin: true }, { moderator: true }],
  NOT: { status: 'banned' },
}
```

### Null Checks
```ts
where: {
  name: null,     // IS NULL
  name: { not: null }, // IS NOT NULL
}
```

### Relation Filters
```ts
where: {
  posts: {
    some: { published: true },    // has at least one matching
    none: { deleted: true },      // has none matching
    every: { published: true },   // all matching
  },
}
```

---

## FILTERS

### String Filters
```ts
where: {
  email: {
    equals: 'test@ex.com',
    contains: 'gmail',
    startsWith: 'admin',
    endsWith: '@ex.com',
    mode: 'insensitive',         // case-insensitive
    search: 'john',              // PostgreSQL full-text
  },
}
```

### Numeric Filters
```ts
where: {
  age: {
    equals: 30,
    not: 30,
    in: [25, 30, 35],
    notIn: [20, 25],
    lt: 30,                       // <
    lte: 30,                      // <=
    gt: 30,                       // >
    gte: 30,                      // >=
  },
}
```

### Date Filters
```ts
where: {
  createdAt: {
    equals: new Date('2024-01-01'),
    in: [date1, date2],
    notIn: [date1],
    lt: new Date('2024-12-31'),
    lte: new Date('2024-12-31'),
    gt: new Date('2024-01-01'),
    gte: new Date('2024-01-01'),
  },
}
```

### Boolean Filters
```ts
where: {
  active: true,
  // OR
  published: { equals: false },
  // OR
  verified: { not: true },
}
```

### JSON Filters (PostgreSQL)
```ts
where: {
  metadata: {
    equals: { color: 'red', size: 'large' },
    path: ['color'],             // search nested key
  },
}

// Raw query for complex JSON
const users = await prisma.$queryRaw`
  SELECT * FROM "User" 
  WHERE metadata->>'color' = 'red'
`
```

### Array Filters (PostgreSQL)
```ts
where: {
  tags: {
    equals: ['a', 'b'],          // exact match
    has: 'admin',                // contains element
    hasEvery: ['admin', 'user'],
    hasSome: ['admin', 'user'],
    isEmpty: false,
  },
}
```

### Composite Filters
```ts
where: {
  AND: [
    { age: { gte: 18 } },
    { country: 'USA' },
  ],
  OR: [
    { role: 'admin' },
    { role: 'moderator' },
  ],
  NOT: { status: 'banned' },
}
```

### IN / NOT IN
```ts
where: {
  id: { in: [1, 2, 3, 4, 5] },
  email: { notIn: ['spam@ex.com', 'bot@ex.com'] },
}
```

### NULL Checks
```ts
where: {
  deletedAt: null,               // IS NULL
  deletedAt: { not: null },      // IS NOT NULL
}
```

### Between (combined operators)
```ts
where: {
  age: {
    gte: 18,
    lte: 65,
  },
  createdAt: {
    gte: startDate,
    lte: endDate,
  },
}
```

### Search Filter (Full-Text)
```ts
where: {
  // Postgres: requires search index
  OR: [
    { title: { search: 'prisma' } },
    { content: { search: 'database' } },
  ],
}
```

### Has Relations Count
```ts
where: {
  posts: {
    some: {},                    // has at least 1
  },
}

// With count
const user = await prisma.user.findFirst({
  where: {
    posts: { some: { published: true } },
  },
  select: {
    id: true,
    _count: { select: { posts: true } },
  },
})
```

---

## TRANSACTIONS

### Sequential
```ts
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ data: { email: 'a@ex.com' } })
  const post = await tx.post.create({ 
    data: { title: 'Post', authorId: user.id } 
  })
  return { user, post }
})
```

### Atomic (all or nothing)
```ts
const result = await prisma.$transaction([
  prisma.user.create({ data: { email: 'a@ex.com' } }),
  prisma.user.create({ data: { email: 'b@ex.com' } }),
])
```

### Rollback on Error
```ts
try {
  await prisma.$transaction(async (tx) => {
    await tx.user.update({ where: { id: 1 }, data: { balance: -100 } })
    if (insufficientFunds) throw new Error('Not enough balance')
    await tx.user.update({ where: { id: 2 }, data: { balance: 100 } })
  })
} catch (err) {
  // Both operations rolled back
}
```

---

## RAW QUERIES

### Query Rows
```ts
const users = await prisma.$queryRaw`
  SELECT * FROM "User" WHERE age > ${18}
`
```

### Query Single Value
```ts
const count = await prisma.$queryRawUnsafe(
  'SELECT COUNT(*) FROM "User" WHERE age > ?',
  [18]
)
```

### Execute SQL
```ts
await prisma.$executeRaw`
  UPDATE "User" SET points = points + 10 WHERE id = ${1}
`
```

---

## COMMON PATTERNS

### Pagination
```ts
const page = 1
const pageSize = 10
const users = await prisma.user.findMany({
  skip: (page - 1) * pageSize,
  take: pageSize,
  orderBy: { id: 'asc' },
})
```

### Soft Delete
```ts
const user = await prisma.user.update({
  where: { id: 1 },
  data: { deletedAt: new Date() },
})

// Query
const user = await prisma.user.findUnique({
  where: { id: 1, deletedAt: null },
})
```

### Batch Operations
```ts
const ids = [1, 2, 3, 4, 5]
const users = await prisma.user.updateMany({
  where: { id: { in: ids } },
  data: { status: 'active' },
})
```

### Full-Text Search (PostgreSQL)
```ts
const posts = await prisma.$queryRaw`
  SELECT * FROM "Post" 
  WHERE to_tsvector('english', title) @@ plainto_tsquery('english', ${query})
`
```

### Distinct
```ts
const departments = await prisma.user.findMany({
  distinct: ['department'],
  select: { department: true },
})
```

---

## PERFORMANCE TIPS

1. **Use `select` over `include`** - only fetch needed fields
2. **Batch queries** - use `createMany`, `updateMany`, `deleteMany`
3. **Avoid N+1** - use `include` or nested queries
4. **Use transactions** - for related multi-step operations
5. **Add indexes** - on frequently filtered/sorted columns
6. **Avoid large `take`** - paginate instead
7. **Use raw queries** - for complex operations (GROUP BY, window functions)

---

## TYPE SAFETY

```ts
// Get types from Prisma
type User = Prisma.UserGetPayload<typeof userSelect>
type Post = Prisma.PostGetPayload<{
  include: { author: true }
}>

// Use in functions
const userSelect = Prisma.validator<Prisma.UserFindManyArgs>()({
  select: { id: true, email: true },
})

const users = await prisma.user.findMany(userSelect)
```

---

## DEBUGGING

```ts
// Enable query logging
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

// Or at runtime
prisma.$on('query', (e) => {
  console.log('Query:', e.query)
  console.log('Duration:', e.duration, 'ms')
})
```

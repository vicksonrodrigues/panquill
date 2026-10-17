import { ArrowRight, Check, Clock, Eye, Heart } from 'lucide-react'

interface RecipeCardBodyProps {
    title: string
    description: string
    course: string
    cuisines: string[]
    tags: string[]
    totalMins: number
    viewCount: number
    saveCount: number
    author: { name: string; isAdminRecipe: boolean }
}

function formatCount(n: number) {
    return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`
}

export function RecipeCardBody({
    title,
    description,
    course,
    cuisines,
    tags,
    totalMins,
    viewCount,
    saveCount,
    author,
}: RecipeCardBodyProps) {
    return (
        <div className="flex flex-1 flex-col gap-2 p-3.5">
            <h3 className="text-card-foreground text-sm font-bold">{title}</h3>

            <p className="text-muted-foreground line-clamp-2 min-h-[36px] text-xs leading-relaxed">
                {description}
            </p>

            <div className="flex flex-col gap-1.5">
                <div className="flex gap-1.5">
                    <span className="bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-[10px] font-semibold">
                        {course}
                    </span>
                    {cuisines!.map((cuisine, i) => (
                        <span
                            key={i}
                            className="bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-[10px] font-semibold"
                        >
                            {cuisine}
                        </span>
                    ))}
                    {tags!.map((tag, i) => (
                        <span
                            key={i}
                            className="bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-[10px] font-semibold"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="text-muted-foreground flex items-center gap-1.5 text-[11.5px]">
                <Clock className="size-3" />
                {totalMins} mins
            </div>

            <div className="text-muted-foreground flex gap-3 text-[11px]">
                <span className="inline-flex items-center gap-1">
                    <Eye className="text-secondary size-3" />
                    {formatCount(viewCount)}
                </span>
                <span className="inline-flex items-center gap-1">
                    <Heart className="size-3 text-red-500" />
                    {formatCount(saveCount)}
                </span>
            </div>

            <div className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
                {!author.isAdminRecipe && (
                    <span className="bg-primary size-4 flex-shrink-0 rounded-full" />
                )}
                <span className="font-semibold">{author.name}</span>
                {author.isAdminRecipe && (
                    <span className="flex size-3 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                        <Check
                            className="size-[7px] text-white"
                            strokeWidth={4}
                        />
                    </span>
                )}
            </div>

            <span className="bg-primary text-primary-foreground hover:bg-primary/90 mt-auto inline-flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-bold transition-colors">
                View Recipe
                <ArrowRight className="size-3" />
            </span>
        </div>
    )
}

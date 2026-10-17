export function FilterGroup({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <div className="space-y-3">
            <h4 className="text-foreground text-sm font-medium">{title}</h4>
            {children}
        </div>
    )
}

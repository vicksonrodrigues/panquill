import React from 'react'

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <section>
            <div className="@container/main m-4">{children}</div>
        </section>
    )
}

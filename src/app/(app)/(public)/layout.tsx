import React from 'react'

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <section className="@container/main mx-4">{children}</section>
}

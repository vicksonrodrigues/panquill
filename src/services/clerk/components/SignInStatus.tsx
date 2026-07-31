import { ReactNode, Suspense } from 'react'
import { Show as ClerkShow } from '@clerk/nextjs'

export function SignedOut({ children }: { children: ReactNode }) {
    return (
        <Suspense>
            <ClerkShow when="signed-out">{children}</ClerkShow>
        </Suspense>
    )
}

export function SignedIn({ children }: { children: ReactNode }) {
    return (
        <Suspense>
            <ClerkShow when="signed-in">{children}</ClerkShow>
        </Suspense>
    )
}

import { ReactNode } from 'react'

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="px-4 py-8 w-full sm:w-4/5 md:w-3/5 lg:w-2/5 mx-auto">
            {children}
        </div>
    )
}

import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex justify-center items-center p-2">
            <div className="p-4 w-full sm:w-4/5 md:w-3/5 lg:w-2/5 bg-blue-50 rounded-sm">
                {children}
            </div>
        </div>
    )
}

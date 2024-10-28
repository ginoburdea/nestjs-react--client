import Link from 'next/link'
import './globals.css'

interface Menu {
    title: string
    link: string
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const menus: Menu[] = [
        {
            title: 'Acasa',
            link: '/',
        },
        {
            title: 'Acasa admin',
            link: '/admin',
        },
        {
            title: 'Inregistrare',
            link: '/admin/inregistrare',
        },
        {
            title: 'Autentificare',
            link: '/admin/autentificare',
        },
    ]

    return (
        <html lang="en">
            <body>
                <nav className="bg-blue-50 p-4 mb-4 text-sm sticky top-0 shadow-sm z-50">
                    <div className="gap-4 items-center justify-center sm:flex hidden">
                        {menus.map(menu => (
                            <Link
                                key={menu.title}
                                href={menu.link}
                                className="hover:underline"
                            >
                                {menu.title}
                            </Link>
                        ))}
                    </div>
                </nav>
                <main>{children}</main>
            </body>
        </html>
    )
}

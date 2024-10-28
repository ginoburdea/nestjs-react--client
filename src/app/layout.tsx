'use client'
import Link from 'next/link'
import './globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useState } from 'react'
import clsx from 'clsx'

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

    const [menuOpen, setMenuOpen] = useState(false)

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

                    <div className="sm:hidden text-right">
                        <p>
                            <a
                                className="hover:underline"
                                onClick={() => setMenuOpen(open => !open)}
                            >
                                <span className="mr-2">Meniu</span>
                                <i className="bi bi-list text-xl align-middle"></i>
                            </a>
                        </p>
                        {menuOpen && (
                            <div className="pt-4 border-t-[1px] border-gray-300 mt-4">
                                {menus.map((menu, menuIndex) => (
                                    <p
                                        key={menu.title}
                                        className={clsx(
                                            menuIndex !== menus.length - 1 &&
                                                'mb-3'
                                        )}
                                    >
                                        <Link
                                            href={menu.link}
                                            className="hover:underline"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            {menu.title}
                                        </Link>
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>
                <main>{children}</main>
            </body>
        </html>
    )
}

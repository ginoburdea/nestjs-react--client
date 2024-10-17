'use client'
import Dropdown from '@/components/Dropdown'
import { useEffect, useState } from 'react'
import { getAxios } from '@/utils/getAxios'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Pagination from './Pagination'
import Projects from './Projects'
import NoProjectsMessage from './NoProjectsMessage'
import IconButton from '@/components/IconButton'
import { handleAxiosError } from '@/utils/handleAxiosError'

interface Props {
    getProjectsEndpoint: string
}

export default function ProjectsPageTemplate({ getProjectsEndpoint }: Props) {
    const [projects, setProjects] = useState([])
    const axios = getAxios()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<null | string>(null)
    const query = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const [nextPage, setNextPage] = useState<null | number>(null)
    const [prevPage, setPrevPage] = useState<null | number>(null)

    const [firstPage, setFirstPage] = useState<null | number>(null)
    const [lastPage, setLastPage] = useState<null | number>(null)

    const getProjects = async (page: number, order: string) => {
        setLoading(true)

        try {
            const res = await axios.get(getProjectsEndpoint, {
                params: { page, order },
            })

            setProjects(res.data.results)
            setNextPage(res.data.meta.nextPage)
            setPrevPage(res.data.meta.prevPage)
            setFirstPage(res.data.meta.firstPage)
            setLastPage(res.data.meta.lastPage)
        } catch (error) {
            handleAxiosError(error, router, setError)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const page = parseInt(query.get('page') || '')
        if (isNaN(page) || page < 1) {
            router.replace(pathname + '?page=1')
            return
        }

        const order = query.get('order') || ''
        if (!['newest', 'oldest'].includes(order)) {
            router.replace(pathname + `?page=${page}&order=newest`)
            return
        }

        getProjects(page, order)
    }, [query, pathname])

    const updateOrder = (order: string) => {
        const page = query.get('page') || ''
        router.push(pathname + `?page=${page}&order=${order}`)
    }

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-bold">Proiecte</h1>
                <Link href="/admin/adauga-proiect">
                    <IconButton size="lg" icon="bi-plus"></IconButton>
                </Link>
            </div>

            <div className="mb-6">
                <Dropdown
                    label="Sorteaza dupa"
                    options={[
                        { value: 'newest', label: 'Cele mai noi' },
                        { value: 'oldest', label: 'Cele mai vechi' },
                    ]}
                    value={query.get('order') || ''}
                    onChange={updateOrder}
                    name="orderBy"
                    error={null}></Dropdown>
            </div>

            {loading && <p>Incarcare...</p>}
            {!loading && error && <p className="text-red-700">{error}</p>}
            {!loading && !error && projects.length === 0 && (
                <NoProjectsMessage />
            )}
            {!loading && !error && projects.length > 0 && (
                <Projects projects={projects} />
            )}
            {!loading && !error && (
                <Pagination
                    nextPage={nextPage}
                    prevPage={prevPage}
                    firstPage={firstPage}
                    lastPage={lastPage}
                />
            )}
        </>
    )
}

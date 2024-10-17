import IconButton from '@/app/components/IconButton'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface Props {
    firstPage: number | null
    prevPage: number | null
    nextPage: number | null
    lastPage: number | null
}

export default function Pagination({
    firstPage,
    prevPage,
    nextPage,
    lastPage,
}: Props) {
    const query = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const goToPage = (page: number) => {
        const order = query.get('order') || ''
        router.push(pathname + `?page=${page}&order=${order}`)
    }

    return (
        <div className="flex justify-center items-center mt-4">
            <IconButton
                size="sm"
                icon="bi-chevron-double-left"
                disabled={parseInt(query.get('page') || '') === firstPage}
                onClick={() => goToPage(firstPage!)}></IconButton>
            <IconButton
                size="sm"
                icon="bi-chevron-left"
                onClick={() => goToPage(prevPage!)}
                disabled={prevPage === null}></IconButton>
            <p className="text-xs mx-3">Pagina {query.get('page')}</p>
            <IconButton
                size="sm"
                icon="bi-chevron-right"
                onClick={() => goToPage(nextPage!)}
                disabled={nextPage === null}></IconButton>
            <IconButton
                size="sm"
                icon="bi-chevron-double-right"
                disabled={parseInt(query.get('page') || '') === lastPage}
                onClick={() => goToPage(lastPage!)}></IconButton>
        </div>
    )
}

import Link from 'next/link'

interface Props {
    showAddProjectButton: boolean
}

export default function NoProjectsMessage({ showAddProjectButton }: Props) {
    return (
        <p>
            Nu a fost gasit niciun proiect.{' '}
            {showAddProjectButton && (
                <Link href="/admin/adauga-proiect" className="v-link">
                    Adauga unul acum
                </Link>
            )}
        </p>
    )
}

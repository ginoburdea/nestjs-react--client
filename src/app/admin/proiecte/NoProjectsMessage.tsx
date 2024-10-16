import Link from "next/link";

export default function NoProjectsMessage() {
    return (
        <p>
            Nu a fost gasit niciun proiect.{' '}
            <Link href="/admin/adauga-proiect" className="v-link">
                Adauga unul acum
            </Link>
        </p>
    )
}

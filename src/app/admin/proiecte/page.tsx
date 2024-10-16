import clsx from 'clsx'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Dropdown from '@/app/components/Dropdown'
import IconButton from '@/app/components/IconButton'

export default function ProjectsPage() {
    const projects = [
        {
            id: 1,
            name: 'Lorem ipsum',
            photo: 'https://placehold.co/250.png',
            active: true,
        },
        {
            id: 2,
            name: 'Lorem ipsum',
            photo: 'https://placehold.co/250.png',
            active: true,
        },
        {
            id: 3,
            name: 'Lorem ipsum',
            photo: 'https://placehold.co/250.png',
            active: false,
        },
        {
            id: 4,
            name: 'Lorem ipsum',
            photo: 'https://placehold.co/250.png',
            active: false,
        },
        {
            id: 5,
            name: 'Lorem ipsum',
            photo: 'https://placehold.co/250.png',
            active: true,
        },
        {
            id: 6,
            name: 'Lorem ipsum',
            photo: 'https://placehold.co/250.png',
            active: true,
        },
        {
            id: 7,
            name: 'Lorem ipsum',
            photo: 'https://placehold.co/250.png',
            active: false,
        },
        {
            id: 8,
            name: 'Lorem ipsum',
            photo: 'https://placehold.co/250.png',
            active: true,
        },
    ]

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
                    defaultValue={'oldest'}
                    name="orderBy"
                    error={null}></Dropdown>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-6">
                {projects.map(project => (
                    <a
                        key={project.id}
                        className="bg-blue-50 hover:drop-shadow cursor-pointer transition-all">
                        <img
                            src={project.photo}
                            className="w-full aspect-square"
                        />
                        <div className="p-2">
                            <p className="pb-3 font-bold">{project.name}</p>
                            <span
                                className={clsx('px-3 block w-fit text-sm', {
                                    'bg-green-100': project.active,
                                    'bg-red-100': !project.active,
                                })}>
                                {project.active ? 'Activ' : 'Inactiv'}
                            </span>
                        </div>
                    </a>
                ))}
            </div>
        </>
    )
}

import clsx from 'clsx'
import Link from 'next/link'

interface Props {
    adminVersion: boolean
    projects: {
        id: number
        photo: string | null
        name: string
        active: boolean
    }[]
}

export default function Projects({ adminVersion, projects }: Props) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-6">
            {projects.map(project => (
                <Link
                    href={
                        (adminVersion ? `/admin` : ``) +
                        `/proiect/${project.id}`
                    }
                    key={project.id}
                    className="bg-blue-50 hover:drop-shadow cursor-pointer transition-all">
                    {project.photo ? (
                        <img
                            src={project.photo}
                            className="w-full aspect-square"
                        />
                    ) : (
                        <div className="w-full aspect-square flex justify-center items-center bg-gray-50">
                            <i className="bi-image text-2xl"></i>
                        </div>
                    )}
                    <div className="p-2">
                        <p className="font-bold overflow-hidden">
                            {project.name}
                        </p>

                        {adminVersion && (
                            <p className="mt-2">
                                <span
                                    className={clsx(
                                        'px-3 block w-fit text-sm',
                                        {
                                            'bg-green-100': project.active,
                                            'bg-red-100': !project.active,
                                        }
                                    )}>
                                    {project.active ? 'Activ' : 'Inactiv'}
                                </span>
                            </p>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    )
}

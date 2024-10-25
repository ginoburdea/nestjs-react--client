'use client'
import Link from 'next/link'
import Photos from './Photos'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useProjectInfo } from '../../GetProjectInfoTemplate'

export default function ViewProjectPage() {
    const { loading, error, project } = useProjectInfo()

    if (loading) {
        return <p>Incarcare...</p>
    }

    if (error || !project) {
        return <p className="text-red-700">{error}</p>
    }

    return (
        <>
            <Photos photos={project.photoUrls.map(photo => photo.url)}></Photos>

            <h1 className="text-2xl font-bold mb-2">{project.name}</h1>

            <p className="mb-6">
                <Link href={project.url} className="v-link">
                    <i className="bi bi-link-45deg v-link mr-1"></i>
                    {project.url}
                </Link>
            </p>

            <div className="leading-loose">
                {project.description.split('\n').map(line => (
                    <p>
                        {line}
                        <span className="text-white">.</span>
                    </p>
                ))}
            </div>
        </>
    )
}

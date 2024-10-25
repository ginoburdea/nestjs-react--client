'use client'
import Link from 'next/link'
import Photos from './Photos'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function ViewProjectPage() {
    const project = {
        name: 'Lorem ipsum',
        photos: [
            'https://placehold.co/250.png',
            'https://placehold.co/251.png',
            'https://placehold.co/252.png',
            'https://placehold.co/253.png',
        ],
        url: 'https://example.com/lorem-ipsum',
        description:
            'Sint velit cillum ex laboris occaecat exercitation voluptate minim. \nVelit consectetur exercitation quis in incididunt laborum occaecat ut nisi. \nEst amet veniam amet aute reprehenderit sunt. Incididunt eiusmod enim qui nostrud ea laboris exercitation do non. \nExercitation amet laboris velit et dolore deserunt esse irure esse.',
    }

    return (
        <>
            <Photos photos={project.photos}></Photos>

            <h1 className="text-2xl font-bold mb-2">{project.name}</h1>

            <p className="mb-6">
                <Link href={project.url} className="v-link">
                    <i className="bi bi-link-45deg v-link mr-1"></i>
                    {project.url}
                </Link>
            </p>

            <div className="leading-loose">
                {project.description.split('\n').map(line => (
                    <p>{line}</p>
                ))}
            </div>
        </>
    )
}

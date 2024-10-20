'use client'
import { useParams, useRouter } from 'next/navigation'
import AddEditProjectTemplate, {
    PhotoWithUrl,
} from '../../AddEditProjectTemplate'
import { useEffect, useState } from 'react'
import { getAxios } from '@/utils/getAxios'
import { handleAxiosError } from '@/utils/handleAxiosError'

interface Project {
    name: string
    url: string
    description: string
    active: boolean
    photoUrls: PhotoWithUrl[]
}

export default function EditProjectPage() {
    const params = useParams<{ id: string }>()
    const router = useRouter()

    const axios = getAxios()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<null | string>(null)

    const [project, setProject] = useState<Project>()

    const getProjectInfo = async () => {
        setLoading(true)
        setError(null)

        try {
            const { data } = await axios.get(`/projects/${params.id}`)
            setProject({
                ...data.project,
                photoUrls: data.project.photos,
            })
        } catch (error) {
            handleAxiosError(error, router, setError)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProjectInfo()
    }, [])

    if (loading) {
        return <p>Incarcare...</p>
    }

    if (error) {
        return <p className="text-red-700">{error}</p>
    }

    return (
        <AddEditProjectTemplate
            title="Editeaza proiect"
            formSubmitUrl={`/projects/${params.id}`}
            formSubmitMethod="patch"
            defaultValues={project}></AddEditProjectTemplate>
    )
}

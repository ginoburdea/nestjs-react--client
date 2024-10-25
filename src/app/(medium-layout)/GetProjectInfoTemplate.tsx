import { getAxios } from '@/utils/getAxios'
import { handleAxiosError } from '@/utils/handleAxiosError'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PhotoWithUrl } from './admin/(add-edit-project)/AddEditProjectTemplate'

interface Project {
    id: number
    name: string
    url: string
    description: string
    active: boolean
    photoUrls: PhotoWithUrl[]
}

export const useProjectInfo = () => {
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

    return {
        loading,
        error,
        project,
    }
}

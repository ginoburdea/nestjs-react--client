'use client'
import AddEditProjectTemplate from '../../AddEditProjectTemplate'
import { useProjectInfo } from '@/app/(medium-layout)/GetProjectInfoTemplate'

export default function EditProjectPage() {
    const { loading, error, project } = useProjectInfo()

    if (loading) {
        return <p>Incarcare...</p>
    }

    if (error || !project) {
        return <p className="text-red-700">{error}</p>
    }

    return (
        <AddEditProjectTemplate
            title="Editeaza proiect"
            formSubmitUrl={`/projects/${project.id}`}
            formSubmitMethod="patch"
            defaultValues={project}
        ></AddEditProjectTemplate>
    )
}

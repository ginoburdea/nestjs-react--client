import ProjectsPageTemplate from '@/app/components/ProjectsPageTemplate'

export default function ProjectsPage() {
    return <ProjectsPageTemplate getProjectsEndpoint="/projects/all" />
}

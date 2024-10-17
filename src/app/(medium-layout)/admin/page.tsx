import ProjectsPageTemplate from '@/components/ProjectsPageTemplate'

export default function AdminHomePage() {
    return <ProjectsPageTemplate getProjectsEndpoint="/projects/all" />
}

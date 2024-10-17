import ProjectsPageTemplate from '@/components/ProjectsPageTemplate'

export default function ProjectsPage() {
    return <ProjectsPageTemplate getProjectsEndpoint="/public/projects/all" />
}

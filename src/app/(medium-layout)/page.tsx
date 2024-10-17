import ProjectsPageTemplate from '@/components/ProjectsPageTemplate'

export default function HomePage() {
    return <ProjectsPageTemplate getProjectsEndpoint="/public/projects/all" />
}

import AddEditProjectTemplate from '../AddEditProjectTemplate'

export default function AddProjectPage() {
    return (
        <AddEditProjectTemplate
            title="Adauga proiect"
            formSubmitUrl="/projects"
            formSubmitMethod="post"></AddEditProjectTemplate>
    )
}

import { SyntheticEvent } from 'react'

export default function getFormData(event: SyntheticEvent<HTMLFormElement>) {
    const formData = new FormData(event.target)
    const formDataEntries = formData.entries()
    const formDataObject = Object.fromEntries(formDataEntries)
    return formDataObject
}

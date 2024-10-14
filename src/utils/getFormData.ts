import { SyntheticEvent } from 'react'

export default function getFormData(event: SyntheticEvent<HTMLFormElement>) {
    const formData = new FormData(event.target as HTMLFormElement)
    const formDataObject: {
        [key: string]: FormDataEntryValue | FormDataEntryValue[]
    } = {}

    let hasFiles = false

    formData.forEach((value, key) => {
        if (value instanceof File) hasFiles = true

        if (!formDataObject[key]) {
            formDataObject[key] = value
            return
        }

        // The inputs that accept multiple file will appear multiple times.
        // They need to be merged into a single array
        if (!Array.isArray(formDataObject[key])) {
            formDataObject[key] = [formDataObject[key]]
        }
        ;(formDataObject[key] as FormDataEntryValue[]).push(value)
    })

    const headers = {
        'content-type': hasFiles ? 'multipart/form-data' : 'application/json',
    }

    return {
        data: formDataObject,
        headers,
    }
}

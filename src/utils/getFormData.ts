import { SyntheticEvent } from 'react'

/**
 * @param event
 * @param extraData this will overwrite the data from the event if there is a common field
 */
export default function getFormData(
    event: SyntheticEvent<HTMLFormElement>,
    extraData: Record<string, any> = {}
) {
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

    Object.entries(extraData).forEach(([key, value]) => {
        formDataObject[key] = value

        if (Array.isArray(value)) {
            for (const item of value) {
                if (item instanceof File) {
                    hasFiles = true
                    return
                }
            }
        }

        if (value instanceof File) hasFiles = true
    })

    const headers = {
        'content-type': hasFiles ? 'multipart/form-data' : 'application/json',
    }

    return {
        data: formDataObject,
        headers,
    }
}

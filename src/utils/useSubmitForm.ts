import getFormData from '@/utils/getFormData'
import axios, { AxiosError } from 'axios'
import { SyntheticEvent, useState } from 'react'

export default function useSubmitForm(
    url: string,
    handleSuccess: (data: any) => Promise<any> | any
) {
    const [fieldErrors, setFieldErrors] = useState({})
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleOnSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setFieldErrors({})
        setError(null)
        const { data: formData, headers } = getFormData(event)

        try {
            const { data } = await axios.post(url, formData, {
                baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
                formSerializer: { indexes: null },
                headers,
            })
            await handleSuccess(data)
        } catch (apiError) {
            if (
                !(apiError instanceof AxiosError) ||
                !apiError.response?.data?.message
            ) {
                setError(
                    'A aparut o eroare neasteptata. Va rugam sa incercati din nou mai tarziu.'
                )
                return
            }

            setError(apiError.response.data.message)

            if (
                apiError.response.status === 400 ||
                apiError.response.status === 422
            ) {
                for (const key in apiError.response?.data?.details || {}) {
                    if (Object.keys(formData).includes(key)) {
                        setFieldErrors(errors => ({
                            ...errors,
                            [key]: apiError.response.data.details[key],
                        }))
                    }
                }
            }
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        fieldErrors,
        handleOnSubmit,
    }
}

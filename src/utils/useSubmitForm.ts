import getFormData from '@/utils/getFormData'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useState } from 'react'
import { getAxios } from './getAxios'

export default function useSubmitForm(
    url: string,
    handleSuccess: (data: any) => Promise<any> | any,
    getExtraData?: () => Record<string, any>,
    method: 'post' | 'patch' | 'put' = 'post'
) {
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleOnSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setFieldErrors({})
        setError(null)

        const extraData = getExtraData ? getExtraData() : {}
        const { data: formData, headers } = getFormData(event, extraData)
        const axios = getAxios()

        try {
            const { data } = await axios[method](url, formData, { headers })
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
                            [key]: apiError?.response?.data.details[key],
                        }))
                    }
                }
                return
            }

            if (apiError.response.status === 401) {
                const currentPage = location.pathname + location.search
                router.push(
                    `/admin/autentificare?next=${currentPage}&error=${apiError.response.data.message}`
                )
                return
            }
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        setError,
        fieldErrors,
        handleOnSubmit,
    }
}

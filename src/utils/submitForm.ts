import getFormData from '@/utils/getFormData'
import axios, { AxiosError } from 'axios'
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'

export default function submitForm(
    url: string,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setFieldErrors: Dispatch<SetStateAction<{}>>,
    setError: Dispatch<SetStateAction<string | null>>,
    handleSuccess: (data: any) => Promise<any> | any
) {
    return async function internalSubmitForm(
        event: SyntheticEvent<HTMLFormElement>
    ) {
        event.preventDefault()
        setLoading(true)
        setFieldErrors({})
        setError(null)
        const formData = getFormData(event)

        try {
            const { data } = await axios.post(url, formData, {
                baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
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
}

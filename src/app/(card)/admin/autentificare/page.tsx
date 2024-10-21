'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useRouter, useSearchParams } from 'next/navigation'
import useSubmitForm from '@/utils/useSubmitForm'
import { useEffect } from 'react'
import { useHandleAuthSuccess } from '@/utils/useHandleAuthSuccess'

// Accepted query parameters:
// error?: string (an error to show to the user)
// next?: string (the url to redirect the users to after logining in)

export default function LoginPage() {
    const router = useRouter()
    const params = useSearchParams()
    const handleAuthSuccess = useHandleAuthSuccess()

    const { error, setError, fieldErrors, handleOnSubmit, loading } =
        useSubmitForm('/users/login', handleAuthSuccess)

    useEffect(() => {
        const err = params.get('error')
        if (typeof err === 'string') {
            setError(err)

            const newQuery = new URLSearchParams(location.search)
            newQuery.delete('error')
            router.replace(location.pathname + '?' + newQuery.toString())
        }
    }, [])

    return (
        <form onSubmit={handleOnSubmit}>
            <h1 className="text-2xl font-bold mb-4">Autentificare</h1>

            <Input
                label="Email"
                type="email"
                name="email"
                error={fieldErrors.email}></Input>
            <Input
                label="Parola"
                type="password"
                name="password"
                error={fieldErrors.password}></Input>

            <Button loading={loading} label="Autentificare"></Button>
            {error && <p className="text-red-700 mt-4">Eroare: {error}</p>}
        </form>
    )
}

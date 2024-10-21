'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import useSubmitForm from '@/utils/useSubmitForm'
import { useHandleAuthSuccess } from '@/utils/useHandleAuthSuccess'
import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

// Accepted query parameters:
// next?: string (the url to redirect the users to after logining in)

export default function RegisterPage() {
    const handleAuthSuccess = useHandleAuthSuccess()
    const params = useSearchParams()

    const { error, fieldErrors, handleOnSubmit, loading } = useSubmitForm(
        '/users/register',
        handleAuthSuccess
    )

    const loginUrl = useMemo(() => {
        const baseUrl = '/admin/autentificare'

        const nextParam = params.get('next')
        if (nextParam === null) return baseUrl

        return baseUrl + `?next=${nextParam}`
    }, [params])

    return (
        <form onSubmit={handleOnSubmit}>
            <h1 className="text-2xl font-bold mb-4">Inregistrare</h1>

            <Input
                label="Nume"
                type="text"
                name="name"
                error={fieldErrors.name}></Input>
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
            <Input
                label="Parola master"
                type="password"
                name="masterPassword"
                error={fieldErrors.masterPassword}></Input>

            <div className="mb-4">
                <Button loading={loading} label="Inregistrare"></Button>
            </div>

            {error && <p className="text-red-700 mb-4">Eroare: {error}</p>}

            <p>
                Ai cont deja?{' '}
                <Link className="v-link" href={loginUrl}>
                    Autentifica-te acum
                </Link>
            </p>
        </form>
    )
}

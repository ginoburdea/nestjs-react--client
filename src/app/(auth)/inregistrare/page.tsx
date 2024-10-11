'use client'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import submitForm from '@/utils/submitForm'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ms from 'ms'
import { setCookie } from 'cookies-next'

export default function RegisterPage() {
    const [fieldErrors, setFieldErrors] = useState({})
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleSuccess = (data: { name: string; email: string }) => {
        const date30DaysInTheFuture = new Date(Date.now() + ms('30 days'))

        setCookie('user.name', data.name, {
            expires: date30DaysInTheFuture,
        })
        setCookie('user.email', data.email, {
            expires: date30DaysInTheFuture,
        })

        router.push('/admin')
    }

    const register = submitForm(
        '/users/register',
        setLoading,
        setFieldErrors,
        setError,
        handleSuccess
    )

    return (
        <form onSubmit={register}>
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

            <Button loading={loading} label="Inregistrare"></Button>
            {error && <p className="text-red-700 mt-4">Eroare: {error}</p>}
        </form>
    )
}

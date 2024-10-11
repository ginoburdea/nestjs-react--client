'use client'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import { useRouter } from 'next/navigation'
import ms from 'ms'
import { setCookie } from 'cookies-next'
import useSubmitForm from '@/utils/useSubmitForm'

export default function RegisterPage() {
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

    const { error, fieldErrors, handleOnSubmit, loading } = useSubmitForm(
        '/users/register',
        handleSuccess
    )

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

            <Button loading={loading} label="Inregistrare"></Button>
            {error && <p className="text-red-700 mt-4">Eroare: {error}</p>}
        </form>
    )
}

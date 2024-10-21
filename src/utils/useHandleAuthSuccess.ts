import { setCookie } from 'cookies-next'
import { useRouter, useSearchParams } from 'next/navigation'
import ms from 'ms'

export const useHandleAuthSuccess = () => {
    const router = useRouter()
    const params = useSearchParams()

    const handleAuthSuccess = (data: { name: string; email: string }) => {
        const date30DaysInTheFuture = new Date(Date.now() + ms('30 days'))

        setCookie('user.name', data.name, {
            expires: date30DaysInTheFuture,
        })
        setCookie('user.email', data.email, {
            expires: date30DaysInTheFuture,
        })

        const nextRoute = params.get('next')
        router.push(typeof nextRoute === 'string' ? nextRoute : '/admin')
    }

    return handleAuthSuccess
}

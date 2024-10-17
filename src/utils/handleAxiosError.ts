import { AxiosError } from 'axios'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export const handleAxiosError = (
    error: any,
    router: AppRouterInstance,
    setError: (error: string) => any
) => {
    if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
            router.push(
                `/admin/autentificare?error=${error.response?.data.message}&next=${location.pathname}`
            )
            return
        }

        setError(error.response?.data.message)
        return
    }
    setError(
        'A aparut o eroare la incarcarea proiectelor. Va rugam sa incercati din nou mai tarziu'
    )
}

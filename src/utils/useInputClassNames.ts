import clsx from 'clsx'
import { useEffect, useState } from 'react'

export const useInputClassNames = (error?: string | null) => {
    const [labelClassName, setLabelClassName] = useState('')

    useEffect(() => {
        setLabelClassName(
            clsx('block text-sm mb-1 font-bold', {
                'text-red-700': !!error,
            })
        )
    }, [error])

    return {
        labelClassName,
    }
}

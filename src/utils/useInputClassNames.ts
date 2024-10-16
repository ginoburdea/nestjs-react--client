import clsx from 'clsx'
import { useEffect, useState } from 'react'

export const useInputClassNames = (error?: string | null) => {
    const [labelClassName, setLabelClassName] = useState('')
    const [inputClassName, setInputClassName] = useState('')

    useEffect(() => {
        setLabelClassName(
            clsx('block text-sm mb-1 font-bold', {
                'text-red-700': !!error,
            })
        )
        setInputClassName(
            clsx(
                'block w-full outline-none border-[1px] border-blue-300 focus:border-blue-400 px-4 py-1 rounded-sm',
                { 'border-red-500 focus:border-red-700': !!error }
            )
        )
    }, [error])

    return {
        labelClassName,
        inputClassName
    }
}

import { useInputClassNames } from '@/utils/useInputClassNames'
import clsx from 'clsx'
import { FormEvent } from 'react'
import InputError from './InputError'

interface InputProps {
    label: string
    error: string | null
    value?: string
    name?: string
    disabled?: boolean
    type?: 'text' | 'email' | 'password' | 'textarea'
    setValue?: (newValue: string) => any
}

export default function Input({
    label,
    error,
    setValue,
    value,
    name,
    disabled = false,
    type = 'text',
}: InputProps) {
    const inputProps = {
        className: clsx(
            'block w-full outline-none border-[1px] border-blue-300 focus:border-blue-400 px-4 py-1 rounded-sm',
            { 'border-red-500 focus:border-red-700': !!error }
        ),
        value: value,
        onChange: (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setValue ? setValue(event.currentTarget.value) : null,
        disabled: disabled,
        name: name,
    }

    const { labelClassName } = useInputClassNames(error)

    return (
        <div
            className={clsx('mb-4', {
                'opacity-70': disabled,
            })}>
            <label>
                <span className={labelClassName}>{label}</span>

                {type === 'textarea' ? (
                    <textarea {...inputProps}></textarea>
                ) : (
                    <input {...inputProps} type={type} />
                )}
            </label>

            <InputError message={error}></InputError>
        </div>
    )
}

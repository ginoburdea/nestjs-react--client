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
    /**
     * this prop only works if there is no "value" and "setValue" props
     */
    initialValue?: string
}

export default function Input({
    label,
    error,
    setValue,
    value,
    name,
    disabled = false,
    type = 'text',
    initialValue,
}: InputProps) {
    const { labelClassName, inputClassName } = useInputClassNames(error)

    const inputProps = {
        className: inputClassName,
        value: value,
        onChange: (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setValue ? setValue(event.currentTarget.value) : null,
        defaultValue: initialValue,
        disabled: disabled,
        name: name,
    }

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

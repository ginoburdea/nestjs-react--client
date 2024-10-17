'use client'
import InputError from './InputError'
import { useInputClassNames } from '@/utils/useInputClassNames'

interface Props {
    label: string
    name?: string
    error: string | null
    options: { value: string; label: string }[]
    value?: string
    onChange?: (newValue: string) => any
}

export default function Dropdown({
    label,
    name,
    error,
    options,
    value,
    onChange,
}: Props) {
    const { labelClassName, inputClassName } = useInputClassNames(error)

    return (
        <div className="mb-4">
            <label>
                <span className={labelClassName}>{label}</span>
                <select
                    name={name}
                    className={inputClassName}
                    value={value}
                    onChange={ev => {
                        if (onChange) onChange(ev.target.value)
                    }}>
                    {options.map(option => (
                        <option
                            className="block mb-1"
                            key={option.label}
                            value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>

            <InputError message={error}></InputError>
        </div>
    )
}

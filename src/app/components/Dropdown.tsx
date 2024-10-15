'use client'
import { useEffect, useState } from 'react'
import InputError from './InputError'
import { useInputClassNames } from '@/utils/useInputClassNames'

interface Props {
    label: string
    name?: string
    error: string | null
    options: { value: string; label: string }[]
    defaultValue?: string
}

export default function Dropdown({
    label,
    name,
    error,
    options,
    defaultValue,
}: Props) {
    const [selectedValue, setSelectedValue] = useState(defaultValue)

    const { labelClassName, inputClassName } = useInputClassNames(error)

    useEffect(() => {
        setSelectedValue(defaultValue)
    }, [])

    return (
        <div className="mb-4">
            <label>
                <span className={labelClassName}>{label}</span>
                <select
                    name={name}
                    className={inputClassName}
                    value={selectedValue}
                    onChange={ev => setSelectedValue(ev.target.value)}>
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

'use client'
import { useState } from 'react'
import InputError from './InputError'
import { useInputClassNames } from '@/utils/useInputClassNames'

interface Props<T> {
    label: string
    name?: string
    error: string | null
    options: { value: T; label: string }[]
    defaultValue?: T
}

export default function RadioInputs<T>({
    label,
    name,
    error,
    options,
    defaultValue,
}: Props<T>) {
    const [selectedValue, setSelectedValue] = useState(defaultValue)

    const { labelClassName } = useInputClassNames(error)

    return (
        <div className="mb-4">
            <label className={labelClassName}>
                {label}
                {/* this input is hidden, but because it has a name attribute, so it will be sent with http requests */}
                <input type="hidden" name={name} value={'' + selectedValue} />
            </label>

            {options.map(option => (
                <label className="block mb-1" key={option.label}>
                    {/* the lack of the "name" attribute is intentional here as it won't be sent with the http requests */}
                    <input
                        type="radio"
                        onClick={() => setSelectedValue(option.value)}
                        checked={selectedValue === option.value}
                        onChange={() => {}}
                        className="mr-2"
                    />
                    <span>{option.label}</span>
                </label>
            ))}

            <InputError message={error}></InputError>
        </div>
    )
}

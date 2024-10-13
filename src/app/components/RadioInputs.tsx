'use client'
import { useState } from 'react'
import InputError from './InputError'
import { useInputClassNames } from '@/utils/useInputClassNames'

interface Props {
    label: string
    name?: string
    error: string | null
    options: { value: any; label: string }[]
}

export default function RadioInputs({ label, name, error, options }: Props) {
    const [selectedValue, setSelectedValue] = useState(undefined)

    const { labelClassName } = useInputClassNames(error)

    return (
        <div className="mb-4">
            <label className={labelClassName}>
                {label}
                {/* this input is hidden, but because it has a name attribute, so it will be sent with http requests */}
                <input type="hidden" name={name} value={selectedValue} />
            </label>

            {options.map(option => (
                <label className="block mb-1">
                    {/* the lack of the "name" attribute is intentional here as it won't be sent with the http requests */}
                    <input
                        type="radio"
                        onClick={() => setSelectedValue(option.value)}
                        checked={selectedValue === option.value}
                        className="mr-2"
                    />
                    <span>{option.label}</span>
                </label>
            ))}

            <InputError message={error}></InputError>
        </div>
    )
}

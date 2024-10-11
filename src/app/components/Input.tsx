import clsx from 'clsx'

interface InputProps {
    label: string
    error: string | null
    value?: string
    disabled?: boolean
    type?: 'text' | 'email' | 'password'
    setValue?: (newValue: string) => any
}

export default function Input({
    label,
    error,
    setValue,
    value,
    disabled = false,
    type = 'text',
}: InputProps) {
    return (
        <div
            className={clsx('mb-4', {
                'opacity-70': disabled,
            })}>
            <label>
                <span
                    className={clsx('block text-sm mb-1 font-bold', {
                        'text-red-700': !!error,
                    })}>
                    {label}
                </span>
                <input
                    className={clsx(
                        'block w-full outline-none border-[1px] border-blue-300 focus:border-blue-400 px-4 py-1 rounded-sm',
                        {
                            'border-red-500 focus:border-red-700': !!error,
                        }
                    )}
                    type={type}
                    value={value}
                    onChange={event =>
                        setValue ? setValue(event.target.value) : null
                    }
                    disabled={disabled}
                />
            </label>
            {error && <p className="text-red-700 text-sm mt-1">{error}</p>}
        </div>
    )
}

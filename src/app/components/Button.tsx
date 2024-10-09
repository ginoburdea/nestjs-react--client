import { CircleSpinner } from 'react-spinners-kit'

interface ButtonProps {
    label: string
    loading?: boolean
    disabled?: boolean
    onClick: () => any
}

export default function Button({
    label,
    onClick,
    loading = false,
    disabled = false,
}: ButtonProps) {
    return (
        <button
            disabled={disabled || loading}
            onClick={onClick}
            className="bg-blue-600 enabled:hover:bg-blue-700 enabled:cursor-pointer transition-all block px-4 py-2 text-white rounded-sm disabled:opacity-70">
            {loading && (
                <span className="mr-2 inline-block">
                    <CircleSpinner size={12} loading={true}></CircleSpinner>
                </span>
            )}
            {label}
        </button>
    )
}

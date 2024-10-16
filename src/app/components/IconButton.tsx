import clsx from 'clsx'
import 'bootstrap-icons/font/bootstrap-icons.css'

interface Props {
    icon: string
    size?: 'sm' | 'md' | 'lg'
    onClick?: () => any
    disabled?: boolean
}

export default function IconButton({
    icon,
    onClick,
    disabled = false,
    size = 'md',
}: Props) {
    return (
        <div
            className={clsx('p-1 cursor-pointer', {
                'cursor-not-allowed opacity-70': disabled,
                'hover:bg-gray-100': !disabled,
            })}
            onClick={() => (disabled || !onClick ? undefined : onClick())}>
            <i
                className={clsx(icon, {
                    'text-lg': size === 'sm',
                    'text-xl': size === 'md',
                    'text-2xl': size === 'lg',
                })}></i>
        </div>
    )
}

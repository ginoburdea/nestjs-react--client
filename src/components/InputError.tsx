interface Props {
    message: string | null
}

export default function InputError({ message }: Props) {
    if (!message) return
    return <p className="text-red-700 text-sm mt-1">{message}</p>
}

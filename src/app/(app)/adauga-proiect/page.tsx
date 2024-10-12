'use client'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import useSubmitForm from '@/utils/useSubmitForm'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function AddProjectPage() {
    const { error, fieldErrors, handleOnSubmit, loading } = useSubmitForm(
        '/projects',
        () => {}
    )

    const photos = [
        'https://placehold.co/250x200.png',
        'https://placehold.co/250x400.png',
        'https://placehold.co/250.png',
        'https://placehold.co/250.png',
        'https://placehold.co/250.png',
    ]

    return (
        <form onSubmit={handleOnSubmit}>
            <h1 className="text-2xl font-bold mb-6">Adauga proiect</h1>

            <p className="text-sm mb-1 font-bold">Imagini</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
                {photos.map(photo => (
                    <div
                        className="w-full aspect-square bg-no-repeat bg-center bg-cover p-1 text-right"
                        style={{ backgroundImage: `url('${photo}')` }}
                        key={photo}>
                        <a className="p-1 hover:bg-gray-100 cursor-pointer transition-all">
                            <i className="bi-x text-lg"></i>
                        </a>
                    </div>
                ))}

                <label className="w-full aspect-square gap-2 p-2 flex justify-center items-center flex-col border-[1px] border-dashed border-blue-300 hover:bg-blue-50 cursor-pointer text-center">
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                    />

                    <i className="bi-upload text-xl"></i>
                    <p className="text-sm">Incarca</p>
                </label>
            </div>

            <Input
                label="Denumire"
                name="name"
                error={fieldErrors.name}></Input>
            <Input label="Link" name="url" error={fieldErrors.url}></Input>
            <Input
                label="Descriere"
                type="textarea"
                name="description"
                error={fieldErrors.description}></Input>

            <Button loading={loading} label="Salveaza"></Button>
            {error && <p className="text-red-700 mt-4">Eroare: {error}</p>}
        </form>
    )
}

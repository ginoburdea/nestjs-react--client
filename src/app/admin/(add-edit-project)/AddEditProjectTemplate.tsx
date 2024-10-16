'use client'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import RadioInputs from '@/app/components/RadioInputs'
import useSubmitForm from '@/utils/useSubmitForm'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useState } from 'react'

interface Props {
    title: string
    formSubmitMethod: 'post' | 'patch' | 'put'
    formSubmitUrl: string
}

export default function AddEditProjectTemplate({
    title,
    formSubmitMethod,
    formSubmitUrl,
}: Props) {
    const router = useRouter()
    const onSuccess = () => {
        router.push('/admin/proiecte')
    }

    const { error, fieldErrors, handleOnSubmit, loading } = useSubmitForm(
        formSubmitUrl,
        onSuccess,
        () => ({ photos }),
        formSubmitMethod
    )

    const [photoUrls, setPhotoUrls] = useState<string[]>([])

    const [photos, setPhotos] = useState<File[]>([])

    const handleFiles = (event: SyntheticEvent<HTMLInputElement>) => {
        if (!(event.currentTarget.files instanceof FileList)) return

        const files = Array.from(event.currentTarget.files)
        setPhotos(photos => [...photos, ...files])

        for (const file of files) {
            const fileReader = new FileReader()

            fileReader.addEventListener(
                'load',
                () => {
                    setPhotoUrls(photoUrls => [
                        ...photoUrls,
                        fileReader.result as string,
                    ])
                },
                false
            )

            fileReader.readAsDataURL(file)
        }
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <h1 className="text-2xl font-bold mb-6">{title}</h1>

            <p className="text-sm mb-1 font-bold">Imagini</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
                {photoUrls.map((photoUrl, index) => (
                    <div
                        className="w-full aspect-square bg-no-repeat bg-center bg-cover p-1 text-right"
                        style={{ backgroundImage: `url('${photoUrl}')` }}
                        key={index}></div>
                ))}

                <label className="w-full aspect-square gap-2 p-2 flex justify-center items-center flex-col border-[1px] border-dashed border-blue-300 hover:bg-blue-50 cursor-pointer text-center">
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleFiles}
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
            <RadioInputs
                label="Activ (vizibul la public)?"
                name="active"
                options={[
                    { value: true, label: 'Da' },
                    { value: false, label: 'Nu' },
                ]}
                defaultValue={true}
                error={fieldErrors.active}></RadioInputs>

            <Button loading={loading} label="Salveaza"></Button>
            {error && <p className="text-red-700 mt-4">Eroare: {error}</p>}
        </form>
    )
}

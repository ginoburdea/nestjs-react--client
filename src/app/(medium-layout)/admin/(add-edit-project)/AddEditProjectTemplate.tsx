'use client'
import Button from '@/components/Button'
import IconButton from '@/components/IconButton'
import Input from '@/components/Input'
import RadioInputs from '@/components/RadioInputs'
import useSubmitForm from '@/utils/useSubmitForm'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useState } from 'react'

interface Props {
    title: string
    formSubmitMethod: 'post' | 'patch' | 'put'
    formSubmitUrl: string
    defaultValues?: {
        name: string
        url: string
        description: string
        active: boolean
        photoUrls: PhotoWithUrl[]
    }
}

export interface PhotoWithUrl {
    name: string
    url: string
}

export default function AddEditProjectTemplate({
    title,
    formSubmitMethod,
    formSubmitUrl,
    defaultValues,
}: Props) {
    const router = useRouter()
    const onSuccess = () => {
        router.push('/admin')
    }

    const { error, fieldErrors, handleOnSubmit, loading } = useSubmitForm(
        formSubmitUrl,
        onSuccess,
        () => ({ photos, photosToDelete }),
        formSubmitMethod
    )

    const [photoUrls, setPhotoUrls] = useState<PhotoWithUrl[]>(
        defaultValues?.photoUrls || []
    )

    const [photos, setPhotos] = useState<File[]>([])
    const [photosToDelete, setPhotosToDelete] = useState<string[]>([])

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
                        {
                            name: file.name,
                            url: fileReader.result as string,
                        },
                    ])
                },
                false
            )

            fileReader.readAsDataURL(file)
        }
    }

    const deletePhoto = (name: string) => {
        setPhotosToDelete(photos => [...photos, name])
        setPhotos(photos => photos.filter(photo => photo.name !== name))
        setPhotoUrls(photos => photos.filter(photo => photo.name !== name))
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <h1 className="text-2xl font-bold mb-6">{title}</h1>

            <p className="text-sm mb-1 font-bold">Imagini</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
                {photoUrls.map(({ name, url }, index) => (
                    <div
                        className="w-full aspect-square bg-no-repeat bg-center bg-cover p-1 text-right relative"
                        style={{ backgroundImage: `url('${url}')` }}
                        key={index}>
                        <div className="absolute right-0 top-0 w-fit">
                            <IconButton
                                icon="bi-x"
                                size="md"
                                onClick={() => deletePhoto(name)}
                            />
                        </div>
                    </div>
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
                initialValue={defaultValues?.name}
                error={fieldErrors.name}></Input>
            <Input
                label="Link"
                name="url"
                initialValue={defaultValues?.url}
                error={fieldErrors.url}></Input>
            <Input
                label="Descriere"
                type="textarea"
                name="description"
                initialValue={defaultValues?.description}
                error={fieldErrors.description}></Input>
            <RadioInputs
                label="Activ (vizibul la public)?"
                name="active"
                options={[
                    { value: true, label: 'Da' },
                    { value: false, label: 'Nu' },
                ]}
                defaultValue={
                    typeof defaultValues?.active === 'boolean'
                        ? defaultValues.active
                        : true
                }
                error={fieldErrors.active}></RadioInputs>

            <Button loading={loading} label="Salveaza"></Button>
            {error && <p className="text-red-700 mt-4">Eroare: {error}</p>}
        </form>
    )
}

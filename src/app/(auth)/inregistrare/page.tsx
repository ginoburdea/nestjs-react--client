'use client'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import { useState } from 'react'

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [nameError, setNameError] = useState(null)
    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)

    const [error, setError] = useState(null)

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Inregistrare</h1>

            <Input
                value={name}
                setValue={setName}
                label="Nume"
                error={nameError}></Input>
            <Input
                value={email}
                setValue={setEmail}
                label="Email"
                type="email"
                error={emailError}></Input>
            <Input
                value={password}
                setValue={setPassword}
                label="Parola"
                type="password"
                error={passwordError}></Input>

            <Button label="Inregistrare" onClick={() => {}}></Button>
            {error && <p className="text-red-700 mt-4">Eroare: {error}</p>}
        </>
    )
}

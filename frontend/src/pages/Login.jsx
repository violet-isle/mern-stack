import { useState } from "react"
import { useLogin } from "../hooks/useLogin"


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log in to your account</h2>
    
            <label className="block text-sm font-medium leading-6 text-gray-900">Email:</label>
            <input
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type = "email"
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
            <input
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type = "password"
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={isLoading} className="flex w-full justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
        </form>
        </div>
    )
}

export default Login
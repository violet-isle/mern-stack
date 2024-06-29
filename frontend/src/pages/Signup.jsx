import { useState } from "react"
import { useSignup } from "../hooks/useSignup"


const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up for your account</h2>
    <form className="space-y-6" onSubmit={handleSubmit}>
      
      <label className="block text-sm font-medium leading-6 text-gray-900">Email address:</label>
      <input 
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
      <input 
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading} className="flex w-full justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
  )
}

export default Signup
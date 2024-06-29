import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const {user} = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div>
        <nav>
            <div className='flex h-16 items-center justify-between'>
            
            <Link to="/" className="px-3 py-2 text-sm font-medium">
                <h1 className='ml-10 flex items-baseline space-x-4'>Simple Partner Database</h1>
            </Link>
            <div>
                {user && (
                  <div className='flex gap-x-4 absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"'>
                    <span>{user.email}</span>
                    <button className="rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleClick}>Log out</button>
                  </div>
                )}
                {!user && (
                  <div className='flex gap-x-4 absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"'>
                    <Link to="/login" className="rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login </Link>
                    <Link to="/signup" className="rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</Link>
                  </div>
                )}
            </div>
            </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
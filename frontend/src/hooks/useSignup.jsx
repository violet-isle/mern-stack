import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:5550/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
      enqueueSnackbar(json, { variant: 'error' });
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
      enqueueSnackbar('Sign up successful!', { variant: 'success' });
      navigate('/')
    }
  }

  return { signup, isLoading, error }
}
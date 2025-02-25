'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('auth_token')
    if (token) {
      setUser({ username: 'admin' })
    }
  }, [])

  const login = async (username, password) => {
    if (username === 'admin' && password === '0000') {
      Cookies.set('auth_token', 'dummy_token', { expires: 1 })
      setUser({ username: 'admin' })
      return true
    }
    return false
  }

  const logout = () => {
    Cookies.remove('auth_token')
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
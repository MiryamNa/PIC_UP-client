import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react"
import type { Customer } from "../models/Customers"

type AuthContextType = {
  user: Customer | null
  login: (user: Customer) => void
  logout: () => void
  setUser: (user: Customer | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Customer | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("picup-user")
    if (stored) {
      setUser(JSON.parse(stored) as Customer)
    }
  }, [])

  const login = (user: Customer) => {
    setUser(user)
    localStorage.setItem("picup-user", JSON.stringify(user))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("picup-user")
  }

  const value = useMemo(
    () => ({ user, login, logout, setUser }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return context
}
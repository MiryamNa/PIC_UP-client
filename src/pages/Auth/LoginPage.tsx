import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { loginCustomer } from "../../services/authService"
import "./auth.css"

export default function LoginPage() {
  const [firstName, setFirstName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")

    if (!firstName  || !password) {
      setError("אנא מלאי שם משתמש וסיסמה")
      return
    }

    try {
      setLoading(true)
      const user = await loginCustomer({ firstName, password })
      console.log("login response user:", user)
      login(user)
      navigate("/")
    } catch (err) {
      setError("שם משתמש או סיסמה שגויים")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <h1>התחברות</h1>
      <form onSubmit={handleSubmit}>
        <label>
          שם משתמש
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          סיסמה
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "בודק..." : "התחבר"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>

      <p>
        עדיין אין לך חשבון?{" "}
        <button 
          type="button" 
          onClick={() => navigate("/register")}
          style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
        >
          הירשם כאן
        </button>
      </p>
    </div>
  )
}
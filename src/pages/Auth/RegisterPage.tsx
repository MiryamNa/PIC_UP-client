import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerCustomer } from "../../services/authService"
//import type { RegisterCustomerRequest } from "../../services/authService"
import type {Customer} from "../../models/Customers"
import "./auth.css"

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [clientId, setClientId] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")

    if (!clientId || !firstName || !lastName || !password || !phone) {
      setError("אנא מלאי את כל השדות הנדרשים")
      return
    }

    const newCustomer: Customer = {
      firstName,
      lastName,
      clientId,
      password,
      phone,
      email: email || undefined
    }

    try {
      setLoading(true)
      await registerCustomer(newCustomer)
      navigate("/login")
    } catch (err) {
      setError("שגיאה בהרשמה. נסי שוב.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <h1>הרשמה</h1>
      <form onSubmit={handleSubmit}>
        <label>
         (שם משתמש) שם פרטי
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          שם משפחה
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          תעודת זהות
        <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
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
        <label>
          טלפון
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label>
          אימייל (לא חובה)
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "שולח..." : "הרשם"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}
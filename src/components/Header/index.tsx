import { useAuth } from "../../contexts/AuthContext"
import { useNavigate, useLocation } from "react-router-dom"
import "./header.css"

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="header-brand" onClick={() => navigate("/")}>
          <span className="header-logo">PicUp</span>
        </div>

        <nav className="header-nav">
          {!user ? (
            <>
              <button
                className={`header-nav-btn ${isActive("/") ? "active" : ""}`}
                onClick={() => navigate("/")}
              >
                דף הבית
              </button>
              <button
                className={`header-nav-btn ${isActive("/login") ? "active" : ""}`}
                onClick={() => navigate("/login")}
              >
                התחברות
              </button>
              <button
                className={`header-nav-btn ${isActive("/register") ? "active" : ""}`}
                onClick={() => navigate("/register")}
              >
                הרשמה
              </button>
            </>
          ) : (
            <>
              <button
                className={`header-nav-btn ${isActive("/") ? "active" : ""}`}
                onClick={() => navigate("/")}
              >
                דף הבית
              </button>
              <button
                className={`header-nav-btn ${isActive("/events") ? "active" : ""}`}
                onClick={() => navigate("/events")}
              >
                האירועים שלי
              </button>
              <button className="header-nav-btn" onClick={handleLogout}>
                התנתק
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

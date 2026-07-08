import { useAuth } from "../../contexts/AuthContext"
import { useNavigate, useLocation } from "react-router-dom"
import { useLoading } from "../../contexts/LoadingContext"
import "./header.css"

export default function Header() {
  const { user, logout } = useAuth()
  const { isBlocked } = useLoading()
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
                disabled={isBlocked}
              >
                דף הבית
              </button>
              <button
                className={`header-nav-btn ${isActive("/login") ? "active" : ""}`}
                onClick={() => navigate("/login")}
                disabled={isBlocked}
              >
                התחברות
              </button>
              <button
                className={`header-nav-btn ${isActive("/register") ? "active" : ""}`}
                onClick={() => navigate("/register")}
                disabled={isBlocked}
              >
                הרשמה
              </button>
            </>
          ) : (
            <>
              <button
                className={`header-nav-btn ${isActive("/") ? "active" : ""}`}
                onClick={() => navigate("/")}
                disabled={isBlocked}
              >
                דף הבית
              </button>
              <button
                className={`header-nav-btn ${isActive("/events") ? "active" : ""}`}
                onClick={() => navigate("/events")}
                disabled={isBlocked}
              >
                האירועים שלי
              </button>
              <button className="header-nav-btn" onClick={handleLogout} disabled={isBlocked}>
                התנתק
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

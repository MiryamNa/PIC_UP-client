import { BrowserRouter, NavLink, Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import MyEventsPage from "./pages/Event/MyEventsPage"

import Dashboard from "./pages/Dashboard"
import Upload from "./pages/Upload"
import Processing from "./pages/Processing"
import Results from "./pages/Results"
import Settings from "./pages/Settings"
import CategoryPage from "./pages/category/CategoryPage"
import LoginPage from "./pages/Auth/LoginPage"
import RegisterPage from "./pages/Auth/RegisterPage"
import { useAuth } from "./contexts/AuthContext"
import { useState } from "react"

function App() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    )
  }

  const navItems = [
    { to: "/", label: "Dashboard" },
    { label: "Logout", action: logout },
    { label: "סגור", action: () => setSidebarOpen(false) }

  ]

  return (
    <BrowserRouter>
      <div className="app-shell">
       <aside className={`sidebar-card ${sidebarOpen ? "open" : "closed"}`}>
            <div>
            <p className="eyebrow">PicUp</p>
            <h1>תפריט</h1>
            <p className="lede">
            </p>
          </div>

          <nav className="nav-list" aria-label="Primary">
           {navItems.map((item) =>
                    item.action ? (
                        <button
        key={item.label}
        type="button"
        onClick={item.action}
        className="nav-button"
      >
        {item.label}
      </button>
                    ) : (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                      >
                        {item.label}
                      </NavLink>
                    )
                  )}
          </nav>

          <article className="mini-card">
            <h2></h2>
            <p></p>
          </article>
        </aside>
       <button className="menu-toggle" type="button" onClick={() => setSidebarOpen(true)}>
          תפריט
       </button>
        <main className="content-panel">
          <Routes>
            <Route path="/" element={<MyEventsPage />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/processing" element={<Processing />} />
            <Route path="/results" element={<Results />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
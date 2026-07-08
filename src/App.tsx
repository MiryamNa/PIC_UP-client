import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import Header from "./components/Header"
import HomePage from "./pages/Home/HomePage"
import LoginPage from "./pages/Auth/LoginPage"
import RegisterPage from "./pages/Auth/RegisterPage"
import MyEventsPage from "./pages/Event/MyEventsPage"
import FamilySelectionPage from "./pages/Event/FamilySelectionPage"
import Upload from "./pages/Upload"
import Processing from "./pages/Processing"
import Results from "./pages/Results"
import Settings from "./pages/Settings"
import CategoryPage from "./pages/category/CategoryPage"
import EventViewPage from "./pages/Event/EventViewPage"
import { useAuth } from "./contexts/AuthContext"
import { EventProvider } from "./contexts/EventContext"
import { LoadingProvider } from "./contexts/LoadingContext"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

function App() {
  const { user } = useAuth()

  return (
    <BrowserRouter>
      <LoadingProvider>
        <Header />
        <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={
          user ? <Navigate to="/events" replace /> : <LoginPage />
        } />
        <Route path="/register" element={
          user ? <Navigate to="/events" replace /> : <RegisterPage />
        } />

        {/* Protected routes */}
        <Route path="/events" element={
          <ProtectedRoute>
            <EventProvider>
              <MyEventsPage />
            </EventProvider>
          </ProtectedRoute>
        } />
        <Route path="/event/family-selection" element={
          <ProtectedRoute>
            <EventProvider>
              <FamilySelectionPage />
            </EventProvider>
          </ProtectedRoute>
        } />
        <Route path="/upload" element={
          <ProtectedRoute><Upload /></ProtectedRoute>
        } />
        <Route path="/processing" element={
          <ProtectedRoute><Processing /></ProtectedRoute>
        } />
        <Route path="/results" element={
          <ProtectedRoute><Results /></ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute><Settings /></ProtectedRoute>
        } />
        <Route path="/categories" element={
          <ProtectedRoute><CategoryPage /></ProtectedRoute>
        } />
        <Route path="/event/view" element={
          <ProtectedRoute><EventViewPage /></ProtectedRoute>
        } />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </LoadingProvider>
    </BrowserRouter>
  )
}

export default App

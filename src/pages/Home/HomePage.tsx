import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import "./home.css"

export default function HomePage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1 className="home-title">PicUp</h1>
        <p className="home-subtitle">
          מערכת חכמה לארגון ובחירת תמונות אירועים
        </p>
        <p className="home-description">
          PicUp מאפשרת לך לנהל את תמונות האירוע שלך בקלות —
          לבחור פנים של בני משפחה, לארגן תמונות, ולקבל תוצאות מהירות ומדויקות.
        </p>

        {!user ? (
          <div className="home-actions">
            <button className="home-btn home-btn-primary" onClick={() => navigate("/login")}>
              התחבר
            </button>
            <button className="home-btn home-btn-secondary" onClick={() => navigate("/register")}>
              הרשמה
            </button>
          </div>
        ) : (
          <div className="home-actions">
            <button className="home-btn home-btn-primary" onClick={() => navigate("/events")}>
              לאירועים שלי
            </button>
          </div>
        )}
      </div>

      <div className="home-about">
        <h2>אודות</h2>
        <div className="home-about-grid">
          <div className="home-about-card">
            <h3>בחירת פנים חכמה</h3>
            <p>
              המערכת מזהה את כל הפנים בתמונות האירוע ומאפשרת לך לבחור
              בקלות את החתן, הכלה ובני המשפחה בכל צד.
            </p>
          </div>
          <div className="home-about-card">
            <h3>גרירה לבחירה</h3>
            <p>
              ממשק נוח לבחירת תמונות מרובות על ידי גרירת העכבר —
              סמן את כל התמונות הרצויות במהירות.
            </p>
          </div>
          <div className="home-about-card">
            <h3>תוצאות מהירות</h3>
            <p>
              לאחר בחירת הפנים, המערכת מעבדת את התמונות ומציגה לך
              את התוצאות הממוינות לפי המשפחות.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

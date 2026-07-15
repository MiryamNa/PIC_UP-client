// import { useNavigate } from "react-router-dom"
// import { useAuth } from "../../contexts/AuthContext"
// import "./home.css"

// export default function HomePage() {
//   const { user } = useAuth()
//   const navigate = useNavigate()

//   return (
//     <div className="home-page">
//       <div className="home-hero">
//         <h1 className="home-title">PicUp</h1>
//         <p className="home-subtitle">
//           מערכת חכמה לארגון ובחירת תמונות אירועים
//         </p>
//         <p className="home-description">
//           PicUp מאפשרת לך לנהל את תמונות האירוע שלך בקלות —
//           לבחור פנים של בני משפחה, לארגן תמונות, ולקבל תוצאות מהירות ומדויקות.
//         </p>

//         {!user ? (
//           <div className="home-actions">
//             <button className="home-btn home-btn-primary" onClick={() => navigate("/login")}>
//               התחבר
//             </button>
//             <button className="home-btn home-btn-secondary" onClick={() => navigate("/register")}>
//               הרשמה
//             </button>
//           </div>
//         ) : (
//           <div className="home-actions">
//             <button className="home-btn home-btn-primary" onClick={() => navigate("/events")}>
//               לאירועים שלי
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="home-about">
//         <h2>אודות</h2>
//         <div className="home-about-grid">
//           <div className="home-about-card">
//             <h3>בחירת פנים חכמה</h3>
//             <p>
//               המערכת מזהה את כל הפנים בתמונות האירוע ומאפשרת לך לבחור
//               בקלות את החתן, הכלה ובני המשפחה בכל צד.
//             </p>
//           </div>
//           <div className="home-about-card">
//             <h3>גרירה לבחירה</h3>
//             <p>
//               ממשק נוח לבחירת תמונות מרובות על ידי גרירת העכבר —
//               סמן את כל התמונות הרצויות במהירות.
//             </p>
//           </div>
//           <div className="home-about-card">
//             <h3>תוצאות מהירות</h3>
//             <p>
//               לאחר בחירת הפנים, המערכת מעבדת את התמונות ומציגה לך
//               את התוצאות הממוינות לפי המשפחות.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
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
          מאלף תמונות – לאלבום מושלם. בלחיצת כפתור.
        </p>
        <p className="home-description">
          PicUp מזהה את החתן, הכלה והקרובים, ובוחרת אוטומטית את התמונות
          הטובות, החדות והמשמעותיות ביותר – מחולקות לפי קטגוריות, מוכנות לאלבום.
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

      {/* איך זה עובד */}
      <div className="home-section home-how">
        <h2>איך זה עובד?</h2>
        <p className="home-section-desc">שלושה שלבים פשוטים – והאלבום מוכן</p>
        <div className="home-steps">
          <div className="home-step">
            <div className="home-step-num">1</div>
            <div className="home-step-icon">📁</div>
            <h3>בחר תיקייה</h3>
            <p>תן ל-PicUp את תיקיית התמונות מהחתונה. היא יודעת להסתדר גם עם אלפי תמונות.</p>
          </div>
          <div className="home-step-connector"></div>
          <div className="home-step">
            <div className="home-step-num">2</div>
            <div className="home-step-icon">👤</div>
            <h3>סמן את האנשים החשובים</h3>
            <p>PicUp מציגה את הפרצופים. אתה בוחר מי החתן, מי הכלה ומי הקרובים.</p>
          </div>
          <div className="home-step-connector"></div>
          <div className="home-step">
            <div className="home-step-num">3</div>
            <div className="home-step-icon">✨</div>
            <h3>קבל אלבום מוכן</h3>
            <p>תיקייה מסודרת: חופה, חוץ, ריקודים, סעודה, מצווה טאנץ. כל תמונה נבחרה בקפידה.</p>
          </div>
        </div>
      </div>

      {/* פיצ'רים */}
      <div className="home-section home-features">
        <h2>מה PicUp יודעת לעשות</h2>
        <p className="home-section-desc">טכנולוגיה חכמה שחוסכת שעות של עבודה ידנית</p>
        <div className="home-features-grid">
          <div className="home-feature-card">
            <div className="home-feature-icon">🧠</div>
            <h3>AI חכם</h3>
            <p>מזהה פרצופים, מחלק לקטגוריות, מדרג איכות – חדות, עיניים עצומות, שריפה ועוד.</p>
          </div>
          <div className="home-feature-card">
            <div className="home-feature-icon">👨‍👩‍👦</div>
            <h3>מעדיף קרובים</h3>
            <p>תמונות של החתן, הכלה ובני המשפחה מקבלות עדיפות אוטומטית בבחירה.</p>
          </div>
          <div className="home-feature-card">
            <div className="home-feature-icon">📂</div>
            <h3>אלבום מסודר</h3>
            <p>תיקייה ראשית "אלבום" ובתוכה תתי-תיקיות לפי שלבי האירוע. הכול מאורגן לבד.</p>
          </div>
          <div className="home-feature-card">
            <div className="home-feature-icon">⚡</div>
            <h3>מהיר להפליא</h3>
            <p>מה שלקח שעות – קורה בדקות. בלי להתעכב על כל תמונה בנפרד.</p>
          </div>
          <div className="home-feature-card">
            <div className="home-feature-icon">🔁</div>
            <h3>האירוע נשמר</h3>
            <p>חוזרים לצפות בתמונות שנבחרו מתי שרוצים. כל אירוע נגיש בלחיצה.</p>
          </div>
          <div className="home-feature-card">
            <div className="home-feature-icon">🎯</div>
            <h3>שליטה מלאה</h3>
            <p>אתה קובע כמה תמונות מכל קטגוריה. חופה 50? ריקודים 30? הכול בשליטתך.</p>
          </div>
        </div>
      </div>

      {/* למי זה מתאים */}
      <div className="home-section home-audience">
        <h2>למי PicUp מתאימה?</h2>
        <div className="home-audience-grid">
          <div className="home-audience-card">
            <h3>📸 צלמים</h3>
            <p>מקבלים תיקייה ענקית? PicUp עושה סינון ראשוני חכם, חוסכת ימי עבודה.</p>
          </div>
          <div className="home-audience-card">
            <h3>👰 משפחות</h3>
            <p>קיבלתם 2,000 תמונות? תנו ל-PicUp לבחור את ה-200 הטובות, מסודרות לפי קטגוריות.</p>
          </div>
        </div>
      </div>

      {/* CTA סופי */}
      <div className="home-section home-cta">
        <h2>מוכנים לאלבום החלומות?</h2>
        <p>אלפי תמונות הופכות לאלבום מושלם. תוך דקות.</p>
        {!user ? (
          <button className="home-btn home-btn-primary" onClick={() => navigate("/register")}>
            התחל עכשיו – חינם
          </button>
        ) : (
          <button className="home-btn home-btn-primary" onClick={() => navigate("/events")}>
            לאירועים שלי
          </button>
        )}
      </div>
    </div>
  )
}
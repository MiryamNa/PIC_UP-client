import { useEffect, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import type { Event } from "../../models/Event"
import { getAllEvents } from "../../services/eventService"
import AddEventForm from "./AddEventForm"
import "./event.css"

export default function MyEventsPage() {
  const { user } = useAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const clientId = user?.clientId ?? ""

  const load = async () => {
    try {
      setLoading(true)
      const all = await getAllEvents()
      setEvents(all.filter((e) => e.clientId === clientId))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [user])

  return (
    <div className="events-page">
      <header className="events-header">
        <div>
          <h1>שלום, {user?.firstName}</h1>
          <p>האירועים שלך</p>
        </div>
        <div>
          <button className="primary-button" onClick={() => setShowForm((s) => !s)}>
            {showForm ? "ביטול" : "הוסף אירוע"}
          </button>
        </div>
      </header>

              {showForm && (
                <div className="modal-overlay" onClick={() => setShowForm(false)}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <AddEventForm
                      clientId={clientId}
                      onCreated={() => {
                        setShowForm(false)
                        load()
                      }}
                      onCancel={() => setShowForm(false)}
                    />
                  </div>
                </div>
              )}

              {loading ? (
                <p className="loading-text">טוען...</p>
              ) : (
      <div className="events-grid">
          

          {events.length === 0 ? (
            <div className="events-empty">
              <p>אין לך אירועים עדיין</p>
              <button className="primary-button" onClick={() => setShowForm(true)}>
                הוסף אירוע
              </button>
            </div>
          ) : (
            events.map((ev) => (
              <article
                key={`${ev.clientId}-${ev.name}-${ev.pathToFolder}`}
                className="event-card"
              >
                <div className="event-card-head">
                  <span className="event-card-badge">{ev.quantityPictureChoose} תמונות</span>
                </div>

                <h3>{ev.name}</h3>

                <div className="event-card-body">
                  <p>כמות תמונות: {ev.totalPictures}</p>
                  <p className="event-card-path">{ev.pathToFolder}</p>
                </div>

                <div className="event-card-actions">
                  <button type="button" className="event-card-action">
                    הצג תמונות נבחרות
                  </button>
                </div>

                <div className="event-card-actions">
                  <button type="button" className="event-card-action">
                    הסר אירוע
                  </button>
                </div>
              </article>
            ))
          )}
          <button className="event-card add-card" onClick={() => setShowForm(true)}>
            <div className="event-card-head">
              <span className="event-card-icon">+</span>
            </div>
            <h3>הוסף אירוע</h3>
            <p>צור אירוע חדש בכרטיס נוסף</p>
          </button>
        </div>
      )}
    </div>
  )
}
import { useState } from "react"
import type { Event } from "../../models/Event"
import { createEvent } from "../../services/eventService"

export default function AddEventForm({
  clientId,
  onCreated,
}: {
  clientId: string
  onCreated: () => void
}) {
  const [name, setName] = useState("")
  const [totalPictures, setTotalPictures] = useState<number | "">("")
  const [quantityPictureChoose, setQuantityPictureChoose] = useState<number | "">("")
  const [pathToFolder, setPathToFolder] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !totalPictures || !quantityPictureChoose || !pathToFolder) {
      setError("אנא מלא/י את כל השדות")
      return
    }

    const payload: Event = {
      clientId: clientId,
      name,
      totalPictures: Number(totalPictures),
      quantityPictureChoose: Number(quantityPictureChoose),
      pathToFolder,
    }

    try {
      setLoading(true)
      await createEvent(payload)
      onCreated()
    } catch (err) {
      setError("שגיאה ביצירת האירוע")
    } finally {
      setLoading(false)
    }
  }

  return (
   <form onSubmit={handleSubmit} className="event-form-panel">
  <h2>הוסף אירוע חדש</h2>
  <div className="event-form">
    <label>
      שם אירוע
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </label>
    <label>
      סה"כ תמונות
      <input
        type="number"
        value={String(totalPictures)}
        onChange={(e) =>
          setTotalPictures(e.target.value === "" ? "" : Number(e.target.value))
        }
      />
    </label>
    <label>
      כמות תמונות לבחירה
      <input
        type="number"
        value={String(quantityPictureChoose)}
        onChange={(e) =>
          setQuantityPictureChoose(e.target.value === "" ? "" : Number(e.target.value))
        }
      />
    </label>
    <label className="event-form-full">
      נתיב לתיקייה
      <input value={pathToFolder} onChange={(e) => setPathToFolder(e.target.value)} />
    </label>
  </div>

  <div className="event-form-actions">
    <button type="submit" disabled={loading}>
      {loading ? "שולח..." : "שמור אירוע"}
    </button>
    {error && <p className="event-form-error">{error}</p>}
  </div>
</form>
  )
}
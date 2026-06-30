import { useState } from "react"
import type { Event } from "../../models/Event"
import { useEventContext } from "../../contexts/EventContext"
import { useNavigate } from "react-router-dom";


export default function AddEventForm({
    clientId,
    onCancel,
  }: {
    clientId: string
    onCreated: () => void
    onCancel: () => void
  }) {
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [totalPictures, setTotalPictures] = useState<number | "">("")
  const [quantityPictureChoose, setQuantityPictureChoose] = useState<number | "">("")
  const [pathToFolder, setPathToFolder] = useState("")
  const [error, setError] = useState("")
  const [status, setStatus] = useState("");
  const [folderSelected, setFolderSelected] = useState(false);
  const isFormIncomplete =
  !name ||
  !totalPictures ||
  !quantityPictureChoose ||
  !pathToFolder

  const selectFolder = async () => {
  setStatus("פותח חלון בחירת תיקייה...");

  const res = await fetch("http://127.0.0.1:8080/event/select-folder", { method: "POST" });
  const data = await res.json();

  if (data.success) {
    setStatus(`✅ נבחרה תיקייה: ${data.path}`);
    setFolderSelected(true);
    setPathToFolder(data.path);
  } else {
    setStatus("❌ לא נבחרה תיקייה");
    setFolderSelected(false);
  }
  }
  const {setEvent}= useEventContext()
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

    setEvent(payload)

    navigate("/event/family-selection")
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
      <div id="status">{status}</div>
      <button
        type="button"
        className="primary-button"
        onClick={selectFolder}
              >
        {folderSelected ? "בחר תיקייה" : "בחר תיקייה"}
      </button>
      {pathToFolder && (
        <p className="event-form-path">{pathToFolder}</p>
      )}
      <input type="hidden" value={pathToFolder} />
    </label>
  </div>

  <div className="event-form-actions">
    <button type="submit"   
            className="primary-button"
            disabled={ isFormIncomplete}>
      {"שמור אירוע"}
    </button>

    <button
      type="button"
      className="primary-button"
      onClick={onCancel}
    >
      ביטול
    </button>

    {error && <p className="event-form-error">{error}</p>}
  </div>
</form>
  )
}

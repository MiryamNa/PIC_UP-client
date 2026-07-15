import { useState, useEffect, useRef } from "react"
import { useEventContext } from "../../contexts/EventContext"
import { useNavigate } from "react-router-dom";
import { countImages } from "../../services/eventService";
import type { EventCreationDTO } from "../../dto/EventCreation";
import type { listCategoryDTO } from "../../dto/listCategoryDTO";

const CATEGORIES = [
  "צילומי חוץ",
  "כסא כלה",
  "חופה",
  "חדר יחוד",
  "סעודה",
  "ריקודים",
  "מצוה טאנץ",
] as const;

const CATEGORY_KEY_MAP: Record<string, string> = {
  "צילומי חוץ": "outdoor",
  "כסא כלה": "bride_chair",
  "חופה": "chuppa",
  "חדר יחוד": "yichud",
  "סעודה": "meal",
  "ריקודים": "dance",
  "מצוה טאנץ": "mitzva_tantz",
}


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
  const [countingImages, setCountingImages] = useState(false);
  const [imagesCounted, setImagesCounted] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const prevQuantityRef = useRef<number | "">(undefined);
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

    // Count images in the selected folder
    setCountingImages(true);
    setImagesCounted(false);
    setTotalPictures("");
    try {
      const count = await countImages(data.path);
      if (count === 0) {
        setStatus("❌ לא נמצאו תמונות בתיקייה, בחר תיקייה אחרת");
        setTotalPictures("");
        return;
      }
      setTotalPictures(count);
      setImagesCounted(true);
    } catch {
      setStatus("❌ שגיאה בספירת התמונות בתיקייה");
    } finally {
      setCountingImages(false);
    }
  } else {
    setStatus("❌ לא נבחרה תיקייה");
    setFolderSelected(false);
  }
  }
  const {setEvent}= useEventContext()
  // Auto-distribute quantities across categories when total changes
  useEffect(() => {
    if (quantityPictureChoose !== "" && quantityPictureChoose !== prevQuantityRef.current) {
      const total = quantityPictureChoose as number;
      const perCategory = Math.floor(total / CATEGORIES.length);
      const remainder = total % CATEGORIES.length;
      const counts: Record<string, number> = {};
      CATEGORIES.forEach((cat, i) => {
        counts[cat] = perCategory + (i < remainder ? 1 : 0);
      });
      setCategoryCounts(counts);
      prevQuantityRef.current = total;
    }
  }, [quantityPictureChoose]);

  const handleCategoryChange = (category: string, newValue: number) => {
    setCategoryCounts((prev) => {
      const updated = { ...prev, [category]: newValue };
      const newTotal = Object.values(updated).reduce((sum, v) => sum + v, 0);
      if (totalPictures && newTotal > totalPictures) return prev; // don't exceed total
      if (newTotal < 0) return prev;
      setQuantityPictureChoose(newTotal);
      prevQuantityRef.current = newTotal;
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !totalPictures || !quantityPictureChoose || !pathToFolder) {
      setError("אנא מלא/י את כל השדות")
      return
    }

    const categories: listCategoryDTO[] = Object.entries(categoryCounts).map(
      ([catName, qty]) => ({ category_name: CATEGORY_KEY_MAP[catName], selected_count: qty })
    );

    const payload: EventCreationDTO = {
      clientId: clientId,
      name,
      totalPictures: Number(totalPictures),
      quantityPictureChoose: Number(quantityPictureChoose),
      pathToFolder,
      categories,
      groom_image: null,
      bride_image: null,
      relatives_images: [],
    }

    setEvent(payload)

    navigate("/event/family-selection")
  }

  return (
   <form onSubmit={handleSubmit} className="event-form-panel">
  <h2>הוסף אלבום חדש</h2>
  <div className="event-form">
    <label>
      שם אלבום
      <input value={name} onChange={(e) => setName(e.target.value)} />
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
    {pathToFolder && imagesCounted && (
      <label>
        סה"כ תמונות
        {countingImages ? (
          <div className="counting-status">סופר את כמות התמונות בתיקייה...</div>
        ) : imagesCounted ? (
          <div className="counting-result">נמצאו {totalPictures} תמונות</div>
        ) : (
          <input
            type="number"
            value={String(totalPictures)}
            onChange={(e) =>
              setTotalPictures(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        )}
      </label>
    )}
    {pathToFolder && imagesCounted && (
      <>
    <label>
      כמות תמונות לבחירה {totalPictures ? `(בין 1 ל-${totalPictures})` : ""}
      <input
        type="number"
        value={String(quantityPictureChoose)}
        min={1}
        max={totalPictures || 0}
        onChange={(e) => {
          const val = e.target.value === "" ? "" : Number(e.target.value);
          if (val !== "" && totalPictures && val > totalPictures) {
            setQuantityPictureChoose(totalPictures);
          } else if (val !== "" && val < 1) {
            setQuantityPictureChoose(1);
          } else {
            setQuantityPictureChoose(val);
          }
        }}
      />
    </label>

    {quantityPictureChoose !== "" && quantityPictureChoose > 0 && (
      <div className="category-counts-section">
        <h3>חלוקה לקטגוריות</h3>
        {CATEGORIES.map((cat) => (
          <label key={cat}>
            {cat}
            <input
              type="number"
              value={categoryCounts[cat] ?? 0}
              min={0}
              max={totalPictures || 0}
              onChange={(e) => {
                const val = e.target.value === "" ? 0 : Number(e.target.value);
                handleCategoryChange(cat, val);
              }}
            />
          </label>
        ))}
        <div className="category-total">
          סה"כ: {Object.values(categoryCounts).reduce((s, v) => s + v, 0)} / {quantityPictureChoose}
        </div>
      </div>
    )}
      </>
    )}

  </div>

  <div className="event-form-actions">
    <button type="submit"   
            className="primary-button"
            disabled={ isFormIncomplete}>
      {"יצירת אלבום"}
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

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEventContext } from "../../contexts/EventContext";
import "./FamilySelectionPage.css";

type SelectionType =
  | "groom"
  | "bride"
  | "groomFamily"
  | "brideFamily";

export default function FamilySelectionPage() {
  const navigate = useNavigate();

  const {
    event,
    selection,
    setSelection,
  } = useEventContext();

  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [endPos, setEndPos] = useState<{ x: number; y: number } | null>(null);
  const [selectedFromDrag, setSelectedFromDrag] = useState<Set<string>>(new Set());
  const imgRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [error, setError] = useState("");

  const [currentMode, setCurrentMode] =
    useState<SelectionType>("groom");

  useEffect(() => {
    if (!event) {
      navigate("/");
      return;
    }

    loadFaces();
  }, []);

  const loadFaces = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8080/event/get_faces",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      const data: string[] = await response.json();

      setPhotos(data);
    } catch {
      setError("שגיאה בטעינת התמונות");
    } finally {
      setLoading(false);
    }
  };

  const isAlreadySelected = (photo: string) => {
    return (
      selection.groom === photo ||
      selection.bride === photo ||
      selection.groomFamily.includes(photo) ||
      selection.brideFamily.includes(photo)
    );
  };

  const handlePhotoClick = (photo: string) => {
    if (
      isAlreadySelected(photo) &&
      selection.groom !== photo &&
      selection.bride !== photo
    ) {
      return;
    }

    switch (currentMode) {
      case "groom":
        setSelection((prev) => ({
          ...prev,
          groom: photo,
        }));
        break;

      case "bride":
        setSelection((prev) => ({
          ...prev,
          bride: photo,
        }));
        break;

      case "groomFamily":
        if (isAlreadySelected(photo)) return;

        setSelection((prev) => ({
          ...prev,
          groomFamily: [...prev.groomFamily, photo],
        }));
        break;

      case "brideFamily":
        if (isAlreadySelected(photo)) return;

        setSelection((prev) => ({
          ...prev,
          brideFamily: [...prev.brideFamily, photo],
        }));
        break;
    }
  };

  const handleSubmit = () => {
    if (!selection.groom) {
      alert("יש לבחור חתן");
      return;
    }

    if (!selection.bride) {
      alert("יש לבחור כלה");
      return;
    }


    navigate("/results");
  };

  if (loading) {
    return (
       <div className="family-selection-loading">
      <div className="loading-card">
        <div className="loading-spinner" />
        <h2>המערכת עובדת על זיהוי תמונות הקרובים</h2>
        <h3>פעולה זו עשויה להימשך מספר דקות</h3>
        <p>נא להמתין-בבקשה לא לסגור חלונית זו</p>
      </div>
    </div>
    );
  }

const modeLabels = {
  groom: "חתן",
  bride: "כלה",
  groomFamily: "צד חתן",
  brideFamily: "צד כלה",
};

return (
  <div className="family-selection-page">
    <div className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">בחירת פנים</p>
          <h1>בחירת בני המשפחה</h1>
          <p>בחר את הדמויות המרכזיות ולסמן את בני המשפחה בכל צד.</p>
        </div>
        <div className="status-pill">מצב: {modeLabels[currentMode]}</div>
      </header>

      <div className="selection-toolbar">
        {(["groom", "bride", "groomFamily", "brideFamily"] as SelectionType[]).map((mode) => (
          <button
            key={mode}
            className={`mode-pill ${currentMode === mode ? "active" : ""}`}
            onClick={() => setCurrentMode(mode)}
          >
            {modeLabels[mode]}
          </button>
        ))}
      </div>

      <div className="photo-grid">
        {photos.map((photo, index) => {
          const selected =
            selection.groom === photo ||
            selection.bride === photo ||
            selection.groomFamily.includes(photo) ||
            selection.brideFamily.includes(photo);

          return (
            <button
              key={index}
              type="button"
              className={`photo-card ${selected ? "selected" : ""}`}
              onClick={() => handlePhotoClick(photo)}
            >
              <img
                src={`data:image/jpeg;base64,${photo}`}
                alt={`face-${index}`}
              />
              <span className="photo-card-badge">
                {selected ? "נבחר" : "בחר"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="selection-summary">
        <p>צד חתן: {selection.groomFamily.length}</p>
        <p>צד כלה: {selection.brideFamily.length}</p>
      </div>

      <button className="confirm-btn" onClick={handleSubmit}>
        אישור
      </button>
    </div>
  </div>
);}
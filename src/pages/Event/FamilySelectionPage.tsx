import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEventContext } from "../../contexts/EventContext"
import { useLoading } from "../../contexts/LoadingContext"
import { createEvent } from "../../services/eventService"
import type { EventCreationDTO } from "../../dto/EventCreation"
import "./FamilySelectionPage.css"

type SelectionType = "groom" | "bride" | "groomFamily" | "brideFamily"

interface DragRect {
  startX: number
  startY: number
  endX: number
  endY: number
}

export default function FamilySelectionPage() {
  const navigate = useNavigate()
  const { event, selection, setSelection } = useEventContext()
  const { setBlocked } = useLoading()
  const [loading, setLoading] = useState(true)
  const [photos, setPhotos] = useState<string[]>([])
  const [currentMode, setCurrentMode] = useState<SelectionType>("groom")

  // Drag state
  const [isDragging, setIsDragging] = useState(false)
  const [dragRect, setDragRect] = useState<DragRect | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const imgRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const dragStartRef = useRef<{ x: number; y: number } | null>(null)

  // Block header navigation while loading
  useEffect(() => {
    setBlocked(loading)
  }, [loading, setBlocked])

  const loadFaces = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(
        "http://127.0.0.1:8080/event/get_faces",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(event),
        }
      )
      if (!response.ok) throw new Error()
      const data: string[] = await response.json()
      setPhotos(data)
    } catch {
      // failed to load faces — silently handled
    } finally {
      setLoading(false)
    }
  }, [event])

  useEffect(() => {
    if (!event) {
      navigate("/")
      return
    }
    loadFaces()
  }, [event, navigate, loadFaces])

  const isAlreadySelected = (photo: string) => {
    return (
      selection.groom === photo ||
      selection.bride === photo ||
      selection.groomFamily.includes(photo) ||
      selection.brideFamily.includes(photo)
    )
  }

  const handlePhotoClick = (photo: string) => {
    if (
      isAlreadySelected(photo) &&
      selection.groom !== photo &&
      selection.bride !== photo
    ) {
      return
    }

    switch (currentMode) {
      case "groom":
        setSelection((prev) => ({ ...prev, groom: photo }))
        break
      case "bride":
        setSelection((prev) => ({ ...prev, bride: photo }))
        break
      case "groomFamily":
        if (isAlreadySelected(photo)) return
        setSelection((prev) => ({
          ...prev,
          groomFamily: [...prev.groomFamily, photo],
        }))
        break
      case "brideFamily":
        if (isAlreadySelected(photo)) return
        setSelection((prev) => ({
          ...prev,
          brideFamily: [...prev.brideFamily, photo],
        }))
        break
    }
  }

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = gridRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    dragStartRef.current = { x, y }
    setDragRect({ startX: x, startY: y, endX: x, endY: y })
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStartRef.current) return
    const rect = gridRef.current?.getBoundingClientRect()
    if (!rect) return
    const start = dragStartRef.current
    setDragRect({
      startX: start.x,
      startY: start.y,
      endX: e.clientX - rect.left,
      endY: e.clientY - rect.top,
    })
  }

  const handleMouseUp = () => {
    if (!isDragging || !dragRect || !gridRef.current) {
      setIsDragging(false)
      setDragRect(null)
      dragStartRef.current = null
      return
    }

    const gridRect = gridRef.current.getBoundingClientRect()
    const minX = Math.min(dragRect.startX, dragRect.endX)
    const maxX = Math.max(dragRect.startX, dragRect.endX)
    const minY = Math.min(dragRect.startY, dragRect.endY)
    const maxY = Math.max(dragRect.startY, dragRect.endY)

    const selectedIndices: number[] = []

    imgRefs.current.forEach((el, idx) => {
      const photoRect = el.getBoundingClientRect()
      const photoLeft = photoRect.left - gridRect.left
      const photoRight = photoLeft + photoRect.width
      const photoTop = photoRect.top - gridRect.top
      const photoBottom = photoTop + photoRect.height

      if (
        photoLeft < maxX &&
        photoRight > minX &&
        photoTop < maxY &&
        photoBottom > minY
      ) {
        selectedIndices.push(idx)
      }
    })

    if (selectedIndices.length > 0) {
      if (currentMode === "groom") {
        setSelection((prev) => ({ ...prev, groom: photos[selectedIndices[0]] }))
      } else if (currentMode === "bride") {
        setSelection((prev) => ({ ...prev, bride: photos[selectedIndices[0]] }))
      } else if (currentMode === "groomFamily") {
        const newPhotos = photos.filter(
          (_, i) =>
            selectedIndices.includes(i) && !isAlreadySelected(photos[i])
        )
        setSelection((prev) => ({
          ...prev,
          groomFamily: [...prev.groomFamily, ...newPhotos],
        }))
      } else if (currentMode === "brideFamily") {
        const newPhotos = photos.filter(
          (_, i) =>
            selectedIndices.includes(i) && !isAlreadySelected(photos[i])
        )
        setSelection((prev) => ({
          ...prev,
          brideFamily: [...prev.brideFamily, ...newPhotos],
        }))
      }
    }

    setIsDragging(false)
    setDragRect(null)
    dragStartRef.current = null
  }

  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!selection.groom) {
      alert("יש לבחור חתן")
      return
    }
    if (!selection.bride) {
      alert("יש לבחור כלה")
      return
    }

    if (!event) {
      alert("חסרים פרטי אירוע. אנא חזור לשלב הקודם.")
      navigate("/")
      return
    }

    try {
      setSubmitting(true)

      const fullEvent: EventCreationDTO = {
        ...event,
        groom_image: selection.groom,
        bride_image: selection.bride,
        relatives_images: [
          ...selection.groomFamily,
          ...selection.brideFamily,
        ],
      }
      await createEvent(fullEvent)


      navigate("/")
    } catch {
      alert("שגיאה ביצירת האירוע. נסה שוב.")
    } finally {
      setSubmitting(false)
    }
  }

  const isSelectionComplete = selection.groom && selection.bride

  if (loading) {
    return (
      <div className="family-selection-loading">
        <div className="loading-card">
          <div className="loading-spinner" />
          <h2>המערכת עובדת על זיהוי תמונות הקרובים</h2>
          <h3>פעולה זו עשויה להימשך מספר דקות</h3>
          <p>נא להמתין — בבקשה לא לסגור חלונית זו</p>
        </div>
      </div>
    )
  }

  const modeLabels: Record<SelectionType, string> = {
    groom: "חתן",
    bride: "כלה",
    groomFamily: "צד חתן",
    brideFamily: "צד כלה",
  }

  return (
    <div className="family-selection-page">
      <div className="family-selection-card">
        {/* Header */}
        <header className="fs-header">
          <div>
            <p className="eyebrow">בחירת פנים</p>
            <h1>בחירת בני המשפחה</h1>
            <p>בחר את הדמויות המרכזיות וסמן את בני המשפחה בכל צד.</p>
          </div>
          <div className="status-pill">מצב: {modeLabels[currentMode]}</div>
        </header>

        {/* Mode toolbar */}
        <div className="selection-toolbar">
          {(["groom", "bride", "groomFamily", "brideFamily"] as SelectionType[]).map(
            (mode) => (
              <button
                key={mode}
                className={`mode-pill ${currentMode === mode ? "active" : ""}`}
                onClick={() => setCurrentMode(mode)}
              >
                {modeLabels[mode]}
              </button>
            )
          )}
        </div>

        {/* Selected display — shown when both groom and bride selected */}
        {isSelectionComplete && (
          <div className="selected-display">
            <h2>הבחירה שלך</h2>
            <div className="selected-couples">
              <div className="selected-person">
                <span className="selected-label">חתן</span>
                <img
                  className="selected-main-photo"
                  src={`data:image/jpeg;base64,${selection.groom}`}
                  alt="groom"
                />
                <div className="selected-family-row">
                  {selection.groomFamily.map((photo, i) => (
                    <img
                      key={i}
                      className="selected-family-photo"
                      src={`data:image/jpeg;base64,${photo}`}
                      alt={`groom-family-${i}`}
                    />
                  ))}
                </div>
              </div>
              <div className="selected-person">
                <span className="selected-label">כלה</span>
                <img
                  className="selected-main-photo"
                  src={`data:image/jpeg;base64,${selection.bride}`}
                  alt="bride"
                />
                <div className="selected-family-row">
                  {selection.brideFamily.map((photo, i) => (
                    <img
                      key={i}
                      className="selected-family-photo"
                      src={`data:image/jpeg;base64,${photo}`}
                      alt={`bride-family-${i}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Photo grid with drag */}
        <div
          className="photo-grid-wrapper"
          ref={gridRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="photo-grid">
            {photos.map((photo, index) => {
              const selected =
                selection.groom === photo ||
                selection.bride === photo ||
                selection.groomFamily.includes(photo) ||
                selection.brideFamily.includes(photo)

              return (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) imgRefs.current.set(index, el)
                  }}
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
                </div>
              )
            })}
          </div>

          {/* Drag selection rectangle */}
          {isDragging && dragRect && (
            <div
              className="drag-select-box"
              style={{
                left: Math.min(dragRect.startX, dragRect.endX),
                top: Math.min(dragRect.startY, dragRect.endY),
                width: Math.abs(dragRect.endX - dragRect.startX),
                height: Math.abs(dragRect.endY - dragRect.startY),
              }}
            />
          )}
        </div>

        {/* Summary and submit */}
        <div className="selection-summary">
          <p>צד חתן: {selection.groomFamily.length}</p>
          <p>צד כלה: {selection.brideFamily.length}</p>
        </div>
        <button
          className="confirm-btn"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "שולח..." : "אישור"}
        </button>
      </div>
    </div>
  )
}

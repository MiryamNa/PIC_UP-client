import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getEventImages } from "../../services/eventService";
import "./event.css";

export default function EventViewPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const folderPath = searchParams.get("path") ?? "";
  const eventName = searchParams.get("name") ?? "אירוע";

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const files = await getEventImages(folderPath);
        setImages(files);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [folderPath]);

  return (
    <div className="events-page">
      <header className="events-header">
        <div>
          <h1>{eventName}</h1>
          <p>{folderPath}</p>
        </div>
        <div>
          <button className="primary-button" onClick={() => navigate(-1)}>
            חזרה
          </button>
        </div>
      </header>

      {loading ? (
        <p className="loading-text">טוען תמונות...</p>
      ) : images.length === 0 ? (
        <div className="events-empty">
          <p>אין תמונות מוכנות להצגה</p>
          <p className="event-card-path">
            {folderPath
              ? `התמונות ייטענו מהתיקייה כשה-backend יהיה מוכן`
              : "נתיב התיקייה חסר"}
          </p>
        </div>
      ) : (
        <div className="event-images-grid">
          {images.map((img, i) => (
            <div key={i} className="event-image-card">
              <img src={img} alt={`תמונה ${i + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

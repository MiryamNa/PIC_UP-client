import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getEventImages } from "../../services/eventService";
import "./event.css";

// ── helpers ──

function getOrientation(img: HTMLImageElement): "landscape" | "portrait" {
  return img.naturalWidth >= img.naturalHeight ? "landscape" : "portrait";
}

interface ImageItem {
  b64: string;
  orientation: "landscape" | "portrait";
}

// Build spreads:
// - Landscape: 2 per page → 4 per spread
// - Portrait: 1 per page → 2 per spread
interface Spread {
  left: (ImageItem | null)[];
  right: (ImageItem | null)[];
}

function buildSpreads(images: ImageItem[]): Spread[] {
  const spreads: Spread[] = [];
  let i = 0;

  while (i < images.length) {
    const current = images[i];

    if (current.orientation === "landscape") {
      // take up to 4 landscapes (2 per page)
      const left: ImageItem[] = [];
      const right: ImageItem[] = [];
      if (i < images.length) left.push(images[i++]);
      if (i < images.length) left.push(images[i++]);
      if (i < images.length) right.push(images[i++]);
      if (i < images.length) right.push(images[i++]);
      spreads.push({ left, right });
    } else {
      // portrait: 1 per page
      const left = images[i++];
      const right = images[i] ?? null;
      if (right) i++;
      spreads.push({
        left: [left],
        right: right ? [right] : [],
      });
    }
  }

  return spreads;
}

// ── component ──

export default function EventViewPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const folderPath = searchParams.get("path") ?? "";
  const eventName = searchParams.get("name") ?? "האירוע שלי";

  // raw base64 strings from server
  const [rawImages, setRawImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // album state
  const [view, setView] = useState<"cover" | "album">("cover");
  const [page, setPage] = useState(0);
  const [flipping, setFlipping] = useState<"next" | "prev" | null>(null);

  const loadedRef = useRef(false);

  // ── load images ──

  useEffect(() => {
    if (!folderPath) return;
    const load = async () => {
      try {
        setLoading(true);
        const files = await getEventImages(folderPath);
        setRawImages(files);
        loadedRef.current = false;
      } catch (err) {
        console.error("Failed to load images:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [folderPath]);

  // ── detect orientations, build items, then spreads ──

  const [items, setItems] = useState<ImageItem[]>([]);

  useEffect(() => {
    if (rawImages.length === 0 || loadedRef.current) return;
    loadedRef.current = true;

    const results: ImageItem[] = [];
    let pending = rawImages.length;

    rawImages.forEach((b64) => {
      const img = new Image();
      img.onload = () => {
        results.push({ b64, orientation: getOrientation(img) });
        pending--;
        if (pending === 0) {
          // preserve original order
          const ordered = rawImages.map((b) => results.find((r) => r.b64 === b)!);
          setItems(ordered.filter(Boolean));
        }
      };
      img.onerror = () => {
        pending--;
        if (pending === 0) {
          const ordered = rawImages.map((b) => results.find((r) => r.b64 === b)!);
          setItems(ordered.filter(Boolean));
        }
      };
      img.src = `data:image/jpeg;base64,${b64}`;
    });
  }, [rawImages]);

  const spreads = useMemo(() => buildSpreads(items), [items]);

  // ── navigation ──

  const goTo = useCallback(
    (target: number) => {
      if (target < 0 || target >= spreads.length) return;
      setFlipping(target > page ? "next" : "prev");
      setTimeout(() => {
        setPage(target);
        setFlipping(null);
      }, 150);
    },
    [page, spreads.length]
  );

  const nextPage = useCallback(() => goTo(page + 1), [goTo, page]);
  const prevPage = useCallback(() => goTo(page - 1), [goTo, page]);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (view !== "album") return;
      if (e.key === "ArrowRight") nextPage();
      else if (e.key === "ArrowLeft") prevPage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view, nextPage, prevPage]);

  // ── render ──

  if (loading) {
    return (
      <div className="events-page">
        <p className="loading-text">טוען תמונות...</p>
      </div>
    );
  }

  // ── COVER ──

  if (view === "cover") {
    return (
      <div className="album-cover-container">
        <div className="album-cover">
          <div className="album-cover-spine" />
          <div className="album-cover-front">
            <div className="album-cover-inner">
              <p className="album-cover-label">אלבום תמונות</p>
              <h1 className="album-cover-title">{eventName}</h1>
              <p className="album-cover-count">{spreads.length} עמודים</p>
              <button className="album-open-btn" onClick={() => setView("album")}>
                פתח אלבום ✦
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── ALBUM ──

  if (spreads.length === 0) {
    return (
      <div className="events-page">
        <div className="events-empty">
          <p>אין תמונות מוכנות להצגה</p>
        </div>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button className="primary-button" onClick={() => navigate(-1)}>
            חזרה
          </button>
        </div>
      </div>
    );
  }

  const spread = spreads[page];

  return (
    <div className="album-viewer">
      {/* Top bar */}
      <div className="album-topbar">
        <button className="album-topbar-btn" onClick={() => setView("cover")}>
          ✦ {eventName}
        </button>
        <div className="album-nav-dots">
          {spreads.map((_, i) => (
            <button
              key={i}
              className={`album-nav-dot ${i === page ? "active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button className="album-topbar-btn" onClick={() => navigate(-1)}>
          סגור אלבום
        </button>
      </div>

      {/* Spread with side arrows */}
      <div className="album-spread-area">
        {/* Prev arrow — right side */}
        <button
          className="album-side-arrow arrow-prev"
          onClick={prevPage}
          disabled={page === 0}
          aria-label="הקודם"
        >
          ▶
        </button>

        <div className={`album-spread-wrapper ${flipping ? `flip-${flipping}` : ""}`}>
          <div className="album-spread">
            {/* Left page */}
            <div className="album-page left">
              {spread.left.map((item, idx) =>
                item ? (
                  <img
                    key={idx}
                    src={`data:image/jpeg;base64,${item.b64}`}
                    alt=""
                  />
                ) : (
                  <div key={idx} className="album-empty-slot" />
                )
              )}
              {spread.left.length === 0 && <div className="album-empty-page" />}
            </div>

            {/* Center spine shadow */}
            <div className="album-spine-shadow" />

            {/* Right page */}
            <div className="album-page right">
              {spread.right.length > 0 ? (
                spread.right.map((item, idx) =>
                  item ? (
                    <img
                      key={idx}
                      src={`data:image/jpeg;base64,${item.b64}`}
                      alt=""
                    />
                  ) : (
                    <div key={idx} className="album-empty-slot" />
                  )
                )
              ) : (
                <div className="album-empty-page" />
              )}
            </div>
          </div>
        </div>

        {/* Next arrow — left side */}
        <button
          className="album-side-arrow arrow-next"
          onClick={nextPage}
          disabled={page === spreads.length - 1}
          aria-label="הבא"
        >
          ◀
        </button>
      </div>

    </div>
  );
}

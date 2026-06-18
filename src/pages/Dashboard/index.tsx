import ImageGrid from '../../components/ImageGrid'
import ProgressBar from '../../components/ProgressBar'

export default function Dashboard() {
  return (
    <section className="page-grid">
      <article className="page-card">
        <div className="page-header">
          <div>
            <p className="eyebrow">Overview</p>
            <h2>Dashboard</h2>
            <p>Keep your image batch, progress, and review queue aligned in one view.</p>
          </div>
          <span className="badge">3 items ready</span>
        </div>

        <div className="tile-grid">
          <article className="tile">
            <h3>Uploads</h3>
            <p>12 photos are waiting to be processed.</p>
          </article>
          <article className="tile">
            <h3>Processing</h3>
            <p>5 images are currently in the queue.</p>
          </article>
          <article className="tile">
            <h3>Results</h3>
            <p>2 result sets have been reviewed.</p>
          </article>
        </div>
      </article>

      <article className="page-card">
        <div className="page-header">
          <div>
            <h2>Recent images</h2>
            <p>Preview the latest assets from the primary workflow.</p>
          </div>
        </div>
        <ImageGrid />
      </article>

      <article className="page-card">
        <div className="page-header">
          <div>
            <h2>Processing status</h2>
            <p>Track the live progress of your current batch.</p>
          </div>
        </div>
        <div className="tile-grid">
          <ProgressBar label="Enhancement pipeline" value={68} />
          <ProgressBar label="Tagging model" value={45} />
        </div>
      </article>
    </section>
  )
}

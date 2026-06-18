import ProgressBar from '../../components/ProgressBar'

export default function Processing() {
  return (
    <section className="page-grid">
      <article className="page-card">
        <div className="page-header">
          <div>
            <p className="eyebrow">Processing</p>
            <h2>Watch the pipeline</h2>
            <p>Review the progress of each stage as the images are analyzed.</p>
          </div>
          <span className="badge">Live</span>
        </div>
        <div className="tile-grid">
          <ProgressBar label="Image analysis" value={82} />
          <ProgressBar label="Enhancement pass" value={54} />
          <ProgressBar label="Metadata extraction" value={30} />
        </div>
      </article>
    </section>
  )
}

import UploadZone from '../../components/UploadZone'

export default function Upload() {
  return (
    <section className="page-grid">
      <article className="page-card">
        <div className="page-header">
          <div>
            <p className="eyebrow">Upload</p>
            <h2>Import your batch</h2>
            <p>Select files, drag them in, and start the pipeline with one action.</p>
          </div>
          <span className="badge">Ready</span>
        </div>
        <UploadZone />
      </article>

      <article className="page-card">
        <h2>Recommended settings</h2>
        <div className="chip-row">
          <span className="chip">Auto-enhance</span>
          <span className="chip">Batch rename</span>
          <span className="chip">Metadata sync</span>
        </div>
      </article>
    </section>
  )
}

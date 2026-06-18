export default function Settings() {
  return (
    <section className="page-grid">
      <article className="page-card">
        <div className="page-header">
          <div>
            <p className="eyebrow">Settings</p>
            <h2>Workspace preferences</h2>
            <p>Control how the image workflow behaves for your current project.</p>
          </div>
          <span className="badge">Configured</span>
        </div>

        <div className="tile-grid">
          <article className="tile">
            <h3>Auto-save</h3>
            <p>Every processed result is stored to the default output folder.</p>
          </article>
          <article className="tile">
            <h3>Processing mode</h3>
            <p>Balanced quality and speed are currently enabled.</p>
          </article>
          <article className="tile">
            <h3>Notifications</h3>
            <p>Alerts are enabled for batch completion and failures.</p>
          </article>
        </div>
      </article>
    </section>
  )
}

export default function Results() {
  return (
    <section className="page-grid">
      <article className="page-card">
        <div className="page-header">
          <div>
            <p className="eyebrow">Results</p>
            <h2>Final output</h2>
            <p>Review the processed assets and the current confidence scores.</p>
          </div>
          <span className="badge">4 ready</span>
        </div>
        <div className="result-grid">
          <article className="result-card">
            <h3>Product A</h3>
            <p>Confidence: 94% · Background cleanup applied.</p>
          </article>
          <article className="result-card">
            <h3>Product B</h3>
            <p>Confidence: 88% · Colors balanced and sharpened.</p>
          </article>
          <article className="result-card">
            <h3>Product C</h3>
            <p>Confidence: 91% · Ready for export.</p>
          </article>
        </div>
      </article>
    </section>
  )
}

export default function UploadZone() {
  return (
    <section className="upload-box">
      <p className="eyebrow">Drop files here</p>
      <h3>Upload images to start processing</h3>
      <p>Drag and drop a batch of photos, or choose files from your device to begin analysis.</p>
      <button type="button" className="nav-link" style={{ marginTop: '12px', width: 'fit-content' }}>
        Choose files
      </button>
    </section>
  )
}

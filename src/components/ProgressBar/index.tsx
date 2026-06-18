type ProgressBarProps = {
  label: string
  value: number
}

export default function ProgressBar({ label, value }: ProgressBarProps) {
  return (
    <div className="tile">
      <p className="eyebrow">Status</p>
      <h3>{label}</h3>
      <div className="progress-track" aria-label="Processing progress">
        <div className="progress-fill" style={{ width: `${value}%` }} />
      </div>
      <p>{value}% complete</p>
    </div>
  )
}

type ImageCardProps = {
  title: string
  caption: string
}

export default function ImageCard({ title, caption }: ImageCardProps) {
  return (
    <article className="card">
      <p className="eyebrow">Preview</p>
      <h3>{title}</h3>
      <p>{caption}</p>
    </article>
  )
}

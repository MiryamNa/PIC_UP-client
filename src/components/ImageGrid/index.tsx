import ImageCard from '../ImageCard'

const images = [
  { title: 'Front view', caption: 'Ready for tagging and enhancement.' },
  { title: 'Product detail', caption: 'Detected edges and highlights are queued.' },
  { title: 'Packaging shot', caption: 'AI review completed with a confidence score.' },
]

export default function ImageGrid() {
  return (
    <section className="card-grid">
      {images.map((item) => (
        <ImageCard key={item.title} title={item.title} caption={item.caption} />
      ))}
    </section>
  )
}

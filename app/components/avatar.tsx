export function Avatar({ url, alt }: { url: string; alt: string }) {
  return (
    <img
      src={url}
      alt={alt}
      className="h-10 w-10 rounded-full border border-neutral-700 p-1"
    />
  )
}

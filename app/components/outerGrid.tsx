export function OuterGrid({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`grid grid-cols-[100px_1fr_0px] md:grid-cols-[300px_1fr] gap-10 ${className}`}
    >
      {children}
    </div>
  )
}

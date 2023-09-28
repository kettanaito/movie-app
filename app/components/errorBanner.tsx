interface ErrorBannerProps {
  displayText: string
  error: Error
}

export function ErrorBanner({ displayText, error }: ErrorBannerProps) {
  return (
    <div className="p-5 bg-red-500 text-red-200 bg-opacity-20 rounded-md">
      <p role="alert" className="mb-1 text-white font-bold">
        {displayText}
      </p>
      <pre className="max-w-full text-sm whitespace-pre-wrap break-words">
        {error.name}: {error.message}
      </pre>
      <button className="button button-ghost mt-5 w-full">
        Report an issue
      </button>
    </div>
  )
}

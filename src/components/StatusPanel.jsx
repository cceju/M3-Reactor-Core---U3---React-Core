export default function StatusPanel({ kind = "loading", title, message, onRetry }) {
  return (
    <section className={`status-panel ${kind}`} role={kind === "error" ? "alert" : "status"} aria-live="polite">
      {kind === "loading" && <span className="spinner" aria-hidden="true" />}
      {kind === "error" && <span className="status-icon" aria-hidden="true">!</span>}
      {kind === "empty" && <span className="status-icon" aria-hidden="true">⌕</span>}
      <strong>{title}</strong>
      <p>{message}</p>
      {kind === "error" && onRetry && <button className="retry-button" type="button" onClick={onRetry}>Try again ↗</button>}
    </section>
  );
}

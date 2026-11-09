export default function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="PokéLab inicio">
        <span className="brand-mark">◉</span> POKÉ<span>LAB</span>
      </a>
      <div className="top-meta"><span className="live-dot" /> DATA FROM POKEAPI <span className="divider">/</span> M3 · REACTOR CORE</div>
    </header>
  );
}

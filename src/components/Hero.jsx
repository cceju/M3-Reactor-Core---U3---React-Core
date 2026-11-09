export default function Hero({ totalCount, favouriteCount, cacheCount }) {
  return (
    <section className="hero">
      <p className="eyebrow">THE FIELD GUIDE / NO. 003</p>
      <h1>Discover your<br /><em>next favourite.</em></h1>
      <p className="hero-copy">A living Pokédex powered by React 19. Search, filter, compare — then build your own collection.</p>
      <div className="hero-stats">
        <div><strong>{totalCount || "—"}</strong><span>SPECIES LOADED</span></div>
        <div><strong>{favouriteCount}</strong><span>YOUR FAVOURITES</span></div>
        <div><strong>{cacheCount}</strong><span>CACHED RECORDS</span></div>
      </div>
    </section>
  );
}

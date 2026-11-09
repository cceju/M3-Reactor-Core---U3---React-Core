export default function Toolbar({
  query, onQueryChange, type, onTypeChange, types,
  sort, onSortChange, favouritesOnly, onToggleFavourites
}) {
  return (
    <section className="controls" aria-label="Búsqueda y filtros">
      <label className="search-wrap">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={query}
          onChange={event => onQueryChange(event.target.value)}
          placeholder="Search by name or number..."
          aria-label="Buscar Pokémon"
        />
      </label>
      <label className="select-wrap">
        <span className="sr-only">Filtrar por tipo</span>
        <select value={type} onChange={event => onTypeChange(event.target.value)}>
          <option value="all">All types</option>
          {types.map(item => <option key={item} value={item}>{item[0].toUpperCase() + item.slice(1)}</option>)}
        </select>
      </label>
      <label className="select-wrap">
        <span className="sr-only">Ordenar Pokémon</span>
        <select value={sort} onChange={event => onSortChange(event.target.value)}>
          <option value="id-asc">Number: low to high</option>
          <option value="id-desc">Number: high to low</option>
          <option value="name-asc">Name: A–Z</option>
          <option value="name-desc">Name: Z–A</option>
        </select>
      </label>
      <button
        className={`filter-button ${favouritesOnly ? "active" : ""}`}
        type="button"
        aria-pressed={favouritesOnly}
        onClick={onToggleFavourites}
      >
        {favouritesOnly ? "♥ Favourites" : "♡ Favourites"}
      </button>
    </section>
  );
}

const TYPE_COLOURS = {
  normal:"#a8a77a", fire:"#ee8130", water:"#6390f0", electric:"#f7d02c",
  grass:"#7ac74c", ice:"#96d9d6", fighting:"#c22e28", poison:"#a33ea1",
  ground:"#e2bf65", flying:"#a98ff3", psychic:"#f95587", bug:"#a6b91a",
  rock:"#b6a136", ghost:"#735797", dragon:"#6f35fc", dark:"#705746",
  steel:"#b7b7ce", fairy:"#d685ad"
};

export default function PokemonCard({ pokemon, isFavourite, onToggleFavourite, onSelect }) {
  return (
    <article
      className="pokemon-card"
      tabIndex={0}
      role="button"
      aria-label={`Ver detalles de ${pokemon.name}`}
      onClick={() => onSelect(pokemon)}
      onKeyDown={event => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(pokemon);
        }
      }}
    >
      <button
        className={`favourite ${isFavourite ? "is-favourite" : ""}`}
        type="button"
        aria-label={isFavourite ? "Quitar de favoritos" : "Añadir a favoritos"}
        aria-pressed={isFavourite}
        onClick={event => {
          event.stopPropagation();
          onToggleFavourite(pokemon.id);
        }}
      >
        {isFavourite ? "♥" : "♡"}
      </button>
      <div className="card-image">
        {pokemon.image
          ? <img src={pokemon.image} alt={pokemon.name} loading="lazy" />
          : <span className="image-fallback">?</span>}
        <span className="card-number">#{String(pokemon.id).padStart(3, "0")}</span>
      </div>
      <div className="card-info">
        <h3>{pokemon.name}</h3>
        <div className="type-list">
          {pokemon.types.map(type => (
            <span key={type} className="type-pill" style={{ "--type": TYPE_COLOURS[type] || "#777" }}>{type}</span>
          ))}
        </div>
        <div className="card-foot"><span>BASE STATS</span><strong>{pokemon.totalStats}</strong></div>
      </div>
    </article>
  );
}

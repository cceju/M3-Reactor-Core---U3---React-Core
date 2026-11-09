import { useEffect } from "react";

const TYPE_COLOURS = {
  normal:"#a8a77a", fire:"#ee8130", water:"#6390f0", electric:"#f7d02c",
  grass:"#7ac74c", ice:"#96d9d6", fighting:"#c22e28", poison:"#a33ea1",
  ground:"#e2bf65", flying:"#a98ff3", psychic:"#f95587", bug:"#a6b91a",
  rock:"#b6a136", ghost:"#735797", dragon:"#6f35fc", dark:"#705746",
  steel:"#b7b7ce", fairy:"#d685ad"
};

export default function PokemonDialog({ pokemon, onClose }) {
  useEffect(() => {
    if (!pokemon) return undefined;
    const handleKeyDown = event => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("dialog-open");
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("dialog-open");
    };
  }, [pokemon, onClose]);

  if (!pokemon) return null;

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="detail-dialog" role="dialog" aria-modal="true" aria-labelledby="detail-title">
        <button className="dialog-close" onClick={onClose} type="button" aria-label="Cerrar detalles">×</button>
        <div className="detail-art">
          {pokemon.image && <img src={pokemon.image} alt={pokemon.name} />}
          <span>#{String(pokemon.id).padStart(3, "0")}</span>
        </div>
        <div className="detail-copy">
          <p className="eyebrow">POKÉDEX ENTRY / {String(pokemon.id).padStart(3, "0")}</p>
          <h2 id="detail-title">{pokemon.name}</h2>
          <div className="type-list">
            {pokemon.types.map(type => <span key={type} className="type-pill" style={{ "--type": TYPE_COLOURS[type] || "#777" }}>{type}</span>)}
          </div>
          <div className="measurements">
            <div><strong>{(pokemon.height / 10).toFixed(1)} m</strong><span>HEIGHT</span></div>
            <div><strong>{(pokemon.weight / 10).toFixed(1)} kg</strong><span>WEIGHT</span></div>
            <div><strong>{pokemon.experience ?? "—"}</strong><span>BASE XP</span></div>
          </div>
          <h3 className="stats-heading">BASE STATS <span>{pokemon.totalStats} TOTAL</span></h3>
          {pokemon.stats.map(stat => (
            <div className="stat-row" key={stat.name}>
              <span>{stat.name.replace("-", " ")}</span>
              <div className="stat-track"><i style={{ width: `${Math.min(100, Math.round(stat.value / 160 * 100))}%` }} /></div>
              <b>{stat.value}</b>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

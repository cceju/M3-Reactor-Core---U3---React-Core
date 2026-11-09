import PokemonCard from "./PokemonCard.jsx";

export default function PokemonGrid({ pokemon, favourites, onToggleFavourite, onSelect }) {
  return (
    <section className="pokemon-grid" aria-label="Resultados Pokémon">
      {pokemon.map(item => (
        <PokemonCard
          key={item.id}
          pokemon={item}
          isFavourite={favourites.includes(item.id)}
          onToggleFavourite={onToggleFavourite}
          onSelect={onSelect}
        />
      ))}
    </section>
  );
}

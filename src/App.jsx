import { useCallback, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Toolbar from "./components/Toolbar.jsx";
import StatusPanel from "./components/StatusPanel.jsx";
import PokemonGrid from "./components/PokemonGrid.jsx";
import PokemonDialog from "./components/PokemonDialog.jsx";
import { usePokemonData } from "./hooks/usePokemonData.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { filterPokemon, getAvailableTypes, sortPokemon } from "./utils/pokemon.js";
import { getCacheCount } from "./api/pokeApi.js";

const FAVOURITES_KEY = "pokelab-react19:favourites";

export default function App() {
  const { pokemon, loading, error } = usePokemonData();
  const [storedFavourites, setFavourites] = useLocalStorage(FAVOURITES_KEY, []);
  const favourites = Array.isArray(storedFavourites) ? storedFavourites.filter(Number.isInteger) : [];
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("id-asc");
  const [favouritesOnly, setFavouritesOnly] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [visibleCount, setVisibleCount] = useState(30);

  const types = useMemo(() => getAvailableTypes(pokemon), [pokemon]);
  const filteredPokemon = useMemo(() => {
    const filtered = filterPokemon(pokemon, { query, type, favouritesOnly, favourites });
    return sortPokemon(filtered, sort);
  }, [pokemon, query, type, favouritesOnly, favourites, sort]);

  const visiblePokemon = filteredPokemon.slice(0, visibleCount);

  const toggleFavourite = useCallback(id => {
    setFavourites(current => current.includes(id)
      ? current.filter(item => item !== id)
      : [...current, id]);
  }, [setFavourites]);

  const closeDialog = useCallback(() => setSelectedPokemon(null), []);

  const retry = () => window.location.reload();

  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero totalCount={pokemon.length} favouriteCount={favourites.length} cacheCount={getCacheCount()} />
        <Toolbar
          query={query}
          onQueryChange={value => { setQuery(value); setVisibleCount(30); }}
          type={type}
          onTypeChange={value => { setType(value); setVisibleCount(30); }}
          types={types}
          sort={sort}
          onSortChange={setSort}
          favouritesOnly={favouritesOnly}
          onToggleFavourites={() => { setFavouritesOnly(value => !value); setVisibleCount(30); }}
        />

        <div className="results-line">
          <span>{loading ? "LOADING FIELD DATA" : `${visiblePokemon.length} / ${filteredPokemon.length} SPECIES SHOWN`}</span>
          <span>POKEAPI / CACHE ENABLED</span>
        </div>

        {loading && <StatusPanel kind="loading" title="Waking up the Pokédex…" message="Fetching the first generation from PokeAPI." />}
        {!loading && error && <StatusPanel kind="error" title="The field data is unavailable" message={error} onRetry={retry} />}
        {!loading && !error && filteredPokemon.length === 0 && (
          <StatusPanel kind="empty" title="No Pokémon found" message="Prueba otra búsqueda, cambia el tipo o desactiva el filtro de favoritos." />
        )}
        {!loading && !error && filteredPokemon.length > 0 && (
          <>
            <PokemonGrid
              pokemon={visiblePokemon}
              favourites={favourites}
              onToggleFavourite={toggleFavourite}
              onSelect={setSelectedPokemon}
            />
            {visiblePokemon.length < filteredPokemon.length && (
              <div className="load-more-wrap">
                <button className="load-more" type="button" onClick={() => setVisibleCount(count => count + 30)}>
                  Load more Pokémon ↓
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <footer><span>POKÉLAB / REACT 19 + VITE</span><span>DATA: POKEAPI.CO · UNOFFICIAL FAN PROJECT</span></footer>
      <PokemonDialog pokemon={selectedPokemon} onClose={closeDialog} />
    </div>
  );
}

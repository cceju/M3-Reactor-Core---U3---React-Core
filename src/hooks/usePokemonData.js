import { useEffect, useState } from "react";
import { fetchPokemonDetails, fetchPokemonIndex } from "../api/pokeApi.js";
import { normalisePokemon } from "../utils/pokemon.js";

/**
 * Loads the Pokédex once per mount. Cleanup aborts in-flight requests.
 * Detail requests are grouped to avoid launching all 151 at once.
 */
export function usePokemonData() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPokemon() {
      setLoading(true);
      setError("");
      try {
        const index = await fetchPokemonIndex(controller.signal);
        const groups = Array.from(
          { length: Math.ceil(index.length / 12) },
          (_, groupIndex) => index.slice(groupIndex * 12, groupIndex * 12 + 12)
        );

        const results = [];
        for (const group of groups) {
          const settled = await Promise.allSettled(
            group.map(entry => fetchPokemonDetails(entry.id, controller.signal))
          );
          results.push(...settled
            .filter(result => result.status === "fulfilled")
            .map(result => normalisePokemon(result.value)));
        }

        if (!controller.signal.aborted) {
          if (results.length === 0) throw new Error("No se han podido cargar Pokémon. Inténtalo de nuevo.");
          setPokemon(results);
        }
      } catch (loadError) {
        if (loadError.name !== "AbortError" && !controller.signal.aborted) {
          setError(loadError.message || "Ha ocurrido un error inesperado.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadPokemon();
    return () => controller.abort();
  }, []);

  return { pokemon, loading, error };
}

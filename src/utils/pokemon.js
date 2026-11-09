export function normalisePokemon(raw) {
  const stats = Array.isArray(raw?.stats)
    ? raw.stats.map(item => ({
        name: item?.stat?.name || "unknown",
        value: Number(item?.base_stat) || 0
      }))
    : [];

  return {
    id: Number(raw?.id) || 0,
    name: typeof raw?.name === "string" ? raw.name : "unknown",
    image: raw?.sprites?.other?.["official-artwork"]?.front_default
      || raw?.sprites?.front_default
      || "",
    types: Array.isArray(raw?.types)
      ? raw.types.map(item => item?.type?.name).filter(Boolean)
      : [],
    height: Number(raw?.height) || 0,
    weight: Number(raw?.weight) || 0,
    experience: Number(raw?.base_experience) || 0,
    stats,
    totalStats: stats.reduce((total, stat) => total + stat.value, 0)
  };
}

export function filterPokemon(pokemon, { query, type, favouritesOnly, favourites }) {
  const term = query.trim().toLowerCase();
  return pokemon.filter(item => {
    const matchesQuery = !term
      || item.name.includes(term)
      || String(item.id) === term
      || String(item.id).padStart(3, "0").includes(term);
    const matchesType = type === "all" || item.types.includes(type);
    const matchesFavourite = !favouritesOnly || favourites.includes(item.id);
    return matchesQuery && matchesType && matchesFavourite;
  });
}

export function sortPokemon(pokemon, sortBy) {
  const [field, direction] = sortBy.split("-");
  const multiplier = direction === "desc" ? -1 : 1;
  return [...pokemon].sort((a, b) => {
    const result = field === "name" ? a.name.localeCompare(b.name) : a.id - b.id;
    return result * multiplier;
  });
}

export function getAvailableTypes(pokemon) {
  return [...new Set(pokemon.flatMap(item => item.types))].sort();
}

const BASE_URL = "https://pokeapi.co/api/v2";
const CACHE_PREFIX = "pokelab-react19:v1:";
const CACHE_TTL = 24 * 60 * 60 * 1000;

function readCache(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (!entry || Date.now() - entry.savedAt > CACHE_TTL) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return entry.data ?? null;
  } catch {
    return null;
  }
}

function writeCache(key, data) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // Cache is an optimisation: quota/privacy errors must not break the app.
  }
}

async function request(path, cacheKey, signal) {
  const cached = readCache(cacheKey);
  if (cached !== null) return cached;

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, { signal });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new Error("No se pudo conectar con PokeAPI. Comprueba tu conexión.");
  }

  if (!response.ok) {
    throw new Error(`PokeAPI respondió con ${response.status} ${response.statusText || ""}`.trim());
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("La API devolvió una respuesta que no es JSON válido.");
  }

  writeCache(cacheKey, data);
  return data;
}

export async function fetchPokemonIndex(signal) {
  const data = await request("/pokemon?limit=151&offset=0", "index-151", signal);
  if (!Array.isArray(data?.results)) throw new Error("El formato de la lista recibida no es válido.");
  return data.results.map((entry, index) => ({
    id: index + 1,
    name: entry.name
  }));
}

export async function fetchPokemonDetails(id, signal) {
  const key = String(id).toLowerCase();
  const data = await request(`/pokemon/${encodeURIComponent(key)}`, `pokemon-${key}`, signal);
  if (!data || typeof data.name !== "string") throw new Error(`Datos no válidos para el Pokémon #${id}.`);
  return data;
}

export function getCacheCount() {
  try {
    return Object.keys(localStorage).filter(key => key.startsWith(CACHE_PREFIX)).length;
  } catch {
    return 0;
  }
}

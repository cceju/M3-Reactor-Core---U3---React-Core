# PokéLab — M3: Reactor Core

PokéLab rebuilt with **React 19 + Vite**. It consumes the public PokeAPI and presents a searchable, filterable Pokédex with favourites, detail views, loading/error/empty states, and a 24-hour `localStorage` API cache.

## Requirements

- Node.js 18+
- npm
- Internet connection for the initial data load

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`).

## Production

```bash
npm run build
npm run preview
```

## Architecture

```text
pokelab-react19/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── AI-DECLARATION.md
├── .gitignore
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── style.css
    ├── api/
    │   └── pokeApi.js
    ├── hooks/
    │   ├── usePokemonData.js
    │   └── useLocalStorage.js
    ├── utils/
    │   └── pokemon.js
    └── components/
        ├── Header.jsx
        ├── Hero.jsx
        ├── Toolbar.jsx
        ├── StatusPanel.jsx
        ├── PokemonCard.jsx
        ├── PokemonGrid.jsx
        └── PokemonDialog.jsx
```

## React concepts demonstrated

| Rubric | Where to inspect |
|---|---|
| Reusable components and props | `src/components/` |
| Minimal state and derived values | `src/App.jsx` — filtered and visible Pokémon are derived, not copied into state |
| Effects and cleanup | `src/hooks/usePokemonData.js` — initial API load and `AbortController`; `PokemonDialog.jsx` — Escape listener cleanup |
| Stable keys | Pokémon cards use `pokemon.id`; types and stats use their stable names |
| Conditional rendering | Loading, error, empty and results states are mutually exclusive |
| Bonus custom hooks | `usePokemonData` and `useLocalStorage` |

## Data flow

1. `usePokemonData` requests the index and Pokémon details.
2. `pokeApi.js` handles HTTP errors, JSON parsing, abort signals, and a 24-hour local cache.
3. `pokemon.js` normalises and transforms API data.
4. `App.jsx` owns shared UI state (search, type, sort, favourites and selected Pokémon).
5. Components receive data and callbacks through props and render from React state.

## AI usage

Read `AI-DECLARATION.md`. Review and edit it so it accurately describes the assistance used and your own modifications before submission.

## API attribution

Data comes from [PokeAPI v2](https://pokeapi.co/docs/v2). PokéLab is an unofficial educational fan project and is not affiliated with Nintendo, Game Freak, or The Pokémon Company.

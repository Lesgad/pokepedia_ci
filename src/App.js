import { useState, useEffect } from 'react';
import './App.css';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';

const POKEMON_PER_PAGE = 24;
const TOTAL_POKEMON = 1025;
const TOTAL_PAGES = Math.ceil(TOTAL_POKEMON / POKEMON_PER_PAGE);

function formatName(name) {
  return name
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setSelectedPokemon(null);

    const offset = (currentPage - 1) * POKEMON_PER_PAGE;

    (async () => {
      try {
        const listRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_PER_PAGE}&offset=${offset}`
        );
        const listData = await listRes.json();
        const results = await Promise.all(
          listData.results.map(async ({ name, url }) => {
            try {
              const data = await fetch(url).then(r => r.json());
              return { ...data, displayName: formatName(name) };
            } catch {
              return { apiName: name, displayName: formatName(name), error: true };
            }
          })
        );
        if (mounted) {
          setPokemonData(results);
          setLoading(false);
        }
      } catch {
        if (mounted) {
          setPokemonData([]);
          setLoading(false);
        }
      }
    })();

    return () => { mounted = false; };
  }, [currentPage]);

  const goTo = (page) => {
    if (page < 1 || page > TOTAL_PAGES || page === currentPage) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="pokeball-icon" aria-hidden="true" />
          <div>
            <h1 className="header-title">Poképédia</h1>
            <p className="header-subtitle">{TOTAL_POKEMON} Pokémon · Générations I–IX</p>
          </div>
        </div>
      </header>

      <main className="main">
        {loading ? (
          <div className="loading">
            <div className="pokeball-loader" aria-hidden="true" />
            <p>Chargement des Pokémon…</p>
          </div>
        ) : (
          <>
            <div className="pokemon-grid">
              {pokemonData.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id ?? pokemon.apiName}
                  pokemon={pokemon}
                  onClick={() => setSelectedPokemon(pokemon)}
                />
              ))}
            </div>

            <div className="pagination">
              <button className="page-btn" onClick={() => goTo(1)} disabled={currentPage === 1}>
                «
              </button>
              <button className="page-btn" onClick={() => goTo(currentPage - 1)} disabled={currentPage === 1}>
                ‹
              </button>
              <span className="page-info">
                Page <strong>{currentPage}</strong> / {TOTAL_PAGES}
              </span>
              <button className="page-btn" onClick={() => goTo(currentPage + 1)} disabled={currentPage === TOTAL_PAGES}>
                ›
              </button>
              <button className="page-btn" onClick={() => goTo(TOTAL_PAGES)} disabled={currentPage === TOTAL_PAGES}>
                »
              </button>
            </div>
          </>
        )}
      </main>

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
}

export default App;

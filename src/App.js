import { useState, useEffect } from 'react';

import './App.css';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';

const POKEMON_LIST = [
  { apiName: 'zorua-hisui',     displayName: 'Zorua Hisui' },
  { apiName: 'zoroark-hisui',   displayName: 'Zoroark Hisui' },
  { apiName: 'eevee',           displayName: 'Évoli' },
  { apiName: 'vaporeon',        displayName: 'Aquali' },
  { apiName: 'buneary',         displayName: 'Laporeille' },
  { apiName: 'lopunny',         displayName: 'Lockpin' },
  { apiName: 'lopunny-mega',    displayName: 'Méga Lockpin' },
  { apiName: 'eevee-gmax',      displayName: 'Évoli GMax' },
  { apiName: 'terapagos',       displayName: 'Terrapagos' },
  { apiName: 'giratina',        displayName: 'Giratina' },
  { apiName: 'ralts',           displayName: 'Tarsal' },
  { apiName: 'kirlia',          displayName: 'Kirlia' },
  { apiName: 'gardevoir',       displayName: 'Gardevoir' },
  { apiName: 'gardevoir-mega',  displayName: 'Méga Gardevoir' },
  { apiName: 'sprigatito',      displayName: 'Poussacha' },
  { apiName: 'floragato',       displayName: 'Matourgeoant' },
  { apiName: 'meowscarada',     displayName: 'Mascarade' },
  { apiName: 'charizard',     displayName: 'Dracaufeu' },
  { apiName: 'charmander',     displayName: 'Salamèche' },
];

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const results = await Promise.all(
        POKEMON_LIST.map(async ({ apiName, displayName }) => {
          try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${apiName}`);
            if (!res.ok) throw new Error(`Not found: ${apiName}`);
            const data = await res.json();
            return { ...data, displayName, apiName };
          } catch {
            return { apiName, displayName, error: true };
          }
        })
      );
      setPokemonData(results);
      setLoading(false);
    };
    fetchAll();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="pokeball-icon" aria-hidden="true" />
          <div>
            <h1 className="header-title">Poképédia</h1>
            <p className="header-subtitle">{POKEMON_LIST.length} Pokémon · Hisui &amp; Sélection spéciale</p>
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
          <div className="pokemon-grid">
            {pokemonData.map((pokemon) => (
              <PokemonCard
                key={pokemon.apiName}
                pokemon={pokemon}
                onClick={() => setSelectedPokemon(pokemon)}
              />
            ))}
          </div>
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

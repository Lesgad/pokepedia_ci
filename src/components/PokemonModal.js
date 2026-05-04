import { useEffect } from 'react';
import { TYPE_COLORS, TYPE_NAMES_FR, STAT_NAMES_FR, getImage } from '../utils';

function PokemonModal({ pokemon, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (pokemon.error) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal modal-error" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>✕</button>
          <div className="modal-error-body">
            <span className="card-error-icon">?</span>
            <h2>{pokemon.displayName}</h2>
            <p>Données non disponibles pour ce Pokémon.</p>
          </div>
        </div>
      </div>
    );
  }

  const mainType = pokemon.types[0].type.name;
  const typeColor = TYPE_COLORS[mainType] || '#888';
  const image = getImage(pokemon);
  const totalStats = pokemon.stats.reduce((acc, s) => acc + s.base_stat, 0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        style={{ '--type-color': typeColor }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-banner">
          <div className="modal-banner-bg" />
          {image ? (
            <img src={image} alt={pokemon.displayName} className="modal-image" />
          ) : (
            <div className="modal-image-placeholder">?</div>
          )}
        </div>

        <div className="modal-content">
          <div className="modal-header">
            <span className="modal-number">#{String(pokemon.id).padStart(4, '0')}</span>
            <h2 className="modal-name">{pokemon.displayName}</h2>
            <div className="modal-types">
              {pokemon.types.map((t) => (
                <span
                  key={t.type.name}
                  className="type-badge type-badge-lg"
                  style={{ background: TYPE_COLORS[t.type.name] || '#888' }}
                >
                  {TYPE_NAMES_FR[t.type.name] || t.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-body">
            <div className="modal-left">
              <div className="modal-measures">
                <div className="measure-item">
                  <span className="measure-label">Taille</span>
                  <span className="measure-value">{(pokemon.height / 10).toFixed(1)} m</span>
                </div>
                <div className="measure-divider" />
                <div className="measure-item">
                  <span className="measure-label">Poids</span>
                  <span className="measure-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
                </div>
              </div>

              <div className="modal-abilities">
                <h4 className="section-label">Talents</h4>
                <div className="abilities-list">
                  {pokemon.abilities.map((a) => (
                    <span
                      key={a.ability.name}
                      className={`ability ${a.is_hidden ? 'ability-hidden' : ''}`}
                    >
                      {a.ability.name.replace(/-/g, ' ')}
                      {a.is_hidden && <small> (caché)</small>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-right">
              <h4 className="section-label">Statistiques</h4>
              {pokemon.stats.map((s) => {
                const pct = Math.min((s.base_stat / 255) * 100, 100);
                const barColor =
                  s.base_stat >= 100 ? '#4ade80' :
                  s.base_stat >= 60 ? '#facc15' : '#f87171';
                return (
                  <div key={s.stat.name} className="stat-row">
                    <span className="stat-name">
                      {STAT_NAMES_FR[s.stat.name] || s.stat.name}
                    </span>
                    <span className="stat-value">{s.base_stat}</span>
                    <div className="stat-bar-bg">
                      <div
                        className="stat-bar"
                        style={{ width: `${pct}%`, background: barColor }}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="stat-row stat-total">
                <span className="stat-name">Total</span>
                <span className="stat-value" style={{ color: typeColor }}>{totalStats}</span>
                <div className="stat-bar-bg">
                  <div
                    className="stat-bar"
                    style={{
                      width: `${Math.min((totalStats / 720) * 100, 100)}%`,
                      background: typeColor,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonModal;

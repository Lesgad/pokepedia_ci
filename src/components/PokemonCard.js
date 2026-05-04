import { TYPE_COLORS, TYPE_NAMES_FR, getImage } from '../utils';

function PokemonCard({ pokemon, onClick }) {
  if (pokemon.error) {
    return (
      <div className="card card-error" onClick={onClick}>
        <div className="card-error-content">
          <span className="card-error-icon">?</span>
          <p className="card-name">{pokemon.displayName}</p>
          <p className="card-error-msg">Données non disponibles</p>
        </div>
      </div>
    );
  }

  const mainType = pokemon.types[0].type.name;
  const image = getImage(pokemon);

  return (
    <div
      className="card"
      style={{ '--type-color': TYPE_COLORS[mainType] || '#888' }}
      onClick={onClick}
    >
      <div className="card-number">#{String(pokemon.id).padStart(4, '0')}</div>
      <div className="card-image-wrapper">
        {image ? (
          <img src={image} alt={pokemon.displayName} className="card-image" />
        ) : (
          <div className="card-image-placeholder">?</div>
        )}
      </div>
      <div className="card-info">
        <h3 className="card-name">{pokemon.displayName}</h3>
        <div className="card-types">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className="type-badge"
              style={{ background: TYPE_COLORS[t.type.name] || '#888' }}
            >
              {TYPE_NAMES_FR[t.type.name] || t.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;

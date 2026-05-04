# Poképédia

Encyclopédie Pokémon complète affichant les **1025 Pokémon** (générations I à IX), construite avec React et l'API PokéAPI.

## Fonctionnalités

- **1025 Pokémon** — toutes les générations I à IX, paginés par 24
- **Noms français** — récupérés dynamiquement depuis PokéAPI
- **Fiche détaillée** — statistiques, taille, poids, talents, types
- **Niveau d'évolution** — indique comment et à quel niveau chaque Pokémon évolue (niveau, échange, pierre…)
- **Thème sombre** — design coloré selon le type, avec animations fluides
- **Responsive** — adapté mobile et desktop

## Lancer l'application

```bash
npm install
npm start
```

## Technologies

- [React](https://reactjs.org/) 18
- [PokéAPI](https://pokeapi.co/) — données Pokémon en temps réel

## Structure

```
src/
├── App.js                  # Shell principal, pagination
├── App.css                 # Styles globaux
├── components/
│   ├── PokemonCard.js      # Carte grille
│   └── PokemonModal.js     # Fiche détaillée + évolution
└── utils.js                # Couleurs types, traductions FR, helpers
```

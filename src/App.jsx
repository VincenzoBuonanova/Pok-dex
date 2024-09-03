import { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faTurnUp, faCompactDisc, faPersonCane, faEgg } from '@fortawesome/free-solid-svg-icons';
import Navbar from "./Components/Navbar/Navbar.jsx";
import './App.css'; // Assicurati che questo file esista e contenga le tue personalizzazioni CSS



export default function App() {
  const [pokemon, setPokemon] = useState(null); // Stato per memorizzare i dati del Pokémon
  const [input, setInput] = useState(''); // Stato per memorizzare l'input dell'utente

  // Funzione per cercare un Pokémon usando l'input dell'utente
  const searchPokemon = async () => {
    const formattedInput = input.toLowerCase().replace(/ /g, '-'); // Formatta l'input per adattarlo all'URL della API
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${formattedInput}`);

    if (response.ok) {
      const result = await response.json();
      setPokemon(result); // Imposta lo stato con i dati del Pokémon trovato
    } else {
      console.log("Pokemon non trovato");
      setPokemon(null); // Reset dello stato se il Pokémon non è trovato
    }
  };

  // Funzione per capitalizzare e formattare i nomi
  function formatName(string) {
    return string
      .split(/[-_]/) // Divide la stringa usando trattini o underscore
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalizza la prima lettera di ogni parola
      .join(' '); // Unisce le parole con uno spazio
  }

  // Funzione per formattare i metodi di apprendimento delle mosse
  function formatLearnMethod(method, level) {
    switch (method) {
      case 'level-up':
        return <span> <FontAwesomeIcon icon={faTurnUp} style={{ color: 'green' }} /> Raggiunto livello {level}</span>;
      case 'machine':
        return <span> <FontAwesomeIcon icon={faCompactDisc} style={{ color: 'blue' }} /> Tramite MT</span>;
      case 'tutor':
        return <span> <FontAwesomeIcon icon={faPersonCane} style={{ color: 'purple' }} /> Mossa Tutor</span>;
      case 'egg':
        return <span> <FontAwesomeIcon icon={faEgg} style={{ color: 'orange' }} /> Mossa Uovo</span>;
      default:
        return formatName(method); // Capitalizza il metodo se non è uno dei casi previsti
    }
  }

  // Funzione per ottenere l'icona appropriata per le statistiche del Pokémon
  function getIconForStat(statName) {
    switch (statName) {
      case 'hp':
        return 'heart text-success';
      case 'speed':
        return 'wind text-info';
      case 'attack':
        return 'fist-raised text-danger';
      case 'defense':
        return 'shield-virus text-primary';
      case 'special-attack':
        return 'bolt text-warning';
      case 'special-defense':
        return 'shield-alt text-secondary';
      default:
        return 'gem';
    }
  }

  function getStatBarWidth(baseStat) {
    const maxStat = 255; // Valore massimo per la statistica
    return `${(baseStat / maxStat) * 100}%`;
  }

  function StatList({ stats }) {
    return (
      <ul className="my-1" style={{ listStyle: 'none', padding: 0 }}>
        {stats.map(stat => (
          <li key={stat.stat.name} className="stat-bar-container">
            <div className="col-3">
            <i className={`fas fa-${getIconForStat(stat.stat.name)}`}></i>
            <span className="me-2">{formatName(stat.stat.name)}: {stat.base_stat}</span>
            </div>
            <div className="stat-bar col-6">
              <div className="stat-bar-fill" style={{ width: getStatBarWidth(stat.base_stat) }}></div>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  // Funzioni per navigare tra i Pokémon
  const goToPreviousPokemon = () => {
    if (pokemon && pokemon.id > 1) {
      fetchPokemon(pokemon.id - 1); // Carica il Pokémon precedente
    }
  };

  const goToNextPokemon = () => {
    if (pokemon) {
      fetchPokemon(pokemon.id + 1); // Carica il Pokémon successivo
    }
  };

  // Funzione per recuperare i dati del Pokémon dato un ID
  const fetchPokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (response.ok) {
      const result = await response.json();
      setPokemon(result);
    } else {
      console.log("Pokemon non trovato");
      setPokemon(null);
    }
  };

  return (
    <>

      <Navbar setInput={setInput} searchPokemon={searchPokemon} />

      <div className="container my-3">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-3">Pokédex</h1>

            {pokemon && (
              <div className="card mb-5">
                <div className="card-header text-center">
                  <button
                    className="btn btn-link text-decoration-none text-dark"
                    onClick={goToPreviousPokemon}
                    disabled={pokemon.id === 1} // Disabilita il pulsante se è il primo Pokémon
                  >
                    #{pokemon.id-1} <FontAwesomeIcon icon={faArrowLeft} className="ps-2" />
                  </button>
                  #{pokemon.id} {formatName(pokemon.name)}
                  <button
                    className="btn btn-link text-decoration-none text-dark"
                    onClick={goToNextPokemon}
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="pe-2" />#{pokemon.id + 1}
                  </button>
                </div>

                <div className="card-body">

                  <h5 className="card-title text-center">
                    <span className={`badge badge-type pokemon-${pokemon.types[0].type.name}`}>
                      {formatName(pokemon.types[0].type.name)}
                    </span>
                    {pokemon.types[1] && (
                      <>
                      <span className="mx-1"></span>
                      <span className={`badge badge-type pokemon-${pokemon.types[1].type.name}`}>
                        {formatName(pokemon.types[1].type.name)}
                      </span>
                      </>
                    )}
                  </h5>

                  <div className="row align-items-center justify-content-center w-100">
                    <div className="col-12 col-md-3 d-flex justify-content-center align-items-center flex-column p-3">
                      <img src={pokemon.sprites.front_default} alt="Normale" className="img-fluid" />
                      <p>Sprite Normale</p>
                    </div>
                    <div className="col-12 col-md-3 d-flex justify-content-center align-items-center flex-column p-3">
                      <img src={pokemon.sprites.front_shiny} alt="Shiny" className="img-fluid" />
                      <p>Sprite Shiny</p>
                    </div>
                  </div>

                  <ul className="list-group list-group-flush mt-3">

                    <li className="list-group-item">
                      <strong>Abilità: </strong>
                      {pokemon.abilities.map((abilità, index) => {
                        const abilityName = formatName(abilità.ability.name);
                        return (
                          <span key={abilità.ability.name}>
                            {abilità.is_hidden ? <em>{abilityName}</em> : abilityName}
                            {index < pokemon.abilities.length - 1 && ", "}
                          </span>
                        );
                      })}

                    </li>

                    <li className="list-group-item px-5 py-3">
                      <strong>Statistiche:</strong>
                      <StatList stats={pokemon.stats} />
                    </li>

                    <li className="list-group-item">
                      <strong>Mosse Apprendibili:</strong>
                      <div className="container my-2">
                        <div className="row">
                          {(() => {
                            // 1. Ordinamento delle mosse
                            const moves = pokemon.moves
                              .sort((a, b) => {
                                const methodA = a.version_group_details[0].move_learn_method.name;
                                const methodB = b.version_group_details[0].move_learn_method.name;
                                const levelA = a.version_group_details[0].level_learned_at;
                                const levelB = b.version_group_details[0].level_learned_at;

                                // Priorità delle mosse apprese per livello (level-up)
                                if (methodA === 'level-up' && methodB !== 'level-up') {
                                  return -1;
                                }
                                if (methodA !== 'level-up' && methodB === 'level-up') {
                                  return 1;
                                }
                                if (methodA === 'level-up' && methodB === 'level-up') {
                                  return levelA - levelB;
                                }

                                // Seconda priorità: mosse apprese tramite MT (machine)
                                if (methodA === 'machine' && methodB !== 'machine') {
                                  return -1;
                                }
                                if (methodA !== 'machine' && methodB === 'machine') {
                                  return 1;
                                }
                                if (methodA === 'machine' && methodB === 'machine') {
                                  return a.move.name.localeCompare(b.move.name);
                                }

                                // Ultima priorità: mosse apprese tramite Tutor (tutor)
                                if (methodA === 'tutor' && methodB !== 'tutor') {
                                  return -1;
                                }
                                if (methodA !== 'tutor' && methodB === 'tutor') {
                                  return 1;
                                }
                                if (methodA === 'tutor' && methodB === 'tutor') {
                                  return a.move.name.localeCompare(b.move.name);
                                }

                                // Ritorno di 0 per le altre casistiche (nessun ordine specifico)
                                return 0;
                              });

                            // 2. Suddivisione delle mosse in colonne
                            const columnCount = 3; // Numero di colonne desiderato
                            const movesPerColumn = Math.ceil(moves.length / columnCount); // Numero di mosse per colonna
                            const columns = Array.from({ length: columnCount }, (_, i) =>
                              moves.slice(i * movesPerColumn, (i + 1) * movesPerColumn) // Suddivide le mosse in tre gruppi
                            );

                            // 3. Rendering delle colonne
                            return columns.map((column, colIndex) => (
                              <div key={colIndex} className="col-12 col-md-4">
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                  {column.map((move) => {
                                    const learnMethod = move.version_group_details[0].move_learn_method.name;
                                    const level = move.version_group_details[0].level_learned_at;
                                    return (
                                      <li key={move.move.name}>
                                        {formatName(move.move.name)} ({formatLearnMethod(learnMethod, level)})
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            ));
                          })()}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
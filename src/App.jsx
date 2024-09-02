// import Navbar from "./Components/Navbar/Navbar.jsx";
// import { useState } from "react";

// // useState = è l'hook che ci serve per settare uno stato di un elemento
// // useEffect = è l'hook che andiamo a utilizzare per evitare che ci siano render di troppo
// // useParams = è l'hook che ci serve per andare a prenderci i parametri delle rotte parametriche

// export default function App() {

//   const [pokemon, setPokemon] = useState(null);
//   const [input, setInput] = useState('');

//   const searchPokemon = async () => {
//     const formattedInput = input.toLowerCase().replace(/ /g, '-'); // Sostituisce spazi con trattini e converte in minuscolo
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${formattedInput}`);

//     if (response.ok) {
//       const result = await response.json();
//       setPokemon(result);
//     } else {
//       console.log("Pokemon non trovato");
//       setPokemon(null);
//     }
//   };

//   function formatName(string) {
//     return string
//       .split(/[-_]/) // Divide la stringa usando trattini o underscore come separatori
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalizza ogni parola
//       .join(' '); // Unisce le parole con uno spazio
//   }

//   function formatLearnMethod(method, level) {
//     switch (method) {
//       case 'level-up':
//         return `A livello ${level}`;
//       case 'machine':
//         return 'Tramite MT';
//       case 'tutor':
//         return 'Insegnamosse';
//       default:
//         return formatName(method); // Capitalizza il metodo se non è uno dei casi previsti
//     }
//   }

//   return (
//     <>
//       <Navbar setInput={setInput} searchPokemon={searchPokemon} />
//       <div className="container mt-5">
//         <div className="row">
//           <div className="col-12">
//             <h1 className="text-center">Pokédex</h1>

//             {pokemon && (
//               <div className="card mt-3">
//                 <div className="card-header">
//                   #{pokemon.id} {formatName(pokemon.name)}
//                 </div>
//                 <div className="card-body">
//                   <h5 className="card-title">{formatName(pokemon.types[0].type.name)} {pokemon.types[1] && " / " + formatName(pokemon.types[1].type.name)}</h5>
//                   <div className="row">
//                     <div className="col">
//                       <img src={pokemon.sprites.front_default} alt="Normale" className="img-fluid" />
//                       <p>Sprite Normale</p>
//                     </div>
//                     <div className="col">
//                       <img src={pokemon.sprites.front_shiny} alt="Shiny" className="img-fluid" />
//                       <p>Sprite Shiny</p>
//                     </div>
//                   </div>
//                   <ul className="list-group list-group-flush mt-3">
//                     <li className="list-group-item">
//                       <strong>Abilità:</strong> {pokemon.abilities.map((abilità) => formatName(abilità.ability.name)).join(", ")}
//                     </li>
//                     <li className="list-group-item">
//                       <strong>Statistiche:</strong>
//                       <ul style={{ listStyle: "none" }}>
//                         {pokemon.stats.map((stat) => (
//                           <li key={stat.stat.name}>{formatName(stat.stat.name)}: {stat.base_stat}</li>
//                         ))}
//                       </ul>
//                     </li>
//                     <li className="list-group-item">
//                       <strong>Mosse apprendibili:</strong>
//                       <ul>
//                         {pokemon.moves.map((move) => {
//                           const learnMethod = move.version_group_details[0].move_learn_method.name;
//                           const level = move.version_group_details[0].level_learned_at;
//                           return (
//                             <li key={move.move.name}>
//                               {formatName(move.move.name)} ({formatLearnMethod(learnMethod, level)})
//                             </li>
//                           );
//                         })}
//                       </ul>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



import Navbar from "./Components/Navbar/Navbar.jsx";
import { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

// useState = è l'hook che ci serve per settare uno stato di un elemento
// useEffect = è l'hook che andiamo a utilizzare per evitare che ci siano render di troppo
// useParams = è l'hook che ci serve per andare a prenderci i parametri delle rotte parametriche

export default function App() {

  const [pokemon, setPokemon] = useState(null);
  const [input, setInput] = useState('');

  const searchPokemon = async () => {
    const formattedInput = input.toLowerCase().replace(/ /g, '-'); // Sostituisce spazi con trattini e converte in minuscolo
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${formattedInput}`);

    if (response.ok) {
      const result = await response.json();
      setPokemon(result);
    } else {
      console.log("Pokemon non trovato");
      setPokemon(null);
    }
  };

  function formatName(string) {
    return string
      .split(/[-_]/) // Divide la stringa usando trattini o underscore come separatori
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalizza ogni parola
      .join(' '); // Unisce le parole con uno spazio
  }

  function formatLearnMethod(method, level) {
    switch (method) {
      case 'level-up':
        return `A livello ${level}`;
      case 'machine':
        return 'Tramite MT';
      case 'tutor':
        return 'Insegnamosse';
      default:
        return formatName(method); // Capitalizza il metodo se non è uno dei casi previsti
    }
  }

  const typeColors = {
    fire: 'danger',
    water: 'primary',
    grass: 'success',
    electric: 'warning',
    ice: 'info',
    fighting: 'dark',
    poison: '',
    ground: '',
    flying: 'secondary',
    psychic: '',
    bug: '',
    rock: 'secondary',
    ghost: 'dark',
    dragon: 'primary',
    dark: 'dark',
    steel: 'secondary',
    fairy: 'danger',
  };

  function getIconForStat(statName) {
    switch (statName) {
      case 'speed':
        return 'bolt text-warning';
      case 'attack':
        return 'arrow-up text-secondary';
      case 'defense':
        return 'shield-alt text-success';
      case 'hp':
        return 'heart text-danger';
      case 'special-attack':
        return 'tachometer-alt text-primary';
      case 'special-defense':
        return 'shield text-info';
      default:
        return 'star';
    }
  }

  return (
    <>
      <Navbar setInput={setInput} searchPokemon={searchPokemon} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Pokédex</h1>

            {pokemon && (
              <div className="card mt-3">
                <div className="card-header">
                  #{pokemon.id} {formatName(pokemon.name)}
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    <span className={`badge bg-${typeColors[pokemon.types[0].type.name] || 'secondary'}`}>
                      {formatName(pokemon.types[0].type.name)}
                    </span>
                    {pokemon.types[1] && (
                      <span className={`badge bg-${typeColors[pokemon.types[1].type.name] || 'secondary'}`}>
                        {formatName(pokemon.types[1].type.name)}
                      </span>
                    )}
                  </h5>
                  <div className="row">
                    <div className="col">
                      <img src={pokemon.sprites.front_default} alt="Normale" className="img-fluid" />
                      <p>Sprite Normale</p>
                    </div>
                    <div className="col">
                      <img src={pokemon.sprites.front_shiny} alt="Shiny" className="img-fluid" />
                      <p>Sprite Shiny</p>
                    </div>
                  </div>
                  <ul className="list-group list-group-flush mt-3">
                    <li className="list-group-item">
                      <strong>Abilità:</strong> {pokemon.abilities.map((abilità) => formatName(abilità.ability.name)).join(", ")}
                    </li>
                    <li className="list-group-item">
                      <strong>Statistiche:</strong>
                      <ul style={{ listStyle: "none" }}>
                        {pokemon.stats.map((stat) => (
                          <li key={stat.stat.name}>
                            <i className={`fas fa-${getIconForStat(stat.stat.name)}`}></i> {formatName(stat.stat.name)}: {stat.base_stat}
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="list-group-item">
                      <strong>Mosse apprendibili:</strong>
                      <ul>
                        {pokemon.moves.map((move) => {
                          const learnMethod = move.version_group_details[0].move_learn_method.name;
                          const level = move.version_group_details[0].level_learned_at;
                          return (
                            <li key={move.move.name}>
                              {formatName(move.move.name)} ({formatLearnMethod(learnMethod, level)})
                            </li>
                          );
                        })}
                      </ul>
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

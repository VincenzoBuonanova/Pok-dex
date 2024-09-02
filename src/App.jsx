import Navbar from "./Components/Navbar/Navbar.jsx";
// import Header from "./Components/Header/Header.jsx";
import { useState } from "react";


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



  return (
    <>
    <Navbar setInput={setInput} searchPokemon={searchPokemon} />
    {/* <Header /> */}
    <div className="container">
    <div className="row">
    <div className="col-12 col-md-4">
    <h1>Pokédex</h1>

    {pokemon && (
      <>
      <h3>{formatName(pokemon.name)}</h3>
      <img src={pokemon.sprites.front_default} alt="" />
      <ul>
      {pokemon.moves.slice(0, 4).map((move) => {
        return <li key={move.move.name}>{formatName(move.move.name)}</li>;
      })}
      </ul>
      </>
    )}
    </div>
    </div>
    </div>
    </>
  );
}

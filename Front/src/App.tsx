import { useState } from "react";
import "./App.css";

function App() {
  const [libelle, setLibelle] = useState(""); //titre du film saisi par utilisateur
  const [result, setResult] = useState(""); //résultat de la recherche(film trouvé ou message erreur)
  const [films, setFilms] = useState([]);

  //fonction pour effectuer la recherche
  const searchFilm = async () => {
    setFilms([]);
    try {
      const response = await fetch(`http://localhost:4242/titres/${libelle}`);
      const data = await response.json();

      //vérifie si film trouvé
      if (data.length > 0) {
        setResult(data[0].libelle);
      } else {
        setResult("Pas dans la bibliothèque");
      }
    } catch (error) {
      console.error(error);
      setResult("Erreur dans la recherche");
    }
    setLibelle("");
  };

  //Récupère films d'un thème selon son id
  const searchByTheme = async (themeId) => {
    setResult("");
    try {
      const response = await fetch(`http://localhost:4242/themes/${themeId}/titres`);
      const data = await response.json()
      setFilms(data);
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div>
      <header>
        <h1>BLUTHEQUE</h1>
        <div className="search-bar">
          <input
            type="text"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            placeholder="Entrez un titre de film..."
          />

          <button onClick={searchFilm}>Rechercher</button>
        </div>

        <div className="theme-buttons">
          <button onClick={() => searchByTheme(1)}>Disney</button>
          <button onClick={()=> searchByTheme(2)}>Science-Fiction</button>
        </div>
      </header>

      <main>
        <section>
          <p>{result}</p>
          {films.length > 0 && (
            <ul>
              {films.map((film)=> {
                return <li key={film.id}>{film.libelle}</li>
              })}
            </ul>
          )}

        </section>
      </main>
    </div>
  );
}

export default App;

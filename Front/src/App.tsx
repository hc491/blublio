import { useEffect, useState } from "react";
import "./App.css";

interface Theme {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  libelle: string;
  themes_id: number;
}

function App() {
  const [libelle, setLibelle] = useState<string>(""); //titre du film saisi par utilisateur
  const [result, setResult] = useState<string>(""); //résultat de la recherche(film trouvé ou message erreur)
  const [films, setFilms] = useState<Movie[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);

  //récupère thèmes au chargement de la page
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await fetch("http://localhost:4242/themes");
        const data: Theme[] = await response.json();
        setThemes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchThemes();
  }, []);

  //fonction pour effectuer la recherche
  const searchFilm = async () => {
    setFilms([]);
    try {
      const response = await fetch(`http://localhost:4242/items/${libelle}`);
      const data: Movie[] = await response.json();

      //vérifie si film trouvé
      if (data.length > 0) {
        setFilms(data);
        setResult("");
      } else {
        setResult("Pas dans la bibliothèque");
        setFilms([]);
      }
    } catch (error) {
      console.error(error);
      setResult("Erreur dans la recherche");
    }
    setLibelle("");
  };

  //Récupère films d'un thème selon son id
  const searchByTheme = async (themeId: number) => {
    setResult("");
    try {
      const response = await fetch(
        `http://localhost:4242/themes/${themeId}/items`,
      );
      const data: Movie[] = await response.json();
      setFilms(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <header>
        <h1>BLUTHEQUE</h1>
        <div className="search-bar">
          <input
            type="text"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            placeholder="🔍 Entrez un titre de film..."
          />

          <button onClick={searchFilm}>Rechercher</button>
        </div>

        <div className="theme-buttons">
          {themes.map((theme) => {
            return (
              <button key={theme.id} onClick={() => searchByTheme(theme.id)}>
                {theme.name}
              </button>
            );
          })}
        </div>
      </header>

      <main>
        <section>
          <p>{result}</p>
          {films.length > 0 && (
            <ul className="films-grid">
              {films.map((film) => {
                return (
                  <li key={film.id} className="films-card">
                    {film.libelle}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

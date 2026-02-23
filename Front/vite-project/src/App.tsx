import { useState } from "react";
import "./App.css";

function App() {
  const [libelle, setLibelle] = useState(""); //titre du film saisi par utilisateur
  const [result, setResult] = useState(""); //résultat de la recherche(film trouvé ou message erreur)

  //fonction pour effectuer la recherche
  const searchFilm = async () => {
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
      </header>

      <main>
        <section>
        <p>{result}</p>
      </section>
      </main>
    </div>
  );
}

export default App;

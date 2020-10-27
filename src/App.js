import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositorie] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositorie(res['data']);
    })
  }, [])
  

  async function handleAddRepository() {
    const repositorie = {
      title: `Mobile com React native ${Date.now()}`,
      url: "google.com",
      techs: ["Angular"]
    }
    const res = await api.post('repositories', repositorie)

    const result = res.data;
    setRepositorie([...repositories ,result])
  }

  async function handleRemoveRepository(id, index) {
    await api.delete('/repositories/' + id).then(() => {
      repositories.splice(index, 1)
      setRepositorie([...repositories])
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repositorie, index) => {
          return (
            <li key={repositorie.id}>
              {repositorie.title}

              <button onClick={() => handleRemoveRepository(repositorie.id, index)}>
                Remover
          </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

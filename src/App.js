import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

const App = () => {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const newRepository = {
      "title": 'Repo ' + repositories.length,
      "url": "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
      "techs": ["Nodejs", "React", "React Native"]
    }
    api.post('/repositories', newRepository).then(response => {
      setRepositories([...repositories, response.data])
    });
  }

  async function handleRemoveRepository(id) {
    api.delete('/repositories/' + id).then(response => {
      const filteredRepositories = repositories.filter(repository => repository.id !== id)
      setRepositories(filteredRepositories)
    });
  }

  return (
    <div >
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id} style={{ margin: 5 }}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )
        )}


      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

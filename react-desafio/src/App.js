import React, { useState, useEffect } from "react";
import api from "./services/api";
import Header from "./components/Header";
function App() {
  const [projetos, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projetos").then((res) => {
      setProjects(res.data);
    });
  }, []);

  async function handleAddProjects() {
    const response = await api.post("projetos", {
      titulo: `Novo projeto ${Date.now()}`,
      autor: "Thales Eduardo",
    });
    const project = response.data;
    setProjects([...projetos, project]);
  }

  return (
    <>
      <Header title="Consumindo uma API simples." />
      <Header title="projetos" />
      <ul>
        {projetos.map((elem) => (
          <li key={elem.id}>{elem.titulo}</li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProjects}>
        Adicionar Valores
      </button>
    </>
  );
}
export default App;

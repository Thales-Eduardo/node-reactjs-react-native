const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require("uuid");
const port = 3333;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

function verificarValores(req, res, next) {
  const { id } = req.params;
  if (!isUuid(id)) {
    return res.status(400).json({ erro: "ID invalido" });
  }
  return next();
}
app.use("/projetos/:id", verificarValores);

const projetos = [];
app.get("/projetos", (req, res) => {
  return res.json(projetos);
});

app.post("/projetos", (req, res) => {
  const { titulo, autor } = req.body;
  const projeto = { id: uuid(), titulo, autor };
  projetos.push(projeto);
  return res.json(projeto);
});

app.put("/projetos/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, autor } = req.body;
  const projetoindex = projetos.findIndex((projetos) => projetos.id === id);
  if (projetoindex < 0) {
    return res.status(400).json({ erro: "Esse ID não é valido" });
  }
  const projeto = { id, titulo, autor };
  projetos[projetoindex] = projeto;
  return res.json(projeto);
});

app.delete("/projetos/:id", (req, res) => {
  const { id } = req.params;
  const projetoindex = projetos.findIndex((projetos) => projetos.id === id);
  if (projetoindex < 0) {
    return res.status(400).json({ erro: "Esse ID não é valido" });
  }
  projetos.splice(projetoindex, 1);
  return res.send();
});

app.listen(port, () => {
  console.log("💻 Estamos ar! ✌");
});

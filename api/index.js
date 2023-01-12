import createExpress from "express";
import { USERS_BBDD } from "./bbdd.js";
import cors from "cors";

const port = 3000;
const app = createExpress();

app.use(createExpress.json());
app.use(createExpress.text());

app.use(cors());

// Obtiene cuenta por id
app.get("/account/:id", (req, res) => {
  const { id } = req.params;
  const user = USERS_BBDD.find((user) => user._id === id);

  if (!user) res.status(404).send({"error": "La cuenta no existe"});

  res.send(user);
});

// Elimina cuenta por id
app.delete("/account/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = USERS_BBDD.findIndex((user) => user._id === id);

  if (userIndex === -1) res.status(404).send();

  USERS_BBDD.splice(userIndex, 1);

  res.send();
});

// Registra un nuevo usuario
app.post("/account/", (req, res) => {
  const { _id, name, email, phone, address } = req.body;

  if (!_id || !name) return res.status(404).send;

  const user = USERS_BBDD.find((user) => user._id === _id);

  if (user) return res.status(409).send();

  let userToAdd = { _id, name, email, phone, address };
  USERS_BBDD.push(userToAdd);

  return res.send(userToAdd);
});

// Actualiza un usuario
app.patch("/account/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;

  if (!name || !email || !phone || !address) return res.status(400).send;

  const user = USERS_BBDD.find((user) => user._id === id);

  if (!user) res.status(404).send(); 

  user.name = name;
  user.email = email;
  user.phone = phone;
  user.address = address;

  return res.send(user);
});

app.listen(port, () => {
  console.log(`escuchando en el puerto ${port}`);
});

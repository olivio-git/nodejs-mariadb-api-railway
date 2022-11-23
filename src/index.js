import express from "express";
const app = express();
import mysql from "mysql";
import cors from "cors";
import {
  PORT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  DB_PORT
} from './config.js'
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
});

app.post("/create", (req, res) => {
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;
  const categoria = req.body.categoria;
  const genero = req.body.genero;
  const foto = req.body.foto;

  db.query(
    "INSERT INTO Pelicula (nombre, descripcion, categoria, genero, foto) VALUES (?,?,?,?,?)",
    [nombre, descripcion, categoria, genero, foto],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/peliculas", (req, res) => {
  db.query("SELECT * FROM Pelicula", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const nombre=req.body.nombre;
  const descripcion=req.body.descripcion;
  const categoria=req.body.categoria;
  const genero=req.body.genero;
  const foto = req.body.foto;
  const id = req.body.id;
  db.query(
    "UPDATE Pelicula SET nombre=?,descripcion=?,categoria=?,genero=?,foto = ? WHERE id = ?",
    [nombre,descripcion,categoria,genero,foto, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM Pelicula WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(PORT, () => {
  console.log("Yey, your server is running on port",PORT);
});

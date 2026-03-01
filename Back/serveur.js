import "dotenv/config";
import express from "express";
import cors from "cors";
import { neon } from "@neondatabase/serverless";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4242;

app.get("/themes", async (req, res) => {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
    SELECT *
    FROM themes
    ORDER BY name ASC
    `;
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "erreur du serveur" });
  }
});


app.get("/items/:libelle", async (req, res) => {
  try {
    const {libelle} = req.params;
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
    SELECT *
    FROM items
    WHERE libelle ILIKE ${`%${libelle}%`}`;//insensible à la casse
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "erreur du serveur" });
  }
});

app.get("/themes/:id/items", async (req, res) => {
  try {
    const {id} = req.params;
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
    SELECT *
    FROM items
    WHERE themes_id = ${id}
    ORDER BY libelle ASC
    `;
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "erreur du serveur" });
  }
});

app.post("/themes", async (req, res) => {
  try {
    const {name} = req.body;
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
    INSERT INTO themes (name)
    VALUES (${name})
    `;
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "erreur du serveur" });
  }
});

app.delete("/themes/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
    DELETE FROM themes
    WHERE id =${id}
    `;
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "erreur du serveur" });
  }
});

app.put("/themes/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const {name} = req.body;
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
    UPDATE themes
    SET name = ${name}
    WHERE id= ${id}
    `;
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "erreur du serveur" });
  }
});



app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});

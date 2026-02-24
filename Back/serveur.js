import "dotenv/config";
import express from "express";
import cors from "cors";
import { neon } from "@neondatabase/serverless";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4242;


app.get("/titres/:libelle", async (req, res) => {
  try {
    const {libelle} = req.params;
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
    SELECT *
    FROM titres
    WHERE libelle ILIKE ${'%'+libelle+'%'}`;//insensible à la casse
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "erreur du serveur" });
  }
});

app.get("/themes/:id/titres", async (req, res) => {
  try {
    const {id} = req.params;
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
    SELECT *
    FROM titres
    WHERE themes_id = ${id}
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

import express from 'express';
import db from "./db.js";
import cors from "cors"

const app = express();
const port =  process.env.PORT || 3000;


app.use(express.json());
app.use(cors())
db.connect();

app.post("/movies", async (req, res) => {
    try {
        const { title, overview, poster_path, release_date, rating, movie_id } = req.body;
        const addMovie = await db.query("INSERT INTO movies (title, overview, release_date, poster_path, rating, movie_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
            [title, overview, release_date, poster_path, rating, movie_id]
        )
        console.log(addMovie)
        res.json(addMovie.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})


app.get("/movies", async (req, res) => {
    try {
        const getMovies = await db.query("SELECT * FROM movies");
        res.json(getMovies.rows)
    } catch (error) {
        console.log(error.message)
    }
})

app.delete("/movies/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await db.query(`DELETE FROM movies WHERE id=${id}`)
        res.json(response.rows)
    } catch (error) {
        console.log(error.message)
    }
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
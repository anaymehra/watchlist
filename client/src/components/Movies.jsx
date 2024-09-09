import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Movies() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const BASE_URL = "https://image.tmdb.org/t/p/original";

  async function getMovies() {
    const response = await axios.get("http://localhost:3000/movies");
    setMovies(response.data);
  }

  async function handleClick(id) {
    await axios.delete(`http://localhost:3000/movies/${id}`);
    getMovies(); // Refresh the movie list after deletion
  }

  async function movieClicked(movie_id) {
    navigate(`/movie?query=${movie_id}`);
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8 mx-4">
      {movies.map((movie) => (
        <Card key={movie.id} sx={{ maxWidth: 345, height: 'auto' }} className="mx-auto">
          <CardActionArea onClick={() => movieClicked(movie.movie_id)}>
            <CardMedia
              component="img"
              height="200"
              image={`${BASE_URL}${movie.poster_path}`}
              alt={movie.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {movie.title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={() => handleClick(movie.id)}>
              Remove
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

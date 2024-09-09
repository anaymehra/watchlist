import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MultiActionAreaCard({ movies }) {
  const navigate = useNavigate();
  const BASE_URL = "https://image.tmdb.org/t/p/original";

  async function movieClicked(movie_id) {
    navigate(`/movie?query=${movie_id}`);
  }

  async function handleClick(movie) {
    try {
      await axios.post("http://localhost:3000/movies", {
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        rating: movie.vote_average,
        movie_id: movie.id
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      {movies.map((movie) => (
        <div key={movie.id} className="my-8 mx-4">
          <Card sx={{ maxWidth: 345, height: 'auto' }} className="mx-auto">
            <CardActionArea onClick={() => movieClicked(movie.id)}>
              <CardMedia
                component="img"
                height="200"
                image={movie.poster_path ? `${BASE_URL}${movie.poster_path}` : `https://www.movienewz.com/img/films/poster-holder.jpg`}
                alt={movie.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {movie.original_title}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={() => handleClick(movie)}>
                Add to Watchlist
              </Button>
            </CardActions>
          </Card>
        </div>
      ))}
    </>
  );
}

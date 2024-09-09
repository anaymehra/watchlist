import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const genreColors = {
  Action: "bg-red-500",
  Comedy: "bg-yellow-500",
  "Science Fiction": "bg-blue-500",
  Adventure: "bg-green-500",
  Thriller: "bg-purple-500",
  Drama: "bg-indigo-500",
  Fantasy: "bg-pink-500",
  Horror: "bg-orange-500",
  Romance: "bg-rose-500",
  Animation: "bg-teal-500",
};

function Movie() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movie_id = queryParams.get("query");
  const [data, setData] = useState({});
  const apiKey = import.meta.env.VITE_WATCHLIST_API;
  const bearerToken = import.meta.env.VITE_BEARER_TOKEN;
  const BASE_URL = "https://image.tmdb.org/t/p/original";

  async function fetchData() {
    const response = await axios.get(`/api/3/movie/${movie_id}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "x-api-key": apiKey,
      },
    });
    setData(response.data);
  }

  useEffect(() => {
    if (movie_id) {
      fetchData();
    }
  }, [movie_id]);

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center"
      style={
        data.backdrop_path
          ? {
              backgroundImage: `url(${BASE_URL}${data.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : {
              backgroundColor: "darkslategray",
            }
      }
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start p-4 sm:p-6 md:p-8 lg:p-12 space-y-4 lg:space-y-0 overflow-y-auto">
        {/* Left Section: Poster */}
        <div className="text-white text-left flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex justify-center mb-4">
          <img
            src={
              data.poster_path
                ? `${BASE_URL}${data.poster_path}`
                : "https://www.movienewz.com/img/films/poster-holder.jpg"
            }
            className="w-full h-auto shadow-2xl rounded-lg object-cover max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
            alt={data.original_title}
          />
        </div>

        {/* Right Section: Movie Details */}
        <div className="bg-black bg-opacity-40 p-4 rounded-lg w-full md:w-2/3 lg:w-3/4 xl:w-2/3 mt-4 lg:mt-0 lg:mr-16 space-y-4 max-h-screen overflow-y-auto">
          <div className="text-white">
            <h1 className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              {data.original_title}
            </h1>
            <p className="mb-2 text-base sm:text-lg md:text-xl lg:text-2xl italic">
              {data.tagline}
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
              {data.vote_average !== 0
                ? `${Math.floor(data.vote_average * 10)}% Fresh`
                : `Status: ${data.status}`}
            </p>
            {data.genres && data.genres.length > 0 && (
              <div className="flex flex-wrap mt-2 space-x-2">
                {data.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className={`px-4 py-1 rounded-full text-xs sm:text-sm md:text-base lg:text-lg text-white ${
                      genreColors[genre.name] || "bg-gray-600"
                    }`}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
            {data.release_date && (
              <p className="mt-2 text-base sm:text-lg md:text-xl lg:text-2xl">
                Release Date: {new Date(data.release_date).toLocaleDateString()}
              </p>
            )}
            <p className="mt-2 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
              {data.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;

// api/tmdbProxy.js
import axios from 'axios';

export default async function handler(req, res) {
  const { page = 1 } = req.query;
  const apiKey = process.env.VITE_WATCHLIST_API;
  const bearerToken = process.env.VITE_BEARER_TOKEN;

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "x-api-key": apiKey,
      },
      params: {
        page,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}

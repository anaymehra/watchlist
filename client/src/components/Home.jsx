import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";

function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  async function fetchData(pageNumber) {
    const apiKey = import.meta.env.VITE_WATCHLIST_API;
    const bearerToken = import.meta.env.VITE_BEARER_TOKEN;
    // const API_BASE_URL =
    // import.meta.env.MODE === "development" ? "/api" : "https://api.themoviedb.org";

    const response = await axios.get("/api/3/movie/popular", {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "x-api-key": apiKey,
      },
      params: {
        page: pageNumber,
      },
    });
    setData(response.data.results);
  }

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div className="my-8 mx-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card movies={data} />
      </div>

      <div className="flex w-full justify-center items-center mt-10 space-x-4">
        {page > 1 && (
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={() => {
              setPage((prev) => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                return prev - 1;
              });
            }}
          >
            Previous
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            setPage((prev) => prev + 1);
          }}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;

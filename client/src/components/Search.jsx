import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Card from "./Card.jsx";

function Search() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const [page, setPage] = useState(1);

  async function fetchData(query, pageNumber) {
    const apiKey = import.meta.env.VITE_WATCHLIST_API;
    const bearerToken = import.meta.env.VITE_BEARER_TOKEN;
    try {
      const response = await axios.get(`/api/3/search/movie?query=${query}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "x-api-key": apiKey,
        },
        params: {
          page: pageNumber, // Include the page number in the API call
        },
      });
      setData(response.data.results);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryTitle = queryParams.get("query");
    if (queryTitle) {
      fetchData(queryTitle, page);
    }
  }, [location.search, page]); // <-- Include location.search in the dependency array

  return (
    <><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
  </div></>
  );
}

export default Search;

import { useEffect, useState } from "react";

export function useMovies(query, KEY, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //Fetch IMDb data
  useEffect(
    function () {
      callback?.();

      const controller = new AbortController();

      async function getMoviesIMDBList() {
        try {
          setError("");
          setIsLoading(true);

          const responce = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!responce.ok)
            throw new Error("Something went wrong with fetching");

          const data = await responce.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
        } catch (error) {
          if (error.name !== "AbortError") {
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }

      getMoviesIMDBList();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}

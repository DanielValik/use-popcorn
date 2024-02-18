import { useEffect, useRef, useState } from "react";
import StarRating from "../components-api/StarRating";
import { Loader } from "./Loader";

export function SelectedMovie({
  movieId,
  watched,
  KEY,
  handleMovieClose,
  handleAddWathed,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const {
    Title: title,
    Released: released,
    Runtime: runtime,
    imdbRating: imdbRating,
    Genre: genre,
    Poster: poster,
    Actors: actors,
    Director: director,
    Plot: plot,
  } = movie;

  function handleAddBtn() {
    const watchedMovie = {
      imdbID: movieId,
      Title: title,
      Year: released,
      Poster: poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating: userRating,
      countRaitingDecisions: countRef.current,
    };

    handleAddWathed(watchedMovie);
    handleMovieClose();
  }

  useEffect(
    function () {
      setIsLoading(true);

      async function getSelectedMovieDetailsFromAPI() {
        const responce = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${movieId}`
        );
        const data = await responce.json();

        setMovie(data);
        setIsLoading(false);
      }

      getSelectedMovieDetailsFromAPI();

      return function () {};
    },
    [movieId]
  );

  useEffect(
    function () {
      document.title = `${title}`;

      return function () {
        document.title = `usePopcorn`;
      };
    },
    [title]
  );

  const isWatched = watched.map((elem) => elem.imdbID).includes(movieId);
  const getUserRating = watched.find(
    (elem) => elem.imdbID === movieId
  )?.userRating;

  //REF COUNTER

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={() => handleMovieClose()}>
              &larr;
            </button>

            <img src={poster} alt="" />

            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb raiting
              </p>
            </div>
          </header>

          <section>
            {isWatched ? (
              <div className="rating">
                Your rated this movie by {getUserRating} ⭐️{" "}
              </div>
            ) : (
              <div className="rating">
                <StarRating
                  maxRating={10}
                  size={23}
                  setExternalRating={setUserRating}
                />
                {userRating > 0 && (
                  <button className="btn-add" onClick={handleAddBtn}>
                    Add Movie
                  </button>
                )}
              </div>
            )}

            <p>{plot}</p>

            <p>Actors: {actors}</p>

            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import { Nav, Results } from "./components/Nav";
import { MovieList } from "./components/ListBox";
import { WatchedList, Summary } from "./components/WatchedList";
import { SelectedMovie } from "./components/SelectedMovie";
import { Loader } from "./components/Loader";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { useKeyEffect } from "./hooks/useKeyEvent";
import { useGeolocation } from "./hooks/useGeolocation";

export const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

export const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "71b4a2a8";

export default function App() {
  const [query, setQuery] = useState("memento");
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useLocalStorageState([], "watched");
  const { movies, isLoading, error } = useMovies(query, KEY, handleMovieClose);

  useKeyEffect("Escape", handleMovieClose);

  function handleMovieSelection(id) {
    selectedId === id ? setSelectedId(null) : setSelectedId(id);
  }

  function handleMovieClose() {
    setSelectedId(null);
  }

  function handleAddWathed(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleRemoveMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  const {
    getPosition,
    lat,
    lng,
    isLoading: geoLoad,
    countClicks,
  } = useGeolocation();

  return (
    <>
      <div>
        <button onClick={getPosition} disabled={geoLoad}>
          Get my position
        </button>

        {isLoading && <p>Loading position...</p>}
        {error && <p>{error}</p>}
        {!geoLoad && !error && lat && lng && (
          <p>
            Your GPS position:{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
            >
              {lat}, {lng}
            </a>
          </p>
        )}

        <p>You requested position {countClicks} times</p>
      </div>

      {/* <Nav query={query} setQuery={setQuery}>
        <Results movies={movies} />
      </Nav>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              handleMovieSelection={handleMovieSelection}
              handleMovieClose={handleMovieClose}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <SelectedMovie
              movieId={selectedId}
              watched={watched}
              KEY={KEY}
              handleMovieClose={handleMovieClose}
              handleAddWathed={handleAddWathed}
              key={selectedId}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleRemoveMovie}
              />
            </>
          )}
        </Box>
      </Main> */}

      {/* <CurrencyChalenge /> */}
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>📛</span> {message}
    </p>
  );
}

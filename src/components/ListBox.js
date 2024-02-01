import { useState } from "react";

export function MovieList({ movies, handleMovieSelection }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} handleMovieSelection={handleMovieSelection} />
      ))}
    </ul>
  );
}

function Movie({ movie, handleMovieSelection }) {
  return (
    <li
      style={{ cursor: "pointer" }}
      key={movie.imdbID}
      onClick={() => handleMovieSelection(movie.imdbID)}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

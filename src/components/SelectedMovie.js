export function SelectedMovie({ movieId, KEY, handleMovieClose }) {
  //   const responce = await fetch(
  //     `http://www.omdbapi.com/?apikey=${KEY}&s=${movieId}`
  //   );
  //   if (!responce.ok) throw new Error("Something went wrong with fetching");

  //   const data = await responce.json();
  //   if (data.Response === "False") throw new Error("Movie not found");

  return (
    <>
      <div className="details">
        <button className="btn-back" onClick={() => handleMovieClose()}>
          &larr;
        </button>
        {movieId}
      </div>
    </>
  );
}

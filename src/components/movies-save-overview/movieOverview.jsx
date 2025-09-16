import "./movieOverview.css";

function MoviesSavedOverview({ setMOvieId }) {
  const user = JSON.parse(sessionStorage.getItem("userAccount"));
  const movies = JSON.parse(
    localStorage.getItem(`savedMoviesOf${user.userName}`)
  );

  // handle click on the card
  function handleSelectedMovies(id) {
    const movie = movies.find((movie) => {
      return movie.imdbID === id;
    });
    setMOvieId(movie.imdbID);
  }

  return (
    <div className="movies-overview-container">
      {movies.map((movie) => {
        return (
          <div
            className="movie-overview-card"
            key={movie.imdbID}
            onClick={() => handleSelectedMovies(movie.imdbID)}
          >
            <div className="movie-overview-poster">
              <img src={movie.Poster} alt={movie.Title} />
            </div>
            <div className="movie-overview-title">
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MoviesSavedOverview;

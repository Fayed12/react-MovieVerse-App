import { useEffect } from "react";
import "./searchMovies.css";
import SortIcon from "@mui/icons-material/Sort";

export default function SearchMovies({
  moviesData = [],
  loadingStatus = false,
  setSearchValue,
  searchValue,
}) {
  console.log(moviesData);

  // focus to input
  useEffect(() => {
    const newSearchButton = document.getElementById("newSearch");
    if (searchValue == "") {
      newSearchButton.focus();
    }
  }, [searchValue]);

  // set the search value
  function handleNewSearch() {
    setSearchValue("");
  }

  return (
    <div className="search-page">
      <div className="container">
        <header className="header">
          <div>
            <h1 className="title">Search Results</h1>
            <p className="subtitle">
              Results for your query — browse and pick a movie, find{" "}
              {moviesData.length} movies
            </p>
          </div>
          <div className="header-actions">
            <button className="btn filter">
              <SortIcon /> sort
            </button>
            <button className="btn new-search" onClick={handleNewSearch}>
              New Search
            </button>
          </div>
        </header>

        {loadingStatus ? (
          <div className="movies-grid">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="movie-card skeleton">
                <div className="poster" />
                <div className="line short" />
                <div className="line long" />
              </div>
            ))}
          </div>
        ) : (
          <div className="movies-grid">
            {moviesData && moviesData.length > 0 ? (
              moviesData.map((movie) => (
                <article key={movie.imdbID} className="movie-card">
                  <div className="poster">
                    {movie.Poster && movie.Poster !== "N/A" ? (
                      <img src={movie.Poster} alt={movie.Title} />
                    ) : (
                      <div className="no-poster">
                        <span>No poster</span>
                      </div>
                    )}
                  </div>

                  <div className="movie-info">
                    <h3 className="movie-title">{movie.Title}</h3>
                    <p className="movie-year">{movie.Year}</p>

                    <div className="movie-actions">
                      <a
                        href={`https://www.imdb.com/title/${movie.imdbID}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn view"
                      >
                        View
                      </a>
                      <button className="btn save">Save</button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="no-results">
                <p>
                  No results found. Try to search or try a different search.
                </p>
              </div>
            )}
          </div>
        )}

        <footer className="footer">
          Powered by <span>&nbsp; Mohamed Fayed</span>
        </footer>
      </div>
    </div>
  );
}

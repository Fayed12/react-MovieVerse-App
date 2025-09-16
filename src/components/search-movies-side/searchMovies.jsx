import { useEffect, useState } from "react";
import "./searchMovies.css";
import SortIcon from "@mui/icons-material/Sort";
import { Select, MenuItem } from "@mui/material";
import SavedMovies from "../saved-movies/savedMovies";

export default function SearchMovies({
  moviesData = [],
  loadingStatus = false,
  setSearchValue,
  searchValue,
  setMoviesData,
}) {
  const [sortValue, setSortValue] = useState();
  const [openSavedMovies, setOpenSavedMovies] = useState(false);
  const [savedMovies, setSavedMovies] = useState(() => {
    const user = JSON.parse(sessionStorage.getItem("userAccount"));
    const dataMovies = JSON.parse(
      localStorage.getItem(`savedMoviesOf${user.userName}`) || "[]"
    );
    if (dataMovies) {
      return dataMovies;
    }
    return [];
  });

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

  // handle sort movies

  useEffect(() => {
    if (!sortValue || sortValue === "default") {
      return;
    } else {
      let sortedMovies = [...moviesData];

      if (sortValue === "Year") {
        sortedMovies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
      }

      if (sortValue === "Title") {
        sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
      }

      setMoviesData(sortedMovies);
    }
  }, [sortValue, setMoviesData]);

  // handle save movie when click is done
  function handleSaveMovies(id) {
    const movie = moviesData.find((movie) => movie.imdbID == id);

    const updatedSavedMovies = [...savedMovies, movie];
    setSavedMovies(updatedSavedMovies);
  }

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("userAccount"));
    localStorage.setItem(
      `savedMoviesOf${user.userName}`,
      JSON.stringify(savedMovies)
    );
  }, [savedMovies]);

  // handle open saved movies
  function handleOpenSavedMovies() {
    setOpenSavedMovies(!openSavedMovies)
  }

  return (
    <div className="search-page">
      <div className="container">
        <header className="header">
          <div>
            <h1 className="title">
              {!openSavedMovies ? "Search Results" : "Movies Saved"}
            </h1>
            <p className="subtitle">
              {!openSavedMovies
                ? "Results for your query — browse and pick a movie"
                : "The Movies Details"}
              {!openSavedMovies && `, find ${moviesData.length} movies`}
            </p>
          </div>
          <div className="header-actions">
            <button
              className={`btn new-search ${openSavedMovies && "disabledSave"}`}
              onClick={handleOpenSavedMovies}
            >
              {!openSavedMovies ? "open saved" : "close saved"}
            </button>
            {!openSavedMovies && (
              <div className="search-btn filter">
                <Select
                  defaultValue="default"
                  className="h-[40px] "
                  value={sortValue}
                  onChange={(e) => setSortValue(e.target.value)}
                >
                  <MenuItem value="default">
                    <SortIcon style={{ marginRight: "5px" }} /> Sort
                  </MenuItem>
                  <MenuItem value="Year">By year</MenuItem>
                  <MenuItem value="Title">By name</MenuItem>
                </Select>
              </div>
            )}
            {!openSavedMovies && (
              <button className="btn new-search" onClick={handleNewSearch}>
                New Search
              </button>
            )}
          </div>
        </header>
        {!openSavedMovies ? (
          loadingStatus ? (
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
                        <button
                          className={`btn save ${
                            savedMovies.some(
                              (m) => m.imdbID === movie.imdbID
                            ) && "disabledSave"
                          }`}
                          onClick={() => handleSaveMovies(movie.imdbID)}
                          disabled={savedMovies.some(
                            (m) => m.imdbID === movie.imdbID
                          )}
                        >
                          {savedMovies.some((m) => m.imdbID === movie.imdbID)
                            ? "Saved"
                            : "Save"}
                        </button>
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
          )
        ) : (
          <SavedMovies
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
          />
        )}

        <footer className="footer">
          Powered by <span>&nbsp; Mohamed Fayed</span>
        </footer>
      </div>
    </div>
  );
}

import MoviesSavedOverview from "../movies-save-overview/movieOverview";
import "./savedMovies.css";
import { useState, useEffect } from "react";

function SavedMovies({ setSavedMovies, savedMovies }) {
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetch data by id
    useEffect(() => {
        const controller = new AbortController();
    async function fetchDataById() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=eb0d837a&i=${selectedMovieId}`,{signal:controller.signal}
        );
        if (!res.ok) {
          throw new Error("something went wrong when fetching the movie data!");
        } else {
          const movieDataDetails = await res.json();
          if (movieDataDetails.Response === "False") {
            throw new Error("something error in parsing data");
          }
          setMovieDetails(movieDataDetails);
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
        fetchDataById();
        
        return () => controller.abort();
  }, [selectedMovieId]);
  return (
    <>
      <div className="all-movies">
        <MoviesSavedOverview
          setMOvieId={setSelectedMovieId}
          setSavedMovies={setSavedMovies}
          savedMovies={savedMovies}
        />
      </div>
      {loading ? (
        <div className="saved-movie-container flex justify-center items-center">
          <span className="text-[1.5rem]">loading....</span>
        </div>
      ) : movieDetails ? (
        <div className="saved-movie-container">
          <div className="saved-movie-card">
            {/* Poster */}
            <div className="saved-movie-poster flex justify-center items-center">
              <img src={movieDetails.Poster} alt={movieDetails.Title} />
            </div>

            {/* Details */}
            <div className="saved-movie-details">
              <div className="saved-movie-header">
                <div>
                  <h2>{movieDetails.Title}</h2>
                  <p>
                    {movieDetails.Year} • {movieDetails.Type}
                  </p>
                </div>
                <div className="Released">
                  <p>Released</p>
                  <span>{movieDetails.Released}</span>
                </div>
              </div>

              <p className="plot">{movieDetails.Plot}</p>

              <div className="tags">
                <span>
                  <b>Genre:</b> {movieDetails.Genre}
                </span>
                <span>
                  <b>Writer:</b> {movieDetails.Writer}
                </span>
                <span>
                  <b>Country:</b> {movieDetails.Country}
                </span>
              </div>

              <div className="extra-info">
                <div>
                  <div>Director</div>
                  <div>{movieDetails.Director}</div>
                </div>
                <div>
                  <div>Language</div>
                  <div>{movieDetails.Language}</div>
                </div>
                <div>
                  <div>IMDB votes</div>
                  <div>{movieDetails.imdbVotes}</div>
                </div>
              </div>

              <div className="actions">
                <a
                  href={`https://www.imdb.com/title/${movieDetails.imdbID}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on IMDB
                </a>
              </div>

              <div className="footer">
                <div>
                  <b>Actors:</b> {movieDetails.Actors}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="saved-movie-container flex justify-center items-center">
          <span className="text-[1.5rem]">try click to any movie</span>
        </div>
      )}
    </>
  );
}

export default SavedMovies;

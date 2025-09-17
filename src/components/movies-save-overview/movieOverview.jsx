import "./movieOverview.css";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

// toast
import toast from "react-hot-toast";

function MoviesSavedOverview({ setMOvieId, setSavedMovies, savedMovies }) {

  // handle click on the card
  function handleSelectedMovies(id) {
    const movie = savedMovies.find((movie) => {
      return movie.imdbID === id;
    });
    setMOvieId(movie.imdbID);
  }

  // handle delete movie from the list
  function removeMovie(id) {
    setSavedMovies(() => {
      return savedMovies.filter((movie) => movie.imdbID !== id);
    });
    toast.success("delete movie was done", { id: "main-toast" })
  }

  return (
    <div className="movies-overview-container">
      {savedMovies.map((movie) => {
        return (
          <div
            className="movie-overview-card"
            key={movie.imdbID}
            onClick={() => handleSelectedMovies(movie.imdbID)}
          >
            <div className="movie-overview-poster">
              <img src={movie.Poster} alt={movie.Title} />
            </div>
            <div className="movie-overview-title flex justify-between items-center">
              <div className="description">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
              <button
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  removeMovie(movie.imdbID);
                }}
              >
                <RemoveCircleOutlineIcon />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MoviesSavedOverview;

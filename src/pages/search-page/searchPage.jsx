import "./searchPage.css";
import InputLayout from "../../components/input/main-input";
import { useState, useEffect } from "react";
import SearchMovies from "../../components/search-movies-side/searchMovies";

function SearchPage() {
  const [searchValue, setSearchValue] = useState(() => {
    let search = sessionStorage.getItem("search");
    if (search) {
      return search;
    } else {
      return ""
    }
    });
    const [loading , setLoading] = useState(false)
    const [moviesDataSearch , setMoviesDataSearch] = useState([])
    
    useEffect(() => {

        const controller = new AbortController;
        async function fetchData() {
          try {
            sessionStorage.setItem("search", searchValue)
                setLoading(true)
                const res = await fetch(`https://www.omdbapi.com/?apikey=eb0d837a&s=${searchValue}` , {signal:controller.signal});
                if (!res.ok) {
                    throw new Error("something error in fetching data from API");
                }
                const moviesData =await res.json();
                if (moviesData.Response === "False") {
                    throw new Error(
                    "something error in parsing data"
                    );
                }
                setMoviesDataSearch(moviesData.Search);
            } catch (err){
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData()
        return () => controller.abort();
    }, [searchValue, setLoading, setMoviesDataSearch])

  return (
    <>
      <div className="search-content relative p-[15px]! h-full">
        <div className="search-input flex justify-between items-center h-[70px] p-[15px]!">
          <div className="text">
            <p className="text-[#c9bdbd] text-[15px] header-title">
              search to your favorite movies
            </p>
          </div>
          <InputLayout
            id="newSearch"
            type="text"
            placeholder="search..."
            userValue={searchValue}
            setValue={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="search-body">
          <div className="movies-side">
            <SearchMovies
              setMoviesDataSearch={setMoviesDataSearch}
              moviesData={moviesDataSearch}
              setMoviesData={setMoviesDataSearch}
              loadingStatus={loading}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;

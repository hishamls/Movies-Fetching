import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const fetchMoviesHandler = new Promise((resolveFun, rejectFun) => {
  //   let connect = false;
  //   if (connect) {
  //     resolveFun("connection is established!");
  //   } else {
  //     rejectFun("connection is not established!");
  //   }
  // });
  // fetchMoviesHandler.then(
  //   (resultValue) => console.log(`Good: ${resultValue}`),
  //   (rejectValue) => console.log(`Bad: ${rejectValue}`)
  // );
  // console.log(fetchMoviesHandler);

  const fetchMoviesHandler = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch(
        "https://hisham-cinema-default-rtdb.firebaseio.com/movies.json"
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://hisham-cinema-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: { "Content-Type": "application/json" },
      }
    );
    //after adding in backend
    const data = await response.json();
    console.log(data);
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>

      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>

      <section>
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && movies.length === 0 && !error && <p>No movies yet!</p>}
        {isLoading && <p style={{ color: "red" }}>Loading...</p>}
        {!isLoading && <MoviesList movies={movies} />}
        {/* {content} */}
      </section>
    </React.Fragment>
  );
}

export default App;

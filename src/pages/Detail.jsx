import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import APIKey from "../APIKey";
import Navbar from "../component/Navbar";
import { toast } from "react-toastify";

const Detail = () => {
  const [movies, setMovies] = useState({});

  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${APIKey}&i=${slug}&plot=full`
        );
        setMovies(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="px-[7rem] py-4">
        {movies ? (
          <div>
            <p className="text-3xl font-bold">
              {movies.Title}
              <span>
                {" "}
                ({movies.Year}) - Rated {movies.Rated}
              </span>
            </p>
            <p className="py-2">
              Released on {movies.Released} | {movies.Runtime} | {movies.Genre}
            </p>
            <div className="flex gap-4">
              <img
                className="h-[35rem] rounded"
                src={movies.Poster}
                alt={movies.Title}
              />
              <div className="flex flex-col gap-2">
                <div>
                  Rating : <span>Metascore {movies.Metascore}</span> |{" "}
                  <span>imdbRating {movies.imdbRating}</span> |{" "}
                  <span>imdbVotes {movies.imdbVotes}</span>
                </div>
                <p className="text-xl font-bold">Plot {movies.Plot}</p>
                <p>Directed by {movies.Director}</p>
                <p>Writer {movies.Writer}</p>
                <p>Actors {movies.Actors}</p>
                <p>Language {movies.Language}</p>
                <p>Country {movies.Country}</p>
                <p>Awards {movies.Awards}</p>
                <p>Type {movies.Type}</p>
                <p>DVD {movies.DVD}</p>
                <p>BoxOffice {movies.BoxOffice}</p>
                <p>Production {movies.Production}</p>
                <p>Website {movies.Website}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">Not Found</div>
        )}
      </div>
    </div>
  );
};

export default Detail;

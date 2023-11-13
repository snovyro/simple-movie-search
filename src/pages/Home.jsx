import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import APIKey from "../APIKey";
import Card from "../component/Card";
import store from "../store";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const { setMovieDetails, addToCart } = store();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${APIKey}&s=&page=${page}`
        );
        setMovies(response.data.Search);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, [page]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const handleLongTitle = (title) => {
    if (title.length > 30) {
      return title.slice(0, 30) + "...";
    } else {
      return title;
    }
  };

  const getPrice = (index, totalMovies) => {
    const minPrice = 100000;
    const maxPrice = 1000000;
    return Math.round(
      minPrice + (maxPrice - minPrice) * (index / (totalMovies - 1))
    );
  };

  const handleSearch = async () => {
    if (search === "") {
      return toast.error("Search cannot be empty");
    } else {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${APIKey}&s=${search}&page=${page}`
        );
        setMovies(response.data.Search);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleAddToCart = (movie, price) => {
    const movieDetails = {
      title: movie.Title,
      year: movie.Year,
      imdbID: movie.imdbID,
      type: movie.Type,
      poster: movie.Poster,
      price: price,
    };
    setMovieDetails(movieDetails);
    addToCart(movieDetails);
    toast.success("Added to cart");
  };

  const handleNext = async () => {
    setPage(page + 1);
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${APIKey}&s=${search}&page=${page + 1}`
      );
      setMovies(response.data.Search);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePrev = async () => {
    setPage(page - 1);
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${APIKey}&s=${search}&page=${page - 1}`
      );
      setMovies(response.data.Search);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDisabledPrev = () => {
    return page === 1;
  };

  const handleDisabledNext = () => {
    return page === 100 || movies === undefined;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-4 px-24">
        <input
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search here"
          value={search}
          type="text"
          className="w-full h-10 p-4"
          onKeyDown={handleKeyDown}
        />
        <p
          onClick={handleSearch}
          onKeyDown={handleKeyDown}
          className="w-full bg-yellow-400 text-black text-center p-1 font-semibold mt-4 hover:opacity-90 
          hover:cursor-pointer transition ease-in-out duration-100"
        >
          Search
        </p>
      </div>
      <div>
        {!movies ? (
          <div className="text-center p-24 w-screen">Search something</div>
        ) : (
          <div className="pt-2 flex flex-wrap px-[5rem]">
            {movies.map((movie, index) => {
              const price = getPrice(index, movies.length);
              return (
                <Card
                  key={movie.imdbID}
                  title={handleLongTitle(movie.Title)}
                  year={movie.Year}
                  type={movie.Type}
                  price={formatPrice(price)}
                  poster={movie.Poster}
                  imdbID={movie.imdbID}
                  isHome
                  handleAddToCart={() => handleAddToCart(movie, price)}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="flex gap-4 justify-center pb-4">
        {handleDisabledPrev() ? (
          <div className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded opacity-50">
            Prev
          </div>
        ) : (
          <div
            onClick={handlePrev}
            className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:opacity-90 hover:cursor-pointer transition ease-in-out duration-100"
          >
            Prev
          </div>
        )}

        {handleDisabledNext() ? (
          <div className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded opacity-50">
            Next
          </div>
        ) : (
          <div
            onClick={handleNext}
            className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:opacity-90 hover:cursor-pointer transition ease-in-out duration-100"
          >
            Next
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

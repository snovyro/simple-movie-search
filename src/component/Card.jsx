import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = (props) => {
  const {
    title,
    year,
    price,
    poster,
    imdbID,
    handleAddToCart,
    handleRemoveFromCart,
    isHome,
    isRemove,
  } = props;
  return (
    <div className="w-[20%] h-[34rem] p-4">
      <div className="w-full h-full bg-zinc-900 rounded">
        <img src={poster} alt={poster} className="w-full h-3/5 object-cover" />
        <div className="p-4 h-2/5 flex flex-col justify-between">
          <p className="font-bold text-justify">{title}</p>
          <span> ({year})</span>
          <span>{price}</span>
          {isHome && (
            <div>
              <Link
                className="text-black hover:text-black"
                to={`/detail/${imdbID}`}
              >
                <div className="w-full mt-1 p-1 text-center bg-zinc-100 rounded text-black font-semibold hover:opacity-90 hover:cursor-pointer">
                  Detail
                </div>
              </Link>
              <div
                onClick={handleAddToCart}
                className="w-full mt-1 p-1 text-center bg-yellow-400 rounded text-black font-semibold hover:opacity-90 hover:cursor-pointer"
              >
                Add to Cart
              </div>
            </div>
          )}
          {isRemove && (
            <div
              onClick={handleRemoveFromCart}
              className="w-full mt-1 p-1 text-center bg-yellow-400 rounded text-black font-semibold hover:opacity-90 hover:cursor-pointer"
            >
              Remove
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  imdbID: PropTypes.string,
  handleAddToCart: PropTypes.func,
  handleRemoveFromCart: PropTypes.func,
  isHome: PropTypes.bool,
  isRemove: PropTypes.bool,
};

export default Card;

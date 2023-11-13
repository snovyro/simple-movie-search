import Navbar from "../component/Navbar";
import store from "../store";
import Card from "../component/Card";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = store();

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

  const handleRemoveFromCart = (imdbID) => {
    removeFromCart(imdbID);
  };

  return (
    <div className="w-screen min-h-screen">
      <Navbar />
      <div className="px-24 py-4">
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="flex flex-wrap">
              {cart.map((movie) => (
                <Card
                  key={movie.imdbID}
                  title={handleLongTitle(movie.title)}
                  year={movie.year}
                  price={formatPrice(movie.price)}
                  poster={movie.poster}
                  isRemove
                  handleRemoveFromCart={() =>
                    handleRemoveFromCart(movie.imdbID)
                  }
                />
              ))}
            </div>
            <div className="px-4">
              <Link to="/checkout">
                <div className="w-full mt-1 p-2 text-center bg-yellow-400 rounded text-black font-semibold hover:opacity-90 hover:cursor-pointer">
                  Checkout
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

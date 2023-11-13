import Navbar from "../component/Navbar";
import store from "../store";
import Card from "../component/Card";

const Checkout = () => {
  const { cart, checkoutItems } = store();

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

  const handleCheckout = () => {
    checkoutItems();
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, movie) => total + movie.price, 0);
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
                />
              ))}
            </div>
            <p className="pl-4 pb-2">
              Total Price: {formatPrice(calculateTotalPrice())}
            </p>
            <div className="px-4">
              <div
                onClick={handleCheckout}
                className="w-full mt-1 p-2 text-center bg-yellow-400 rounded text-black font-semibold hover:opacity-90 hover:cursor-pointer"
              >
                Checkout All Items
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;

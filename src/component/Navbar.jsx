import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full sticky top-0 left-0 py-2 px-24 bg-zinc-900 flex justify-between items-center">
      <Link
        className="py-2 px-4 font-semibold text-white hover:text-white hover:bg-[#242424] rounded hover:cursor-pointer transition ease-in-out duration-100"
        to="/"
      >
        OMDb Open API
      </Link>
      <div className="flex gap-1">
        <Link
          className="py-2 px-4 font-semibold text-white hover:text-white hover:bg-[#242424] rounded hover:cursor-pointer transition ease-in-out duration-100"
          to="/cart"
        >
          Cart
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

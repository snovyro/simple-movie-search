import Navbar from "../component/Navbar";

const NotFound = () => {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="px-24 py-4">
        <p className="text-center">404 Not Found</p>
      </div>
    </div>
  );
};

export default NotFound;

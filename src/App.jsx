import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/detail/:slug" element={<Detail />} />
      <Route path="/cart" exact element={<Cart />} />
      <Route path="/checkout" exact element={<Checkout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

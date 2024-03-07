import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import Property from "./components/Property/Property";
import Portfolio from "./components/Portfolio/Portfolio";
import Wishlist from "./components/Wishlist/Wishlist";
import Funds from "./components/Funds/Funds";

function App() {
  return (
    <>
      <Navbar />

      <div className="main-area">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property" element={<Property />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/funds" element={<Funds />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;

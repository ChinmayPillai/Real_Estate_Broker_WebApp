import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import Property from "./components/Property/Property";
import Portfolio from "./components/Portfolio/Portfolio";
import Wishlist from "./components/Wishlist/Wishlist";
import Support from "./components/Support/Support";
import Funds from "./components/Funds/Funds";
import Login from "./components/Login_Register/Login";
import SignUp from "./components/Login_Register/Signup";
import { SingleBed } from "@mui/icons-material";

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import Property from "./components/Property/Property";
// import Portfolio from "./components/Portfolio/Portfolio";
import UserList from "./components/UserList/UserList";
import Support from "./components/Support/Support";
import Funds from "./components/Funds/Funds";
import Login from "./components/Login_Register/Login";
import SignUp from "./components/Login_Register/Signup";
import { SingleBed } from "@mui/icons-material";
import { AuthProvider } from "./components/Authorisation/Auth";
import PrivateRoute from "./components/Authorisation/PrivateRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <div className="main-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/property" element={<Property />} />
            <Route
              path="/user/:list"
              element={<PrivateRoute component={UserList} />}
            />
            <Route path="/funds" element={<PrivateRoute component={Funds} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/support" element={<Support />} />
            <Route path="/property/:propertyId" element={<Property />} />
          </Routes>
        </div>

        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;

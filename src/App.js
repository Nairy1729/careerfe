import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./components/Register";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import CompanyList from "./components/CompanyList";
import Home from "./components/Home";
import ProfileMenu from "./components/ProfileMenu";
import UserDash from "./components/UserDash";
import AdminDash from "./components/AdminDash"; // Import AdminDash component
import RegisterCompany from "./components/RegisterCompany";
import EditCompany from "./components/EditCompany";

function App() {
  return (
    <Router>
      <ToastContainer />
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

            <Route path="/company" element={<CompanyList />} />
            <Route path="/userDash" element={<UserDash />} />
            <Route path="/adminDash" element={<AdminDash />} />
            <Route path="/register-company" element={<RegisterCompany />} />
            <Route path="/edit-company/:companyId" element={<EditCompany/>} />
    
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;

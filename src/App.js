import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./components/Register";
import { AuthProvider } from "./AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import CompanyList from "./components/CompanyList";
import Home from "./components/Home";
import UserDash from "./components/UserDash";
import AdminDash from "./components/AdminDash"; 
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <Router>
      <ToastContainer />
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/contactUs" element={<ContactUs/>}/>
          <Route path="/aboutUs" element={<AboutUs/>}/>          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route path="/company" element={<CompanyList />} />
            <Route path="/userDash" element={<UserDash />} />
            <Route path="/adminDash" element={<AdminDash />} />
            <Route path="/resetPassword" element={<ResetPassword />} />    
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;

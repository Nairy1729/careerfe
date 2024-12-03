import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import { login as loginService } from "../Services/AuthService";
import { usePersonContext } from "../Services/PersonContext";
import { toast } from "react-toastify";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const { setUserInfo } = usePersonContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");
    if (isLoggedIn === "true") {
      if (role === "Admin") {
        navigate("/company");
      } else if (role === "User") {
        navigate("/userDash");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginService(username, password);
      login(token);

      const response = await axios.get(
        `https://localhost:7060/api/Person/search/username?userName=${username}`
      );

      setUserInfo(response.data);
      const role = response.data.role;

      // Store login details in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", role);

      toast.success("Login Successful!");

      // Navigate based on role
      if (role === "Admin") {
        navigate("/company");
      } else if (role === "User") {
        navigate("/userDash");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid credentials");
      } else if (error.response && error.response.status === 404) {
        toast.error("User not found");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="left-section2">
        <h1 className="title">
          Welcome Back!
          <br />
          <span className="highlight">Grow with us</span>
        </h1>
        <p className="description">
          Unlock opportunities and manage your business seamlessly. Experience the best tools
          for your growth journey.
        </p>
      </div>
      <div className="right-section">
        <div className="login-card">
          <h2 className="card-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                placeholder="Enter your username"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="form-control password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="toggle-password"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <i className="fa fa-eye-slash"></i>
                  ) : (
                    <i className="fa fa-eye"></i>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>

            <p className="signup-text">
              Not registered?{" "}
              <span
                className="signup-link"
                onClick={() => navigate("/register")}
              >
                Click here to Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

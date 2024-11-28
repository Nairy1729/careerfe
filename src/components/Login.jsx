import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import { login as loginService } from "../Services/AuthService";
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginService(username, password);
      login(token);
      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid credentials");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  const [showPassword, setShowPassword] = useState(false);

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
            {/* <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter your password"
              />
            </div> */}


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
        <i className="fa fa-eye-slash"></i> /* Eye-slash icon when visible */
      ) : (
        <i className="fa fa-eye"></i> /* Eye icon when hidden */
      )}
    </button>
  </div>
</div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>

            {/* Link to Sign Up */}
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

import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./Register.css";



const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7060/api/Authentication/register", formData);
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Error:", error);
    }
  };

const [showPassword, setShowPassword] = useState(false);


  return (
    <div className="register-page">
      <ToastContainer />
      <div className="left-section1">
        <h2>Welcome to Registration</h2>
        <p>Create your account to access all features.</p>
      </div>
      <div className="right-section">
        <div className="register-card">
          <h3>Register</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="form-control"
              />
            </div>



      <div className="form-group">
        <label>Password</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
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



            <div className="form-group">
              <label>Role</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={formData.role === "user"}
                    onChange={handleChange}
                  />
                  JobSeeker
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === "admin"}
                    onChange={handleChange}
                  />
                  Employer
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

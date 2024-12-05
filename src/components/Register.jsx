import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(null); 

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      evaluatePasswordStrength(value);
    }

    if (name === "username") {
      setUsernameAvailable(null);
    }
  };

  const evaluatePasswordStrength = (password) => {
    const hasLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!password) {
      setPasswordStrength("");
    } else if (hasLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
      setPasswordStrength("Strong");
    } else if (hasLength && (hasUpperCase || hasLowerCase) && (hasNumber || hasSpecialChar)) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Weak");
    }
  };

  const checkUsernameAvailability = async () => {
    if (!formData.username) {
      toast.error("Please enter a username to check availability.");
      return;
    }

    try {
      await axios.get(
        `https://localhost:7060/api/Person/search/username?userName=${formData.username}`
      );

      setUsernameAvailable(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setUsernameAvailable(true);
      } else {
        toast.error("Failed to check username availability. Try again.");
        console.error("Error checking username availability:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, fullName, email, password, role, phoneNumber } = formData;
    if (!username || !fullName || !email || !password || !role || !phoneNumber) {
      toast.error("All fields are required. Please fill in all the details.");
      return;
    }

    try {
      await axios.post("https://localhost:7060/api/Authentication/register", formData);
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-page">
<div className="left-section1">
  <h2>Join Our Community</h2>
  <p>
    Become a part of a thriving network that prioritizes your goals and success.
  </p>
  <p>
    Register today and take the first step towards endless possibilities. 
    </p>
    <p>
    Your journey starts here.
  </p>
</div>

      <div className="right-section">
        <div className="register-card">
          <h3>Register</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Username <span className="required">*</span>
              </label>
              <div className="username-container">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className={`form-control ${
                    usernameAvailable === true
                      ? "username-available"
                      : usernameAvailable === false
                      ? "username-taken"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={checkUsernameAvailability}
                  className="check-availability-btn"
                >
                  Check
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>
                Full Name <span className="required">*</span>
              </label>
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
              <label>
                Email <span className="required">*</span>
              </label>
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
              <label>
                Password <span className="required">*</span>
              </label>
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
                    <i className="fa fa-eye-slash"></i>
                  ) : (
                    <i className="fa fa-eye"></i>
                  )}
                </button>
              </div>
              <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
                Password Strength: {passwordStrength}
              </p>
            </div>

            <div className="form-group">
              <label>
                Role <span className="required">*</span>
              </label>
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
              <label>
                Phone Number <span className="required">*</span>
              </label>
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

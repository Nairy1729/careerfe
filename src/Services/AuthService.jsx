import axios from "axios";


const API_URL = "https://localhost:7060/api/Authentication";

const login = async (username, password) => {
  try {
    console.log("service called");
    console.log(username, password);

    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });

    console.log(`response: ${JSON.stringify(response.data)}`);
    const token = response.data.token;

    if (token) {
      localStorage.setItem("token", token);
      return token;
    } else {
      throw new Error("Token not found in response");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error; // Rethrow the error so it can be handled by the calling function
  }
};

// Get protected data using the stored token
const getProtectedData = async () => {
  try {
    const token = localStorage.getItem("token");

    // If no token found, prompt the user to log in
    if (!token) {
      throw new Error("No token found, please log in");
    }

    const response = await axios.get("https://localhost:7299/api/protected-endpoint", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; 
  } catch (error) {
    console.error("Error fetching protected data:", error);
    throw error; 
  }
};

export { login, getProtectedData };

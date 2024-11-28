
import axios from "axios";

const API_URL = "https://localhost:7060/api/Company";

const getCompany = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Company:", error);
    throw error;
  }
};

export { getCompany };

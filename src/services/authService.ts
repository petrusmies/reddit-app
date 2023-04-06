import axios from "axios";

const { REACT_APP_API_URL } = process.env;

// Login user and store access token in session storage
const login = (username: string, password: string) => {
  return axios.post(REACT_APP_API_URL + "/access_token", { username, password })
  .then((response) => {
    if (response.data.access_token) {
      sessionStorage.setItem("user", JSON.stringify(response.data));
    }
    
    return response.data;
  })
}

// Remove access token from session storage
const logout = () => {
  sessionStorage.removeItem("user");
}

const authService = {
  login,
  logout
}

export default authService;
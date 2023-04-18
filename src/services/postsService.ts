import axios from "axios";
import { AuhtHeader } from "./authHeader";

const { REACT_APP_API_URL } = process.env;

// Get most popular posts
const getPopularPosts = () => {
  const response = axios.get(REACT_APP_API_URL + "best", { headers: AuhtHeader() });
  return response;
}

// Search posts
const searchPosts = (query: string) => {
  return axios.get(REACT_APP_API_URL + "search", { params: { query }, headers: AuhtHeader() });
}

export const postsService = {
  getPopularPosts,
  searchPosts
}
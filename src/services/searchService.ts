import axios from "axios";
import { AuhtHeader } from "./authHeader";

const { REACT_APP_API_URL } = process.env;

// Search posts
const searchPosts = (query: string) => {
  // convert query to lowercase and replace spaces with +
  const q = query.toLowerCase().replace(/ /g, "+");

  return axios.get(REACT_APP_API_URL + "search", { params: { q }, headers: AuhtHeader() });
}

export const searchService = {
  searchPosts,
}
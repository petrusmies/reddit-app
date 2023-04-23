import axios from "axios";
import { AuhtHeader } from "./authHeader";

const { REACT_APP_API_URL } = process.env;

// Get comments
const getComments = (postId: string) => {
  return axios.get(REACT_APP_API_URL + "comments/" + postId, { headers: AuhtHeader() });
}

export const commentService = {
  getComments,
}
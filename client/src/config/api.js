import axios from "axios";

export const API = axios.create({
  baseURL: "https://memo.elcode.xyz/api",
});

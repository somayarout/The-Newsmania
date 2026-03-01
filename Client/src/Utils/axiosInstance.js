import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:  "https://the-newsmania-m2ps.onrender.com/api/v1"
  , 
  //http://localhost:8000
  withCredentials: true,
});
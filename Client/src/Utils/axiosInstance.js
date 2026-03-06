import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:  "https://the-newsmania-backend-dc06.onrender.com"
  , 
  //http://localhost:8000
  withCredentials: true,
});
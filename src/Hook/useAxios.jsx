import axios from "axios";

const axiosInt = axios.create({
  baseURL: "http://localhost:8000", 
  withCredentials: true, 
});




export {axiosInt}
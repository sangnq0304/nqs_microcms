import axios from "axios";

const instance = axios.create({
  baseURL: process.env.MICROCMS_API_BASE_URL,
  timeout: 10000,
  headers: {
    "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
  },
});

export default instance;

import axios, { AxiosInstance } from "axios";
import { getLocalStorage } from "../actions/localStorage_State";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.BACKEND_URL,
      timeout: 120000,
      // headers: {
      //   Authorization: `${getLocalStorage()?.token}`,
      // },
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
  }
}

const http = new Http().instance;

export default http;

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getLocalStorage } from "../actions/localStorage_State";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.BACKEND_URL,
      timeout: 5000,
      headers: {
        Authorization: `${getLocalStorage()?.token}`,
      },
    });
  }
}

const http = new Http().instance;

export default http;

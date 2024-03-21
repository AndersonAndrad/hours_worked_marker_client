import axios from "axios";
import { toast } from "sonner";

const serverApi = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

serverApi.interceptors.response.use(
  (response) => {
    const SUCCESS_CODE: number[] = [200, 201];

    if (!SUCCESS_CODE.includes(response.status)) {
      toast(response.status);
      throw new Error(`Server responded with status ${response.status}`);
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default serverApi;

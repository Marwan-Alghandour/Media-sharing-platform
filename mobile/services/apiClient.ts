import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  nextPage: number | null;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/media",
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config: AxiosRequestConfig) => {
    const res = await axiosInstance.get<FetchResponse<T>>(
      this.endpoint,
      config
    );
    return res.data;
  };

  post = async (obj: T, config: AxiosRequestConfig) => {
    const res = await axiosInstance.post<T>(this.endpoint, obj, config);
    return res.data;
  };

  put = async (obj: T) => {
    const res = await axiosInstance.put<T>(this.endpoint, obj);
    return res.data;
  };
}

export default APIClient;

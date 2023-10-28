import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_STORE_API_URL,
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers["Content-Type"] = "application/json";
  return config;
});

instance.interceptors.response.use(
  (res: AxiosResponse) =>
    typeof res.data === "object" ? res.data : Promise.reject(res.data),
  (err: AxiosError) => {
    const error: any = {
      status: 500,
      name: err.name,
      message: err.message,
      response: err.response?.data,
      data: {
        reason: err.message,
      },
    };
    return Promise.reject(error);
  }
);

export const request = async (config: AxiosRequestConfig): Promise<any> => {
  try {
    const data = await instance.request(config);
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

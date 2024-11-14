import axios from "axios";
import Toast from "react-native-toast-message";

// Create an instance of Axios with default settings
const createApiInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
    timeout: 1000 * 60 * 2, // Set a timeout (optional) chat api takes lot of time thats why we have added higher timeout time
    headers: {
      Accept: "application/json", // Default content type
      // Add other default headers here
    },
  });
};

// Function to handle GET requests
export const get = async (
  url: string,
  params: Record<string, any> = {},
  customHeaders: Record<string, string> = {},
  baseURL: string
) => {
  const api = createApiInstance(baseURL);
  try {
    const response = await api.get(url, {
      params,
      headers: { ...customHeaders }, // Merge custom headers
    });
    return response.data; // Return the response data
  } catch (error) {
    handleError(error);
  }
};

// Function to handle POST requests
export const post = async (
  url: string,
  data: Record<string, any> = {},
  customHeaders: Record<string, string> = {},
  baseURL: string
) => {
  const api = createApiInstance(baseURL);
  try {
    const response = await api.post(url, data, {
      headers: { ...customHeaders }, // Merge custom headers
    });
    return response.data; // Return the response data
  } catch (error) {
    handleError(error);
  }
};

// Function to handle PUT requests
export const put = async (
  url: string,
  data: Record<string, any> = {},
  customHeaders: Record<string, string> = {},
  baseURL: string
) => {
  const api = createApiInstance(baseURL);
  try {
    const response = await api.put(url, data, {
      headers: { ...customHeaders }, // Merge custom headers
    });
    return response.data; // Return the response data
  } catch (error) {
    handleError(error);
  }
};

// Function to handle DELETE requests
export const del = async (
  url: string,
  data: Record<string, any> = {},
  customHeaders: Record<string, string> = {},
  baseURL: string
) => {
  const api = createApiInstance(baseURL);
  try {
    const response = await api.delete(url, {
      data,
      headers: { ...customHeaders }, // Merge custom headers
    });
    return response.data; // Return the response data
  } catch (error) {
    handleError(error);
  }
};

// Function to handle errors
const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    // Check if the error is an AxiosError
    if (error.response) {
      // Server responded with a status other than 200 range
      if (error?.request?.responseURL.includes("userdb/create_user")) {
        throw new Error(error.response.data.message);
      } else {
        let errorMessgage =
          error.response.data?.message ??
          error.response.data?.detail?.[0]?.msg ??
          error.response.data?.detail ??
          error.response.data?.Error;

        if (error?.response?.status === 404) {
          errorMessgage = "404 Page not found";
        }

        Toast.show({
          type: "error",
          position: "bottom",
          text1: `${errorMessgage}`,
        });
        throw new Error(error.response.data.message || "Server Error");
      }
    }
  }
};

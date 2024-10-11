import axios, { AxiosError } from "axios";

// Create an instance of Axios with default settings
const createApiInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
    timeout: 100000, // Set a timeout (optional)
    headers: {
      "Content-Type": "application/json", // Default content type
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
      console.error("Error response:", error.response.data);
      throw new Error(error.response.data.message || "An error occurred");
    } else if (error.request) {
      // Request was made but no response received
      console.error("Error request:", error.request);
      throw new Error("No response received from the server");
    } else {
      // Something happened in setting up the request
      console.error("Error message:", error.message);
      throw new Error(error.message);
    }
  } else {
    // If it's not an Axios error
    console.error("Unknown error:", error);
    throw new Error("An unknown error occurred");
  }
};
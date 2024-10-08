// import ApiPaths from '@/Configs/api-paths';
import { useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";
import ApiPaths from "../../../environment";

export const useUserSession = () => {
  const createUserSession = useCallback(async () => {
    const headersInput = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const bodyParams = {};

    // Create the request configuration
    const config: AxiosRequestConfig = {
      headers: headersInput,
    };
    try {
      // Make the POST request

      const response = await axios.post(
        `${ApiPaths.BASE_URL}${ApiPaths.AUTH_SESSION}`,
        bodyParams,
        config
      );

      console.log(response?.data, "responseresponse");

      return response?.data;
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error)) {
        console.log("Error response :", error?.response);
        // return error;
      } else {
        console.log("Unexpected error:", error);
      }
    }
  }, []);
  return {
    createUserSession,
  };
};

export const useRetreiveVehicleData = () => {
  const retreiveVehicleData = useCallback(async (data) => {
    console.log(data?.accessToken, "accessTokenaccessTokenaccessToken");
    if (!data?.accessToken) {
      return true;
    }
    const headersInput = {
      Authorization: `Bearer ${data?.accessToken}`,
      "Content-Type": "application/json",
    };

    // Create the request configuration
    const config: AxiosRequestConfig = {
      headers: headersInput,
    };
    const bodyparam = {
      VIN: data?.vinNumber,
    };
    try {
      // Make the POST request

      const response = await axios.post(
        `${ApiPaths.RETRIVE_VEHICLE_INFO}`,
        bodyparam,
        config
      );

      return response?.data;
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error)) {
        console.log("Error response :", error?.response);
        return error;
      } else {
        console.log("Unexpected error:", error);
      }
    }
  }, []);
  return {
    retreiveVehicleData,
  };
};

export const usePostChatData = () => {
  const PostChatData = useCallback(async (data: any) => {
    console.log(data?.accessToken, "accessTokenaccessTokenaccessToken");
    if (!data?.accessToken) {
      return true;
    }
    const headersInput = {
      Authorization: `Bearer ${data?.accessToken}`,
      "Content-Type": "application/json",
    };

    // Create the request configuration
    const config: AxiosRequestConfig = {
      headers: headersInput,
    };

    const bodyParams = {
      question: `${data?.question}`,
      VIN: `${data?.vinNumber}`,
      role: "user",
      session_id: "",
      question_id: "",
      user_id: "userID",
      search_parameters: {
        retrieval_cap: 30,
        retrieval_depth: 10,
        score_threshold: 0.5,
      },
      return_format: "html",
      streaming: false,
    };

    console.log(bodyParams, "bodyParamsbodyParamsbodyParams");

    try {
      // Make the POST request

      const response = await axios.post(
        `${ApiPaths.CHAT_API}`,
        bodyParams,
        config
      );

      console.log(response, "responseresponse");

      return response;
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error)) {
        console.log("Error response :", error?.response);
        return error;
      } else {
        console.log("Unexpected error:", error);
      }
    }
  }, []);
  return {
    PostChatData,
  };
};
interface IThreadList {
  accessToken: string;
  sessionId: string;
}

export const useThreadListData = () => {
  const ThreadListData = useCallback(async (data: IThreadList) => {
    if (!data?.accessToken) {
      return true;
    }
    const headersInput = {
      Authorization: `Bearer ${data?.accessToken}`,
      "Content-Type": "application/json",
    };

    // Create the request configuration
    const config: AxiosRequestConfig = {
      headers: headersInput,
    };

    const bodyParams = {
      id: "6f46a86c-a8fb-414e-b916-759de5dfdb2f", //`${data?.sessionId}`,
    };

    console.log(bodyParams, "Threadlist>>>");

    try {
      // Make the POST request

      const response = await axios.post(
        `${ApiPaths.THREAD_LIST}`,
        bodyParams,
        config
      );

      console.log(response, "Threadlist_response");

      return response?.data;
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error)) {
        console.log("Error response :", error?.response);
        return error;
      } else {
        console.log("Unexpected error:", error);
      }
    }
  }, []);
  return {
    ThreadListData,
  };
};

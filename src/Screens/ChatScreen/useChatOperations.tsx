// import ApiPaths from '@/Configs/api-paths';
import { useCallback } from "react";
import ApiPaths from "../../../environment";
import { post, get } from "../../Utilities/ApiCall"; // Adjust the path as necessary
import { v4 as uuidv4 } from "uuid";

export const useUserSession = () => {
  const createUserSession = useCallback(async () => {
    try {
      const response = await post(
        ApiPaths.AUTH_SESSION,
        { ...ApiPaths.USERSESSION_BODY },
        {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        ApiPaths.SESSION_BASE_URL
      );

      return response;
    } catch (error: any) {}
  }, []);
  return {
    createUserSession,
  };
};

export const useRetreiveVehicleData = () => {
  const retreiveVehicleData = useCallback(
    async (data: { accessToken: string; vinNumber: string }) => {
      const bodyparam = {
        VIN: data?.vinNumber,
      };
      try {
        const response = await post(
          ApiPaths.RETRIVE_VEHICLE_INFO,
          { ...bodyparam },
          {
            Authorization: `Bearer ${data?.accessToken}`,
          },
          ApiPaths.BASE_URL
        );
        return response;
      } catch (error: any) {}
    },
    []
  );
  return {
    retreiveVehicleData,
  };
};

export const useFetchUserData = () => {
  const fetchUserData = useCallback(
    async (UUID: string, access_token: string) => {
      try {
        const response = await get(
          `${ApiPaths.USER_SESSION}${UUID}`,
          {},
          {
            Authorization: `Bearer ${access_token}`,
          },
          ApiPaths.BASE_URL
        );
        return response;
      } catch (error: any) {}
    },
    []
  );
  return {
    fetchUserData,
  };
};

interface IUpdateThread {
  uuid?: string;
  createdAt: Date;
  name: string;
  userId: string;
  userEmail: string;
  accessToken: string;
}

export const useUpdateThreadData = () => {
  const updateThreadData = useCallback(async (data: IUpdateThread) => {
    const bodyParams = {
      id: data.uuid, //"bef01b52-cda3-4a6b-9887-a29fbc0cb741",
      createdAt: data?.createdAt,
      name: data.name, // "lets keep it simple",
      userId: data.userId, //"0fa853e6-3485-4626-9f13-1f4c718bfe5c",
      userIdentifier: data.userEmail, //"gsharm33@ford.com",
    };

    try {
      const response = await post(
        ApiPaths.UPDATE_THREAD,
        { ...bodyParams },
        {
          Authorization: `Bearer ${data?.accessToken}`,
        },
        ApiPaths.BASE_URL
      );

      return response;
    } catch (error: any) {}
  }, []);
  return {
    updateThreadData,
  };
};

export const usePostChatData = () => {
  const PostChatData = useCallback(async (data: any) => {
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

    try {
      const response = await post(
        ApiPaths.CHAT_API,
        { ...bodyParams },
        {
          Authorization: `Bearer ${data?.accessToken}`,
        },
        ApiPaths.BASE_URL
      );

      return response;
    } catch (error: any) {}
  }, []);
  return {
    PostChatData,
  };
};

interface IThreadList {
  accessToken: string;
  sessionId: string;
}

export const useFetchAllThreadData = () => {
  const fetchAllThreadData = useCallback(async (data: IThreadList) => {
    const bodyParams = {
      id: data?.sessionId ?? "6f46a86c-a8fb-414e-b916-759de5dfdb2f", //`${data?.sessionId}`,
    };

    try {
      const response = await post(
        ApiPaths.THREAD_LIST,
        { ...bodyParams },
        {
          Authorization: `Bearer ${data?.accessToken}`,
        },
        ApiPaths.BASE_URL
      );

      return response;
    } catch (error: any) {}

    // if (!data?.accessToken) {
    //   return true;
    // }
    // const headersInput = {
    //   Authorization: `Bearer ${data?.accessToken}`,
    //   "Content-Type": "application/json",
    // };

    // // Create the request configuration
    // const config: AxiosRequestConfig = {
    //   headers: headersInput,
    // };

    // // const bodyParams = {
    // //   id: "6f46a86c-a8fb-414e-b916-759de5dfdb2f", //`${data?.sessionId}`,
    // // };

    // console.log(bodyParams, "Threadlist>>>");

    // try {
    //   // Make the POST request

    //   const response = await axios.post(
    //     `${ApiPaths.BASE_URL}${ApiPaths.THREAD_LIST}`,
    //     bodyParams,
    //     config
    //   );

    //   console.log(response, "Threadlist_response");

    //   return response?.data;
    // } catch (error) {
    //   // Handle errors
    //   if (axios.isAxiosError(error)) {
    //     console.log("Error response :", error?.response);
    //     return error;
    //   } else {
    //     console.log("Unexpected error:", error);
    //   }
    // }
  }, []);
  return {
    fetchAllThreadData,
  };
};

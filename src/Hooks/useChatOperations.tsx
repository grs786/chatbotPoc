import { useCallback } from "react";
import ApiPaths from "../../environment";
import { post, get } from "../Utilities/ApiCall"; // Adjust the path as necessary

export const useUserSession = () => {
  const createUserSession = useCallback(async () => {
    try {
      const response = await post(
        `${ApiPaths.AUTH_SESSION}`,
        { ...ApiPaths.USERSESSION_BODY },
        {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        `${ApiPaths.SESSION_BASE_URL}`
      );
      return response;
    } catch (error: unknown) {
      return error;
    }
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
          `${ApiPaths.RETRIVE_VEHICLE_INFO}`,
          { ...bodyparam },
          {
            Authorization: `Bearer ${data?.accessToken}`,
          },
          `${ApiPaths.BASE_URL}`
        );
        return response;
      } catch (error: unknown) {
        return error;
      }
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
          `${ApiPaths.BASE_URL}`
        );
        return response;
      } catch (error: unknown) {
        return error;
      }
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
        `${ApiPaths.UPDATE_THREAD}`,
        { ...bodyParams },
        {
          Authorization: `Bearer ${data?.accessToken}`,
        },
        `${ApiPaths.BASE_URL}`
      );

      return response;
    } catch (error: unknown) {
      return error;
    }
  }, []);
  return {
    updateThreadData,
  };
};

interface IPostChatDataProps {
  question: string;
  vinNumber: string;
  accessToken: string;
  sessionId: string;
  userId: string;
}

export const usePostChatData = () => {
  const PostChatData = useCallback(async (data: IPostChatDataProps) => {
    const bodyParams = {
      question: `${data.question}`,
      VIN: `${data.vinNumber}`,
      role: "user",
      session_id: `${data.sessionId}`,
      question_id: "",
      user_id: data.userId,
      search_parameters: {
        retrieval_cap: 20,
        retrieval_depth: 10,
        score_threshold: 0.5,
      },
      return_format: "html",
      streaming: false,
    };
    try {
      const response = await post(
        `${ApiPaths.CHAT_API}`,
        { ...bodyParams },
        {
          Authorization: `Bearer ${data?.accessToken}`,
        },
        `${ApiPaths.BASE_URL}`
      );

      return response;
    } catch (error: unknown) {
      return error;
    }
  }, []);
  return {
    PostChatData,
  };
};

export const useFetchAllThreadData = () => {
  const fetchAllThreadData = useCallback(
    async (userId: string, accessToken: string) => {
      const bodyParams = {
        id: userId, //`${data?.sessionId}`,
      };

      try {
        const response = await post(
          `${ApiPaths.THREAD_LIST}`,
          { ...bodyParams },
          {
            Authorization: `Bearer ${accessToken}`,
          },
          `${ApiPaths.BASE_URL}`
        );

        return response;
      } catch (error: unknown) {
        return error;
      }
    },
    []
  );
  return {
    fetchAllThreadData,
  };
};

interface IUserStepProps {
  accessToken: string;
  paramsData: {
    id: string;
    name: string;
    type: string;
    threadId: string;
    parentId?: string;
    disableFeedback: boolean;
    streaming: boolean;
    waitForAnswer: boolean;
    isError: boolean;
    input: string;
    output: string;
    createdAt: Date;
    start: Date;
    end: Date;
  };
}

export const useCreateUserStep = () => {
  const createUserStep = useCallback(async (data: IUserStepProps) => {
    const bodyParams = data?.paramsData;

    try {
      const response = await post(
        `${ApiPaths.CREATE_USERSTEP}`,
        { ...bodyParams },
        {
          Authorization: `Bearer ${data?.accessToken}`,
        },
        `${ApiPaths.BASE_URL}`
      );

      return response;
    } catch (error: unknown) {
      return error;
    }
  }, []);
  return {
    createUserStep,
  };
};

export interface IFetchThreadHistory {
  history: [
    {
      id: string;
      createdAt: string;
      name: string;
      userId: string;
      userIdentifier: string;
    }
  ];
}

export interface IStepHistoryData {
  step_history: [
    {
      id: string;
      name: string;
      type: string;
      threadId: string;
      parentId: string;
      disableFeedback: boolean;
      streaming: boolean;
      waitForAnswer: boolean;
      isError: boolean;
      input: string;
      output: string;
      createdAt: string;
      start: string;
      end: string;
    }
  ];
  feedback_history: [
    {
      id: null;
      forId: string;
      value: null;
      comment: string;
    }
  ];
}

export const useFetchThreadHistory = () => {
  const fetchThreadHistory = useCallback(
    async (historyData: IFetchThreadHistory, accessToken: string) => {
      const bodyParams = historyData;
      try {
        const response = await post(
          `${ApiPaths.THREAD_HISTORY}`,
          { ...bodyParams },
          {
            Authorization: `Bearer ${accessToken}`,
          },
          `${ApiPaths.BASE_URL}`
        );

        return response;
      } catch (error: unknown) {
        return error;
      }
    },
    []
  );
  return {
    fetchThreadHistory,
  };
};

interface IupsertUserFeedback {
  id: string; // create from mobile_end uuid
  forId: string; //QuestionID
  value: number;
  comment?: string;
}

export const useUpsertUserFeedback = () => {
  const upsertUserFeedback = useCallback(
    async (feedback: IupsertUserFeedback, accessToken: string) => {
      const bodyParams = feedback;
      try {
        const response = await post(
          `${ApiPaths.USER_FEEBDACK}`,
          { ...bodyParams },
          {
            Authorization: `Bearer ${accessToken}`,
          },
          `${ApiPaths.BASE_URL}`
        );
        return response;
      } catch (error: unknown) {
        return error;
      }
    },
    []
  );
  return {
    upsertUserFeedback,
  };
};

interface IconvertSpeechToText {}

export const useConvertSpeechToText = () => {
  const convertSpeechToText = useCallback(
    async (attachment: IconvertSpeechToText) => {
      try {
        const response = await post(
          `${ApiPaths.TRANSCRIBE_ENDPOINT}`,
          attachment,
          { "Content-Type": "multipart/form-data" },
          `${ApiPaths.TRANSCRIBE_API_BASE_URL}`
        );

        return response;
      } catch (error: unknown) {
        return error;
      }
    },
    []
  );
  return {
    convertSpeechToText,
  };
};

export const useValidateUserMail = () => {
  const validateUserMail = useCallback(
    async (UUID: string, access_token: string) => {
      const bodyParams = {
        identifier: UUID,
      };
      try {
        const response = await post(
          `${ApiPaths.VALIDATE_USER}`,
          {
            ...bodyParams,
          },
          {
            Authorization: `Bearer ${access_token}`,
          },
          `${ApiPaths.BASE_URL}`
        );
        return response;
      } catch (error: unknown) {
        return "An error occured";
      }
    },
    []
  );
  return {
    validateUserMail,
  };
};

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  Platform,
  Alert,
} from "react-native";
import MessageList, { IMessage } from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import { styles } from "./styles";
import VehicleInfoModal, {
  IVehicleDetail,
} from "./components/VechileInfoModal";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  useUserSession,
  useRetreiveVehicleData,
  useFetchUserData,
  usePostChatData,
  useUpdateThreadData,
  useCreateUserStep,
  useFetchThreadHistory,
  useUpsertUserFeedback,
  IStepHistoryData,
  useConvertSpeechToText,
} from "src/Hooks/useChatOperations";
import { IFeedbackArray, IVehicleInfo } from "./types";
import RenderVehicleInfo from "./components/RenderVehicleInfo";
import Loader from "src/components/Loader";
import uuid from "uuid-random";
import { getItem, setItem } from "src/Utilities/StorageClasses";
import StepHistory from "./components/HistoryMessageList";
import { useImagePicker } from "src/Hooks/useImagePicker";
import { useAudioRecorder } from "src/Hooks/useAudioRecorder";
import CustomHeader from "src/components/CustomHeader";
import { get_url_extension, updateArray } from "src/Utilities/utils";
import FeedbackModal from "./components/FeedbackModal";
import GetUserEmail from "./components/GetUserEmail";
import ApiPaths from "../../../environment";

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [feedbackLocalArr, setFeedbackLocalArr] = useState<IFeedbackArray[]>(
    []
  );

  const [inputText, setInputText] = useState("");
  const [sessionId, setSessionID] = useState<string>("");
  const [userId, setUserID] = useState<string>("");
  const [userIdentifier, setUserIdentifier] = useState<string>("");
  const [feedbackQuestionID, setFeedbackQuestionID] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedbackModal, setFeedbackModal] = useState<boolean>(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | number>();
  const [messageReactions, setMessageReactions] = useState<
    Record<string, string>
  >({});
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const [enableUserInputDialog, setEnableUserInputDialog] =
    useState<boolean>(false);
  const [displayVehicleInfo, setDisplayVehicleInfo] = useState<boolean>(false);
  const [isChatIconDisable, setIsChatIconDisable] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string>("");
  const [parentID, setParentID] = useState<string>("");
  const [vehicleInfo, setVehicleInfo] = useState<IVehicleInfo | null>(null); // Store vehicle information
  const [updateThreadCounter, setUpdateThreadCounter] = useState<number>(0);

  const [stepHistoryData, setStepHistoryData] = useState<
    IStepHistoryData | undefined
  >(); // Store vehicle information
  const route = useRoute<
    RouteProp<{
      params: { id?: string; itemData?: object; toggleEmailDialog?: boolean };
    }>
  >();

  const navigation = useNavigation();
  const { recording, startRecording, stopRecording } = useAudioRecorder();

  const { createUserSession } = useUserSession();
  const { retreiveVehicleData } = useRetreiveVehicleData();
  const { fetchUserData } = useFetchUserData();
  const { updateThreadData } = useUpdateThreadData();
  const { PostChatData } = usePostChatData();
  const { createUserStep } = useCreateUserStep();
  const { fetchThreadHistory } = useFetchThreadHistory();
  const { upsertUserFeedback } = useUpsertUserFeedback();
  const { convertSpeechToText } = useConvertSpeechToText();
  const { pickImage } = useImagePicker();

  const initialSession = async () => {
    const data = await createUserSession();
    data?.access_token &&
      (await setItem(ApiPaths.ACCESS_TOKEN ?? "", data?.access_token));
    setAccessToken(data?.access_token);
    const getUserData = await getItem(ApiPaths.USER_IDENTIFIER ?? "");
    if (!getUserData) {
      setEnableUserInputDialog(true);
    }
  };

  useEffect(() => {
    initialSession();
  }, []);

  const retreiveHistoryData = async (itemData: object) => {
    setDisplayVehicleInfo(false);
    setIsLoading(true);
    const historyData = {
      history: [
        {
          ...itemData,
        },
      ],
    };
    const historyRespVal = await fetchThreadHistory(historyData, accessToken);
    setStepHistoryData(historyRespVal);
    setIsLoading(false);
  };

  useEffect(() => {
    if (route?.params?.itemData) {
      setModalVisible(false);
      setIsChatIconDisable(false);
      retreiveHistoryData(route?.params?.itemData);
    }
  }, [route]);

  const handleSend = async () => {
    setIsLoading(true);
    setDisplayVehicleInfo(false);
    setInputText("");

    if (inputText.trim()) {
      const newMessage: IMessage = {
        _id: Math.random().toString(),
        text: inputText,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "Tech",
          fullname: "",
        },
        question_id: "",
      };

      // Update state with the new user message
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Call the API to get the response
      const chatParam = {
        accessToken,
        vinNumber: ApiPaths.SAMPLE_VIN ?? "", // Adjust the vinNumber as needed
        question: inputText, // Send the user's question
        sessionId: sessionId,
        userId: userId,
      };
      // const uniqueID = uuid();
      if (updateThreadCounter === 0) {
        const updateThreadBody = {
          uuid: sessionId,
          createdAt: new Date(),
          name: inputText,
          userId: userId,
          userEmail: userIdentifier,
          accessToken: accessToken,
        };
        await updateThreadData(updateThreadBody);
      }

      setUpdateThreadCounter((prev) => prev + 1);
      try {
        const chatRespData = await PostChatData(chatParam); // Call the API
        setIsLoading(false);
        if (!chatRespData.question_id) return;
        // Parse the API response
        const parsedResponse = chatRespData;
        const botMessage: IMessage = {
          _id: Math.random().toString(),
          text: parsedResponse.answer + parsedResponse?.sources, // Use the answer from the API response
          question_id: parsedResponse.question_id,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "WSM\nBot",
            fullname: "Workshop Manual ChatBot",
          },
        };
        const userStepBody = {
          paramsData: {
            id: chatRespData.question_id, //uuid(), //autogenerate_mobile_uuid
            name: "chatbot", //RephraseAgent / chatbot
            type: "user_message", //user_message, assistant_message
            threadId: sessionId, //sessionID
            // parentId: chatRespData.question_id, //questionID
            disableFeedback: false,
            streaming: false,
            waitForAnswer: false,
            isError: true,
            input: inputText, // user Question
            output: chatRespData?.answer + chatRespData?.sources, // chatbot answer + source json Stringify
            createdAt: new Date(),
            start: new Date(),
            end: new Date(),
          },
          accessToken: accessToken,
        };
        // Update state with the bot's response
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        const updateUserStep = await createUserStep(userStepBody);

        // Scroll to top of new message (to show the start)
      } catch (error) {
        // console.error("Error fetching response:", error);
      }

      setInputText(""); // Clear the input field
      setDisplayVehicleInfo(false);
    }
  };

  const handleReaction = async (
    messageId: number,
    questionId: string | number,
    reaction: string,
    value: number | undefined
  ) => {
    setMessageReactions((prevReactions) => ({
      ...prevReactions,
      [messageId]: reaction,
    }));
    setSelectedMessageId(messageId);
    setFeedbackQuestionID(`${questionId}`);
    if (value === 1) {
      handleReactionFeedback(value || 0, `${questionId}`);
    } else {
      setFeedbackModal(true);
    }
  };

  const handleReactionFeedback = async (
    value: number,
    questionId: string,
    useComment?: string
  ) => {
    setIsLoading(true);

    const paramsBody = {
      id: uuid(), // create from mobile_end uuid
      forId: questionId, //QuestionID
      value: value,
      comment: useComment || "",
    };

    const newData = updateArray(feedbackLocalArr, paramsBody);
    setFeedbackLocalArr(newData);
    const userFeedback = await upsertUserFeedback(paramsBody, accessToken);
    setIsLoading(false);
    return;
  };

  const handleVinClose = async (vehicleData: IVehicleDetail) => {
    setIsChatIconDisable(false);
    setStepHistoryData(undefined);
    setIsLoading(true);
    setModalVisible(false); // Close the modal
    const reqParam = {
      accessToken: accessToken,
      vinNumber:
        vehicleData?.vinNumber.length > 0
          ? vehicleData?.vinNumber
          : ApiPaths.SAMPLE_VIN ?? "",
    };
    const respData = await retreiveVehicleData(reqParam);

    setIsLoading(false);
    if (respData?.session_id) {
      setDisplayVehicleInfo(true);
      setVehicleInfo({ ...respData?.vehicle?.vehicle_info, connected: true });
      setSessionID(respData?.session_id);
      await setItem(ApiPaths.SESSION_ID ?? "", respData?.session_id);

      const userUUID = await getItem(ApiPaths.USER_IDENTIFIER ?? "");
      const userData = await fetchUserData(userUUID, accessToken);
      await setItem(ApiPaths.USER_ID ?? "", userData?.id);
      setUserID(userData?.id);
      setUserIdentifier(userData?.identifier);
    } else {
      setModalVisible(true);
      setIsChatIconDisable(true);
    }
  };

  const fetchcurrentUserdata = async (userUUID: string) => {
    const userData = await fetchUserData(userUUID, accessToken);
    await setItem(ApiPaths.USER_ID ?? "", userData?.id);
    setUserID(userData?.id);
    setUserIdentifier(userData?.identifier);
    setEnableUserInputDialog(false);
  };

  const initiateNewChat = () => {
    setIsChatIconDisable(false);
    modalVisible === false && setDisplayVehicleInfo(true);
    setStepHistoryData(undefined);
    setMessages([]);
    setUpdateThreadCounter(0);
    handleVinClose({
      model: vehicleInfo?.model
        ? `${vehicleInfo?.modelyear} ${vehicleInfo?.model}`
        : "2021 F-150",
      vinNumber: vehicleInfo?.vin ?? ApiPaths.SAMPLE_VIN,
      connected: true,
    });
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomHeader
        title="WSM Assistant"
        navigation={navigation}
        navigateToHome={() => {
          vehicleInfo?.vin
            ? setDisplayVehicleInfo(true)
            : setModalVisible(true);
          setStepHistoryData(undefined);
          setMessages([]);
          setUpdateThreadCounter(0);
          handleVinClose({
            model: vehicleInfo?.model
              ? `${vehicleInfo?.modelyear} ${vehicleInfo?.model}`
              : "2021 F-150",
            vinNumber: vehicleInfo?.vin ?? ApiPaths.SAMPLE_VIN,
            connected: true,
          });
        }}
        beginNewChat={initiateNewChat}
        isChatIconDisable={isChatIconDisable}
      />
      {!isLoading && displayVehicleInfo && (
        <RenderVehicleInfo
          vehicleInfo={vehicleInfo ?? {}}
          onPress={() => {
            setDisplayVehicleInfo(false);
            setModalVisible(true);
          }}
          onVehicleTabPress={() => {
            if (messages.length > 0) {
              setDisplayVehicleInfo(false);
            }
          }}
        />
      )}

      {stepHistoryData?.step_history ? (
        <View style={styles.historySteps}>
          <StepHistory itemID={"history"} stepHistoryData={stepHistoryData} />
        </View>
      ) : (
        <>
          <MessageList
            hideArrow={modalVisible && vehicleInfo ? true : false}
            messages={messages}
            handleReaction={handleReaction}
            messageReactions={messageReactions}
          />
          <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>
            <MessageInput
              disableInput={modalVisible}
              inputText={inputText}
              setInputText={setInputText}
              handleSend={handleSend}
              pickImage={async () => {
                const uri = await pickImage();
                if (uri) {
                  const imageMessage: IMessage = {
                    _id: Math.random().toString(),
                    image: uri,
                    createdAt: new Date(),
                    user: {
                      _id: 1,
                      name: "User",
                      fullname: "",
                    },
                    question_id: "",
                  };
                  setMessages((prev) => [...prev, imageMessage]);
                }
              }}
              recording={recording}
              startRecording={startRecording}
              stopRecording={async () => {
                const recordingURI = await stopRecording();
                if (recordingURI) {
                  const formData = new FormData();
                  const audioType = get_url_extension(recordingURI);
                  const audioObject = {
                    uri:
                      Platform.OS === "ios"
                        ? recordingURI.replace("file://", "")
                        : recordingURI,
                    name: `recording.${audioType}`,
                    type: `audio/${audioType}`,
                  };

                  formData.append("file", audioObject);
                  setIsLoading(true);
                  const respData = await convertSpeechToText(formData);
                  setIsLoading(false);
                  if (respData?.channel_transcript?.transcript) {
                    setInputText(
                      (prev) => prev + respData?.channel_transcript?.transcript
                    );
                  }
                }
              }}
            />
          </KeyboardAvoidingView>
        </>
      )}
      {feedbackModal && (
        <FeedbackModal
          visible={feedbackModal}
          localFeedbackArr={feedbackLocalArr}
          onClose={() => setFeedbackModal(false)}
          feedbackQuestionID={feedbackQuestionID}
          onSubmit={(feedbackValue) => {
            handleReactionFeedback(0, feedbackQuestionID, feedbackValue);
          }}
        />
      )}
      {isLoading && (
        <View style={styles.loaderView}>
          <Loader />
        </View>
      )}
      {enableUserInputDialog && (
        <GetUserEmail
          updateSubmit={(userUUID: string) => fetchcurrentUserdata(userUUID)}
          accessToken={accessToken}
        />
      )}
      {modalVisible && (
        <VehicleInfoModal visible={modalVisible} onClose={handleVinClose} />
      )}
    </SafeAreaView>
  );
};

export default ChatScreen;

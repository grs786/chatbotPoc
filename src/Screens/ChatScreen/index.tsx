import React, { useState, useEffect } from "react";
import { SafeAreaView, KeyboardAvoidingView, View } from "react-native";
import CustomHeader from "../../components/CustomHeader";
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
} from "../../Hooks/useChatOperations";
import { IVehicleInfo } from "./types";
import Apipath from "../../../environment";
import RenderVehicleInfo from "./components/RenderVehicleInfo";
import Loader from "src/components/Loader";
import uuid from "uuid-random";
import { setItem } from "src/Utilities/StorageClasses";
import StepHistory from "./components/HistoryMessageList";
import { useImagePicker } from "../../Hooks/useImagePicker";
import { useAudioRecorder } from "../../Hooks/useAudioRecorder";

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [sessionId, setSessionID] = useState<string>("");
  const [userId, setUserID] = useState<string>("");
  const [userIdentifier, setUserIdentifier] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | number>();
  const [messageReactions, setMessageReactions] = useState<
    Record<string, string>
  >({});
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const [displayVehicleInfo, setDisplayVehicleInfo] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string>("");
  const [vehicleInfo, setVehicleInfo] = useState<IVehicleInfo | null>(null); // Store vehicle information
  const [stepHistoryData, setStepHistoryData] = useState(null); // Store vehicle information
  const route =
    useRoute<RouteProp<{ params: { id?: string; itemData?: object } }>>();
  const historyId = route?.params?.id;
  const navigation = useNavigation();
  const { recording, startRecording, stopRecording } = useAudioRecorder();

  const { createUserSession } = useUserSession();
  const { retreiveVehicleData } = useRetreiveVehicleData();
  const { fetchUserData } = useFetchUserData();
  const { updateThreadData } = useUpdateThreadData();
  const { PostChatData } = usePostChatData();
  const { createUserStep } = useCreateUserStep();
  const { fetchThreadHistory } = useFetchThreadHistory();
  const { pickImage } = useImagePicker();

  const initialSession = async () => {
    const data = await createUserSession();
    await setItem(Apipath.ACCESS_TOKEN, data?.access_token);
    setAccessToken(data?.access_token);
  };

  useEffect(() => {
    initialSession();
  }, []);

  const retreiveHistoryData = async (itemData: object) => {
    const historyData = {
      history: [
        {
          ...itemData,
        },
      ],
    };
    const historyRespVal = await fetchThreadHistory(historyData, accessToken);
    console.log(historyRespVal, "historyRespValhistoryRespVal");
    setStepHistoryData(historyRespVal);
  };

  useEffect(() => {
    if (route?.params?.itemData) {
      setModalVisible(false);
      retreiveHistoryData(route?.params?.itemData);
    }
  }, [route]);

  const handleSend = async () => {
    setDisplayVehicleInfo(false);
    setInputText("");

    if (inputText.trim()) {
      const newMessage = {
        _id: Math.random().toString(),
        text: inputText,
        createdAt: new Date(),
        user: { _id: 1, name: "Tech" },
      };

      // Update state with the new user message
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Call the API to get the response
      const chatParam = {
        accessToken,
        vinNumber: Apipath.SAMPLE_VIN, // Adjust the vinNumber as needed
        question: inputText, // Send the user's question
      };
      // const uniqueID = uuid();
      const updateThreadBody = {
        uuid: sessionId,
        createdAt: new Date(),
        name: inputText,
        userId: userId,
        userEmail: userIdentifier,
        accessToken: accessToken,
      };
      const updateThreadList = await updateThreadData(updateThreadBody);

      try {
        const chatRespData = await PostChatData(chatParam); // Call the API

        // Parse the API response
        const parsedResponse = chatRespData;
        const botMessage = {
          _id: Math.random().toString(),
          text: parsedResponse.answer, // Use the answer from the API response
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "WSM\nBot",
            fullname: "Workshop Manual ChatBot",
          },
        };

        const userStepBody = {
          paramsData: {
            id: uuid(), //autogenerate_mobile_uuid
            name: "chatbot", //RephraseAgent / chatbot
            type: "user_message", //user_message, assistant_message
            threadId: sessionId, //sessionID
            parentId: chatRespData.question_id, //questionID
            disableFeedback: true,
            streaming: false,
            waitForAnswer: true,
            isError: true,
            input: inputText, // user Question
            output: chatRespData?.answer, // chatbot answer + source json Stringify
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
        console.error("Error fetching response:", error);
      }

      setInputText(""); // Clear the input field
      setDisplayVehicleInfo(false);
    }
  };

  const handleReaction = (messageId: string | number, reaction: string) => {
    setMessageReactions((prevReactions) => ({
      ...prevReactions,
      [messageId]: reaction,
    }));
    setSelectedMessageId(messageId);
  };

  const handleVinClose = async (vehicleData: IVehicleDetail) => {
    setStepHistoryData(null);
    setIsLoading(true);
    setModalVisible(false); // Close the modal
    // setVehicleInfo(vehicleData); // Set vehicle info from modal
    const reqParam = {
      accessToken: accessToken,
      vinNumber:
        vehicleData?.vinNumber.length > 0
          ? vehicleData?.vinNumber
          : Apipath.SAMPLE_VIN,
    };
    const respData = await retreiveVehicleData(reqParam);
    setIsLoading(false);
    setVehicleInfo({ ...respData?.vehicle?.vehicle_info, connected: true });
    setSessionID(respData?.session_id);
    await setItem(Apipath.SESSION_ID, respData?.session_id);

    const userData = await fetchUserData(Apipath.USER_MAIL, accessToken);
    await setItem(Apipath.USER_ID, userData?.id);
    setUserID(userData?.id);
    setUserIdentifier(userData?.identifier);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomHeader
        title="WSM Assistant"
        navigation={navigation}
        navigateToHome={() => setDisplayVehicleInfo(true)}
        beginNewChat={() => {
          modalVisible === false && setModalVisible(true);
          setStepHistoryData(null);
          setMessages([]);
        }}
      />
      {!isLoading && displayVehicleInfo && (
        <RenderVehicleInfo
          vehicleInfo={vehicleInfo}
          onPress={() => {
            setDisplayVehicleInfo(false);
            setModalVisible(true);
          }}
        />
      )}
      {isLoading && <Loader />}
      {stepHistoryData?.step_history ? (
        <View style={styles.historySteps}>
          <StepHistory itemID={"history"} stepHistoryData={stepHistoryData} />
        </View>
      ) : (
        <>
          <MessageList
            messages={messages}
            handleReaction={handleReaction}
            messageReactions={messageReactions}
          />
          <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>
            <MessageInput
              inputText={inputText}
              setInputText={setInputText}
              handleSend={handleSend}
              pickImage={async () => {
                const uri = await pickImage();
                if (uri) {
                  const imageMessage = {
                    _id: Math.random().toString(),
                    image: uri,
                    createdAt: new Date(),
                    user: { _id: 1, name: "User" },
                  };
                  setMessages((prev) => [...prev, imageMessage]);
                }
              }}
              recording={recording}
              startRecording={startRecording}
              stopRecording={async () => {
                const uri = await stopRecording();
                if (uri) {
                  const audioMessage = {
                    _id: Math.random().toString(),
                    audio: uri,
                    createdAt: new Date(),
                    user: { _id: 1, name: "User" },
                  };
                  setMessages((prev) => [...prev, audioMessage]);
                }
              }}
            />
          </KeyboardAvoidingView>
        </>
      )}
      {modalVisible && (
        <VehicleInfoModal visible={modalVisible} onClose={handleVinClose} />
      )}
    </SafeAreaView>
  );
};

export default ChatScreen;

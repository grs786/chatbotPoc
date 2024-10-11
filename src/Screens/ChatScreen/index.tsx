import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Text,
  FlatList,
  View,
} from "react-native";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import CustomHeader from "../../components/CustomHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import { styles } from "./styles";
import VehicleInfoModal from "./components/VechileInfoModal";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  useUserSession,
  useRetreiveVehicleData,
  useFetchUserData,
  usePostChatData,
  useUpdateThreadData,
} from "./useChatOperations";
import { IVehicleInfo } from "./types";
import Apipath from "../../../environment";
import RenderVehicleInfo from "./components/RenderVehicleInfo";
import Loader from "src/components/Loader";
import uuid from "uuid-random";
import { setItem } from "src/Utilities/StorageClasses";
// import { setItem, getItem, removeItem, clearStorage } from './storage'; // Adjust the path as necessary

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sessionId, setSessionID] = useState<string>("");
  const [userId, setUserID] = useState<string>("");
  const [userIdentifier, setUserIdentifier] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );
  const [messageReactions, setMessageReactions] = useState<any>({});
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string>("");
  const [vehicleInfo, setVehicleInfo] = useState<IVehicleInfo | null>(null); // Store vehicle information
  const route = useRoute();
  const historyId = route?.params?.id ?? "dssjhgdasgjdasdsd";
  const navigation = useNavigation();

  const { createUserSession } = useUserSession();
  const { retreiveVehicleData } = useRetreiveVehicleData();
  const { fetchUserData } = useFetchUserData();
  const { PostChatData } = usePostChatData();
  const { updateThreadData } = useUpdateThreadData();

  const initialSession = async () => {
    const data = await createUserSession();
    await setItem(Apipath.ACCESS_TOKEN, data?.access_token);
    setAccessToken(data?.access_token);
  };

  useEffect(() => {
    initialSession();
  }, []);

  const handleSend = async () => {
    setVehicleInfo(null);
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
      const uniqueID = uuid();
      console.log("Generated UUID:", uniqueID);
      const updateThreadBody = {
        uuid: uniqueID,
        createdAt: new Date(),
        name: inputText,
        userId: userId,
        userEmail: userIdentifier,
        accessToken: accessToken,
      };
      const updateThreadList = await updateThreadData(updateThreadBody);
      console.log(updateThreadList, "updateThreadList");

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

        // Update state with the bot's response
        setMessages((prevMessages) => [...prevMessages, botMessage]);

        // Scroll to top of new message (to show the start)
      } catch (error) {
        console.error("Error fetching response:", error);
      }

      setInputText(""); // Clear the input field
      setVehicleInfo(null);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newMessage = {
        _id: Math.random().toString(),
        text: "",
        createdAt: new Date(),
        user: { _id: 1, name: "Y" },
        image: result.assets[0].uri,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  const startRecording = async () => {
    try {
      const status = await Audio.requestPermissionsAsync();
      if (status.granted) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      const newMessage = {
        _id: Math.random().toString(),
        text: "",
        createdAt: new Date(),
        user: { _id: 1, name: "Y" },
        audio: uri,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  const handleReaction = (messageId: string | number, reaction: string) => {
    setMessageReactions((prevReactions: any) => ({
      ...prevReactions,
      [messageId]: reaction,
    }));
    setSelectedMessageId(messageId);
  };

  const handleVinClose = async (vehicleData: string | null) => {
    setIsLoading(true);
    setModalVisible(false); // Close the modal
    // setVehicleInfo(vehicleData); // Set vehicle info from modal
    const reqParam = {
      accessToken: accessToken,
      vinNumber: Apipath.SAMPLE_VIN,
    };
    const respData = await retreiveVehicleData(reqParam);
    console.log(
      JSON.stringify(respData?.vehicle, null, 2),
      "respData_respData"
    );
    setIsLoading(false);
    setVehicleInfo({ ...respData?.vehicle?.vehicle_info, connected: true });
    setSessionID(respData?.vehicle.session_id);

    await setItem(Apipath.SESSION_ID, respData?.session_id);

    const userData = await fetchUserData(Apipath.USER_MAIL, accessToken);
    console.log(userData, "userData_userData");
    await setItem(Apipath.USER_ID, userData?.id);
    setUserID(userData?.id);
    setUserIdentifier(userData?.identifier);

    console.log("vechicle>>", vehicleInfo);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomHeader title="WSM Assistant" navigation={navigation} />
      {/* <StepHistory itemID={"history"} /> */}
      {!isLoading && vehicleInfo && (
        <RenderVehicleInfo
          vehicleInfo={vehicleInfo}
          onPress={() => {
            setVehicleInfo(null);
            setModalVisible(true);
          }}
        />
      )}
      {isLoading && <Loader />}
      <MessageList
        messages={messages}
        handleReaction={handleReaction}
        messageReactions={messageReactions}
      />

      <KeyboardAvoidingView
        behavior="padding"
        style={{ paddingHorizontal: 10, marginVertical: 10 }}
      >
        <MessageInput
          inputText={inputText}
          setInputText={setInputText}
          handleSend={handleSend}
          pickImage={pickImage}
          recording={recording}
          startRecording={startRecording}
          stopRecording={stopRecording}
        />
      </KeyboardAvoidingView>
      {modalVisible && (
        <VehicleInfoModal visible={modalVisible} onClose={handleVinClose} />
      )}
    </SafeAreaView>
  );
};

export default ChatScreen;

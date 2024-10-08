import React, { useState, useEffect } from "react";
import { SafeAreaView, KeyboardAvoidingView } from "react-native";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import CustomHeader from "../../components/CustomHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import ReactionModal from "./components/ReactionModal";
import { styles } from "./styles";
import VehicleInfoModal from "./components/VechileInfoModal";
import { useNavigation } from "@react-navigation/native";
import {
  useUserSession,
  useRetreiveVehicleData,
  usePostChatData,
  useThreadListData,
} from "./useChatOperations";

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [reactionVisible, setReactionVisible] = useState<boolean>(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );
  const [messageReactions, setMessageReactions] = useState<any>({});
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");
  const navigation = useNavigation();

  // console.log(BASE_URL, "BASE_URLBASE_URL");

  const { createUserSession } = useUserSession();
  const { retreiveVehicleData } = useRetreiveVehicleData();
  const { PostChatData } = usePostChatData();
  const { ThreadListData } = useThreadListData();

  const intialSession = async () => {
    const data = await createUserSession();
    setAccessToken(data?.access_token);

    const reqParam = {
      accessToken: data?.access_token,
      vinNumber: "1FTFW1E85MFA63398",
    };
    const respData = await retreiveVehicleData(reqParam);
    setSessionId(respData?.session_id);
    console.log(
      JSON.stringify(respData.session_id, null, 2),
      "response data>>>>>>>"
    );

    // Set initial messages
    setMessages([
      {
        _id: 1,
        text: `
          <p>Thank you for reaching out!</p>
          <p>Please let me know if you'd like guidance with any specific <strong>mechanical issues</strong> or if you're looking for some <em>quick tips</em> on a specific <strong>repair process</strong>.</p>
          <p>Here’s a quick example: If you're hearing a light knocking noise in your engine, it could be due to:</p>
          <ul>
            <li>Excessive clearance between the piston and cylinder wall</li>
            <li>Excessive clearance between connecting rod bearings and the crankshaft</li>
          </ul>
          <p>Just let me know which area you're experiencing trouble with.</p>
        `,
        createdAt: new Date(),
        user: { _id: 2, name: "W", fullname: "Workshop Manual ChatBot" },
      },
      {
        _id: 2,
        text: `
          <p><strong>Hello!</strong> Welcome to the <em>WSM Assistant</em>. How can I help you today?</p>
        `,
        createdAt: new Date(),
        user: { _id: 1, name: "Y", fullname: "You" },
      },
    ]);
  };

  useEffect(() => {
    intialSession();
  }, []);

  const handleSend = async () => {
    if (inputText.trim()) {
      const newMessage = {
        _id: Math.random().toString(),
        text: inputText,
        createdAt: new Date(),
        user: { _id: 1, name: "Y" },
      };

      // Update state with the new user message
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Call the API to get the response
      const chatParam = {
        accessToken,
        vinNumber: "1FTFW1E85MFA63398", // Adjust the vinNumber as needed
        question: inputText, // Send the user's question
      };

      try {
        const chatRespData = await PostChatData(chatParam); // Call the API
        console.log(
          JSON.stringify(chatRespData?.data, null, 2),
          "chatRespData"
        );

        // Parse the API response
        const parsedResponse = chatRespData?.data;
        const botMessage = {
          _id: Math.random().toString(),
          text: parsedResponse.answer, // Use the answer from the API response
          createdAt: new Date(),
          user: { _id: 2, name: "W", fullname: "Workshop Manual ChatBot" },
        };

        // Update state with the bot's response
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error fetching response:", error);
      }

      setInputText(""); // Clear the input field
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

  const handleReaction = (messageId: string) => {
    setSelectedMessageId(messageId);
    setReactionVisible(true);
  };

  const applyReaction = (reaction: string) => {
    setMessageReactions((prevReactions) => ({
      ...prevReactions,
      [selectedMessageId!]: reaction,
    }));
    setReactionVisible(false);
  };

  const handleVinClose = () => {
    setModalVisible(false); // Close the modal
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <VehicleInfoModal visible={modalVisible} onClose={handleVinClose} />
      <CustomHeader title="WSM Assistant" navigation={navigation} />
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
      <ReactionModal
        reactionVisible={reactionVisible}
        setReactionVisible={setReactionVisible}
        applyReaction={applyReaction}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;

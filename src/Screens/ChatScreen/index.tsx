import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
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
import { IVehicleInfo } from "./types";
import Apipath from "../../../environment";
import { Colors } from "src/Assets/colors";

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
  const [vehicleInfo, setVehicleInfo] = useState<IVehicleInfo | null>(null); // Store vehicle information

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
      vinNumber: Apipath.SAMPLE_VIN,
    };
    const respData = await retreiveVehicleData(reqParam);

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
        user: { _id: 2, name: "WSM Bot", fullname: "Workshop Manual ChatBot" },
      },
      {
        _id: 2,
        text: `
          <p><strong>Hello!</strong> Welcome to the <em>WSM Assistant</em>. How can I help you today?</p>
        `,
        createdAt: new Date(),
        user: { _id: 1, name: "Tech", fullname: "You" },
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

  const handleVinClose = (vehicleData: string | null) => {
    setModalVisible(false); // Close the modal
    setVehicleInfo(vehicleData); // Set vehicle info from modal
  };
  console.log("vechicle>>", vehicleInfo);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomHeader title="WSM Assistant" navigation={navigation} />

      {vehicleInfo && (
        <>
          <View style={styles.vehicleDetailsContainer}>
            {vehicleInfo?.connected == true && (
              <View style={styles.connectedHeader}>
                <View style={styles.vehicleRowView}>
                  <Image
                    source={require("../../Assets/images/vehicleIcon.png")}
                    style={styles.vehicleIcon}
                  />
                  <Text style={styles.vehicleTitle}>Vehicle</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.connectionStatus}>Connected</Text>
                  <View style={styles.statusDot} />
                </View>
              </View>
            )}
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleModel}>{vehicleInfo?.model}</Text>
              <Text style={styles.vinNumber}>{vehicleInfo?.vinNumber}</Text>
            </View>
            <TouchableOpacity style={styles.viewDataButton}>
              <Text style={styles.viewDataText}>View Vehicle Data</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>OR</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.bluebutton,
                  { backgroundColor: Colors.NAVYBLUE_SHADE1, width: "100%" },
                ]}
                onPress={() => {
                  setVehicleInfo(null);
                  setModalVisible(true);
                }}
              >
                <Text style={styles.submittext}>Change VIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
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

      {modalVisible && (
        <VehicleInfoModal visible={modalVisible} onClose={handleVinClose} />
      )}
    </SafeAreaView>
  );
};

export default ChatScreen;

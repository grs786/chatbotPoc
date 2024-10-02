import React, { useState, useEffect } from "react";
import { GiftedChat, InputToolbar, Bubble } from "react-native-gifted-chat";
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import CustomHeader from "../components/CustomHeader";
import { AudioMessage } from "./components/Audioslider";

const reactions = [
  { id: 1, emoji: "👍" },
  { id: 2, emoji: "👎" },
  { id: 3, emoji: "❤️" },
];

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [recording, setRecording] = useState(null);
  const [audioUri, setAudioUri] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reactionVisible, setReactionVisible] = useState(false);
  const [messageReactions, setMessageReactions] = useState({});

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
        },
      },
      {
        _id: 2,
        text: "How can I help you?",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "User",
        },
      },
    ]);

    const setAudioMode = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        staysActiveInBackground: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
        playThroughEarpieceAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      });
    };

    setAudioMode();

    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const message = {
        _id: Math.random().toString(),
        text: "",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "User",
        },
        image: result.assets[0].uri,
      };
      onSend([message]);
    }

    setModalVisible(false);
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setAudioUri(recording.getURI());
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync(); // Stop and unload the recording
      const uri = recording.getURI(); // Get the URI of the recorded audio
      setRecording(null);
      setAudioUri(uri); // Set the audio URI state

      // Log the URI to verify it's being set
      console.log("Audio URI after stopping:", uri);

      const message = {
        _id: Math.random().toString(),
        text: "",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "User",
        },
        audio: uri, // Use the URI for playback
      };
      onSend([message]);
    }
    setModalVisible(false);
  };



  const renderMessage = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: [styles.sentMessageContainer], // Apply the new background color for sent messages
          left: [styles.receiveMessageContainer],
        }}
        onLongPress={() => {
          setSelectedMessage(props.currentMessage);
          setReactionVisible(true);
        }}
      />
    );
  };

  const handleReaction = (emoji) => {
    const { _id } = selectedMessage;

    setMessageReactions((prev) => ({
      ...prev,
      [_id]: [...(prev[_id] || []), emoji],
    }));

    setReactionVisible(false);
  };

  const renderReactions = () => {
    if (!reactionVisible) return null;

    return (
      <View style={styles.reactionContainer}>
        {reactions.map((reaction) => (
          <TouchableOpacity
            key={reaction.id}
            onPress={() => handleReaction(reaction.emoji)}
            style={styles.reactionButton}
          >
            <Text style={styles.reactionEmoji}>{reaction.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderMessageAudio = (props) => (
    <AudioMessage currentMessage={props.currentMessage} />
  );

  const renderAccessory = () => (
    <View style={styles.accessoryContainer}>
      <TouchableOpacity
        style={{ marginHorizontal: 4 }}
        onPress={() => pickImage()}
      >
        <MaterialIcons name="attach-file" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => (recording ? stopRecording() : startRecording())}
      >
        <MaterialIcons
          name="mic"
          size={24}
          color={recording ? "red" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomHeader title="Alia" image="face" />
      <GiftedChat
        messages={messages.map((msg) => ({
          ...msg,
          reactions: messageReactions[msg._id] || [],
        }))}
        renderMessage={renderMessage}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1, // Current user ID
        }}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{ borderTopWidth: 1, borderColor: "#f0f0f0" }}
          />
        )}
        renderAccessory={renderAccessory}
        renderMessageAudio={renderMessageAudio} // Use the new AudioMessage component
      />
      {renderReactions()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  sentMessageContainer: {
    backgroundColor: "#061db7",
    borderRadius: 15,
    marginVertical: 4,
    marginRight: 5,
  },
  receiveMessageContainer: {
    backgroundColor: "#ced4da",
    borderRadius: 15,
    marginVertical: 4,
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  accessoryContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ced4da",
  },
  reactionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    position: "absolute",
    bottom: 100, // Adjust as necessary
    left: 10,
    right: 10,
  },
  reactionButton: {
    flex: 1,
    alignItems: "center",
  },
  reactionEmoji: {
    fontSize: 24,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  modalButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
});

export default ChatbotScreen;

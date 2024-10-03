import React, { useState, useEffect } from "react";
import {
  GiftedChat,
  InputToolbar,
  Bubble,
  IMessage,
} from "react-native-gifted-chat";
import { View, TouchableOpacity, Text, SafeAreaView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import CustomHeader from "../components/CustomHeader";
import { AudioMessage } from "./components/Audioslider";
import { styles } from "./styles";

interface MessageReaction {
  id: number;
  emoji: string;
}

interface Message extends IMessage {
  audio?: string; // Adding optional audio field for audio messages
}

interface Reactions {
  [key: string]: string[]; // Stores reactions for each message by message _id
}

const reactions: MessageReaction[] = [
  { id: 1, emoji: "👍" },
  { id: 2, emoji: "👎" },
  { id: 3, emoji: "❤️" },
];

const ChatbotScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string>("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [reactionVisible, setReactionVisible] = useState<boolean>(false);
  const [messageReactions, setMessageReactions] = useState<Reactions>({});

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

  const onSend = (newMessages: Message[] = []) => {
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
      const message: Message = {
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
      setAudioUri(recording.getURI() || "");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setAudioUri(uri || "");

      const message: Message = {
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

  const renderMessage = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: [styles.sentMessageContainer],
          left: [styles.receiveMessageContainer],
        }}
        onLongPress={() => {
          setSelectedMessage(props.currentMessage);
          setReactionVisible(true);
        }}
      />
    );
  };

  const handleReaction = (emoji: string) => {
    if (selectedMessage) {
      const { _id } = selectedMessage;

      setMessageReactions((prev) => ({
        ...prev,
        [_id]: [...(prev[_id] || []), emoji],
      }));

      setReactionVisible(false);
    }
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

  const renderMessageAudio = (props: any) => (
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
        renderMessageAudio={renderMessageAudio}
      />
      {renderReactions()}
    </SafeAreaView>
  );
};

export default ChatbotScreen;

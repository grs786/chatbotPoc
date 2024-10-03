import React, { useState, useEffect } from "react";
import { GiftedChat, InputToolbar, IMessage } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native";
import { Audio } from "expo-av";
import CustomHeader from "../components/CustomHeader";
import MessageBubble from "./components/MessageBubble";
import AccessoryBar from "./components/AccessoryBar";
import ReactionsOverlay from "./components/ReactionOverlay";
import { AudioMessage } from "./components/Audioslider";
import { styles } from "./styles";
import { MessageReaction, Message, Reactions } from "./types";

const reactions: MessageReaction[] = [
  { id: 1, emoji: "👍" },
  { id: 2, emoji: "👎" },
];

const ChatbotScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [reactionVisible, setReactionVisible] = useState<boolean>(false);
  const [messageReactions, setMessageReactions] = useState<Reactions>({});
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string>("");

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
  }, []);

  const onSend = (newMessages: Message[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
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

  const renderMessageAudio = (props: any) => (
    <AudioMessage currentMessage={props.currentMessage} />
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomHeader title="Alia" image="face" />
      <GiftedChat
        messages={messages.map((msg) => ({
          ...msg,
          reactions: messageReactions[msg._id] || [],
        }))}
        renderMessage={(props) => (
          <MessageBubble
            {...props}
            onLongPress={(msg) => {
              setSelectedMessage(msg);
              setReactionVisible(true);
            }}
          />
        )}
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
        renderAccessory={(props) => (
          <AccessoryBar
            onSend={onSend}
            recording={recording}
            setRecording={setRecording}
            setAudioUri={setAudioUri}
          />
        )}
        renderMessageAudio={renderMessageAudio}
      />
      {reactionVisible && (
        <ReactionsOverlay
          reactions={reactions}
          onSelectReaction={handleReaction}
        />
      )}
    </SafeAreaView>
  );
};

export default ChatbotScreen;

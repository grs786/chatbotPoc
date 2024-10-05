import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AudioMessage } from "./Audioslider";
import RenderHtml from "react-native-render-html";
import { styles } from "../styles";

interface User {
  _id: number;
  name: string;
  fullname: string;
}

interface Message {
  _id: number;
  text: string;
  createdAt: string;
  user: User;
  image?: string;
  audio?: string;
}

interface IMessageItemProps {
  item: Message;
  handleReaction: (messageId: number) => void; 
  reaction?: string; 
  messageReactions?: any;
}

const MessageItem: React.FC<IMessageItemProps> = ({ item, handleReaction, reaction, messageReactions }) => {
  return (
    <View style={item.user._id === 1 ? styles.messageContainer : styles.rmessageContainer}>
      {/* Header with sender/receiver name and timestamp */}
      <View style={styles.iconContainer}>
        <Text style={item.user._id === 1 ? styles.senderIcon : styles.receiverIcon}>
          {item.user.name}
        </Text>
        <Text style={{ marginHorizontal: 8, fontSize: 16, fontWeight: '500' }}>
          {item.user.fullname}
        </Text>
        <Text style={styles.timestamp}>
          {new Date(item.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>

      {/* Message Content: Image, Audio, or Text */}
      <TouchableOpacity
        onLongPress={() => handleReaction(item._id)}
        style={item.user._id === 1 ? styles.sentMessageContainer : styles.receiveMessageContainer}
      >
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.imageMessage} />
        ) : item.audio ? (
          <AudioMessage currentMessage={item.audio} />
        ) : (
          <View style={item.user._id === 1 ? styles.messageBubble : styles.rmessageBubble}>
            <RenderHtml contentWidth={300} source={{ html: item.text }} />
            {reaction && <Text style={styles.reactionText}>{reaction}</Text>}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MessageItem;

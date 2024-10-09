import React from "react";
import { View, Text, TouchableOpacity, Image, Clipboard } from "react-native";
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
  handleReaction: (messageId: number, reaction: string) => void;
  reaction?: string;
  messageReactions?: any;
}

const MessageItem: React.FC<IMessageItemProps> = ({
  item,
  handleReaction,
  reaction,
  messageReactions,
}) => {
  const selectedReaction = messageReactions?.[item._id];

  const copyToClipboard = async (text: string) => {
    await Clipboard.setString(text); // Copy the text to the clipboard
    console.log('Copied to clipboard:', text); // Debug log
  };

  console.log("sellele", reaction, messageReactions);
  return (
    <View
      style={
        item.user._id === 1 ? styles.messageContainer : styles.rmessageContainer
      }
    >
      <TouchableOpacity
        onLongPress={() => handleReaction(item._id, selectedReaction)}
        style={
          item.user._id === 1
            ? styles.sentMessageContainer
            : styles.receiveMessageContainer
        }
      >
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.imageMessage} />
        ) : item.audio ? (
          <AudioMessage currentMessage={item.audio} />
        ) : (
          <>
            <View
              style={
                item.user._id === 1
                  ? styles.messageBubble
                  : styles.rmessageBubble
              }
            >
              <View style={styles.iconContainer}>
                <Text
                  numberOfLines={2}
                  style={
                    item.user._id === 1
                      ? styles.senderIcon
                      : styles.receiverIcon
                  }
                >
                  {item.user.name}
                </Text>
              </View>

              <RenderHtml contentWidth={300} source={{ html: item?.text }} />
            </View>
            {item.user._id === 2 && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingRight: 40,
                }}
              >
                <TouchableOpacity
                  onPress={() => handleReaction(item._id, "👍")}
                >
                  <Image
                    source={require("../../../Assets/images/thumbup.png")}
                    style={[
                      styles.reactionText,
                      reaction === "👍" && { tintColor: "blue" },
                    ]}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleReaction(item._id, "👎")}
                >
                  <Image
                    source={require("../../../Assets/images/thumbdown.png")}
                    style={[
                      styles.reactionText,
                      reaction === "👎" && { tintColor: "blue" },
                    ]}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {handleReaction(item._id, "Copy"), copyToClipboard(item.text)}}>
                  <Image
                    source={require("../../../Assets/images/copy.png")}
                    style={[
                      styles.reactionText,
                      reaction === "Copy" && { tintColor: "blue" },
                    ]}
                  />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MessageItem;
import React from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { AudioMessage } from "./Audioslider";
import RenderHtml from "react-native-render-html";
import { styles } from "./styles";
import * as Clipboard from "expo-clipboard";

interface User {
  _id: number;
  name: string;
  fullname: string;
}

interface Message {
  _id: number;
  text: string;
  question_id: number;
  createdAt: string;
  user: User;
  image?: string;
  audio?: string;
}

interface IMessageItemProps {
  item: Message;
  handleReaction: (
    messageId: number,
    question_id: number,
    reaction: string,
    value: number | undefined
  ) => void;
  reaction?: string;
}

const MessageItem: React.FC<IMessageItemProps> = ({
  item,
  handleReaction,
  reaction,
}) => {
  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
  };

  return (
    <View
      style={
        item.user._id === 1 ? styles.messageContainer : styles.rmessageContainer
      }
    >
      <View
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
              <View style={styles.htmlRenderContainer}>
                <RenderHtml source={{ html: item?.text }} />
              </View>
            </View>
            {item.user._id === 2 && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: "20%",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    handleReaction(item._id, item.question_id, "👍", 1);
                  }}
                >
                  <Image
                    source={require("../../../Assets/images/thumbup.png")}
                    style={[
                      styles.reactionText,
                      reaction === "👍" && styles.tintcolor,
                    ]}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    handleReaction(item._id, item.question_id, "👎", 0)
                  }
                >
                  <Image
                    source={require("../../../Assets/images/thumbdown.png")}
                    style={[
                      styles.reactionText,
                      reaction === "👎" && styles.tintcolor,
                    ]}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => copyToClipboard(item.text)}>
                  <Image
                    source={require("../../../Assets/images/copy.png")}
                    style={[styles.reactionText]}
                  />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default MessageItem;

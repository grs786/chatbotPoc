import React, { memo } from "react";
import { View, Text, FlatList, Dimensions, FlatListProps } from "react-native";
import RenderHtml from "react-native-render-html"; 
import stepHistory from "../../../components/history.json"; // Adjust the path if necessary
import { styles } from "./styles";


interface IStepHistory {
  id: string;
  type: "assistant_message" | "user_message";
  output: string;
}

interface IMessageBubble {
  name: string;
  content: string;
  isUser: boolean;
}
const contentWidth = Dimensions.get("window").width * 0.5;
const ASSISTANT_NAME = "WSM BOT";
const USER_NAME = "Tech";


const MessageBubble = ({ name, content, isUser }:IMessageBubble) => (
  <View style={isUser ? styles.messageContainer : styles.rmessageContainer}>
    <View style={isUser ? styles.sentMessageContainer : styles.receiveMessageContainer}>
      <View style={[styles.messageBubble]}>
        <View style={[styles.iconContainer, { width:60 }]}>
          <Text numberOfLines={2} style={styles.receiverIcon}>{name}</Text>
        </View>
        <RenderHtml contentWidth={contentWidth} source={{ html: content }} />
      </View>
    </View>
  </View>
);

const StepHistory = memo(() => {
  const renderMessage: FlatListProps<IStepHistory>["renderItem"] = ({ item }) => {
    const isUser = item.type === "user_message";
    return (
      <MessageBubble
        name={isUser ? USER_NAME : ASSISTANT_NAME}
        content={item.output}
        isUser={isUser}
      />
    );
  };

  return (
    <FlatList
      data={stepHistory.step_history}
      keyExtractor={(item) => item.id}
      renderItem={renderMessage}
      showsVerticalScrollIndicator={false}
    />
  );
});

export default StepHistory;

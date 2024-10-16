import React, { memo } from "react";
import { View, Text, FlatList, Dimensions, FlatListProps } from "react-native";
import RenderHtml from "react-native-render-html";
import { styles } from "./styles";
import { IStepHistoryData } from "src/Hooks/useChatOperations";

interface IStepHistory {
  id: string;
  type: string | "assistant_message" | "user_message" | "undefined";
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

const MessageBubble = ({ name, content, isUser }: IMessageBubble) => (
  <View style={isUser ? styles.messageContainer : styles.rmessageContainer}>
    <View
      style={
        isUser ? styles.sentMessageContainer : styles.receiveMessageContainer
      }
    >
      <View style={[styles.messageBubble]}>
        <View style={[styles.iconContainer, { width: 60 }]}>
          <Text numberOfLines={2} style={styles.receiverIcon}>
            {name}
          </Text>
        </View>
        <RenderHtml contentWidth={contentWidth} source={{ html: content }} />
      </View>
    </View>
  </View>
);

const StepHistory = memo(
  (data: { itemID: string; stepHistoryData: IStepHistoryData }) => {
    const filteredData = data?.stepHistoryData?.step_history?.filter(
      (item: { type: string }) =>
        item?.type === "user_message" || item?.type === "assistant_message"
    );

    const renderMessage: FlatListProps<IStepHistory>["renderItem"] = ({
      item,
    }) => {
      let isUser: boolean = item.type === "user_message";
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
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        showsVerticalScrollIndicator={false}
      />
    );
  }
);

export default StepHistory;

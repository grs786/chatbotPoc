import React, { memo } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  FlatListProps,
  Image,
  TouchableOpacity,
} from "react-native";
import RenderHtml from "react-native-render-html";
import { styles } from "./styles";
import * as Clipboard from "expo-clipboard";

interface IStepHistory {
  id: string;
  type: string | "assistant_message" | "user_message" | "undefined";
  input: string | null;
  output: string;
}

interface IFeedbackHistory {
  forId: string;
  value: number; // 1 for thumbs-up, -1 for thumbs-down
}

interface IStepHistoryData {
  step_history: IStepHistory[];
  feedback_history: IFeedbackHistory[];
}

interface IMessageBubble {
  name: string;
  content: string;
  isUser: boolean;
  isThumbsUp: boolean;
}

const contentWidth = Dimensions.get("window").width * 0.5;
const ASSISTANT_NAME = "WSM BOT";
const USER_NAME = "Tech";

const copyToClipboard = async (text: string) => {
  await Clipboard.setStringAsync(text);
};

const MessageBubble = ({ name, content, isUser, isThumbsUp }: IMessageBubble) => (
  <View style={isUser ? styles.messageContainer : styles.rmessageContainer}>
    <View style={isUser ? styles.sentMessageContainer : styles.receiveMessageContainer}>
      <View style={[styles.messageBubble]}>
        <View style={[styles.iconContainer, { width: 60 }]}>
          <Text numberOfLines={2} style={styles.receiverIcon}>
            {name}
          </Text>
        </View>
        <RenderHtml contentWidth={contentWidth} source={{ html: content }} />
      </View>

      {!isUser && (
        <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: "20%" }}>
          <Image
            source={require("../../../Assets/images/thumbup.png")}
            style={[
              styles.reactionText,
              isThumbsUp && styles.tintcolor, // Apply blue tint if thumbs-up is selected
            ]}
          />

          <Image
            source={require("../../../Assets/images/thumbdown.png")}
            style={[styles.reactionText]}
          />

          <TouchableOpacity onPress={() => copyToClipboard(content)}>
            <Image
              source={require("../../../Assets/images/copy.png")}
              style={[styles.reactionText]}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  </View>
);

const StepHistory = memo(({ itemID, stepHistoryData }: { itemID: string; stepHistoryData: IStepHistoryData }) => {
  const { step_history, feedback_history } = stepHistoryData;

  const getThumbsUpStatus = (messageId: string) => {
    const feedback = feedback_history.find((fb) => fb.forId === messageId);
    return feedback?.value === 1;
  };

  const filteredData = step_history.filter(
    (item) => item.type === "user_message" || item.type === "assistant_message"
  );

  const renderMessage: FlatListProps<IStepHistory>["renderItem"] = ({ item }) => {
    const isUser = item.type === "user_message";
    const isThumbsUp = getThumbsUpStatus(item.id);

    if (isUser) {
      if (item.input === null) {
        // Treat as user message with null input
        return <MessageBubble name={USER_NAME} content={item.output} isUser={true} isThumbsUp={false} />;
      } else {
        // Split user input and bot output
        return (
          <>
            <MessageBubble name={USER_NAME} content={item.input} isUser={true} isThumbsUp={false} />
            <MessageBubble name={ASSISTANT_NAME} content={item.output} isUser={false} isThumbsUp={isThumbsUp} />
          </>
        );
      }
    } else {
      // Assistant message
      return (
        <MessageBubble
          name={ASSISTANT_NAME}
          content={item.output}
          isUser={false}
          isThumbsUp={isThumbsUp}
        />
      );
    }
  };

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id}
      renderItem={renderMessage}
      showsVerticalScrollIndicator={false}
    />
  );
});

export default StepHistory;

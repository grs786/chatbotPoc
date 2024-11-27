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
  input: string;
  output: string;
  name: string;
}

interface IFeedbackHistory {
  forId: string;
  value: number;
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
  isThumbsDown: boolean;
}

const ASSISTANT_NAME = "WSM BOT";
const USER_NAME = "Tech";

const copyToClipboard = async (text: string) => {
  await Clipboard.setStringAsync(text);
};

const MessageBubble = ({
  name,
  content,
  isUser,
  isThumbsUp,
  isThumbsDown,
}: IMessageBubble) => (
  <View style={isUser ? styles.messageContainer : styles.rmessageContainer}>
    <View
      style={
        isUser ? styles.sentMessageContainer : styles.receiveMessageContainer
      }
    >
      <View style={[styles.messageBubble]}>
        <View style={[styles.iconContainer, { width: 60 }]}>
          <Text
            numberOfLines={2}
            style={
              name.includes("wsm") ? styles.senderIcon : styles.receiverIcon
            }
          >
            {name}
          </Text>
        </View>
        <View
          style={[
            styles.htmlRenderContainer,
            { width: "80%", marginTop: !isUser ? -16 : 0 },
          ]}
        >
          <RenderHtml
            source={{ html: content }}
            contentWidth={Dimensions.get("window").width * 0.5}
          />
        </View>
      </View>

      {!isUser && (
        <View style={styles.messageReactionView}>
          <Image
            source={require("../../../Assets/images/thumbup.png")}
            style={[
              styles.reactionText,
              isThumbsUp && styles.tintcolor, // Apply blue tint if thumbs-up is selected
            ]}
          />

          <Image
            source={require("../../../Assets/images/thumbdown.png")}
            style={[styles.reactionText, isThumbsDown && styles.tintcolor]}
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

const StepHistory = memo(
  ({
    itemID,
    stepHistoryData,
  }: {
    itemID: string;
    stepHistoryData: IStepHistoryData;
  }) => {
    const { step_history, feedback_history } = stepHistoryData;

    const getThumbsUpStatus = (messageId: string) => {
      const feedback = feedback_history.find((fb) => fb.forId === messageId);
      return feedback?.value === 1;
    };
    const getThumbsDownStatus = (messageId: string) => {
      const feedback = feedback_history.find((fb) => fb.forId === messageId);
      return feedback?.value === 0;
    };

    const filteredData = step_history.filter(
      (item) =>
        item.type === "user_message" || item.type === "assistant_message"
    );


    const renderMessage: FlatListProps<IStepHistory>["renderItem"] = ({
      item,
    }) => {
      if (item.name !== "chatbot") return <View />;
      const isUser = item.name === "chatbot";
      const isThumbsUp = getThumbsUpStatus(item?.id);
      const isThumbsDown = getThumbsDownStatus(item?.id);
      if (item.input) {
        return (
          <>
            <MessageBubble
              name={USER_NAME}
              content={item.input}
              isUser={isUser}
              isThumbsDown={false}
              isThumbsUp={false}
            />
            <MessageBubble
              name={ASSISTANT_NAME}
              content={item.output}
              isUser={false}
              isThumbsDown={isThumbsDown}
              isThumbsUp={isThumbsUp}
            />
          </>
        );
      }
    };
    if (filteredData.length === 0) {
      return <Text style={styles.noResultFound}>No result found</Text>;
    }
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

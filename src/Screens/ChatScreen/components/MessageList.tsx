import React, { useRef, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MessageItem from "./MessageItem";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

export interface IMessage {
  _id: string;
  text?: string;
  image?: string;
  audio?: string;
  createdAt: string | Date;
  question_id: string;
  user: {
    _id: number;
    name: string;
    fullname?: string;
  };
}

interface IMessageListProps {
  messages: IMessage[];
  handleReaction: (
    messageId: number,
    question_id: number,
    reaction: string,
    value: number | undefined
  ) => void;
  hideArrow: boolean;
  messageReactions: { [key: string]: string };
}

const MessageList: React.FC<IMessageListProps> = ({
  messages,
  handleReaction,
  messageReactions,
  hideArrow,
}) => {
  const renderMessage: ListRenderItem<IMessage> = ({ item }) => {
    const reaction = messageReactions[item._id];
    return (
      <MessageItem
        item={item}
        handleReaction={handleReaction}
        reaction={reaction}
      />
    );
  };
  const flatListRef = useRef<FlatList>(null);
  const [isScrollToBottomVisible, setScrollToBottomVisible] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    // Show "Scroll to Bottom" button if user is not near the bottom
    if (contentHeight - offsetY > layoutHeight + 250) {
      setScrollToBottomVisible(true);
    } else {
      setScrollToBottomVisible(false);
    }
  };

  const scrollToEnd = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const scrollToNearEnd = (scrollheight: number) => {
    // Scroll to 100px above the bottom
    flatListRef.current?.scrollToOffset({
      offset: scrollheight - 200,
      animated: true,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
        ref={flatListRef}
        onContentSizeChange={(width, height) => {
          if (messages[messages.length - 1]?.user._id === 1) {
            flatListRef.current?.scrollToEnd({ animated: true });
          } else {
            scrollToNearEnd(height);
          }
        }}
        onScroll={handleScroll}
      />

      {isScrollToBottomVisible && !hideArrow && (
        <TouchableOpacity
          style={styles.scrollToBottomButton}
          onPress={scrollToEnd}
        >
          <MaterialIcons name={"arrow-drop-down"} size={25} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MessageList;

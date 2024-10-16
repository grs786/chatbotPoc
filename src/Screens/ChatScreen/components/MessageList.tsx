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
  messageReactions: { [key: string]: string };
}

const MessageList: React.FC<IMessageListProps> = ({
  messages,
  handleReaction,
  messageReactions,
}) => {
  const renderMessage: ListRenderItem<IMessage> = ({ item }) => {
    const reaction = messageReactions[item._id];
    console.log(item, "renderMessagerenderMessage");
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
    if (contentHeight - offsetY > layoutHeight + 50) {
      setScrollToBottomVisible(true);
    } else {
      setScrollToBottomVisible(false);
    }
  };

  const scrollToEnd = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const scrollToNearEnd = () => {
    // Scroll to 100px above the bottom
    flatListRef.current?.scrollToOffset({
      offset: flatListRef.current?.contentSize?.height - 300,
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
        onContentSizeChange={() => {
          if (messages[messages.length - 1]?.user._id === 1) {
            flatListRef.current?.scrollToEnd({ animated: true });
          } else {
            scrollToNearEnd();
          }
        }}
        onScroll={handleScroll}
      />

      {isScrollToBottomVisible && (
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

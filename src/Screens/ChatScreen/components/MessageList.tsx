import React, { useRef, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MessageItem from "./MessageItem";
import { styles } from "../styles";
import { MaterialIcons } from "@expo/vector-icons";

interface IMessage {
  _id: string | number;
  text?: string;
  image?: string;
  audio?: string;
  user: {
    _id: number;
    name: string;
    fullname: string;
  };
  createdAt: string;
}

interface IMessageListProps {
  messages: IMessage[];
 handleReaction: (messageId: string | number, reaction: string) => void; 
 messageReactions: { [key: string]: string };
}

const MessageList: React.FC<IMessageListProps> = ({
  messages,
  handleReaction,
  messageReactions,
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

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    // Show "Scroll to Bottom" button if user is not near the bottom
    if (contentHeight - offsetY > layoutHeight+50) {
      setScrollToBottomVisible(true);
    } else {
      setScrollToBottomVisible(false);
    }
  };

  const scrollToEnd = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <View style={{flex:1,}}>
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
          }
        }}
        onScroll={handleScroll}
      />

      {isScrollToBottomVisible && (
        <TouchableOpacity
          style={styles.scrollToBottomButton}
          onPress={scrollToEnd}
        >
           <MaterialIcons
          name={'arrow-drop-down'}
          size={25}
          color="white"
        />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MessageList;

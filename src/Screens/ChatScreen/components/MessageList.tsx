import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import MessageItem from "./MessageItem";
import { styles } from "../styles";

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
  handleReaction: (messageId: string | number) => void;
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

  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item._id.toString()}
      renderItem={renderMessage}
      contentContainerStyle={styles.messageList}
      showsVerticalScrollIndicator={false}
      ref={(ref) => (this.flatList = ref)}
      onContentSizeChange={() => this.flatList?.scrollToEnd({ animated: true })}
      onLayout={() => this.flatList?.scrollToEnd({ animated: true })}
    />
  );
};

export default MessageList;

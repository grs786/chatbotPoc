import React from "react";
import { FlatList } from "react-native";
import MessageItem from "./MessageItem";
import { styles } from "../styles";

const MessageList = ({ messages, handleReaction, messageReactions }:any) => {
  const renderMessage = ({ item }:any) => {
    const reaction = messageReactions[item._id];
    return <MessageItem  item={item} handleReaction={handleReaction} reaction={reaction} />;
  };

  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item._id.toString()}
      renderItem={renderMessage}
      contentContainerStyle={styles.messageList}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default MessageList;

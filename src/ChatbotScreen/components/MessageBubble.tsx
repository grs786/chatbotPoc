import React from "react";
import { Bubble } from "react-native-gifted-chat";
import { styles } from "../styles";

interface Props {
  currentMessage: any;
  onLongPress: (message: any) => void;
}

const MessageBubble: React.FC<Props> = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: [styles.sentMessageContainer],
        left: [styles.receiveMessageContainer],
      }}
      onLongPress={() => props.onLongPress(props.currentMessage)}
    />
  );
};

export default MessageBubble;

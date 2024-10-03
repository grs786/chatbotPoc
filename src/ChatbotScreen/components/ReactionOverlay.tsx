import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "../styles";
import { MessageReaction } from "../types";

interface Props {
  reactions: MessageReaction[];
  onSelectReaction: (emoji: string) => void;
}

const ReactionsOverlay: React.FC<Props> = ({ reactions, onSelectReaction }) => {
  return (
    <View style={styles.reactionContainer}>
      {reactions.map((reaction) => (
        <TouchableOpacity
          key={reaction.id}
          onPress={() => onSelectReaction(reaction.emoji)}
          style={styles.reactionButton}
        >
          <Text style={styles.reactionEmoji}>{reaction.emoji}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ReactionsOverlay;

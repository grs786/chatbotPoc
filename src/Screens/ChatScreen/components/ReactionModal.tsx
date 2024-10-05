import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { styles } from "../styles";

interface IReactionModalProps {
  reactionVisible: boolean;
  setReactionVisible: (visible: boolean) => void;
  applyReaction: (reaction: string) => void;
}

const ReactionModal = ({
  reactionVisible,
  setReactionVisible,
  applyReaction,
}: IReactionModalProps) => {
  return (
    <Modal visible={reactionVisible} transparent={true} animationType="slide">
      <View style={styles.reactionModal}>
        <TouchableOpacity onPress={() => applyReaction("👍")}>
          <Text style={styles.reactionOption}>👍</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => applyReaction("👎")}>
          <Text style={styles.reactionOption}>👎</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setReactionVisible(false)}>
          <Text style={styles.reactionOption}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ReactionModal;

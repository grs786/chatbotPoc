import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Colors } from "src/Assets/colors";
import { IFeedbackArray } from "../../types";

interface FeedbackModalProps {
  visible: boolean;
  localFeedbackArr: IFeedbackArray[];
  onClose: () => void;
  onSubmit: (feedback: string) => void;
  feedbackQuestionID: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  visible,
  onClose,
  onSubmit,
  localFeedbackArr,
  feedbackQuestionID,
}) => {
  let feedbackValue = "";
  localFeedbackArr.forEach((item: { forId: string; comment: string }) => {
    item.forId === feedbackQuestionID ? (feedbackValue = item.comment) : "";
  });
  const [feedback, setFeedback] = useState(feedbackValue || "");

  const handleSubmit = () => {
    onSubmit(feedback);
    setFeedback("");
    onClose(); // Close modal after submission
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => onClose()}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Provide feedback</Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder="How could the response be improved?"
            value={feedback}
            placeholderTextColor={Colors.DISABLED_TEXT}
            onChangeText={setFeedback}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit feedback</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default FeedbackModal;

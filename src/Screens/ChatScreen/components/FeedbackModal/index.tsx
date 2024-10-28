import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import CustomCheckbox from "./CustomCheckbox"; // Path to the custom checkbox component
import styles from "./styles";
import { Colors } from "src/Assets/colors";

interface FeedbackModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [feedback, setFeedback] = useState("");
  const [selectedCheckbox, setSelectedCheckbox] = useState<number>(); // state to keep track of selected checkbox

  const [isNotTrue, setIsNotTrue] = useState(false);
  const [isUnhelpful, setIsUnhelpful] = useState(false);

  const handleSubmit = () => {
    onSubmit(feedback);
    setFeedback("");
    setIsNotTrue(false);
    setIsUnhelpful(false);
    onClose(); // Close modal after submission
  };

  // Options for checkboxes
  const checkboxes = [
    { id: 1, label: "This is not true", value: "This is not true" },
    {
      id: 2,
      label: "This is an unhelpful response",
      value: "This is an unhelpful response",
    },
  ];
  const handleCheckboxPress = (id: number, value: string) => {
    if (selectedCheckbox === id) {
      // If the checkbox is already selected, deselect it and remove its value from the input
      setSelectedCheckbox(undefined);
      setFeedback((prev) => prev.replace(value, "").trim()); // Remove the value and trim whitespace
    } else {
      // If a new checkbox is selected, replace the previous one and append the new value
      let newText = feedback;
      if (selectedCheckbox) {
        // Remove previous checkbox value
        const previousValue = checkboxes.find(
          (checkbox) => checkbox.id === selectedCheckbox
        )?.value;
        newText = newText.replace(previousValue, "").trim();
      }
      setSelectedCheckbox(id);
      setFeedback(`${newText} ${value}`.trim()); // Append new value and trim any extra whitespace
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
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
          {checkboxes.map((checkbox) => (
            <View style={styles.checkboxContainer}>
              <CustomCheckbox
                value={selectedCheckbox === checkbox.id}
                onValueChange={() =>
                  handleCheckboxPress(checkbox.id, checkbox.value)
                }
              />
              <Text style={styles.label}>{checkbox.label}</Text>
            </View>
          ))}

          <View style={styles.buttonContainer}>
            {/* <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit feedback</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FeedbackModal;

// src/components/RecordingModal.tsx
import React from "react";
import { View, Modal, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { styles } from "./styles";

interface RecordingModalProps {
  visible: boolean;
  onStopRecording: () => void;
}

const RecordingModal: React.FC<RecordingModalProps> = ({ visible, onStopRecording }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.recordingBar}>
          <Image
            source={require("../../../Assets/images/recordingBar.png")}
            style={{ width: "95%", height: 30 }}
          />
          <TouchableOpacity onPress={onStopRecording} style={styles.stopButton}>
            <Image
              source={require("../../../Assets/images/stopRecording.png")}
              style={{ width: 55, height: 55 }}
            />
          </TouchableOpacity>
          <Text>Stop Recording</Text>
        </View>
      </View>
    </Modal>
  );
};



export default RecordingModal;

import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { styles } from "./styles";
import { Colors } from "src/Assets/colors";
import RecordingModal from "./RecordingModal";

interface IMessageInputProps {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  handleSend: any;
  pickImage: () => void;
  recording?: Audio.Recording | null;
  startRecording: () => void;
  stopRecording: () => void;
}

const MessageInput = ({
  inputText,
  setInputText,
  handleSend,
  pickImage,
  recording,
  startRecording,
  stopRecording,
}: IMessageInputProps) => {
  const [isRecording, setIsRecording] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleStartRecording = () => {
    setIsRecording(true);
    startRecording();
    slideUp();
  };

  const handleStopRecording = async () => {
    await stopRecording();
    setIsRecording(false);
    slideDown();
  };

  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: -180,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={{ flex: 1 }} />

      <RecordingModal
        visible={isRecording}
        onStopRecording={handleStopRecording}
      />

      <Animated.View
        style={[
          styles.inputContainer,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={require("../../../Assets/images/plusIcon.png")}
            style={styles.plusIcon}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Message WSM Assistant"
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        {inputText.trim() ? (
          <TouchableOpacity style={{ marginTop: 6 }} onPress={handleSend}>
            <Image
              source={require("../../../Assets/images/sendIcon.png")}
              style={styles.send}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={isRecording ? handleStopRecording : handleStartRecording}
          >
            <MaterialIcons name={"mic"} size={24} color={Colors.NAVYBLUE} />
          </TouchableOpacity>
        )}
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default MessageInput;

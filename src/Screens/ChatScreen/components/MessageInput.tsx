import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Image,
  Keyboard,
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
  disableInput: boolean;
}

const MessageInput = ({
  inputText,
  setInputText,
  handleSend,
  pickImage,
  startRecording,
  stopRecording,
  disableInput,
}: IMessageInputProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [msgPlaceholder, SetMsgPlaceholder] = useState("Message WSM Assistant");

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
        style={
          disableInput
            ? [
                styles.inputContainer,
                {
                  transform: [{ translateY: slideAnim }],
                  backgroundColor: Colors.DISABLED_GREY,
                },
              ]
            : [
                styles.inputContainer,
                { transform: [{ translateY: slideAnim }] },
              ]
        }
      >
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={require("../../../Assets/images/plusIcon.png")}
            style={[
              styles.plusIcon,
              { tintColor: disableInput ? "#CBD5E1" : Colors.BLACK },
            ]}
          />
        </TouchableOpacity>
        <TextInput
          style={
            disableInput
              ? [styles.textInput, { backgroundColor: Colors.DISABLED_GREY }]
              : styles.textInput
          }
          placeholder={msgPlaceholder}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          onFocus={() => SetMsgPlaceholder("")}
          onBlur={() => {
            SetMsgPlaceholder("Message WSM Assistant");
            Keyboard.dismiss();
          }}
          onSubmitEditing={() => Keyboard.dismiss()}
          placeholderTextColor={
            disableInput ? Colors.DISABLED_GREY_SHADE1 : Colors.BLACK
          }
        />
        {inputText.trim() ? (
          <TouchableOpacity
            style={{ marginTop: 6 }}
            onPress={() => {
              handleSend();
              Keyboard.dismiss();
            }}
          >
            <Image
              source={require("../../../Assets/images/sendIcon.png")}
              style={styles.send}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={isRecording ? handleStopRecording : handleStartRecording}
          >
            {disableInput ? (
              <Image
                source={require("../../../Assets/images/disabledMic.png")}
                style={styles.send}
              />
            ) : (
              <MaterialIcons name={"mic"} size={24} color={Colors.NAVYBLUE} />
            )}
          </TouchableOpacity>
        )}
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default MessageInput;

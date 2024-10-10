import React, { Dispatch, SetStateAction } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";

interface IMessageInputProps {
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
  handleSend: () => void;
  pickImage: () => void;
  recording: boolean;
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
  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity onPress={pickImage}>
        <MaterialIcons name="add" size={28} color="gray" />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        placeholder="Message WSM Assistant"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
      {inputText.trim() ? (
        <TouchableOpacity onPress={handleSend}>
          <MaterialIcons name="send" size={24} color="blue" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 4,
            marginLeft: 5,
          }}
          onPress={() => (recording ? stopRecording() : startRecording())}
        >
          <MaterialIcons
            name={recording ? "stop" : "mic"}
            size={24}
            color={recording ? "red" : "#1E3A8A"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MessageInput;

import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../styles";

const MessageInput = ({
  inputText,
  setInputText,
  handleSend,
  pickImage,
  recording,
  startRecording,
  stopRecording,
}:any) => {
  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity onPress={pickImage}>
        <MaterialIcons name="add" size={28} color="gray" />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        placeholder="Ask follow-up..."
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
      <TouchableOpacity onPress={handleSend}>
        <MaterialIcons name="send" size={24} color="grey" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "blue",
          padding: 10,
          borderRadius: 4,
          marginLeft: 5,
        }}
        onPress={() => (recording ? stopRecording() : startRecording())}
      >
        <MaterialIcons
          name={recording ? "stop" : "mic"}
          size={24}
          color={recording ? "red" : "white"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;

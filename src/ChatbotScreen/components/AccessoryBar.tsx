import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../styles";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";

interface Props {
  onSend: (message: any) => void;
  recording: Audio.Recording | null;
  setRecording: (recording: Audio.Recording | null) => void;
  setAudioUri: (uri: string) => void;
}

const AccessoryBar: React.FC<Props> = ({
  onSend,
  recording,
  setRecording,
  setAudioUri,
}) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const message = {
        _id: Math.random().toString(),
        text: "",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "User",
        },
        image: result.assets[0].uri,
      };
      onSend([message]);
    }
  };

  const startRecording = async () => {
    try {
      const status = await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
      setAudioUri("");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setAudioUri(uri || "");

      const message = {
        _id: Math.random().toString(),
        text: "",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "User",
        },
        audio: uri, // Use the URI for playback
      };
      onSend([message]);
    }
  };

  return (
    <View style={styles.accessoryContainer}>
      <TouchableOpacity style={{ marginHorizontal: 4 }} onPress={pickImage}>
        <MaterialIcons name="attach-file" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => (recording ? stopRecording() : startRecording())}
      >
        <MaterialIcons
          name="mic"
          size={24}
          color={recording ? "red" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AccessoryBar;

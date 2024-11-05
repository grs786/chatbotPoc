import { useState } from "react";
import { Audio } from "expo-av";

export const useAudioRecorder = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  const recordingSettings = {
    android: {
      extension: ".m4a",
      outputFormat: 2,
      audioEncoder: 3,
      sampleRate: 8000,
      numberOfChannels: 1,
      bitRate: 128000,
    },
    ios: {
      extension: ".m4a",
      audioQuality: Audio.IOSAudioQuality.HIGH,
      sampleRate: 8000,
      numberOfChannels: 1,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
    web: {},
  };

  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) throw new Error("Permission to access microphone denied");

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      const { recording } = await Audio.Recording.createAsync(
        recordingSettings
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
      return uri;
    }
    return null;
  };

  return { recording, startRecording, stopRecording };
};

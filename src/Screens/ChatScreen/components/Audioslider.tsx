import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import React from "react";
import { Colors } from "src/Assets/colors";

interface AudioMessageProps {
  currentMessage: {
    audio: string;
    [key: string]: string;
  };
}

interface AudioStatus {
  isPlaying: boolean;
  didJustFinish: boolean;
  isLoaded: boolean;
  durationMillis?: number;
  positionMillis?: number;
  // Add other necessary properties according to the expected response from expo-av
}

export const AudioMessage: React.FC<AudioMessageProps> = ({
  currentMessage,
}) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackStatus, setPlaybackStatus] = useState<AudioStatus | null>(
    null
  );
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    return () => {
      // Clean up sound when component unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const loadAndPlaySound = async () => {
    try {
      if (!sound) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: currentMessage },
          {},
          onPlaybackStatusUpdate
        );
        setSound(newSound);
        await newSound.playAsync();
        setIsPlaying(true);
      } else {
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error("Error loading or playing sound:", error);
    }
  };

  const onPlaybackStatusUpdate = (status: AudioStatus) => {
    setPlaybackStatus(status);
    if (status.didJustFinish) {
      setIsPlaying(false);
    }
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0); // Set duration from the playback status
    }
  };

  const renderSlider = () => {
    if (playbackStatus && duration) {
      return (
        <Slider
          style={styles.slider}
          value={playbackStatus.positionMillis}
          minimumValue={0}
          maximumValue={duration}
          thumbTintColor="#f39c12"
          minimumTrackTintColor="white"
          maximumTrackTintColor="black"
          onSlidingComplete={async (value) => {
            if (sound) {
              await sound.setPositionAsync(value);
            }
          }}
        />
      );
    }
    return null;
  };

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${parseInt(seconds, 10) < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.audioContainer}>
      <TouchableOpacity onPress={loadAndPlaySound}>
        <MaterialIcons
          name={isPlaying ? "pause" : "play-arrow"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
      {renderSlider()}
      <Text style={styles.timeText}>
        {playbackStatus &&
          playbackStatus.positionMillis &&
          formatTime(playbackStatus.positionMillis)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  audioContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f39c12",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  slider: {
    width: 150,
    height: 40,
    marginLeft: 10,
  },
  timeText: {
    fontSize: 8,
    color: Colors.NAVYBLUE,
  },
});

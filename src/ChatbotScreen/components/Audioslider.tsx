import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av"; // Ensure you have this import

// New functional component to handle audio message rendering
export const AudioMessage = ({ currentMessage }: any) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackStatus, setPlaybackStatus] = useState<Audio.Status | null>(null);
  const [duration, setDuration] = useState(0); // New state for duration

  useEffect(() => {
    return () => {
      // Clean up sound when component unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const loadAndPlaySound = async () => {
    if (!sound) {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: currentMessage.audio },
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
  };

  const onPlaybackStatusUpdate = (status: Audio.Status) => {
    setPlaybackStatus(status);
    if (status.didJustFinish) {
      setIsPlaying(false);
    }
    // Set the duration when playback status updates
    if (status.isLoaded) {
      setDuration(status.durationMillis); // Set duration from the playback status
    }
  };

  const renderSlider = () => {
    if (playbackStatus && duration) {
      return (
        <Slider
          style={{ width: 150, height: 40 }}
          value={playbackStatus.positionMillis}
          minimumValue={0}
          maximumValue={duration}
          thumbTintColor="#f39c12" // Orange color for the thumb
        minimumTrackTintColor="#f39c12" // Orange color for the played portion
        maximumTrackTintColor="#95a5a6"
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
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity onPress={loadAndPlaySound}>
        <MaterialIcons
          name={isPlaying ? "pause" : "play-arrow"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
      {renderSlider()}
      <Text>
        {playbackStatus && duration
          && formatTime(playbackStatus.positionMillis)
          }
      </Text>
      {/* <Text>
        {" / "}{duration ? formatTime(duration) : "0:00"}
      </Text>    */}
    </View>
  );
};

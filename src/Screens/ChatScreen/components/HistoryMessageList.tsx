import React from "react";
import { View, Text, FlatList, Dimensions } from "react-native";
import RenderHtml from "react-native-render-html"; // Assuming you are using RenderHtml in your project
import stepHistory from "../../../components/history.json"; // Adjust path as necessary
import { styles } from "./styles";

const StepHistory = (itemID: string) => {
  console.log("iddd,,,,,", itemID);
  const renderMessage = ({ item }) => {
    if (item.type === "assistant_message") {
      return (
        <View style={styles.rmessageContainer}>
          <View style={styles.receiveMessageContainer}>
            <View style={[styles.rmessageBubble, { alignItems: "center" }]}>
              <View style={styles.iconContainer}>
                <Text
                  numberOfLines={2}
                  style={[styles.receiverIcon, { width: 50 }]}
                >
                  {"WSM BOT"}
                </Text>
              </View>
              <RenderHtml
                contentWidth={Dimensions.get("window").width * 0.5}
                source={{ html: item.output }}
              />
            </View>
          </View>
        </View>
      );
    } else if (item.type === "user_message") {
      return (
        <View style={styles.messageContainer}>
          <View style={[styles.sentMessageContainer]}>
            <View style={styles.messageBubble}>
              <View style={[styles.iconContainer, { width: 70 }]}>
                <Text numberOfLines={1} style={styles.receiverIcon}>
                  {"Tech"}
                </Text>
              </View>
              <RenderHtml
                contentWidth={Dimensions.get("window").width * 0.5}
                source={{ html: item?.output }}
              />
            </View>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={stepHistory.step_history}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default StepHistory;

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: "#fff",
      width: "100%",
    },
    sentMessageContainer: {
      backgroundColor: "#061db7",
      borderRadius: 15,
      marginVertical: 4,
      marginRight: 5,
    },
    receiveMessageContainer: {
      backgroundColor: "#ced4da",
      borderRadius: 15,
      marginVertical: 4,
      marginLeft: 5,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      padding: 20,
      backgroundColor: "white",   
      borderRadius: 10,
      alignItems: "center",
    },
    accessoryContainer: {
      flexDirection: "row-reverse",
      alignItems: "center",
      padding: 10,
      backgroundColor: "#ced4da",
    },
    reactionContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
      backgroundColor: "#f0f0f0",
      borderRadius: 10,
      position: "absolute",
      bottom: 100, // Adjust as necessary
      left: 10,
      right: 10,
    },
    reactionButton: {
      flex: 1,
      alignItems: "center",
    },
    reactionEmoji: {
      fontSize: 24,
    },
    modalTitle: {
      fontSize: 20,
      marginBottom: 15,
    },
    modalButton: {
      marginVertical: 10,
      padding: 10,
      backgroundColor: "#f0f0f0",
      borderRadius: 5,
      width: "100%",
      alignItems: "center",
    },
  });
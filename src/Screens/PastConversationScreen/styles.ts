import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 50,
      backgroundColor: "#fff",
    },
    heading: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
      padding: 10,
      borderRadius: 10,
      marginBottom: 20,
    },
    searchInput: {
      flex: 1,
      marginHorizontal: 10,
      fontSize: 16,
    },
    chatItemContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#e0e0e0",
    },
    chatItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    chatTitle: {
      fontSize: 13,
      marginLeft: 10,
      fontWeight:'500'
    },
    dateHeading: {
      fontSize: 14,
      marginVertical: 10,
      color: "#888",
      fontWeight:'500',
    },
    emptyMessage: {
      fontSize: 14,
      color: "#aaa",
      paddingVertical: 5,
    },
  });
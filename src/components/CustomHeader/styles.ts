import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headertext: { fontSize: 20, color: "#1A7BD3" },
  container: {
    paddingVertical: 10,
    paddingTop: Platform.OS ? 20 : 30,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
});

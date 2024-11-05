import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headertext: { fontSize: 16, color: "#1E3A8A", fontWeight: "600" },
  container: {
    paddingVertical: 10,
    paddingTop: Platform.OS === "ios" ? 20 : 30,
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
    // Adding shadow properties for both iOS and Android
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 5,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headertext: { fontSize: 20, color: "#1E3A8A",fontWeight:'600' },
  container: {
    paddingVertical: 10,
    paddingTop: Platform.OS === "ios" ? 20 : 30,
    backgroundColor: "white",
    borderBottomWidth:.5,
    borderBottomColor: "white",

    // Adding shadow properties for both iOS and Android
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4, 
    elevation: 5,
  },
});

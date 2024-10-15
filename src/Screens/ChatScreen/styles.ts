import { StyleSheet } from "react-native";
import { Colors } from "src/Assets/colors";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  vehicleDetailsContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    justifyContent: "center",
    height: "81%",
  },
  keyboard: { paddingHorizontal: 10, marginVertical: 10 },

  connectedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  vehicleTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.NAVYBLUE,
  },
  connectionStatus: {
    color: Colors.NAVYBLUE,
    fontSize: 12,
    fontWeight: "500",
  },
  statusDot: {
    width: 10,
    height: 10,
    marginLeft: 3,
    backgroundColor: "green",
    borderRadius: 5,
  },
  historySteps: {
    flex: 1,
  },
  vehicleInfo: {
    marginBottom: 15,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 8,
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.3, // iOS shadow
    shadowRadius: 2, // iOS shadow
  },
  vehicleModel: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.NAVYBLUE,
    paddingBottom: 10,
  },
  vinNumber: {
    fontSize: 14,
    color: "#555",
  },
  viewDataButton: {
    backgroundColor: Colors.DISABLED_BUTTON,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  viewDataText: {
    fontSize: 14,
    padding: 5,
    color: Colors.DISABLED_TEXT,
  },
  vehicleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  vehicleRowView: {
    flexDirection: "row",
  },

  bluebutton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    padding: 12,
    borderRadius: 10,
    backgroundColor: Colors.NAVYBLUE,
    alignSelf: "center",
  },

  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "500",
    color: Colors.NAVYBLUE,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: "#1D4ED8",
  },
  orText: {
    textAlign: "center",
    marginVertical: 30,
    fontSize: 16,
    fontWeight: "bold",
  },
  submittext: {
    textAlign: "center",
    fontSize: 14,
    paddingVertical: 4,
    fontWeight: "400",
    color: "white",
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  container: {
    padding: 10,
  },
  assistantMessage: {
    backgroundColor: "#e6f7ff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  assistantText: {
    color: "#005b9f",
    fontSize: 16,
  },
  userMessage: {
    backgroundColor: "#dcf8c6",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignSelf: "flex-end",
    maxWidth: "80%",
  },
  userText: {
    color: "#2e2e2e",
    fontSize: 16,
  },
});

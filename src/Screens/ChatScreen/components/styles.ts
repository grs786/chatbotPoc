import { StyleSheet } from "react-native";
import { Colors } from "src/Assets/colors";

export const styles = StyleSheet.create({
  messageList: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  sentMessageContainer: {
    alignSelf: "flex-start",
    marginVertical: 5,
    borderRadius: 10,
    width: "100%",
  },
  receiveMessageContainer: {
    alignSelf: "flex-start",
    borderRadius: 10,
    marginVertical: 5,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  scrollToBottomButton: {
    position: "absolute",
    right: "46%",
    bottom: -10,
    padding: 8,
    backgroundColor: Colors.NAVYBLUE,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    marginVertical: 5,
    padding: 5,
    alignItems: "flex-start",
    backgroundColor: Colors.LIGHT_GREY,
  },
  rmessageContainer: {
    marginVertical: 5,
    padding: 5,
    alignItems: "flex-start",
    borderRadius: 4,
  },
  iconContainer: {
    marginRight: 4,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.LIGHT_BLUE,
    height: 64,
    borderRadius: 6,
    alignItems: "center",
    padding: 8,
  },
  senderIcon: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.NAVYBLUE,
    textAlign: "center",
    textAlignVertical: "center",
  },
  receiverIcon: {
    fontSize: 10,
    fontWeight: "600",
    color: Colors.NAVYBLUE,
    textAlign: "center",
    textAlignVertical: "center",
  },
  messageBubble: {
    width: "70%",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
  },
  rmessageBubble: {
    width: "70%",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
  },

  textInputContainer: {
    flexDirection: "row", // To align TextInput and button horizontally
    alignItems: "center",
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    elevation: 5, // Android shadow
    shadowColor: Colors.DISABLED_TEXT, // iOS shadow
    shadowOffset: { width: 1, height: 2 }, // iOS shadow
    shadowOpacity: 0.4, // iOS shadow
    shadowRadius: 2, // iOS shadow
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginHorizontal: 5,
  },
  imageMessage: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#E1F6FF",
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#E1F6FF",
    padding: 10,
    paddingVertical: 15,
    borderRadius: 20,
    marginHorizontal: 10,
    fontWeight: "600",
  },
  reactionText: {
    width: 17,
    height: 17,
    marginLeft: 9,
  },
  reactionModal: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    position: "absolute",
    bottom: 50,
    left: "50%",
    transform: [{ translateX: -100 }],
    width: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reactionOption: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 5,
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
  tintcolor:{
    tintColor: "blue" 
  },

  modalBackground: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    position: "absolute",
    height: "100%",
    width: "100%",
    marginTop: "30%",
  },
  vechilemodalContainer: {
    backgroundColor: "white",
    // paddingVertical: 20,
    elevation: 10,
    height: "85%",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 80,
  },
  logo: {
    width: 50,
    height: 50,
  },
  inputContainers: {
    marginBottom: 10,
  },

  dropdownContainer: {
    marginBottom: 20,
  },
  arrowButton: {
    padding: 11,
    backgroundColor: Colors.NAVYBLUE,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    marginLeft: 10,
  },
  disbaledArrowButton: {
    padding: 11,
    backgroundColor: Colors.DISABLED_BUTTON,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    marginLeft: 10,
  },
  dropdown: {
    borderColor: "#ccc",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.1, // iOS shadow
    shadowRadius: 4, // iOS shadow
  },
  dropOptions: { borderColor: "#ccc", elevation: 2 },
  headertext: {
    fontSize: 20,
    fontWeight: "500",
    color: "#1A7BD3",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 40,
  },
  vinDetails:{
    fontSize: 10,
    fontWeight: "500",
    color: Colors.DISABLED_TEXT,
    backgroundColor:Colors.LIGHT_BLUE,
    paddingVertical:4,
    paddingLeft:2,
    marginTop:1
  }
});

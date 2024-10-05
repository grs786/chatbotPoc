import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  messageList: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  sentMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "white",
    marginVertical: 5,
    borderRadius: 10,
  },
  receiveMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#E8E9E8",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  messageContainer: {
    marginVertical: 5,
    padding: 5,
    alignItems: "flex-start",
    backgroundColor: "white",
  },
  rmessageContainer: {
    marginVertical: 5,
    padding: 5,
    alignItems: "flex-start",
    shadowColor: "#000",
    borderRadius:4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 1,
    backgroundColor: "#E8E9E8",
  },
  iconContainer: {
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  senderIcon: {
    fontSize: 16,
    color: "white",
    backgroundColor: "#000",
    borderRadius: 15,
    width: 25,
    height: 25,
    textAlign: "center",
    textAlignVertical: "center",
  },
  receiverIcon: {
    fontSize: 16,
    color: "white",
    backgroundColor: "pink",
    borderRadius: 15,
    width: 25,
    height: 25,
    textAlign: "center",
    textAlignVertical: "center",
  },
  messageBubble: {
    maxWidth: "88%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginLeft:30
  },
  rmessageBubble: {
    maxWidth: "88%",
    backgroundColor: "#E8E9E8",
    padding: 10,
    borderRadius: 10,
    marginLeft:20

  },

  textInputContainer: {
    flexDirection: "row", // To align TextInput and button horizontally
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.1, // iOS shadow
    shadowRadius: 4, // iOS shadow
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
    paddingHorizontal:10,
    backgroundColor: "#E1F6FF",
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius:20
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
    fontSize: 14,
    color: "#555",
    alignSelf: "flex-end",
    marginTop: 5,
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

  modalBackground: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
    vechilemodalContainer: {
      backgroundColor: "white",
      borderRadius: 10,
      paddingBottom: 20,
      elevation: 10,
      height:'90%',
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
    width: 90,
    height: 40,
  },
  inputContainers: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500",
    color: "#1D4ED8",
  },
  input: {
    flex:1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  arrowButton: {
    padding: 11,
    backgroundColor: "#1D4ED8",
    borderTopRightRadius: 5,
    borderBottomRightRadius:5,
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
  dropOptions:{borderColor:'#ccc',elevation:2},
  headertext: { fontSize: 20,fontWeight:'500', color: "#1A7BD3",alignItems:'center',textAlign:'center',paddingTop:40 },

});

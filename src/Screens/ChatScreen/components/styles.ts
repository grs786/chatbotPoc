import { StyleSheet } from "react-native";
import { Colors } from "src/Assets/colors";

export const styles = StyleSheet.create({
  messageList: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  sentMessageContainer: {
    alignSelf: "flex-start",
    borderRadius: 10,
    width: "100%",
  },
  receiveMessageContainer: {
    borderRadius: 10,
  },

  messageText: {
    fontSize: 16,
    color: "#333",
  },
  scrollToBottomButton: {
    position: "absolute",
    right: "46%",
    bottom: 4,
    padding: 8,
    backgroundColor: Colors.NAVYBLUE,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 5,
    backgroundColor: Colors.LIGHT_GREY,
  },
  rmessageContainer: {
    borderRadius: 4,
    marginBottom:16
  },
  iconContainer: {
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.LIGHT_BLUE,
    height: 56,
    borderRadius: 6,
    alignItems: "center",
    paddingHorizontal: 10,
    elevation: 5, // Android shadow
    shadowColor: Colors.DISABLED_TEXT, // iOS shadow
    shadowOffset: { width: 1, height: 2 }, // iOS shadow
    shadowOpacity: 0.4, // iOS shadow
    shadowRadius: 2, // iOS shadow
    alignSelf:'flex-start'
  },
  htmlRenderContainer:{
    width: "90%",
    // marginTop: -16,
  },
  senderIcon: {
    fontSize: 10,
    fontWeight: "600",
    color: Colors.NAVYBLUE,
    textAlign: "center",
    textAlignVertical: "center",
  },
  heightAdjuster: { height: 300 },
  receiverIcon: {
    fontSize: 10,
    fontWeight: "600",
    color: Colors.NAVYBLUE,
  },
  messageBubble: {
    borderRadius: 10,
    flexDirection: "row",
    paddingVertical:16,
    paddingHorizontal:10,
    alignItems:'center',
    width: "90%",
  },
  rmessageBubble: {
    borderRadius: 10,
    flexDirection: "row",
    paddingVertical:16,
    paddingHorizontal:10, 
    width:'90%'
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
    paddingHorizontal: 15,
    backgroundColor: Colors.INDIGO_BLUE,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 10,
    marginBottom: 3,
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.INDIGO_BLUE,
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
  tintcolor: {
    tintColor: "blue",
  },

  modalBackground: {
    alignItems: "center",
    position: "absolute",
    height: "95%",
    width: "100%",
    marginTop: "30%",
    zIndex: 4,
  },
  vechilemodalContainer: {
    backgroundColor: "white",
    height: "85%",
    width: "100%",
    
  },
  logoContainer: {
    alignItems: "center",
    marginTop: "10%",
    marginBottom:"30%"
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
  submitButton: {
    padding: 8,
    backgroundColor: Colors.NAVYBLUE,
    borderRadius: 8,
    marginTop:10,
    width:"60%",
    alignSelf:"center"
  },
  disbaledsubmitButton: {
    padding: 8,
    backgroundColor: Colors.DISABLED_BUTTON,
    borderRadius:8,
    marginTop:10,
    width:"60%",
    alignSelf:"center"
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
  vinDetails: {
    fontSize: 10,
    fontWeight: "500",
    color: Colors.DISABLED_TEXT,
    paddingVertical: 4,
    paddingLeft: 6,
    marginTop: 1,
  },
  scannerImg:{
    width:24,
    height:24,
    marginRight:16
  },
  noResultFound: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.BLACK,
    alignSelf: "center",
    marginTop: "40%",
  },
  messageReactionView: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "20%",
  },
  plusIcon: { width: 30, height: 30,},

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  recordingView: {
    height: 150,
    backgroundColor: "#E5EDFB",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
  },
  recordingBar: {
    backgroundColor: Colors.INDIGO_BLUE,
    height: 170,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  stopButton: {
    marginTop: 10,
  },
  recordingText: {
    fontSize: 18,
    color: "#fff",
  },
  send: { width: 40, height: 50 },
});

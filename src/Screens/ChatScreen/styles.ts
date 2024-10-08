import { StyleSheet } from "react-native";
import { Colors } from "src/Assets/colors";

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
    backgroundColor: "#E8E9E8",
    marginVertical: 5,
    padding:5,
    borderRadius: 10,
  },
  receiveMessageContainer: {
    alignSelf: "flex-start",
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
    // backgroundColor: "white",
    backgroundColor: "#E8E9E8",

  },
  rmessageContainer: {
    marginVertical: 5,
    padding: 5,
    alignItems: "flex-start",
    borderRadius: 4,
   
  },
  iconContainer: {
    marginRight: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  senderIcon: {
    fontSize: 14,
    color: Colors.NAVYBLUE,
    backgroundColor: "#87CEFA",
    borderRadius: 15,
    width: 60,
    height: 60,
    textAlign: "center",
    textAlignVertical: "center",
  },
  receiverIcon: {
    fontSize: 16,
    color: Colors.NAVYBLUE,
    backgroundColor: "#87CEFA",
    borderRadius: 15,
    width: 60,
    height: 60,
    textAlign: "center",
    textAlignVertical: "center",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    flexDirection:'row'
  },
  rmessageBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    flexDirection:'row'

  },

  textInputContainer: {
    flexDirection: "row", // To align TextInput and button horizontally
    alignItems: "center",
    // borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 1, height: 2 }, // iOS shadow
    shadowOpacity: 1, // iOS shadow
    shadowRadius: 2, // iOS shadow
  },
  buttonContainer:{
    alignItems:'center',
    marginBottom:20,
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
  
  bluebutton:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    width:'70%',
    padding:12,
    borderRadius:10,
    backgroundColor:Colors.NAVYBLUE,
    alignSelf:'center'

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
    color:'#1D4ED8'
  },
  orText: {
    textAlign: "center",
    marginVertical: 30,
    fontSize: 16,
    fontWeight: "bold",
  },
  submittext:{
    textAlign: "center",
    fontSize: 14,
    paddingVertical:4,
    fontWeight: '400',
    color:'white',

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

  vehicleDetailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    justifyContent:'center',
    height:'81%',
  },
  connectedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  vehicleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.NAVYBLUE,
  },
  connectionStatus: {
    color: Colors.NAVYBLUE,
    fontSize:12,
    fontWeight:'500'
  },
  statusDot: {
    width: 10,
    height: 10,
    marginLeft:3,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  vehicleInfo: {
    marginBottom: 15,
    backgroundColor:Colors.WHITE,
    paddingHorizontal:16,
    paddingVertical:24,
    borderRadius:8,
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.3, // iOS shadow
    shadowRadius: 2, // iOS shadow
  },
  vehicleModel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.NAVYBLUE,
    paddingBottom:10
  },
  vinNumber: {
    fontSize: 14,
    color: '#555',
    
  },
  viewDataButton: {
    backgroundColor: Colors.DISABLED_BUTTON,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewDataText: {
    fontSize: 16,
    padding:5,
    color:Colors.DISABLED_TEXT
  },
  vehicleIcon:{
    width:24,
    height:24,
    marginRight:10
  },
  vehicleRowView:{
    flexDirection:"row"
  }
  
});

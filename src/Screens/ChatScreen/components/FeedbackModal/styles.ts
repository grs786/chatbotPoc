import { StyleSheet } from "react-native";
import { Colors } from "src/Assets/colors";
    
const styles = StyleSheet.create({
        modalOverlay: {
          flex: 1,
          justifyContent: "center",
          backgroundColor: "rgba(178,185,196, 0.6)",
          
        },
        modalContainer: {
          margin: 20,
          padding: 20,
          backgroundColor: "white",
          borderRadius: 10,
          elevation: 5,
        },
        title: {
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 24,
          color:Colors.NAVYBLUE
        },
        input: {
          height: 100,
          borderRadius: 5,
          padding: 10,
          marginBottom: 20,
          textAlignVertical: "top",
          shadowColor: Colors.NAVYBLUE_SHADE1,
          shadowOffset: { width: 1, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
          backgroundColor:Colors.WHITE,
          color:Colors.BLACK_SHADE1
          
        },
        checkboxContainer: {
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        },
        label: {          
          fontSize:14,
          color:Colors.BLACK_SHADE1
        },
        buttonContainer: {
          flexDirection: "row",
          justifyContent: "space-between",marginTop:16
        },
        button: {
          backgroundColor: Colors.NAVYBLUE,
          padding: 10,
          borderRadius: 10,
          minWidth: "40%",
          alignItems: "center",
        },
        buttonText: {
          color: "white",
          fontSize:14
        //   fontWeight: "bold",
        },
      });
  
  export default styles
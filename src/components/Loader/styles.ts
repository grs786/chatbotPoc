import { StyleSheet } from "react-native";
import { Colors } from "src/Assets/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor:"rgba(0,0,0,0.2)",
    alignItems:'center',
    justifyContent:"center",
    position:'absolute',
    width:'100%',
    height:'110%'
  },
  headertext: { fontSize: 16, color: Colors.NAVYBLUE,fontWeight:'600',marginTop:40},
  
});

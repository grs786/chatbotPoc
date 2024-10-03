import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  headertext: {fontSize:24, color:'white'},
  container:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 20,
    paddingTop: Platform.OS ? 55 : 30,
    width: "100%",
    backgroundColor: "#061db7",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },


});

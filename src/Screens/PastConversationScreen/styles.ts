import { StyleSheet } from "react-native";
import { Colors } from "src/Assets/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 8,
  },
  headerstyle: {
    paddingHorizontal: 0,
    shadowColor: "#fff",
    backgroundColor: "transparent",
  },
  uuidText: {
    fontSize: 10,
    textAlign: "right",
  },
  searchMainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 24,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 24,
    elevation: 5, // Android shadow
    shadowColor: Colors.NAVYBLUE,
    shadowOffset: { width: 1, height: 4 }, // iOS shadow
    shadowOpacity: 0.1, // iOS shadow
    shadowRadius: 4, // iOS shadow
    width: "80%",
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 14,
    color: Colors.METALIC_GREY,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 6,
    // backgroundColor: "red",
  },
  chatItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  chatItem: {
    justifyContent: "center",
    marginLeft: 10,
  },
  chatTitle: {
    fontSize: 13,
    fontWeight: "500",
    width: "82%",
    lineHeight: 20,
    marginLeft: 10,
    color: Colors.METALIC_GREY,
  },
  dateHeading: {
    fontSize: 14,
    marginVertical: 10,
    color: "#888",
    fontWeight: "500",
  },
  emptyMessage: {
    fontSize: 14,
    color: "#aaa",
    paddingVertical: 5,
  },
  noHistoryText: {
    margin: 24,
    fontSize: 16,
    fontWeight: "600",
  },

  vinGroup: {
    marginBottom: 20,
  },
  rowMainContainer: {
    marginLeft: 10,
    marginTop: 10,
  },
  vinHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vinTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.NAVYBLUE,
  },
  arrow: {
    fontSize: 12,
    color: Colors.NAVYBLUE,
  },
  arrowBtnView: {
    width: 24,
    height: 24,
  },
  newConversationView: {
    flexDirection: "row",
    // backgroundColor: "red",
  },
  newConversation: {
    fontSize: 14,
    marginBottom: 3,
    fontWeight: "500",
    color: Colors.BLACK_SHADE1,
    marginLeft: 10,
  },
  seperator: {
    width: "100%",
    height: 2,
    backgroundColor: Colors.DISABLED_GREY,
    marginTop: 16,
    marginBottom: 24,
  },
  entryText: {
    fontSize: 14,
    marginBottom: 3,
    lineHeight: 24,
    fontWeight: "500",
    color: Colors.BLACK_SHADE1,
  },
});

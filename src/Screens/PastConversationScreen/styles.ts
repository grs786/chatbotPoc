import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "rgb(248,250,252)",
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 14,
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
    flexDirection: "row",
    alignItems: "center",
  },
  chatTitle: {
    fontSize: 13,
    marginLeft: 10,
    fontWeight: "500",
    width: "82%",
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
});

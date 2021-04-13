import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingBottom: 15,
    marginBottom: 15,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: { height: 50, width: 50, borderRadius: 5 },
  content: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  type: { color: "#aaa" },
});

export default styles;

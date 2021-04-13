import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { backgroundColor: "#181818", flex: 1 },
  category: {
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
  },
});

export default styles;

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { backgroundColor: "#181818", flex: 1 },
  place: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 5,
    marginBottom: 5,
  },
  placeLabel: {
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 12,
    color: "#fff",
  },
  item: { marginBottom: 20 },
});

export default styles;

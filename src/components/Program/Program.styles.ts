import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    marginHorizontal: 20,
  },
  background: {
    width: Dimensions.get("window").width - 40,
    height: 185,
  },
  backgroundImage: {
    borderRadius: 5,
  },
  wrapper: {
    backgroundColor: "rgba(0,0,0,.6)",
    height: "100%",
    justifyContent: "space-between",
    padding: 15,
  },
  header: { justifyContent: "space-between", flexDirection: "row" },
  places: { flexDirection: "row" },
  place: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 5,
    marginRight: 5,
  },
  placeLabel: {
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 12,
    color: "#fff",
  },
  muscles: { flexDirection: "row", marginBottom: 4 },
  title: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    color: "lightgray",
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default styles;

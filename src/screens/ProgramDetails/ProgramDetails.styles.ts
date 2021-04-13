import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { backgroundColor: "#181818", flex: 1 },
  addToFavorite: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  places: { flexDirection: "row", marginBottom: 8 },
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
});

export default styles;

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { backgroundColor: "#181818", flex: 1 },
  videoLoader: {
    position: "absolute",
    backgroundColor: "#202022",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
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
  gradient: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: { paddingHorizontal: 25, paddingTop: 75, paddingBottom: 25 },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    lineHeight: 26,
  },
  group: { marginBottom: 20 },
  subtitle: { color: "#ccc", fontWeight: "600", marginBottom: 5 },
  items: { flexDirection: "row" },
  item: {
    backgroundColor: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 7,
    borderRadius: 5,
    marginRight: 5,
  },
  itemLabel: {
    textTransform: "uppercase",
    fontWeight: "600",
    fontSize: 12,
  },
});

export default styles;

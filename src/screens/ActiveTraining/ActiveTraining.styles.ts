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
  content: { paddingHorizontal: 25, paddingTop: 75 },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 26,
  },
  reps: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "800",
  },
  groupName: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default styles;
